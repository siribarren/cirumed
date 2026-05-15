import { useState } from "react";
import {
  Sparkles,
  Zap,
  Clock,
  CheckCircle2,
  MessageCircle,
  Bot,
  UserRound,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  GitBranch,
  Move,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import logoCirumed from "@/assets/logo_cirumed.png";

type FlowBlockId =
  | "trigger"
  | "cirumedNode"
  | "clientInteraction"
  | "router"
  | "priceStock"
  | "delivery"
  | "certifications"
  | "humanHandoff";

const MOVE_STEP = 12;

const FLOW_BLOCK_OPTIONS: Array<{ id: FlowBlockId; label: string }> = [
  { id: "trigger", label: "Trigger: Nuevo mensaje entrante" },
  { id: "cirumedNode", label: "Nodo Cirumed: Primera respuesta automática" },
  { id: "clientInteraction", label: "Interacción cliente" },
  { id: "router", label: "Nodo de decisión: Router de intención" },
  { id: "priceStock", label: "Rama: Precios y stock" },
  { id: "delivery", label: "Rama: Tiempos de entrega" },
  { id: "certifications", label: "Rama: Certificaciones y fichas" },
  { id: "humanHandoff", label: "Rama: Escalamiento humano" },
];

const INITIAL_BLOCK_OFFSETS: Record<FlowBlockId, { x: number; y: number }> = {
  trigger: { x: 0, y: 0 },
  cirumedNode: { x: 0, y: 0 },
  clientInteraction: { x: 0, y: 0 },
  router: { x: 0, y: 0 },
  priceStock: { x: 0, y: 0 },
  delivery: { x: 0, y: 0 },
  certifications: { x: 0, y: 0 },
  humanHandoff: { x: 0, y: 0 },
};

export function Automations() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFlowEditMode, setIsFlowEditMode] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<FlowBlockId>("trigger");
  const [blockOffsets, setBlockOffsets] = useState<Record<FlowBlockId, { x: number; y: number }>>(INITIAL_BLOCK_OFFSETS);

  const moveSelectedBlock = (dx: number, dy: number) => {
    setBlockOffsets((previousOffsets) => {
      const current = previousOffsets[selectedBlock];
      return {
        ...previousOffsets,
        [selectedBlock]: {
          x: current.x + dx,
          y: current.y + dy,
        },
      };
    });
  };

  const resetFlowLayout = () => {
    setBlockOffsets(INITIAL_BLOCK_OFFSETS);
    setSelectedBlock("trigger");
  };

  const getBlockStyle = (blockId: FlowBlockId) => {
    const { x, y } = blockOffsets[blockId];
    return { transform: `translate(${x}px, ${y}px)` };
  };

  const getBlockClasses = (blockId: FlowBlockId, baseClasses: string) => {
    const isSelected = isFlowEditMode && selectedBlock === blockId;
    return `${baseClasses} transition-transform duration-150 ${isFlowEditMode ? "cursor-pointer" : ""} ${
      isSelected ? "ring-2 ring-blue-300 border-blue-300" : ""
    }`;
  };

  const flows = [
    {
      name: "Primera respuesta a primer mensaje",
      trigger: "Primer contacto entrante por WhatsApp",
      status: "Activo",
      runs: 52,
      showDetail: true,
    },
    { name: "Seguimiento post-cotizacion", trigger: "Sin respuesta 24h", status: "Activo", runs: 38, showDetail: false },
    { name: "Solicitud de documentos", trigger: "Lead calificado", status: "Activo", runs: 21 },
    { name: "Reactivacion de cartera", trigger: "Inactividad 30 dias", status: "En revision", runs: 7 },
  ];

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Automatizaciones</h1>
            <p className="mt-1 text-slate-600">Flujos comerciales automáticos para acelerar conversiones</p>
          </div>
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            Nueva automatización
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">Flujos activos</p>
              <p className="text-3xl font-semibold text-slate-900 mt-1">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">Ejecuciones hoy</p>
              <p className="text-3xl font-semibold text-slate-900 mt-1">64</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">Tiempo ahorrado</p>
              <p className="text-3xl font-semibold text-green-700 mt-1">9.4h</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4 space-y-3">
            {flows.map((flow) => (
              <div key={flow.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">{flow.name}</p>
                  <p className="text-sm text-slate-600">Trigger: {flow.trigger}</p>
                </div>
                <div className="flex items-center gap-2">
                  {flow.showDetail && (
                    <Button size="sm" onClick={() => setIsDetailOpen(true)}>
                      Ver detalle
                    </Button>
                  )}
                  <Badge variant="secondary" className={flow.status === "Activo" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-blue-100 text-blue-700 hover:bg-blue-100"}>
                    {flow.status === "Activo" ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <Clock className="w-3.5 h-3.5 mr-1" />}
                    {flow.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Zap className="w-4 h-4 mr-1.5" />
                    {flow.runs} ejec.
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Dialog
          open={isDetailOpen}
          onOpenChange={(open) => {
            setIsDetailOpen(open);
            if (!open) setIsFlowEditMode(false);
          }}
        >
          <DialogContent className="p-0 sm:max-w-5xl max-h-[90vh] overflow-hidden">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200">
              <DialogTitle className="text-slate-900">Primera respuesta a primer mensaje</DialogTitle>
              <DialogDescription>
                Flujo automatizado tipo n8n para WhatsApp: Cirumed responde el primer mensaje y deriva respuestas automáticas por intención.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 py-5 space-y-4 overflow-y-auto min-w-0">
              <Card className="border-slate-200 bg-slate-50">
                <CardContent className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={logoCirumed} alt="Cirumed logo" className="w-9 h-9 object-contain rounded-md bg-white border border-slate-200 p-1" />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900">Cirumed Signal • WhatsApp Automation</p>
                      <p className="text-sm text-slate-600">Estado: Activo • SLA primera respuesta: &lt; 15 segundos</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                    <MessageCircle className="w-3.5 h-3.5 mr-1" />
                    Canal WhatsApp
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardContent className="p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-900">Editor de flujo</p>
                      <p className="text-sm text-slate-600">Selecciona una caja y muévela con controles direccionales.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={isFlowEditMode ? "default" : "outline"}
                        onClick={() => setIsFlowEditMode((previous) => !previous)}
                      >
                        <Move className="w-4 h-4 mr-1.5" />
                        {isFlowEditMode ? "Salir edición" : "Editar flujo"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={resetFlowLayout}>
                        Resetear posición
                      </Button>
                    </div>
                  </div>

                  {isFlowEditMode && (
                    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Bloque seleccionado</label>
                        <Select value={selectedBlock} onValueChange={(value) => setSelectedBlock(value as FlowBlockId)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {FLOW_BLOCK_OPTIONS.map((option) => (
                              <SelectItem key={option.id} value={option.id}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-3 gap-1 w-fit">
                        <div />
                        <Button size="icon" variant="outline" onClick={() => moveSelectedBlock(0, -MOVE_STEP)}>
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <div />
                        <Button size="icon" variant="outline" onClick={() => moveSelectedBlock(-MOVE_STEP, 0)}>
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div className="h-9 w-9 rounded-md border border-slate-200 bg-slate-50 text-[10px] text-slate-500 flex items-center justify-center">
                          {MOVE_STEP}px
                        </div>
                        <Button size="icon" variant="outline" onClick={() => moveSelectedBlock(MOVE_STEP, 0)}>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        <div />
                        <Button size="icon" variant="outline" onClick={() => moveSelectedBlock(0, MOVE_STEP)}>
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        <div />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="rounded-lg border border-slate-200 bg-white p-4 min-w-0">
                <div className="space-y-4 min-w-0">
                  <div className="grid gap-3 items-stretch lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
                    <div
                      className={getBlockClasses("trigger", "rounded-lg border border-slate-200 bg-slate-50 p-3 min-w-0")}
                      style={getBlockStyle("trigger")}
                      onClick={() => isFlowEditMode && setSelectedBlock("trigger")}
                    >
                      <p className="text-xs text-slate-500 mb-2">Trigger</p>
                      <div className="flex items-start gap-2">
                        <MessageCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Nuevo mensaje entrante</p>
                          <p className="text-xs text-slate-600">Cliente escribe por primera vez al WhatsApp comercial.</p>
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />
                    </div>

                    <div
                      className={getBlockClasses("cirumedNode", "rounded-lg border border-blue-200 bg-blue-50 p-3 min-w-0")}
                      style={getBlockStyle("cirumedNode")}
                      onClick={() => isFlowEditMode && setSelectedBlock("cirumedNode")}
                    >
                      <p className="text-xs text-blue-700 mb-2">Nodo Cirumed</p>
                      <div className="flex items-start gap-2">
                        <img src={logoCirumed} alt="Cirumed logo" className="w-5 h-5 object-contain rounded-sm bg-white border border-blue-200 p-0.5 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Primera respuesta automática</p>
                          <p className="text-xs text-slate-700">"Hola, soy Cirumed. Te ayudo con precios, stock, entrega o soporte clínico."</p>
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />
                    </div>

                    <div
                      className={getBlockClasses("clientInteraction", "rounded-lg border border-slate-200 bg-slate-50 p-3 min-w-0")}
                      style={getBlockStyle("clientInteraction")}
                      onClick={() => isFlowEditMode && setSelectedBlock("clientInteraction")}
                    >
                      <p className="text-xs text-slate-500 mb-2">Interacción cliente</p>
                      <div className="flex items-start gap-2">
                        <UserRound className="w-4 h-4 text-slate-700 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Cliente responde consulta</p>
                          <p className="text-xs text-slate-600">El sistema detecta intención del primer mensaje.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-px bg-slate-300 mx-auto" />
                    <div className="flex justify-center">
                      <div
                        className={getBlockClasses("router", "w-full max-w-md rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2.5")}
                        style={getBlockStyle("router")}
                        onClick={() => isFlowEditMode && setSelectedBlock("router")}
                      >
                        <p className="text-[11px] text-indigo-700 mb-1">Nodo de decisión</p>
                        <div className="flex items-start gap-2">
                          <GitBranch className="w-3.5 h-3.5 text-indigo-700 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-indigo-800">Router de intención automática</p>
                            <p className="text-xs text-indigo-700/90">
                              Clasifica la consulta del cliente y deriva la respuesta WhatsApp.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pt-8">
                    <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-slate-300" />
                    <div className="absolute left-1/4 right-1/4 top-3 h-px bg-slate-300" />
                    <div className="absolute left-1/4 top-3 h-4 w-px -translate-x-1/2 bg-slate-300" />
                    <div className="absolute left-3/4 top-3 h-4 w-px -translate-x-1/2 bg-slate-300" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6">
                      <div className="space-y-3">
                        <div
                          className={getBlockClasses("priceStock", "rounded-lg border border-slate-200 p-3")}
                          style={getBlockStyle("priceStock")}
                          onClick={() => isFlowEditMode && setSelectedBlock("priceStock")}
                        >
                          <p className="text-xs text-slate-500">Si consulta precios o stock</p>
                          <div className="mt-2 flex items-start gap-2">
                            <Bot className="w-4 h-4 text-green-600 mt-0.5" />
                            <p className="text-sm text-slate-700">
                              Respuesta automática con lista de productos, disponibilidad y CTA para cotización inmediata.
                            </p>
                          </div>
                        </div>

                        <div className="h-3 w-px bg-slate-300 mx-auto" />

                        <div
                          className={getBlockClasses("certifications", "rounded-lg border border-slate-200 p-3")}
                          style={getBlockStyle("certifications")}
                          onClick={() => isFlowEditMode && setSelectedBlock("certifications")}
                        >
                          <p className="text-xs text-slate-500">Si consulta certificaciones o fichas</p>
                          <div className="mt-2 flex items-start gap-2">
                            <Bot className="w-4 h-4 text-green-600 mt-0.5" />
                            <p className="text-sm text-slate-700">
                              Envío automático de documentación validada y enlace de soporte técnico.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div
                          className={getBlockClasses("delivery", "rounded-lg border border-slate-200 p-3")}
                          style={getBlockStyle("delivery")}
                          onClick={() => isFlowEditMode && setSelectedBlock("delivery")}
                        >
                          <p className="text-xs text-slate-500">Si consulta tiempos de entrega</p>
                          <div className="mt-2 flex items-start gap-2">
                            <Bot className="w-4 h-4 text-green-600 mt-0.5" />
                            <p className="text-sm text-slate-700">
                              Respuesta con SLA por región, ventana logística y opción de derivar a ejecutivo.
                            </p>
                          </div>
                        </div>

                        <div className="h-3 w-px bg-slate-300 mx-auto" />

                        <div
                          className={getBlockClasses("humanHandoff", "rounded-lg border border-slate-200 p-3")}
                          style={getBlockStyle("humanHandoff")}
                          onClick={() => isFlowEditMode && setSelectedBlock("humanHandoff")}
                        >
                          <p className="text-xs text-slate-500">Si pide hablar con humano</p>
                          <div className="mt-2 flex items-start gap-2">
                            <Bot className="w-4 h-4 text-green-600 mt-0.5" />
                            <p className="text-sm text-slate-700">
                              Escalamiento automático al ejecutivo comercial con contexto completo de la conversación.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
