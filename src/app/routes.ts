import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/root-layout";
import { HomePage } from "./pages/home";
import { BecomeASupplierPage } from "./pages/become-a-supplier";
import { NewArrivalsPage } from "./pages/new-arrivals";
import { HotPicsPage } from "./pages/hot-pics";
import { OurStoryPage } from "./pages/our-story";
import { FeedbackPage } from "./pages/feedback";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "become-a-supplier", Component: BecomeASupplierPage },
      { path: "new-arrivals", Component: NewArrivalsPage },
      { path: "hot-pics", Component: HotPicsPage },
      { path: "our-story", Component: OurStoryPage },
      { path: "feedback", Component: FeedbackPage },
    ],
  },
]);
