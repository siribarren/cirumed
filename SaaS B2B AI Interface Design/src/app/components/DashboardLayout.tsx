import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  MessageSquare,
  GitBranch,
  Brain,
  BarChart3,
  Sparkles,
  Building2,
  Target
} from "lucide-react";
import logoCirumed from "@/assets/logo_cirumed.svg";

export function DashboardLayout() {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Conversaciones", href: "/conversations", icon: MessageSquare },
    { name: "Pipeline", href: "/pipeline", icon: GitBranch },
    { name: "Knowledge Base", href: "/knowledge", icon: Brain },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Automatizaciones", href: "/automations", icon: Sparkles },
    { name: "Integraciones", href: "/integrations", icon: Building2 },
    { name: "Campañas", href: "/campaigns", icon: Target },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const showConversationsHero = location.pathname.startsWith("/conversations");

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <img src={logoCirumed} alt="Cirumed logo" className="w-8 h-8 object-contain" />
          <span className="ml-2 font-semibold text-slate-900">Signal</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="ml-3">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              G
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-900">Gonzalo</p>
              <p className="text-xs text-slate-500">Ejecutivo Comercial</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showConversationsHero && (
          <div className="bg-white border-b border-slate-200 px-6 py-8">
            <h1 className="text-3xl font-semibold text-slate-900">Conversaciones</h1>
            <p className="mt-2 text-slate-600">Inteligencia comercial con Next Best Actions (NBA)</p>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
