import { useState } from "react";
import {
  Search,
  Filter,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Send,
  FileText,
  Building2,
  ShoppingCart,
  Zap,
  Target
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
      product: "Botox 100U"
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
      product: "Ácido Hialurónico"
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
      product: "Relleno Dérmico"
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
      product: "Mesoterapia"
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

  return (
    <div className="h-full flex">
      {/* Conversations List */}
      <div className="w-96 bg-white border-r border-slate-200 flex flex-col">
        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar conversaciones..."
              className="pl-9"
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
              className={`p-4 border-b border-slate-200 cursor-pointer transition-colors ${
                selectedConversation === idx ? "bg-blue-50" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-slate-900">{conv.name}</h3>
                  <p className="text-xs text-slate-600">{conv.company}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-slate-500">{conv.time}</span>
                  {conv.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {conv.score}
                </Badge>
                <Badge variant={conv.urgency === "Alta" ? "destructive" : "secondary"}>
                  {conv.urgency}
                </Badge>
              </div>

              <p className="text-sm text-slate-700 mb-2 line-clamp-1">{conv.lastMessage}</p>

              <div className="flex flex-wrap gap-1">
                {conv.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Chat Header */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">{currentConv.name}</h2>
              <p className="text-sm text-slate-600">{currentConv.company}</p>
            </div>
            <Button asChild>
              <Link to={`/conversations/${currentConv.id}`}>
                Ver detalle completo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md ${
                msg.sender === "client"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-900 border border-slate-200"
              } rounded-lg px-4 py-2.5`}>
                <p className="text-sm">{msg.text}</p>
                <span className={`text-xs mt-1 block ${
                  msg.sender === "client" ? "text-blue-100" : "text-slate-500"
                }`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-slate-200 p-4">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1"
            />
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        </div>
      </div>

      {/* AI Intelligence Panel */}
      <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto">
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
                Lead calificado con alta intención de compra. Cliente conoce el producto,
                solicita cantidades específicas y muestra urgencia. Listo para cierre.
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
                  92/100
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Intención Detectada</span>
                <span className="text-sm font-medium text-green-700">Alta compra</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Probabilidad Cierre</span>
                <span className="text-sm font-semibold text-green-700">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Producto Consultado</span>
                <span className="text-sm font-medium text-slate-900">Botox 100U</span>
              </div>
            </div>
          </div>

          {/* Next Best Action */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-green-600" />
                Próxima Mejor Acción
              </h4>
              <p className="text-sm text-slate-700 mb-3">
                Enviar cotización formal con condiciones de pago y tiempos de entrega específicos.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Generar cotización
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
                "¡Perfecto María! El pedido de 10 unidades de Botox 100U estaría llegando
                entre mañana y pasado mañana. Te envío la cotización formal con los detalles
                de pago y facturación. ¿Confirmo tu pedido?"
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
