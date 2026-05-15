import { useState } from "react";
import {
  Search,
  Filter,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  FileText,
  Building2,
  ShoppingCart,
  Zap,
  Target,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Camera,
  Mic,
  CheckCheck
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState(0);

  const conversations = [
    {
      id: 1,
      name: "María González",
      company: "Clínica Belleza",
      score: 92,
      intent: "Alta intención de compra",
      urgency: "Alta",
      stage: "Listo para cerrar",
      lastMessage: "Perfecto, ¿cuándo podríamos recibir el pedido?",
      time: "5 min",
      unread: true,
      tags: ["Alta prioridad", "Requiere cotización"],
      product: "Botox 100U",
      aiSummary:
        "Lead calificado con intención de cierre. Ya validó producto y cantidad; solo requiere confirmar tiempos de entrega para comprar hoy.",
      detectedIntent: "Compra inmediata",
      closeProbability: 87,
      nextBestAction:
        "Enviar cotización formal con SLA de entrega en 24-48h y solicitar confirmación de orden antes del cierre del día.",
      nextBestActionLabel: "Generar cotización",
      suggestedReply:
        "María, buenísimo. Te dejo ahora mismo la cotización formal de las 10 unidades de Botox 100U con factura y entrega estimada en 24-48 horas. Si te acomoda, la dejamos confirmada hoy y lo pongo en marcha."
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      company: "Estética Premium",
      score: 87,
      intent: "Comparando opciones",
      urgency: "Media",
      stage: "En conversación",
      lastMessage: "¿Tienen promociones en volumen?",
      time: "12 min",
      unread: true,
      tags: ["Cross-sell", "Cliente recurrente"],
      product: "Ácido Hialurónico",
      aiSummary:
        "Cliente recurrente en comparación activa. Está evaluando precio por volumen y apertura a una compra mayor si percibe ahorro claro.",
      detectedIntent: "Negociación por volumen",
      closeProbability: 74,
      nextBestAction:
        "Presentar una propuesta por tramos (10/20/30 unidades) con descuento incremental y opción de bundle complementario.",
      nextBestActionLabel: "Enviar propuesta volumen",
      suggestedReply:
        "Carlos, sí, tenemos esquema de volumen y te puede convenir bastante. Si te parece, te envío una comparativa clara para 10, 20 y 30 unidades de Ácido Hialurónico, con el ahorro por tramo, y vemos juntos cuál te rinde mejor."
    },
    {
      id: 3,
      name: "Ana Martínez",
      company: "Centro Médico Sur",
      score: 94,
      intent: "Decisión inmediata",
      urgency: "Alta",
      stage: "Requiere acción humana",
      lastMessage: "Necesito confirmación de la certificación",
      time: "18 min",
      unread: true,
      tags: ["Requiere receta", "Alto valor"],
      product: "Relleno Dérmico",
      aiSummary:
        "Interés alto, pero el avance está bloqueado por validación regulatoria. La decisión depende de recibir certificaciones y respaldo técnico.",
      detectedIntent: "Validación regulatoria",
      closeProbability: 69,
      nextBestAction:
        "Derivar a especialista clínico para compartir certificaciones oficiales y coordinar llamada de validación en las próximas 2 horas.",
      nextBestActionLabel: "Derivar a especialista",
      suggestedReply:
        "Ana, totalmente válido. Te comparto enseguida la certificación completa del Relleno Dérmico y, si te ayuda, coordinamos una llamada corta con nuestro especialista clínico para dejar todo resuelto hoy mismo."
    },
    {
      id: 4,
      name: "Luis Fernández",
      company: "Spa & Wellness",
      score: 78,
      intent: "Explorando productos",
      urgency: "Media",
      stage: "Calificado",
      lastMessage: "Me interesa conocer más opciones",
      time: "25 min",
      unread: false,
      tags: ["Nuevo lead"],
      product: "Mesoterapia",
      aiSummary:
        "Nuevo lead en etapa de descubrimiento. Muestra interés en alternativas del portafolio, pero aún no define producto ni volumen objetivo.",
      detectedIntent: "Exploración de portafolio",
      closeProbability: 52,
      nextBestAction:
        "Compartir comparativo de líneas de mesoterapia con recomendación inicial por perfil de paciente y agendar una demo breve.",
      nextBestActionLabel: "Compartir comparativo",
      suggestedReply:
        "Luis, perfecto, me encanta que lo estemos viendo con calma. Te paso un comparativo simple de las opciones de mesoterapia (beneficios, uso recomendado y rango de inversión) y en base a eso definimos la mejor para tu spa."
    },
  ];

  const currentConv = conversations[selectedConversation];

  const messages = [
    { sender: "client", text: "Hola, necesito información sobre Botox 100U", time: "14:23" },
    { sender: "ai", text: "¡Hola María! Tenemos disponible Botox 100U. ¿Es para uso clínico? ¿Cuántas unidades necesitas?", time: "14:24" },
    { sender: "client", text: "Sí, para mi clínica. Necesito 10 unidades para empezar", time: "14:25" },
    { sender: "ai", text: "Perfecto. El precio por unidad es $XXX. Para 10 unidades serían $X,XXX. ¿Necesitas factura?", time: "14:26" },
    { sender: "client", text: "Sí, con factura. ¿Cuál es el tiempo de entrega?", time: "14:28" },
    { sender: "ai", text: "Con factura, el envío es en 24-48 horas a CDMX. ¿Confirmo tu pedido?", time: "14:29" },
    { sender: "client", text: "Perfecto, ¿cuándo podríamos recibir el pedido?", time: "14:32" },
  ];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <div className="h-full min-w-0 flex">
      {/* Conversations List */}
      <div className="w-[23rem] bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 px-4 bg-slate-100 border-b border-slate-200 flex items-center">
          <p className="text-base text-slate-700">Conversaciones</p>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar o iniciar un chat"
              className="pl-9 rounded-full bg-slate-50 border-slate-200"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
              <Sparkles className="w-4 h-4 mr-1.5" />
              Alta prioridad
            </Button>
            <Button size="sm" variant="outline">
              <Filter className="w-4 h-4 mr-1.5" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv, idx) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(idx)}
              className={`px-4 py-3 border-b border-slate-200 cursor-pointer transition-colors ${
                selectedConversation === idx ? "bg-blue-50" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex gap-3">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-semibold">
                    {getInitials(conv.name)}
                  </div>
                  {conv.unread && (
                    <div className="absolute -right-0.5 bottom-0.5 w-3 h-3 bg-green-600 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-medium text-slate-900 truncate">{conv.name}</h3>
                      <p className="text-xs text-slate-600 truncate">{conv.company}</p>
                    </div>
                    <span className={`text-xs shrink-0 ${conv.unread ? "text-green-700 font-medium" : "text-slate-500"}`}>
                      {conv.time}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-2 mb-1.5">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {conv.score}
                    </Badge>
                    <Badge variant={conv.urgency === "Alta" ? "destructive" : "secondary"}>
                      {conv.urgency}
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-700 line-clamp-1">{conv.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 min-w-0 flex flex-col border-r border-slate-200">
        {/* Chat Header */}
        <div className="h-16 px-4 bg-blue-600 border-b border-blue-700 flex items-center justify-between text-white">
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/15 shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-9 h-9 rounded-full bg-white/25 text-white flex items-center justify-center text-sm font-semibold shrink-0">
              {getInitials(currentConv.name)}
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-white truncate">{currentConv.name}</h2>
              <p className="text-[11px] text-white/85 truncate">{currentConv.company} • en línea</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/15">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/15">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/15">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <Button asChild size="sm" className="ml-2 bg-white text-blue-700 hover:bg-white/90">
              <Link to={`/conversations/${currentConv.id}`}>
                Ver detalle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="relative flex-1 overflow-y-auto bg-[#ebe5dc]">
          <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(#d7d1c7_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
          <div className="relative p-4 md:p-6">
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="w-fit mx-auto px-3 py-1 rounded-md bg-blue-100/80 shadow-sm text-[11px] uppercase tracking-wide text-blue-700">
                Today
              </div>
              {messages.map((msg, idx) => {
                const isOutgoing = msg.sender === "ai";
                return (
                  <div key={idx} className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`relative max-w-[75%] px-3.5 py-2.5 rounded-md shadow-sm ${
                        isOutgoing
                          ? "bg-[#d6f8c8] text-slate-900 rounded-tr-sm"
                          : "bg-white text-slate-900 rounded-tl-sm"
                      }`}
                    >
                      {!isOutgoing && (
                        <p className="text-[11px] font-semibold text-blue-600 mb-0.5">{currentConv.name}</p>
                      )}
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <div className="mt-1 flex items-center justify-end gap-1">
                        <span className="text-[11px] text-slate-500">{msg.time}</span>
                        {isOutgoing && <CheckCheck className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="bg-[#f0ede8] border-t border-slate-300 px-3 py-2.5">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-600 hover:bg-transparent">
              <Smile className="w-5 h-5" />
            </Button>
            <div className="flex-1 h-10 rounded-full bg-white border border-slate-300 px-4 flex items-center gap-2">
              <Input
                type="text"
                placeholder="Type a message"
                className="h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0 text-sm"
              />
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:bg-transparent">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:bg-transparent">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <Button size="icon" className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700">
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* AI Intelligence Panel */}
      <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto hidden xl:block">
        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-900">Inteligencia Comercial</h3>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* AI Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Resumen IA
              </h4>
              <p className="text-sm text-slate-700">
                {currentConv.aiSummary}
              </p>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Métricas Clave</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Lead Score IA</span>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  {currentConv.score}/100
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Intención Detectada</span>
                <span className="text-sm font-medium text-green-700">{currentConv.detectedIntent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Probabilidad Cierre</span>
                <span className="text-sm font-semibold text-green-700">{currentConv.closeProbability}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Producto Consultado</span>
                <span className="text-sm font-medium text-slate-900">{currentConv.product}</span>
              </div>
            </div>
          </div>

          {/* Next Best Action */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-green-600" />
                Next Best Action
              </h4>
              <p className="text-sm text-slate-700 mb-3">
                {currentConv.nextBestAction}
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {currentConv.nextBestActionLabel}
              </Button>
            </CardContent>
          </Card>

          {/* Recommended Reply */}
          <div>
            <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              Respuesta Sugerida
            </h4>
            <Card>
              <CardContent className="p-3 text-sm text-slate-700">
                {`"${currentConv.suggestedReply}"`}
              </CardContent>
            </Card>
            <div className="mt-2 flex gap-2">
              <Button className="flex-1">
                Usar sugerencia
              </Button>
              <Button variant="outline">
                Editar
              </Button>
            </div>
          </div>

          {/* Missing Data */}
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Datos Faltantes</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-slate-700">Producto identificado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-slate-700">Cantidad especificada</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-slate-700">Receta médica pendiente</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-slate-700">Datos de facturación</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Acciones Rápidas</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Solicitar receta médica
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="w-4 h-4 mr-2" />
                Solicitar datos fiscales
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Derivar a backoffice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
