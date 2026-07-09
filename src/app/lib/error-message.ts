export function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const maybeMessage = "message" in error ? error.message : undefined;
    const maybeDetails = "details" in error ? error.details : undefined;

    if (typeof maybeMessage === "string" && maybeMessage) {
      return maybeDetails && typeof maybeDetails === "string"
        ? `${maybeMessage} ${maybeDetails}`
        : maybeMessage;
    }
  }

  return fallback;
}
