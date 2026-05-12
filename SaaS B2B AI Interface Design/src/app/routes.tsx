import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./components/Dashboard";
import { Conversations } from "./components/Conversations";
import { LeadDetail } from "./components/LeadDetail";
import { Pipeline } from "./components/Pipeline";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { Analytics } from "./components/Analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "conversations", Component: Conversations },
      { path: "conversations/:id", Component: LeadDetail },
      { path: "pipeline", Component: Pipeline },
      { path: "knowledge", Component: KnowledgeBase },
      { path: "analytics", Component: Analytics },
    ],
  },
]);
