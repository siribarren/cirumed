import { useEffect, useMemo, useState } from "react";
import {
  Target,
  TrendingUp,
  Calendar as CalendarIcon,
  Sparkles,
  MessageCircle,
  Users,
  Send,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  CalendarClock,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Calendar as DateCalendar } from "./ui/calendar";
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
import campaignSeedJson from "@/app/data/whatsappCampaignSeed.json";

type ClientRecord = {
  id: string;
  name: string;
  clinic: string;
  phone: string;
  city: string;
  productInterest: string;
};

type SegmentRecord = {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  clientIds: string[];
};

type TemplateRecord = {
  id: string;
  name: string;
  objective: string;
  body: string;
};

type CampaignSeed = {
  clients: ClientRecord[];
  segments: SegmentRecord[];
  templates: TemplateRecord[];
};

type CampaignStatus = "Activa" | "Programada";

type CampaignRecord = {
  name: string;
  audience: string;
  conversion: number;
  status: CampaignStatus;
  scheduledAt?: string;
};

type ScheduledPreviewRecord = {
  name: string;
  scheduledAt: string;
  isDraft: boolean;
};

type SimulationStatus = "idle" | "running" | "completed";
type SendMode = "immediate" | "scheduled";

const campaignSeed = campaignSeedJson as CampaignSeed;

const initialCampaigns: CampaignRecord[] = [
  { name: "Follow-up Botox Q2", audience: "Leads tibios", conversion: 31, status: "Activa" },
  { name: "Cross-sell Acido Hialuronico", audience: "Clientes Botox", conversion: 27, status: "Activa" },
  {
    name: "Reactivacion cartera inactiva",
    audience: "Base 60+ dias",
    conversion: 18,
    status: "Programada",
    scheduledAt: "2026-05-20T10:30",
  },
  { name: "Nuevos paquetes mesoterapia", audience: "Nuevos leads", conversion: 22, status: "Activa" },
  {
    name: "Campana fidelizacion estacional",
    audience: "Clientes recurrentes",
    conversion: 20,
    status: "Programada",
    scheduledAt: "2026-05-23T09:00",
  },
];

const flowSteps: Array<{ id: 1 | 2 | 3; label: string }> = [
  { id: 1, label: "Segmentacion" },
  { id: 2, label: "Mensaje" },
  { id: 3, label: "Simulacion" },
];

const interpolateTemplate = (template: string, client?: ClientRecord) => {
  if (!client) return template;
  const firstName = client.name.split(" ")[0] ?? client.name;
  return template
    .replaceAll("{{nombre}}", firstName)
    .replaceAll("{{clinica}}", client.clinic)
    .replaceAll("{{ciudad}}", client.city)
    .replaceAll("{{producto_interes}}", client.productInterest);
};

const toDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getDefaultScheduleAt = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(10, 0, 0, 0);
  return toDateInputValue(date);
};

const formatScheduleDate = (value?: string) => {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const toDayOnly = (value: string) => {
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export function Campaigns() {
  const defaultSegment = campaignSeed.segments[0];
  const defaultTemplate = campaignSeed.templates[0];

  const [campaigns, setCampaigns] = useState<CampaignRecord[]>(initialCampaigns);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCreateFlowOpen, setIsCreateFlowOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [campaignName, setCampaignName] = useState(`WhatsApp ${defaultSegment?.name ?? "Nueva campana"}`);
  const [segmentId, setSegmentId] = useState(defaultSegment?.id ?? "");
  const [templateId, setTemplateId] = useState(defaultTemplate?.id ?? "");
  const [messageDraft, setMessageDraft] = useState(defaultTemplate?.body ?? "");
  const [sendMode, setSendMode] = useState<SendMode>("immediate");
  const [scheduledAt, setScheduledAt] = useState(getDefaultScheduleAt());
  const [simulationStatus, setSimulationStatus] = useState<SimulationStatus>("idle");
  const [sentCount, setSentCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [responseCount, setResponseCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  const selectedSegment = useMemo(
    () => campaignSeed.segments.find((segment) => segment.id === segmentId) ?? null,
    [segmentId],
  );

  const selectedTemplate = useMemo(
    () => campaignSeed.templates.find((template) => template.id === templateId) ?? null,
    [templateId],
  );

  const scheduledCampaigns = useMemo(
    () =>
      campaigns
        .filter((campaign) => campaign.status === "Programada" && campaign.scheduledAt)
        .sort((a, b) => new Date(a.scheduledAt ?? "").getTime() - new Date(b.scheduledAt ?? "").getTime()),
    [campaigns],
  );

  const scheduledPreviewCampaigns = useMemo(() => {
    const existing: ScheduledPreviewRecord[] = scheduledCampaigns.map((campaign) => ({
      name: campaign.name,
      scheduledAt: campaign.scheduledAt!,
      isDraft: false,
    }));

    if (sendMode === "scheduled" && scheduledAt) {
      existing.push({
        name: campaignName.trim() || "Nueva campaña (borrador)",
        scheduledAt,
        isDraft: true,
      });
    }

    return existing.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }, [campaignName, scheduledAt, scheduledCampaigns, sendMode]);

  const scheduledCalendarDates = useMemo(
    () => scheduledPreviewCampaigns.map((campaign) => toDayOnly(campaign.scheduledAt)),
    [scheduledPreviewCampaigns],
  );
  const scheduledOnlyCalendarDates = useMemo(
    () => scheduledCampaigns.map((campaign) => toDayOnly(campaign.scheduledAt!)),
    [scheduledCampaigns],
  );

  const segmentClients = useMemo(() => {
    if (!selectedSegment) return [];
    const segmentClientIds = new Set(selectedSegment.clientIds);
    return campaignSeed.clients.filter((client) => segmentClientIds.has(client.id));
  }, [selectedSegment]);

  const previewClient = segmentClients[0];
  const previewMessage = useMemo(
    () => interpolateTemplate(messageDraft, previewClient),
    [messageDraft, previewClient],
  );

  const activeCampaigns = campaigns.filter((campaign) => campaign.status === "Activa").length;
  const scheduledCount = campaigns.filter((campaign) => campaign.status === "Programada").length;
  const averageConversion =
    campaigns.length === 0 ? 0 : Math.round(campaigns.reduce((sum, campaign) => sum + campaign.conversion, 0) / campaigns.length);
  const estimatedRoi = (averageConversion / 6.5).toFixed(1);
  const progressValue = segmentClients.length > 0 ? Math.round((sentCount / segmentClients.length) * 100) : 0;

  const resetFlow = () => {
    const firstSegment = campaignSeed.segments[0];
    const firstTemplate = campaignSeed.templates[0];

    setStep(1);
    setCampaignName(`WhatsApp ${firstSegment?.name ?? "Nueva campana"}`);
    setSegmentId(firstSegment?.id ?? "");
    setTemplateId(firstTemplate?.id ?? "");
    setMessageDraft(firstTemplate?.body ?? "");
    setSendMode("immediate");
    setScheduledAt(getDefaultScheduleAt());
    setSimulationStatus("idle");
    setSentCount(0);
    setDeliveredCount(0);
    setReadCount(0);
    setResponseCount(0);
    setFailedCount(0);
  };

  const openFlow = () => {
    resetFlow();
    setIsCreateFlowOpen(true);
  };

  const handleTemplateChange = (value: string) => {
    setTemplateId(value);
    const template = campaignSeed.templates.find((item) => item.id === value);
    if (template) {
      setMessageDraft(template.body);
    }
  };

  const startSimulation = () => {
    if (!segmentClients.length) return;
    setSimulationStatus("running");
    setSentCount(0);
    setDeliveredCount(0);
    setReadCount(0);
    setResponseCount(0);
    setFailedCount(0);
  };

  const saveCampaign = () => {
    if (!selectedSegment) return;

    const normalizedName = campaignName.trim() || `WhatsApp ${selectedSegment.name}`;
    const conversion = segmentClients.length
      ? Math.max(8, Math.round((responseCount / segmentClients.length) * 100))
      : 0;
    const isScheduled = sendMode === "scheduled";

    setCampaigns((previousCampaigns) => [
      {
        name: normalizedName,
        audience: selectedSegment.name,
        conversion,
        status: isScheduled ? "Programada" : "Activa",
        scheduledAt: isScheduled ? scheduledAt : undefined,
      },
      ...previousCampaigns,
    ]);

    setIsCreateFlowOpen(false);
    resetFlow();
  };

  useEffect(() => {
    if (simulationStatus !== "running") return;

    const totalClients = segmentClients.length;
    if (!totalClients) {
      setSimulationStatus("completed");
      return;
    }

    let localSent = 0;
    const stepSize = Math.max(1, Math.ceil(totalClients / 8));

    const intervalId = window.setInterval(() => {
      localSent = Math.min(totalClients, localSent + stepSize);
      const localDelivered = Math.round(localSent * 0.94);
      const localRead = Math.round(localSent * 0.73);
      const localResponses = Math.round(localSent * 0.31);

      setSentCount(localSent);
      setDeliveredCount(localDelivered);
      setReadCount(localRead);
      setResponseCount(localResponses);
      setFailedCount(Math.max(0, localSent - localDelivered));

      if (localSent >= totalClients) {
        window.clearInterval(intervalId);
        setSimulationStatus("completed");
      }
    }, 280);

    return () => window.clearInterval(intervalId);
  }, [segmentClients.length, simulationStatus]);

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Campañas</h1>
            <p className="mt-1 text-slate-600">Diseña, ejecuta y optimiza campañas comerciales multicanal</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsCalendarOpen(true)}>
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendario
            </Button>
            <Button onClick={openFlow}>
              <Sparkles className="w-4 h-4 mr-2" />
              Nueva campaña
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">Campañas activas</p>
              <p className="text-3xl font-semibold text-slate-900 mt-1">{activeCampaigns}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">Conversión promedio</p>
              <p className="text-3xl font-semibold text-green-700 mt-1">{averageConversion}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">Campañas programadas</p>
              <p className="text-3xl font-semibold text-blue-700 mt-1">{scheduledCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">ROI estimado WhatsApp</p>
              <p className="text-3xl font-semibold text-indigo-700 mt-1">{estimatedRoi}x</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4 space-y-3">
            {campaigns.map((campaign) => (
              <div key={campaign.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{campaign.name}</p>
                    <p className="text-sm text-slate-600">
                      {campaign.audience}
                      {campaign.status === "Programada" && campaign.scheduledAt ? ` • ${formatScheduleDate(campaign.scheduledAt)}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={campaign.status === "Activa" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-blue-100 text-blue-700 hover:bg-blue-100"}>
                    {campaign.status}
                  </Badge>
                  <div className="text-sm font-medium text-slate-900 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    {campaign.conversion}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-slate-900">
                <CalendarIcon className="w-5 h-5 text-blue-700" />
                Calendario de campañas programadas
              </DialogTitle>
              <DialogDescription>
                Fechas de ejecución de campañas en estado Programada.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
              <div className="rounded-md border border-slate-200">
                <DateCalendar mode="multiple" selected={scheduledOnlyCalendarDates} />
              </div>
              <div className="space-y-2">
                {scheduledCampaigns.length === 0 ? (
                  <p className="text-sm text-slate-500">No hay campañas programadas.</p>
                ) : (
                  scheduledCampaigns.map((campaign) => (
                    <div key={`${campaign.name}-${campaign.scheduledAt}`} className="rounded-md border border-slate-200 px-3 py-2">
                      <p className="text-sm font-medium text-slate-900">{campaign.name}</p>
                      <p className="text-xs text-slate-600">{campaign.audience}</p>
                      <p className="text-xs text-slate-500 mt-1">{formatScheduleDate(campaign.scheduledAt)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isCreateFlowOpen}
          onOpenChange={(open) => {
            setIsCreateFlowOpen(open);
            if (!open) resetFlow();
          }}
        >
          <DialogContent className="p-0 sm:max-w-4xl">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-200">
              <DialogTitle className="flex items-center gap-2 text-slate-900">
                <MessageCircle className="w-5 h-5 text-green-600" />
                Nueva campaña de WhatsApp masivo
              </DialogTitle>
              <DialogDescription>
                Flujo simulado con base de datos precargada, segmentacion comercial y mensajes predeterminados.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-3 gap-2">
                {flowSteps.map((flowStep) => (
                  <div
                    key={flowStep.id}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      flowStep.id === step
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : flowStep.id < step
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-slate-200 bg-white text-slate-500"
                    }`}
                  >
                    <p className="font-medium">
                      Paso {flowStep.id}: {flowStep.label}
                    </p>
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Nombre de campaña</label>
                      <Input
                        value={campaignName}
                        onChange={(event) => setCampaignName(event.target.value)}
                        placeholder="Ej. WhatsApp Leads Alta Intencion Mayo"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Segmento objetivo</label>
                      <Select value={segmentId} onValueChange={setSegmentId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un segmento" />
                        </SelectTrigger>
                        <SelectContent>
                          {campaignSeed.segments.map((segment) => (
                            <SelectItem key={segment.id} value={segment.id}>
                              {segment.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Card className="border-slate-200 bg-white">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-slate-900">{selectedSegment?.name ?? "Sin segmento"}</p>
                          <p className="text-sm text-slate-600 mt-1">{selectedSegment?.description}</p>
                        </div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                          <Users className="w-3.5 h-3.5 mr-1" />
                          {segmentClients.length} clientes
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedSegment?.criteria.map((criterion) => (
                          <Badge key={criterion} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            {criterion}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-700">Vista previa del grupo destinatario</p>
                        <div className="grid gap-2 md:grid-cols-2">
                          {segmentClients.slice(0, 6).map((client) => (
                            <div key={client.id} className="rounded-md border border-slate-200 px-3 py-2">
                              <p className="text-sm font-medium text-slate-900">{client.name}</p>
                              <p className="text-xs text-slate-500">{client.clinic}</p>
                              <p className="text-xs text-slate-500">{client.city}</p>
                            </div>
                          ))}
                        </div>
                        {segmentClients.length > 6 && (
                          <p className="text-xs text-slate-500">
                            +{segmentClients.length - 6} clientes adicionales en la base segmentada.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!campaignName.trim() || !selectedSegment || segmentClients.length === 0}
                    >
                      Continuar
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
                    <Card className="border-slate-200">
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Mensaje predeterminado</label>
                          <Select value={templateId} onValueChange={handleTemplateChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una plantilla" />
                            </SelectTrigger>
                            <SelectContent>
                              {campaignSeed.templates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="rounded-md border border-blue-100 bg-blue-50 p-3">
                          <p className="text-sm font-medium text-blue-700">{selectedTemplate?.name}</p>
                          <p className="text-xs text-blue-700/90 mt-1">{selectedTemplate?.objective}</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Contenido del WhatsApp</label>
                          <Textarea
                            value={messageDraft}
                            onChange={(event) => setMessageDraft(event.target.value)}
                            className="min-h-40"
                          />
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">Variables disponibles</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {["{{nombre}}", "{{clinica}}", "{{ciudad}}", "{{producto_interes}}"].map((variable) => (
                              <Badge key={variable} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                                {variable}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200 bg-[#ebe5dc]">
                      <CardContent className="p-4 space-y-3">
                        <p className="text-sm font-medium text-slate-700">Preview WhatsApp</p>
                        <div className="rounded-lg bg-white p-3 border border-slate-200 shadow-sm">
                          <p className="text-xs font-semibold text-blue-700 mb-1">
                            {previewClient?.name ?? "Cliente de muestra"}
                          </p>
                          <p className="text-sm text-slate-800 leading-relaxed">{previewMessage}</p>
                          <div className="mt-2 flex items-center justify-end gap-1 text-xs text-slate-500">
                            <span>Ahora</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                        </div>
                        <div className="rounded-md border border-slate-200 bg-white p-3">
                          <p className="text-xs text-slate-600">Canal</p>
                          <p className="text-sm font-medium text-slate-900">WhatsApp masivo</p>
                          <p className="text-xs text-slate-500 mt-2">
                            Base precargada total: {campaignSeed.clients.length} clientes.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Volver
                    </Button>
                    <Button onClick={() => setStep(3)} disabled={!messageDraft.trim()}>
                      Revisar simulacion
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <Card className="border-slate-200">
                      <CardContent className="p-4 space-y-2">
                        <p className="text-sm text-slate-600">Campaña</p>
                        <p className="font-semibold text-slate-900">{campaignName}</p>
                        <p className="text-sm text-slate-600">Segmento: {selectedSegment?.name}</p>
                        <p className="text-sm text-slate-600">Destinatarios: {segmentClients.length}</p>
                      </CardContent>
                    </Card>
                    <Card className="border-slate-200">
                      <CardContent className="p-4 space-y-2">
                        <p className="text-sm text-slate-600">Mensaje seleccionado</p>
                        <p className="font-semibold text-slate-900">{selectedTemplate?.name}</p>
                        <p className="text-sm text-slate-600">Canal: WhatsApp</p>
                        <p className="text-sm text-slate-600">
                          Estado final: {sendMode === "scheduled" ? "Programada" : "Activa"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-slate-200">
                    <CardContent className="p-4 space-y-4">
                      <h3 className="font-medium text-slate-900 flex items-center gap-2">
                        <CalendarClock className="w-4 h-4 text-indigo-700" />
                        Programar envío
                      </h3>

                      <div className="grid gap-2 md:grid-cols-2">
                        <Button
                          type="button"
                          variant={sendMode === "immediate" ? "default" : "outline"}
                          onClick={() => setSendMode("immediate")}
                        >
                          Envío inmediato
                        </Button>
                        <Button
                          type="button"
                          variant={sendMode === "scheduled" ? "default" : "outline"}
                          onClick={() => setSendMode("scheduled")}
                        >
                          Programar envío
                        </Button>
                      </div>

                      {sendMode === "scheduled" && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Fecha y hora programada</label>
                          <Input
                            type="datetime-local"
                            value={scheduledAt}
                            onChange={(event) => setScheduledAt(event.target.value)}
                          />
                          <p className="text-xs text-slate-500">Se agendará para: {formatScheduleDate(scheduledAt)}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
                    <Card className="border-slate-200">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-slate-900 flex items-center gap-2">
                            <Send className="w-4 h-4 text-green-700" />
                            Simulación de envío por WhatsApp
                          </h3>
                          {simulationStatus === "running" && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                              <Clock3 className="w-3.5 h-3.5 mr-1" />
                              En curso
                            </Badge>
                          )}
                          {simulationStatus === "completed" && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                              Completado
                            </Badge>
                          )}
                        </div>

                        <Progress value={progressValue} />
                        <div className="text-sm text-slate-600 flex items-center justify-between">
                          <span>
                            {sentCount}/{segmentClients.length} mensajes simulados
                          </span>
                          <span>{progressValue}%</span>
                        </div>

                        {simulationStatus === "completed" ? (
                          <div className="grid gap-3 md:grid-cols-4">
                            <div className="rounded-md border border-slate-200 px-3 py-2">
                              <p className="text-xs text-slate-500">Enviados</p>
                              <p className="text-lg font-semibold text-slate-900">{sentCount}</p>
                            </div>
                            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">
                              <p className="text-xs text-green-700">Entregados</p>
                              <p className="text-lg font-semibold text-green-700">{deliveredCount}</p>
                            </div>
                            <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2">
                              <p className="text-xs text-blue-700">Leidos</p>
                              <p className="text-lg font-semibold text-blue-700">{readCount}</p>
                            </div>
                            <div className="rounded-md border border-orange-200 bg-orange-50 px-3 py-2">
                              <p className="text-xs text-orange-700">Respuestas</p>
                              <p className="text-lg font-semibold text-orange-700">{responseCount}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 flex items-center gap-2 text-sm text-slate-600">
                            <AlertTriangle className="w-4 h-4 text-slate-500" />
                            Simulación interna: no se envían mensajes reales.
                          </div>
                        )}

                        {failedCount > 0 && simulationStatus === "completed" && (
                          <p className="text-xs text-orange-700">
                            {failedCount} contactos quedaron con fallo simulado para posterior reintento.
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardContent className="p-4 space-y-4">
                        <h3 className="font-medium text-slate-900 flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-blue-700" />
                          Calendario de campañas programadas
                        </h3>

                        <div className="rounded-md border border-slate-200">
                          <DateCalendar mode="multiple" selected={scheduledCalendarDates} />
                        </div>

                        <div className="space-y-2">
                          {scheduledPreviewCampaigns.length === 0 ? (
                            <p className="text-sm text-slate-500">No hay campañas programadas por ahora.</p>
                          ) : (
                            scheduledPreviewCampaigns.slice(0, 5).map((campaign) => (
                              <div key={`${campaign.name}-${campaign.scheduledAt}-${campaign.isDraft}`} className="rounded-md border border-slate-200 px-3 py-2">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-sm font-medium text-slate-900">{campaign.name}</p>
                                  {campaign.isDraft && (
                                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                                      Borrador
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600">{formatScheduleDate(campaign.scheduledAt)}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-between gap-2">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Volver
                    </Button>
                    <div className="flex gap-2">
                      {simulationStatus !== "running" && (
                        <Button
                          variant="outline"
                          onClick={startSimulation}
                          disabled={!segmentClients.length || !messageDraft.trim()}
                        >
                          Simular envio
                        </Button>
                      )}
                      <Button
                        onClick={saveCampaign}
                        disabled={simulationStatus !== "completed" || (sendMode === "scheduled" && !scheduledAt)}
                      >
                        {sendMode === "scheduled" ? "Programar campaña" : "Guardar campaña"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
