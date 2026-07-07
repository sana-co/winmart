import { ScrollRestoration } from "react-router";

// ScrollRestoration with no custom getKey uses React Router's default scroll
// management:
//   • New navigations → always scroll to top
//   • Back / Forward   → restore the page's previous scroll position
//   • Anchor (#hash)   → jump to the target element
export function ScrollToTop() {
  return <ScrollRestoration />;
}
