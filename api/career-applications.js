import { randomUUID } from "crypto";
import { cleanString, isEmail, requirePost, sendJson, supabase } from "./_supabase.js";

const MAX_CV_SIZE_BYTES = 8 * 1024 * 1024;
const ROLE_OPTIONS = new Set(["Cashier", "Sales Representative", "Accounting Assistant"]);
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function safeFileName(value) {
  return cleanString(value)
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

function fileExtension(fileName, contentType) {
  const match = fileName.match(/\.[a-zA-Z0-9]+$/);
  if (match) return match[0].toLowerCase();
  if (contentType === "application/pdf") return ".pdf";
  if (contentType === "application/msword") return ".doc";
  return ".docx";
}

async function handleCreateCvUpload(request, response) {
  const fileName = safeFileName(request.body?.fileName);
  const fileType = cleanString(request.body?.fileType);
  const fileSize = Number(request.body?.fileSize ?? 0);

  if (!fileName || !ALLOWED_CV_TYPES.has(fileType)) {
    sendJson(response, 400, { error: "Please upload a PDF, DOC, or DOCX CV." });
    return;
  }

  if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > MAX_CV_SIZE_BYTES) {
    sendJson(response, 400, { error: "CV must be 8MB or smaller." });
    return;
  }

  const baseName = fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const path = `${new Date().toISOString().slice(0, 10)}/${randomUUID()}-${baseName || "cv"}${fileExtension(fileName, fileType)}`;
  const { data, error } = await supabase.storage.from("career-cvs").createSignedUploadUrl(path);

  if (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }

  sendJson(response, 200, { upload: { path: data.path, token: data.token } });
}

async function handleSubmitApplication(request, response) {
  const name = cleanString(request.body?.name);
  const phone = cleanString(request.body?.phone);
  const email = cleanString(request.body?.email);
  const role = cleanString(request.body?.role);
  const message = cleanString(request.body?.message);
  const cvFileName = safeFileName(request.body?.cvFileName);
  const cvPath = cleanString(request.body?.cvPath);

  if (!name || !phone || !ROLE_OPTIONS.has(role) || !cvFileName || !cvPath) {
    sendJson(response, 400, { error: "Name, phone number, position, and CV are required." });
    return;
  }

  if (email && !isEmail(email)) {
    sendJson(response, 400, { error: "Please enter a valid email address." });
    return;
  }

  const { error } = await supabase.from("career_applications").insert({
    name,
    phone,
    email: email || null,
    role,
    message: message || null,
    cv_file_name: cvFileName,
    cv_path: cvPath,
  });

  if (error) {
    await supabase.storage.from("career-cvs").remove([cvPath]);
    sendJson(response, 500, { error: error.message });
    return;
  }

  sendJson(response, 201, { ok: true });
}

export default async function handler(request, response) {
  if (!requirePost(request, response)) return;

  if (request.body?.action === "create-cv-upload") {
    await handleCreateCvUpload(request, response);
    return;
  }

  await handleSubmitApplication(request, response);
}
