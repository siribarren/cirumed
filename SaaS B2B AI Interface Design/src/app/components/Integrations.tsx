import { Building2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Integrations() {
  const integrations = [
    { name: "WhatsApp Business API", status: "Conectado", detail: "Sincronizacion en tiempo real" },
    { name: "HubSpot CRM", status: "Conectado", detail: "Actualizacion de pipeline cada 5 min" },
    { name: "SAP Backoffice", status: "Pendiente", detail: "Falta validacion de credenciales" },
    { name: "Meta Ads", status: "Conectado", detail: "Importacion de leads activa" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-slate-50">
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Integraciones</h1>
            <p className="mt-1 text-slate-600">Conecta canales, CRM y sistemas para un flujo comercial unificado</p>
          </div>
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            Nueva integración
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">Integraciones activas</p>
              <p className="text-3xl font-semibold text-slate-900 mt-1">9</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">Pendientes</p>
              <p className="text-3xl font-semibold text-orange-600 mt-1">2</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-slate-600">Disponibilidad</p>
              <p className="text-3xl font-semibold text-green-700 mt-1">99.9%</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4 space-y-3">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{integration.name}</p>
                    <p className="text-sm text-slate-600">{integration.detail}</p>
                  </div>
                </div>
                <Badge variant="secondary" className={integration.status === "Conectado" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}>
                  {integration.status === "Conectado" ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <AlertCircle className="w-3.5 h-3.5 mr-1" />}
                  {integration.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
