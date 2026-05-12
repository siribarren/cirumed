import { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Target,
  AlertCircle,
  Clock,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  Users,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import projectReadme from "../../../README.md?raw";

export function Dashboard() {
  const kpis = [
    { label: "Leads Ingresados Hoy", value: "47", change: "+23%", trend: "up", icon: Users, color: "blue" },
    { label: "Conversaciones Activas", value: "128", change: "+12%", trend: "up", icon: MessageSquare, color: "green" },
    { label: "Oportunidades Calificadas IA", value: "34", change: "+18%", trend: "up", icon: Target, color: "purple" },
    { label: "Tiempo Promedio Respuesta", value: "4.2m", change: "-32%", trend: "down", icon: Clock, color: "orange" },
  ];

  const aiRecommendations = [
    {
      type: "urgent",
      title: "12 leads con alta intención sin respuesta",
      description: "Detectados en las últimas 2 horas. Probabilidad de cierre >75%",
      action: "Ver leads",
      priority: "high"
    },
    {
      type: "opportunity",
      title: "8 clientes recurrentes listos para recompra",
      description: "Basado en frecuencia histórica y señales de comportamiento",
      action: "Reactivar",
      priority: "medium"
    },
    {
      type: "alert",
      title: "4 conversaciones requieren atención humana",
      description: "IA detectó objeciones complejas o consultas fuera del playbook",
      action: "Revisar",
      priority: "high"
    },
    {
      type: "insight",
      title: "6 oportunidades de cross-sell detectadas",
      description: "Clientes consultando productos complementarios",
      action: "Ver detalles",
      priority: "medium"
    },
  ];

  const recentActivity = [
    { lead: "María González", company: "Clínica Belleza", action: "IA calificó como alta prioridad", score: 92, time: "Hace 5 min" },
    { lead: "Carlos Ruiz", company: "Estética Premium", action: "Respondió a sugerencia de IA", score: 87, time: "Hace 12 min" },
    { lead: "Ana Martínez", company: "Centro Médico Sur", action: "Derivado a backoffice", score: 94, time: "Hace 18 min" },
    { lead: "Luis Fernández", company: "Spa & Wellness", action: "Cross-sell detectado", score: 78, time: "Hace 25 min" },
  ];

  const performanceMetrics = [
    { metric: "Tasa de Calificación IA", value: "87%", target: "85%", status: "good" },
    { metric: "Tasa de Cierre", value: "34%", target: "30%", status: "good" },
    { metric: "Leads Derivados a HubSpot", value: "23", target: "20", status: "good" },
    { metric: "Oportunidades en Riesgo", value: "7", target: "10", status: "good" },
  ];

  const projectSummary = useMemo(() => {
    const paragraphs = projectReadme
      .split(/\r?\n\r?\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    return paragraphs[0] ?? "";
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard Ejecutivo</h1>
        <p className="mt-1 text-slate-600">Inteligencia comercial en tiempo real</p>
      </div>

      <Card className="border-slate-200 bg-slate-50">
        <CardHeader>
          <CardTitle>Resumen del proyecto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">{projectSummary}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">SaaS B2B</Badge>
            <Badge variant="secondary">AI Interface</Badge>
            <Badge variant="secondary">Figma bundle</Badge>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const colors = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            purple: "bg-purple-50 text-purple-600",
            orange: "bg-orange-50 text-orange-600",
          };
          return (
            <Card key={kpi.label}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${colors[kpi.color as keyof typeof colors]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    kpi.trend === "up" && kpi.label.includes("Tiempo") ? "text-green-600" :
                    kpi.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {kpi.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {kpi.change}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-semibold text-slate-900">{kpi.value}</div>
                  <div className="mt-1 text-sm text-slate-600">{kpi.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <CardTitle>Recomendaciones de IA</CardTitle>
            <span className="ml-auto text-sm text-slate-600">Actualizadas hace 1 min</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {aiRecommendations.map((rec, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 p-1.5 rounded-lg ${
                      rec.priority === "high" ? "bg-red-50" : "bg-orange-50"
                    }`}>
                      {rec.type === "urgent" && <AlertCircle className="w-5 h-5 text-red-600" />}
                      {rec.type === "opportunity" && <RefreshCw className="w-5 h-5 text-orange-600" />}
                      {rec.type === "alert" && <Zap className="w-5 h-5 text-red-600" />}
                      {rec.type === "insight" && <Target className="w-5 h-5 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">{rec.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{rec.description}</p>
                      <Button variant="link" className="mt-3 p-0 h-auto text-blue-600 hover:text-blue-700">
                        {rec.action}
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{activity.lead}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-sm text-slate-600">{activity.company}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-0.5">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      {activity.score}
                    </Badge>
                    <span className="text-sm text-slate-500 w-24 text-right">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-700">{metric.metric}</span>
                    <span className="text-sm font-medium text-slate-900">{metric.value}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(parseInt(metric.value) / parseInt(metric.target)) * 100}%` }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-slate-500">Target: {metric.target}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
