import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Filter,
  Target,
  Building2
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Pipeline() {
  const stages = [
    { name: "Nuevo Lead", count: 18, color: "slate" },
    { name: "Analizado por IA", count: 12, color: "blue" },
    { name: "En Conversación", count: 24, color: "purple" },
    { name: "Calificado", count: 15, color: "green" },
    { name: "Requiere Acción Humana", count: 8, color: "orange" },
    { name: "Pendiente Receta/Datos", count: 6, color: "yellow" },
    { name: "Derivado a Backoffice", count: 5, color: "indigo" },
    { name: "Cerrado Ganado", count: 34, color: "emerald" },
  ];

  const leads = {
    "Nuevo Lead": [
      { id: 1, name: "Pedro Ramírez", company: "Spa Luxury", score: 45, probability: 32, urgency: "Baja", product: "Mesoterapia", amount: "$5,200", action: "Calificar intención" },
      { id: 2, name: "Laura Sánchez", company: "Estética Nova", score: 52, probability: 38, urgency: "Media", product: "Peeling", amount: "$3,800", action: "Análisis IA en proceso" },
    ],
    "Analizado por IA": [
      { id: 3, name: "Roberto García", company: "Clínica Vitale", score: 78, probability: 65, urgency: "Media", product: "Botox 50U", amount: "$7,500", action: "Iniciar conversación" },
      { id: 4, name: "Carmen López", company: "Beauty Center", score: 71, probability: 58, urgency: "Media", product: "Relleno", amount: "$9,200", action: "Enviar información" },
    ],
    "En Conversación": [
      { id: 5, name: "María González", company: "Clínica Belleza", score: 92, probability: 87, urgency: "Alta", product: "Botox 100U", amount: "$12,500", action: "Enviar cotización" },
      { id: 6, name: "Carlos Ruiz", company: "Estética Premium", score: 87, probability: 76, urgency: "Media", product: "Ácido Hialurónico", amount: "$8,900", action: "Responder consulta" },
    ],
    "Calificado": [
      { id: 7, name: "Ana Martínez", company: "Centro Médico Sur", score: 94, probability: 91, urgency: "Alta", product: "Relleno Dérmico", amount: "$11,400", action: "Solicitar receta" },
      { id: 8, name: "Luis Fernández", company: "Spa & Wellness", score: 78, probability: 68, urgency: "Media", product: "Mesoterapia", amount: "$6,700", action: "Confirmar datos" },
    ],
    "Requiere Acción Humana": [
      { id: 9, name: "Isabel Torres", company: "Derma Clinic", score: 85, probability: 72, urgency: "Alta", product: "Combinado", amount: "$15,800", action: "Consulta compleja" },
    ],
  };

  const [selectedStage, setSelectedStage] = useState("En Conversación");

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Pipeline Comercial</h1>
            <p className="mt-1 text-slate-600">Vista completa del funnel con inteligencia IA</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Ver recomendaciones IA
            </Button>
          </div>
        </div>

        {/* Pipeline Overview */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-slate-600 mb-1">Total Oportunidades</div>
              <div className="text-3xl font-semibold text-slate-900">122</div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                +15% vs semana anterior
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-slate-600 mb-1">Valor Total Pipeline</div>
              <div className="text-3xl font-semibold text-slate-900">$847K</div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                +22% vs semana anterior
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-slate-600 mb-1">Tasa de Conversión</div>
              <div className="text-3xl font-semibold text-slate-900">34%</div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                +4% vs promedio
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-slate-600 mb-1">Tiempo Promedio Cierre</div>
              <div className="text-3xl font-semibold text-slate-900">2.3d</div>
              <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                -18% vs mes anterior
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stage Pills */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2 overflow-x-auto">
              {stages.map((stage) => {
                const colors = {
                  slate: "bg-slate-100 text-slate-700 border-slate-300",
                  blue: "bg-blue-100 text-blue-700 border-blue-300",
                  purple: "bg-purple-100 text-purple-700 border-purple-300",
                  green: "bg-green-100 text-green-700 border-green-300",
                  orange: "bg-orange-100 text-orange-700 border-orange-300",
                  yellow: "bg-yellow-100 text-yellow-700 border-yellow-300",
                  indigo: "bg-indigo-100 text-indigo-700 border-indigo-300",
                  emerald: "bg-emerald-100 text-emerald-700 border-emerald-300",
                };
                const isSelected = selectedStage === stage.name;
                return (
                  <Button
                    key={stage.name}
                    onClick={() => setSelectedStage(stage.name)}
                    variant={isSelected ? "default" : "outline"}
                    className={`whitespace-nowrap ${
                      isSelected ? colors[stage.color as keyof typeof colors] : ""
                    }`}
                  >
                    {stage.name}
                    <Badge variant="secondary" className="ml-2 bg-white">
                      {stage.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Cards View */}
        <div className="grid grid-cols-4 gap-4">
          {(leads[selectedStage as keyof typeof leads] || []).map((lead) => (
            <Card key={lead.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-0.5">{lead.name}</h3>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {lead.company}
                    </p>
                  </div>
                  <Badge variant={lead.urgency === "Alta" ? "destructive" : "secondary"}>
                    {lead.urgency}
                  </Badge>
                </div>

                {/* AI Score */}
                <div className="flex gap-2 mb-4">
                  <Card className="flex-1 bg-blue-50 border-blue-200">
                    <CardContent className="p-2.5">
                      <div className="flex items-center gap-1 mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-xs text-blue-600">Score IA</span>
                      </div>
                      <div className="text-xl font-bold text-blue-700">{lead.score}</div>
                    </CardContent>
                  </Card>
                  <Card className="flex-1 bg-green-50 border-green-200">
                    <CardContent className="p-2.5">
                      <div className="flex items-center gap-1 mb-0.5">
                        <Target className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs text-green-600">Prob.</span>
                      </div>
                      <div className="text-xl font-bold text-green-700">{lead.probability}%</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Product & Amount */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Producto</span>
                    <span className="font-medium text-slate-900">{lead.product}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Monto est.</span>
                    <span className="font-semibold text-green-700">{lead.amount}</span>
                  </div>
                </div>

                {/* Next Action */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-slate-600">Próxima acción</span>
                  </div>
                  <Button className="w-full" size="sm">
                    {lead.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State */}
          {(!leads[selectedStage as keyof typeof leads] || leads[selectedStage as keyof typeof leads].length === 0) && (
            <Card className="col-span-4">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No hay leads en esta etapa</h3>
                <p className="text-slate-600">Los leads aparecerán aquí cuando entren a "{selectedStage}"</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
