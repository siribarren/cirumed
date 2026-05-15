import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./components/Dashboard";
import { Conversations } from "./components/Conversations";
import { LeadDetail } from "./components/LeadDetail";
import { Pipeline } from "./components/Pipeline";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { Analytics } from "./components/Analytics";
import { Automations } from "./components/Automations";
import { Integrations } from "./components/Integrations";
import { Campaigns } from "./components/Campaigns";

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
      { path: "automations", Component: Automations },
      { path: "integrations", Component: Integrations },
      { path: "campaigns", Component: Campaigns },
    ],
  },
]);
