import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  MessageSquare,
  Target,
  Send
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function LeadDetail() {
  const { id } = useParams();

  const lead = {
    name: "María González",
    company: "Clínica Belleza",
    email: "maria.gonzalez@clinicabelleza.com",
    phone: "+52 55 1234 5678",
    location: "Ciudad de México, CDMX",
    score: 92,
    intent: "Alta intención de compra",
    probability: 87,
    stage: "Listo para cerrar",
    product: "Botox 100U",
    estimatedValue: "$12,500 MXN",
    source: "WhatsApp",
    firstContact: "7 de mayo, 2026 - 14:23",
    lastActivity: "Hace 5 minutos"
  };

  const timeline = [
    { time: "14:32", event: "Mensaje recibido", detail: "Pregunta sobre tiempos de entrega", type: "message" },
    { time: "14:29", event: "IA sugirió respuesta", detail: "Confirmación de envío en 24-48h", type: "ai" },
    { time: "14:28", event: "Mensaje recibido", detail: "Solicita factura y tiempo de entrega", type: "message" },
    { time: "14:26", event: "IA calificó lead", detail: "Score aumentó de 78 a 92", type: "ai" },
    { time: "14:25", event: "Mensaje recibido", detail: "Especifica cantidad: 10 unidades", type: "message" },
    { time: "14:24", event: "IA respondió", detail: "Consulta sobre uso clínico", type: "ai" },
    { time: "14:23", event: "Primer contacto", detail: "Consulta sobre Botox 100U", type: "start" },
  ];

  const purchaseHistory = [
    { date: "15 mar 2026", product: "Ácido Hialurónico", amount: "$8,900", status: "Completado" },
    { date: "22 ene 2026", product: "Botox 50U", amount: "$6,200", status: "Completado" },
    { date: "10 nov 2025", product: "Relleno Dérmico", amount: "$11,400", status: "Completado" },
  ];

  const scoreReasons = [
    { factor: "Especificó cantidad exacta", impact: "+15", positive: true },
    { factor: "Conoce el producto", impact: "+12", positive: true },
    { factor: "Solicita factura (señal B2B)", impact: "+10", positive: true },
    { factor: "Cliente recurrente (3 compras)", impact: "+18", positive: true },
    { factor: "Pregunta sobre entrega inmediata", impact: "+8", positive: true },
    { factor: "Falta receta médica", impact: "-5", positive: false },
  ];

  const checklist = [
    { task: "Identificar producto", status: "done" },
    { task: "Calificar intención", status: "done" },
    { task: "Obtener cantidad requerida", status: "done" },
    { task: "Solicitar receta médica", status: "pending" },
    { task: "Confirmar datos de facturación", status: "pending" },
    { task: "Enviar cotización formal", status: "recommended" },
    { task: "Derivar a backoffice para cierre", status: "next" },
  ];

  const recommendations = [
    {
      title: "Cross-sell detectado",
      description: "Este cliente compró Ácido Hialurónico hace 2 meses. Está en ventana de recompra.",
      action: "Ofrecer promoción",
      priority: "medium"
    },
    {
      title: "Documentación pendiente",
      description: "Solicitar receta médica para cumplir requisitos regulatorios",
      action: "Enviar checklist",
      priority: "high"
    }
  ];

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="max-w-7xl mx-auto p-8 space-y-6">
        {/* Header */}
        <div>
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/conversations">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a conversaciones
            </Link>
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{lead.name}</h1>
              <p className="text-slate-600 mt-1">{lead.company}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Editar</Button>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Derivar a backoffice
              </Button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* AI Summary */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  <CardTitle>Resumen de IA</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700">
                  <strong>Lead altamente calificado</strong> con intención clara de compra.
                  Cliente recurrente (3ra compra) que conoce el producto y especifica cantidad exacta.
                  Muestra urgencia al preguntar por tiempos de entrega. Requiere documentación
                  regulatoria antes del cierre. <strong>Probabilidad de cierre: 87%</strong>
                </p>
                <div className="flex gap-3">
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-slate-600">Lead Score IA</span>
                      </div>
                      <div className="text-3xl font-semibold text-blue-700">92/100</div>
                    </CardContent>
                  </Card>
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-slate-600">Prob. Cierre</span>
                      </div>
                      <div className="text-3xl font-semibold text-green-700">87%</div>
                    </CardContent>
                  </Card>
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-slate-600">Valor Est.</span>
                      </div>
                      <div className="text-2xl font-semibold text-purple-700">$12.5K</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>¿Por qué este score?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scoreReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {reason.positive ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        )}
                        <span className="text-sm text-slate-700">{reason.factor}</span>
                      </div>
                      <span className={`text-sm font-semibold ${
                        reason.positive ? "text-green-700" : "text-orange-700"
                      }`}>
                        {reason.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Intelligent Checklist */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <CardTitle>Checklist Inteligente</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {checklist.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        item.status === "recommended"
                          ? "bg-blue-50 border border-blue-200"
                          : item.status === "next"
                          ? "bg-green-50 border border-green-200"
                          : "bg-slate-50"
                      }`}
                    >
                      {item.status === "done" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {item.status === "pending" && <Clock className="w-5 h-5 text-orange-600" />}
                      {item.status === "recommended" && <Sparkles className="w-5 h-5 text-blue-600" />}
                      {item.status === "next" && <Target className="w-5 h-5 text-green-600" />}
                      <span className={`text-sm flex-1 ${
                        item.status === "done" ? "text-slate-500 line-through" : "text-slate-700 font-medium"
                      }`}>
                        {item.task}
                      </span>
                      {item.status === "recommended" && (
                        <Badge>Recomendado</Badge>
                      )}
                      {item.status === "next" && (
                        <Badge className="bg-green-600 hover:bg-green-700">Siguiente paso</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline Conversacional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.type === "ai" ? "bg-blue-100" :
                          item.type === "message" ? "bg-green-100" :
                          "bg-purple-100"
                        }`}>
                          {item.type === "ai" && <Sparkles className="w-4 h-4 text-blue-600" />}
                          {item.type === "message" && <MessageSquare className="w-4 h-4 text-green-600" />}
                          {item.type === "start" && <Target className="w-4 h-4 text-purple-600" />}
                        </div>
                        {idx < timeline.length - 1 && (
                          <div className="w-0.5 h-12 bg-slate-200"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-slate-900">{item.event}</span>
                          <span className="text-sm text-slate-500">{item.time}</span>
                        </div>
                        <p className="text-sm text-slate-600">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Purchase History */}
            <Card>
              <CardHeader>
                <CardTitle>Historial de Compras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {purchaseHistory.map((purchase, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5 text-slate-600" />
                        <div>
                          <p className="font-medium text-slate-900">{purchase.product}</p>
                          <p className="text-sm text-slate-600">{purchase.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{purchase.amount}</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Valor total histórico</span>
                    <span className="text-lg font-semibold text-slate-900">$26,500 MXN</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-slate-600">Frecuencia de compra</span>
                    <span className="text-sm font-medium text-green-700">Cada 45 días aprox.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-slate-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600">Empresa</p>
                      <p className="font-medium text-slate-900">{lead.company}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-slate-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium text-slate-900 text-sm">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-slate-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600">Teléfono</p>
                      <p className="font-medium text-slate-900">{lead.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600">Ubicación</p>
                      <p className="font-medium text-slate-900">{lead.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-slate-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600">Primer contacto</p>
                      <p className="font-medium text-slate-900 text-sm">{lead.firstContact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <CardTitle>Oportunidades IA</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${
                      rec.priority === "high"
                        ? "bg-red-50 border-red-200"
                        : "bg-orange-50 border-orange-200"
                    }`}>
                      <h4 className="font-medium text-slate-900 text-sm mb-1">{rec.title}</h4>
                      <p className="text-xs text-slate-600 mb-2">{rec.description}</p>
                      <Button variant="link" className="p-0 h-auto text-sm">
                        {rec.action} →
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600">Tasa de respuesta</span>
                      <span className="text-sm font-semibold text-slate-900">100%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600">Engagement score</span>
                      <span className="text-sm font-semibold text-slate-900">94%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600">Tiempo de conversión</span>
                      <span className="text-sm font-semibold text-slate-900">9 min</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
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
