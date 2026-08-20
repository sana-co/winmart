import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import type { LucideIcon } from "lucide-react";
import { Briefcase, ClipboardList, ExternalLink, LogOut, MessageSquare, RefreshCw, ShieldCheck, Star, Trash2, Truck, UserPlus, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  deleteFeedbackEntry,
  deleteCareerApplication,
  deleteLoyaltyRequest,
  deleteSupplierApplication,
  formatDateTime,
  getAdminInfoData,
  type CareerApplication,
  type FeedbackEntry,
  type LoyaltyRequest,
  type SupplierApplication,
} from "../lib/admin-data";
import { getErrorMessage } from "../lib/error-message";
import { isCurrentUserAdmin } from "../lib/products";
import { getSupabaseClient } from "../lib/supabase";
import {
  addManagedProductManager,
  getManagedProductManagers,
  removeManagedProductManager,
  type ManagedProductManager,
} from "../lib/product-manager-admin";

const careerRoleOptions = ["Cashier", "Sales Representative", "Accounting Assistant"];

type AdminInfoState = {
  feedback: FeedbackEntry[];
  suppliers: SupplierApplication[];
  careers: CareerApplication[];
  loyalty: LoyaltyRequest[];
  user: User | null;
};

const emptyState: AdminInfoState = {
  feedback: [],
  suppliers: [],
  careers: [],
  loyalty: [],
  user: null,
};

export function AdminInfoPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [data, setData] = useState<AdminInfoState>(emptyState);
  const [productManagers, setProductManagers] = useState<ManagedProductManager[]>([]);
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [managerLoading, setManagerLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [careerRoleFilter, setCareerRoleFilter] = useState("all");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      setData(await getAdminInfoData());
    } catch (err) {
      setError(getErrorMessage(err, "Could not load admin information."));
    } finally {
      setLoading(false);
    }
  };

  const loadProductManagers = async () => {
    setManagerLoading(true);
    setError("");

    try {
      setProductManagers(await getManagedProductManagers());
    } catch (err) {
      setError(getErrorMessage(err, "Could not load product managers."));
    } finally {
      setManagerLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let supabase: ReturnType<typeof getSupabaseClient>;

    try {
      supabase = getSupabaseClient();
    } catch (err) {
      setError(getErrorMessage(err, "Supabase is not configured."));
      setAuthLoading(false);
      return () => {
        mounted = false;
      };
    }

    supabase.auth.getSession().then(async ({ data: sessionData }) => {
      if (!mounted) return;

      const userId = sessionData.session?.user.id ?? null;
      setSessionUserId(userId);

      if (!userId) {
        setAuthLoading(false);
        return;
      }

      try {
        const allowed = await isCurrentUserAdmin(userId);
        if (!mounted) return;

        setIsAdmin(allowed);
        if (allowed) {
          await Promise.all([loadData(), loadProductManagers()]);
        }
      } catch (err) {
        setError(getErrorMessage(err, "Could not verify admin access."));
      } finally {
        if (mounted) setAuthLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      const supabase = getSupabaseClient();
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        throw signInError;
      }

      const userId = signInData.user?.id ?? null;
      setSessionUserId(userId);

      if (!userId) {
        throw new Error("Could not read signed-in admin user.");
      }

      const allowed = await isCurrentUserAdmin(userId);
      setIsAdmin(allowed);

      if (allowed) {
        await Promise.all([loadData(), loadProductManagers()]);
        setMessage("Signed in successfully.");
      }
    } catch (err) {
      setError(getErrorMessage(err, "Could not sign in."));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    setSessionUserId(null);
    setIsAdmin(false);
    setData(emptyState);
    setProductManagers([]);
    setMessage("Signed out.");
  };

  const handleAddProductManager = async (event: FormEvent) => {
    event.preventDefault();
    setManagerLoading(true);
    setError("");
    setMessage("");

    try {
      setProductManagers(await addManagedProductManager(managerEmail, managerPassword));
      setManagerEmail("");
      setManagerPassword("");
      setMessage("Product manager user and access updated.");
    } catch (err) {
      setError(getErrorMessage(err, "Could not add product manager."));
    } finally {
      setManagerLoading(false);
    }
  };

  const handleRemoveProductManager = async (userId: string) => {
    setManagerLoading(true);
    setError("");
    setMessage("");

    try {
      setProductManagers(await removeManagedProductManager(userId));
      setMessage("Product manager access removed.");
    } catch (err) {
      setError(getErrorMessage(err, "Could not remove product manager."));
    } finally {
      setManagerLoading(false);
    }
  };

  const handleDelete = async (kind: "feedback" | "supplier" | "career" | "loyalty", id: string) => {
    setError("");
    setMessage("");

    try {
      if (kind === "feedback") {
        await deleteFeedbackEntry(id);
        setData((current) => ({ ...current, feedback: current.feedback.filter((item) => item.id !== id) }));
      }

      if (kind === "supplier") {
        await deleteSupplierApplication(id);
        setData((current) => ({ ...current, suppliers: current.suppliers.filter((item) => item.id !== id) }));
      }

      if (kind === "career") {
        await deleteCareerApplication(id);
        setData((current) => ({ ...current, careers: current.careers.filter((item) => item.id !== id) }));
      }

      if (kind === "loyalty") {
        await deleteLoyaltyRequest(id);
        setData((current) => ({ ...current, loyalty: current.loyalty.filter((item) => item.id !== id) }));
      }

      setMessage("Information deleted successfully.");
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete information."));
    }
  };

  if (authLoading) {
    return <AdminShell message="Checking admin access..." />;
  }

  if (!sessionUserId) {
    return (
      <section className="min-h-[60vh] bg-[#f7f7f7] px-4 py-10 sm:px-6 sm:py-16">
        <form onSubmit={handleLogin} className="mx-auto max-w-[420px] rounded-[8px] border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h1 className="mb-2 text-2xl font-bold text-[#191919]">Admin Login</h1>
          <p className="mb-6 text-sm text-[#606779]">Sign in with your Supabase admin account.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-info-email">Email</Label>
              <Input id="admin-info-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-info-password">Password</Label>
              <Input id="admin-info-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            {error && <p className="rounded-[8px] bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            {message && <p className="rounded-[8px] bg-green-50 p-3 text-sm text-green-700">{message}</p>}
            <Button type="submit" className="w-full bg-[#273777] hover:bg-[#202f69]">
              Sign In
            </Button>
          </div>
        </form>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <AdminShell message="Your account is not allowed to view admin information.">
        <Button type="button" onClick={handleSignOut} variant="outline" className="mt-4">
          <LogOut /> Sign Out
        </Button>
      </AdminShell>
    );
  }

  const stats = [
    { label: "Feedback", value: data.feedback.length, icon: MessageSquare },
    { label: "Suppliers", value: data.suppliers.length, icon: Truck },
    { label: "Careers", value: data.careers.length, icon: Briefcase },
    { label: "Loyalty Requests", value: data.loyalty.length, icon: Star },
  ];
  const filteredCareers = careerRoleFilter === "all"
    ? data.careers
    : data.careers.filter((item) => item.role === careerRoleFilter);

  return (
    <section className="min-h-screen bg-[#f7f7f7] px-3 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 lg:flex-row lg:items-center">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#e30b43]">Admin Information</p>
            <h1 className="text-2xl font-black text-[#191919] sm:text-3xl">Requests & Login Stats</h1>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" className="w-full" onClick={() => Promise.all([loadData(), loadProductManagers()])} disabled={loading || managerLoading}>
              <RefreshCw /> {loading || managerLoading ? "Loading..." : "Refresh"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={handleSignOut}>
              <LogOut /> Sign Out
            </Button>
          </div>
        </div>

        {error && <p className="mb-6 rounded-[8px] bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {message && <p className="mb-6 rounded-[8px] bg-green-50 p-4 text-sm text-green-700">{message}</p>}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-[8px] border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#273777]/10 text-[#273777]">
                  <Icon size={20} />
                </div>
                <p className="text-sm text-[#606779]">{stat.label}</p>
                <p className="mt-1 break-words text-2xl font-black text-[#191919]">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mb-6 min-w-0 rounded-[8px] border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users className="text-[#273777]" size={20} />
            <h2 className="text-xl font-bold text-[#191919]">Admin Login Stats</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatLine label="Email" value={data.user?.email ?? "Unknown"} />
            <StatLine label="Last sign in" value={formatDateTime(data.user?.last_sign_in_at)} />
            <StatLine label="Account created" value={formatDateTime(data.user?.created_at)} />
          </div>
        </div>

        <InfoSection title="Product Manager Access" icon={ShieldCheck}>
          <form onSubmit={handleAddProductManager} className="mb-5 grid gap-3 rounded-[8px] bg-[#f7f7f7] p-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
            <div className="space-y-2">
              <Label htmlFor="product-manager-email">Product manager email</Label>
              <Input
                id="product-manager-email"
                type="email"
                value={managerEmail}
                onChange={(event) => setManagerEmail(event.target.value)}
                placeholder="manager@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-manager-password">Temporary password</Label>
              <Input
                id="product-manager-password"
                type="password"
                value={managerPassword}
                onChange={(event) => setManagerPassword(event.target.value)}
                placeholder="Required for new users"
                minLength={6}
              />
            </div>
            <Button type="submit" className="bg-[#273777] hover:bg-[#202f69]" disabled={managerLoading}>
              <UserPlus /> Create / Add
            </Button>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productManagers.map((manager) => (
                <TableRow key={manager.user_id}>
                  <TableCell>{manager.user?.email || "Unknown email"}</TableCell>
                  <TableCell className="max-w-[260px] truncate">{manager.user_id}</TableCell>
                  <TableCell>{formatDateTime(manager.user?.last_sign_in_at)}</TableCell>
                  <TableCell>{formatDateTime(manager.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button type="button" variant="destructive" size="sm" onClick={() => handleRemoveProductManager(manager.user_id)} disabled={managerLoading}>
                      <Trash2 /> Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {productManagers.length === 0 && <EmptyRow label="No product managers have been added yet." />}
            </TableBody>
          </Table>
        </InfoSection>

        <InfoSection title="Feedback Information" icon={MessageSquare}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Music</TableHead>
                <TableHead>Ambience</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.feedback.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.topic || item.subject || "General"}</TableCell>
                  <TableCell>{item.quality ?? 0}/5</TableCell>
                  <TableCell>{item.service ?? 0}/5</TableCell>
                  <TableCell>{item.music ?? 0}/5</TableCell>
                  <TableCell>{item.ambience ?? 0}/5</TableCell>
                  <TableCell>{item.price ?? 0}/5</TableCell>
                  <TableCell>{item.rating}/5</TableCell>
                  <TableCell className="max-w-[420px] whitespace-normal">{item.message}</TableCell>
                  <TableCell>{formatDateTime(item.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button type="button" variant="destructive" size="sm" onClick={() => handleDelete("feedback", item.id)}>
                      <Trash2 /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {data.feedback.length === 0 && <EmptyRow label="No feedback has been submitted yet." />}
            </TableBody>
          </Table>
        </InfoSection>

        <InfoSection title="Supplier Information" icon={Truck}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.suppliers.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.business}</TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone || "Not provided"}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="max-w-[360px] whitespace-normal">{item.message || "No message"}</TableCell>
                  <TableCell>{formatDateTime(item.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button type="button" variant="destructive" size="sm" onClick={() => handleDelete("supplier", item.id)}>
                      <Trash2 /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {data.suppliers.length === 0 && <EmptyRow label="No supplier applications have been submitted yet." />}
            </TableBody>
          </Table>
        </InfoSection>

        <InfoSection title="Career Applications" icon={Briefcase}>
          <div className="mb-4 grid gap-2 sm:max-w-[320px]">
            <Label htmlFor="career-role-filter">Filter by career</Label>
            <select
              id="career-role-filter"
              value={careerRoleFilter}
              onChange={(event) => setCareerRoleFilter(event.target.value)}
              className="h-10 rounded-[8px] border border-gray-200 bg-white px-3 text-sm text-[#191919] outline-none transition-colors focus:border-[#273777]"
            >
              <option value="all">All careers</option>
              {careerRoleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>CV</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCareers.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.email || "Not provided"}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell className="max-w-[360px] whitespace-normal">{item.message || "No message"}</TableCell>
                  <TableCell>
                    {item.cv_url ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={item.cv_url} target="_blank" rel="noreferrer">
                          <ExternalLink /> Open CV
                        </a>
                      </Button>
                    ) : (
                      "Unavailable"
                    )}
                  </TableCell>
                  <TableCell>{formatDateTime(item.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button type="button" variant="destructive" size="sm" onClick={() => handleDelete("career", item.id)}>
                      <Trash2 /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCareers.length === 0 && (
                <EmptyRow label={data.careers.length === 0 ? "No career applications have been submitted yet." : "No applications match this career filter."} />
              )}
            </TableBody>
          </Table>
        </InfoSection>

        <InfoSection title="Loyalty Information" icon={ClipboardList}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.loyalty.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.full_name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.contact_number}</TableCell>
                  <TableCell className="max-w-[360px] whitespace-normal">{item.address}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{formatDateTime(item.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button type="button" variant="destructive" size="sm" onClick={() => handleDelete("loyalty", item.id)}>
                      <Trash2 /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {data.loyalty.length === 0 && <EmptyRow label="No loyalty card requests have been submitted yet." />}
            </TableBody>
          </Table>
        </InfoSection>
      </div>
    </section>
  );
}

function AdminShell({ message, children }: { message: string; children?: React.ReactNode }) {
  return (
    <section className="min-h-[60vh] bg-[#f7f7f7] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[700px] rounded-[8px] border border-gray-100 bg-white p-5 text-center text-[#273777] shadow-sm sm:p-8">
        <p>{message}</p>
        {children}
      </div>
    </section>
  );
}

function InfoSection({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="mb-6 min-w-0 max-w-full overflow-hidden rounded-[8px] border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="text-[#273777]" size={20} />
        <h2 className="min-w-0 text-lg font-bold text-[#191919] sm:text-xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] bg-[#f7f7f7] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#606779]">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-[#191919]">{value}</p>
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return (
    <TableRow>
      <TableCell colSpan={11} className="py-8 text-center text-[#606779]">
        {label}
      </TableCell>
    </TableRow>
  );
}
