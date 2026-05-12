import {
  Brain,
  Sparkles,
  BookOpen,
  Settings,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Zap,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function KnowledgeBase() {
  const dataSources = [
    { name: "Conversaciones WhatsApp", count: "12,847", status: "active", lastSync: "Hace 2 min" },
    { name: "Emails históricos", count: "3,421", status: "active", lastSync: "Hace 5 min" },
    { name: "FAQs documentadas", count: "156", status: "active", lastSync: "Hace 1 hora" },
    { name: "Playbooks comerciales", count: "23", status: "active", lastSync: "Hace 30 min" },
    { name: "Políticas de venta", count: "18", status: "active", lastSync: "Hace 1 día" },
    { name: "Criterios de Gonzalo", count: "47", status: "training", lastSync: "Actualizando..." },
  ];

  const trainingTopics = [
    {
      category: "Tono Conversacional",
      status: "trained",
      accuracy: 94,
      examples: 847,
      description: "Lenguaje informal pero profesional, empatía con clientes B2B médicos"
    },
    {
      category: "Reglas de Derivación",
      status: "trained",
      accuracy: 91,
      examples: 234,
      description: "Cuándo escalar a humano vs resolver con IA"
    },
    {
      category: "Criterios de Calificación",
      status: "trained",
      accuracy: 96,
      examples: 1203,
      description: "Señales de intención, urgencia, fit de cliente ideal"
    },
    {
      category: "Señales de Intención",
      status: "training",
      accuracy: 87,
      examples: 456,
      description: "Patrones lingüísticos que indican alta probabilidad de compra"
    },
    {
      category: "Manejo de Objeciones",
      status: "trained",
      accuracy: 89,
      examples: 378,
      description: "Respuestas validadas a objeciones comunes de precio, certificación, entrega"
    },
    {
      category: "Detección de Cross-sell",
      status: "trained",
      accuracy: 93,
      examples: 521,
      description: "Identificar oportunidades de productos complementarios"
    },
  ];

  const knowledgeInsights = [
    { metric: "Precisión de Intención", value: "94%", change: "+3%", trend: "up" },
    { metric: "Tasa de Acierto en Calificación", value: "91%", change: "+5%", trend: "up" },
    { metric: "Respuestas Auto-resueltas", value: "76%", change: "+12%", trend: "up" },
    { metric: "Falsos Positivos", value: "4%", change: "-2%", trend: "down" },
  ];

  const recentLearnings = [
    {
      type: "pattern",
      title: "Nuevo patrón de intención detectado",
      description: "Clientes que preguntan 'certificación' tienen 87% de probabilidad de cierre",
      date: "Hace 3 horas"
    },
    {
      type: "correction",
      title: "Ajuste en criterio de calificación",
      description: "Gonzalo corrigió 3 casos: aumentar peso de 'urgencia médica' en score",
      date: "Hace 1 día"
    },
    {
      type: "improvement",
      title: "Mejora en detección de cross-sell",
      description: "IA aprendió que compras de Botox correlacionan con Ácido Hialurónico (R²=0.78)",
      date: "Hace 2 días"
    },
  ];

  const playbooks = [
    { name: "Consulta inicial de producto", conversations: 2847, successRate: 89 },
    { name: "Negociación de precio/volumen", conversations: 421, successRate: 67 },
    { name: "Solicitud de documentación", conversations: 1203, successRate: 94 },
    { name: "Seguimiento post-cotización", conversations: 567, successRate: 72 },
    { name: "Reactivación cliente inactivo", conversations: 234, successRate: 58 },
  ];

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Knowledge Base IA</h1>
            <p className="mt-1 text-slate-600">Entrenamiento y aprendizaje continuo del sistema</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configurar
            </Button>
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Entrenar modelo
            </Button>
          </div>
        </div>

        {/* Knowledge Insights */}
        <div className="grid grid-cols-4 gap-4">
          {knowledgeInsights.map((insight) => (
            <Card key={insight.metric}>
              <CardContent className="p-5">
                <div className="text-sm text-slate-600 mb-2">{insight.metric}</div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-semibold text-slate-900">{insight.value}</div>
                  <div className={`flex items-center gap-1 text-sm ${
                    insight.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${insight.trend === "down" ? "rotate-180" : ""}`} />
                    {insight.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left - Data Sources */}
          <div className="col-span-2 space-y-6">
            {/* Data Sources */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <CardTitle>Fuentes de Conocimiento</CardTitle>
                  <span className="ml-auto text-sm text-slate-600">Sincronización automática</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dataSources.map((source) => (
                    <div key={source.name} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{source.name}</h3>
                        <p className="text-sm text-slate-600">{source.count} registros • {source.lastSync}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {source.status === "active" ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Activo
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            Entrenando
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Topics */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <CardTitle>Áreas de Entrenamiento</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingTopics.map((topic) => (
                    <Card key={topic.category}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-slate-900">{topic.category}</h3>
                              {topic.status === "trained" ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              ) : (
                                <Clock className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <p className="text-sm text-slate-600">{topic.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-semibold text-slate-900">{topic.accuracy}%</div>
                            <div className="text-xs text-slate-600">precisión</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{topic.examples} ejemplos entrenados</span>
                          <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                topic.accuracy >= 90 ? "bg-green-500" : "bg-blue-500"
                              }`}
                              style={{ width: `${topic.accuracy}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Playbooks */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  <CardTitle>Playbooks Comerciales</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {playbooks.map((playbook) => (
                    <div key={playbook.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{playbook.name}</h3>
                        <p className="text-sm text-slate-600">
                          {playbook.conversations.toLocaleString()} conversaciones aprendidas
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-700">{playbook.successRate}%</div>
                          <div className="text-xs text-slate-600">éxito</div>
                        </div>
                        <Button size="sm">Ver</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Recent Learnings */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <CardTitle>Aprendizaje Reciente</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLearnings.map((learning, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2 mb-2">
                          {learning.type === "pattern" && <Target className="w-4 h-4 text-blue-600 mt-0.5" />}
                          {learning.type === "correction" && <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />}
                          {learning.type === "improvement" && <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />}
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 text-sm mb-1">{learning.title}</h3>
                            <p className="text-xs text-slate-600 mb-2">{learning.description}</p>
                            <span className="text-xs text-slate-500">{learning.date}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración del Modelo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-700 font-medium">Umbral de calificación</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="70"
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>0</span>
                      <span className="font-medium text-blue-700">70</span>
                      <span>100</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 font-medium">Confianza mínima IA</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="85"
                      className="w-full mt-2"
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>0</span>
                      <span className="font-medium text-blue-700">85</span>
                      <span>100</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-700 font-medium">Frecuencia de reentrenamiento</label>
                    <select className="w-full mt-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                      <option>Cada hora</option>
                      <option>Cada 6 horas</option>
                      <option>Diario</option>
                      <option>Semanal</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-slate-900">Estado del Sistema</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Modelo activo</span>
                    <span className="font-medium text-slate-900">v2.4.1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Última actualización</span>
                    <span className="font-medium text-slate-900">Hace 2h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Conversaciones procesadas</span>
                    <span className="font-medium text-slate-900">12,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Precisión global</span>
                    <span className="font-semibold text-green-700">92.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
