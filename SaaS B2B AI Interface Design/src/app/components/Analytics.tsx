import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Target,
  AlertCircle,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function Analytics() {
  const conversionData = [
    { month: "Ene", leads: 245, calificados: 187, cerrados: 64 },
    { month: "Feb", leads: 289, calificados: 221, cerrados: 78 },
    { month: "Mar", leads: 312, calificados: 251, cerrados: 89 },
    { month: "Abr", leads: 378, calificados: 298, cerrados: 107 },
    { month: "May", leads: 421, calificados: 347, cerrados: 124 },
  ];

  const aiPerformanceData = [
    { day: "Lun", precision: 89, autoResueltas: 72, derivadas: 28 },
    { day: "Mar", precision: 91, autoResueltas: 76, derivadas: 24 },
    { day: "Mié", precision: 94, autoResueltas: 81, derivadas: 19 },
    { day: "Jue", precision: 93, autoResueltas: 79, derivadas: 21 },
    { day: "Vie", precision: 96, autoResueltas: 84, derivadas: 16 },
    { day: "Sáb", precision: 88, autoResueltas: 68, derivadas: 32 },
    { day: "Dom", precision: 87, autoResueltas: 65, derivadas: 35 },
  ];

  const productDistribution = [
    { name: "Botox", value: 342, color: "#3B82F6" },
    { name: "Ácido Hialurónico", value: 287, color: "#8B5CF6" },
    { name: "Relleno Dérmico", value: 198, color: "#10B981" },
    { name: "Mesoterapia", value: 156, color: "#F59E0B" },
    { name: "Otros", value: 124, color: "#6B7280" },
  ];

  const timeAnalysis = [
    { hour: "09:00", intención: 67, conversiones: 12 },
    { hour: "10:00", intención: 72, conversiones: 15 },
    { hour: "11:00", intención: 84, conversiones: 21 },
    { hour: "12:00", intención: 91, conversiones: 28 },
    { hour: "13:00", intención: 78, conversiones: 18 },
    { hour: "14:00", intención: 82, conversiones: 22 },
    { hour: "15:00", intención: 88, conversiones: 25 },
    { hour: "16:00", intención: 93, conversiones: 31 },
    { hour: "17:00", intención: 86, conversiones: 24 },
    { hour: "18:00", intención: 74, conversiones: 16 },
  ];

  const topObstacles = [
    { obstacle: "Demora en respuesta inicial", impact: "37% leads perdidos", frequency: 89, trend: "down" },
    { obstacle: "Falta de receta médica", impact: "24% conversiones bloqueadas", frequency: 67, trend: "stable" },
    { obstacle: "Precio superior a competencia", impact: "18% objeciones", frequency: 54, trend: "up" },
    { obstacle: "Tiempo de entrega", impact: "15% cancelaciones", frequency: 42, trend: "down" },
    { obstacle: "Stock insuficiente", impact: "12% oportunidades perdidas", frequency: 31, trend: "stable" },
  ];

  const aiRecommendations = [
    {
      type: "opportunity",
      title: "Horario pico de conversión: 12:00-16:00",
      description: "31% más conversiones en esta ventana. Considera aumentar capacidad de respuesta.",
      action: "Optimizar recursos",
      impact: "high"
    },
    {
      type: "alert",
      title: "Tasa de respuesta cayó 8% esta semana",
      description: "Correlaciona con aumento de 18% en leads perdidos. Requiere atención inmediata.",
      action: "Revisar capacidad",
      impact: "critical"
    },
    {
      type: "insight",
      title: "Cross-sell de Botox → Ácido Hialurónico",
      description: "78% correlación. Clientes de Botox compran Ácido en 45 días promedio.",
      action: "Crear campaña",
      impact: "high"
    },
    {
      type: "improvement",
      title: "Playbook de objeciones de precio mejora 23%",
      description: "Nuevas respuestas validadas aumentan tasa de cierre ante objeción de precio.",
      action: "Aplicar a equipo",
      impact: "medium"
    },
  ];

  const campaignPerformance = [
    { campaign: "Promoción Botox Abril", leads: 187, conversion: 34, revenue: "$89,400" },
    { campaign: "Reactivación Clientes Q1", leads: 124, conversion: 28, revenue: "$52,100" },
    { campaign: "Cross-sell Ácido Hialurónico", leads: 93, conversion: 41, revenue: "$67,800" },
    { campaign: "Black Friday Médico", leads: 312, conversion: 29, revenue: "$142,300" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Analytics e Insights IA</h1>
            <p className="mt-1 text-slate-600">Hallazgos accionables del comportamiento comercial</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Exportar reporte</Button>
            <Button>
              <Calendar className="w-4 h-4 mr-2" />
              Últimos 30 días
            </Button>
          </div>
        </div>

        {/* AI Recommendations */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <CardTitle>Recomendaciones Inteligentes</CardTitle>
              <span className="ml-auto text-sm text-slate-600">Generadas por IA</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {aiRecommendations.map((rec, idx) => (
                <Card key={idx} className={`${
                  rec.impact === "critical" ? "border-red-300" :
                  rec.impact === "high" ? "border-orange-300" :
                  "border-blue-300"
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 p-1.5 rounded-lg ${
                        rec.impact === "critical" ? "bg-red-100" :
                        rec.impact === "high" ? "bg-orange-100" :
                        "bg-blue-100"
                      }`}>
                        {rec.type === "alert" && <AlertCircle className="w-4 h-4 text-red-600" />}
                        {rec.type === "opportunity" && <Target className="w-4 h-4 text-orange-600" />}
                        {rec.type === "insight" && <Sparkles className="w-4 h-4 text-blue-600" />}
                        {rec.type === "improvement" && <TrendingUp className="w-4 h-4 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 text-sm mb-1">{rec.title}</h3>
                        <p className="text-xs text-slate-600 mb-2">{rec.description}</p>
                        <Button variant="link" className="p-0 h-auto text-xs">
                          {rec.action} →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6">
          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Evolución del Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="leads" fill="#3B82F6" name="Leads Ingresados" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="calificados" fill="#8B5CF6" name="Calificados IA" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cerrados" fill="#10B981" name="Cerrados" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <CardTitle>Rendimiento IA Semanal</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={aiPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line type="monotone" dataKey="precision" stroke="#3B82F6" strokeWidth={2} name="Precisión %" />
                  <Line type="monotone" dataKey="autoResueltas" stroke="#10B981" strokeWidth={2} name="Auto-resueltas %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-3 gap-6">
          {/* Product Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Producto</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={productDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Time Analysis */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Intención de Compra por Horario</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={timeAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="hour" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="intención" fill="#8B5CF6" name="Intención detectada" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversiones" fill="#10B981" name="Conversiones" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Obstacles & Campaigns */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top Obstacles */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <CardTitle>Principales Obstáculos Detectados</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topObstacles.map((obstacle, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-slate-900">{obstacle.obstacle}</h3>
                          {obstacle.trend === "down" && <TrendingDown className="w-4 h-4 text-green-600" />}
                          {obstacle.trend === "up" && <TrendingUp className="w-4 h-4 text-red-600" />}
                        </div>
                        <p className="text-sm text-red-700 font-medium">{obstacle.impact}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold text-slate-900">{obstacle.frequency}</div>
                        <div className="text-xs text-slate-600">casos</div>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${(obstacle.frequency / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Campaign Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                <CardTitle>Rendimiento de Campañas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {campaignPerformance.map((campaign, idx) => (
                  <Card key={idx} className="hover:bg-slate-50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-slate-900">{campaign.campaign}</h3>
                        <span className="text-lg font-semibold text-green-700">{campaign.revenue}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-600 mb-1">Leads generados</div>
                          <div className="text-2xl font-semibold text-blue-700">{campaign.leads}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600 mb-1">Tasa conversión</div>
                          <div className="text-2xl font-semibold text-green-700">{campaign.conversion}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
