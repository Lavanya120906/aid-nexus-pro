import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bed, Activity, Users, AlertTriangle, TrendingUp, Clock,
  ChevronRight, Bell, LogOut, Heart, Settings, BarChart3,
  CheckCircle, XCircle, Minus, Plus, Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const initialBeds = { general: 45, icu: 8, emergency: 12, pediatric: 6 };
const incomingRequests = [
  { id: 1, patient: "Jane Smith", type: "Cardiac Emergency", eta: "3 min", severity: "Critical", time: "12:34 PM" },
  { id: 2, patient: "Mike Johnson", type: "Trauma", eta: "7 min", severity: "High", time: "12:31 PM" },
  { id: 3, patient: "Sarah Lee", type: "Respiratory", eta: "12 min", severity: "Medium", time: "12:28 PM" },
];

const AdminDashboard = () => {
  const [beds, setBeds] = useState(initialBeds);
  const [activeTab, setActiveTab] = useState<"overview" | "beds" | "requests">("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateBed = (type: keyof typeof beds, delta: number) => {
    setBeds((prev) => ({ ...prev, [type]: Math.max(0, prev[type] + delta) }));
    toast({ title: "Availability updated", description: `${type} beds updated.` });
  };

  const acceptRequest = (id: number) => {
    toast({ title: "Request accepted", description: `Emergency request #${id} accepted. Preparing bay.` });
  };

  const totalBeds = Object.values(beds).reduce((a, b) => a + b, 0);

  const stats = [
    { label: "Total Beds", value: totalBeds, icon: Bed, color: "text-primary" },
    { label: "ICU Available", value: beds.icu, icon: Activity, color: "text-emergency" },
    { label: "Today's Requests", value: 24, icon: AlertTriangle, color: "text-warning" },
    { label: "Avg Response", value: "4.2m", icon: Clock, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">City General Hospital</p>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emergency rounded-full" />
            </button>
            <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <LogOut className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex bg-muted rounded-xl p-1 mb-6">
          {(["overview", "beds", "requests"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all capitalize ${
                activeTab === tab ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card rounded-2xl border border-border p-4 card-hover">
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Analytics Chart Mockup */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Emergency Requests (7 Days)
                </h3>
              </div>
              <div className="flex items-end justify-between h-40 gap-2">
                {[18, 24, 15, 32, 28, 22, 24].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(val / 35) * 100}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="w-full bg-primary/20 rounded-lg relative overflow-hidden"
                    >
                      <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-lg" style={{ height: "100%" }} />
                    </motion.div>
                    <span className="text-[10px] text-muted-foreground">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Requests Preview */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-bold text-foreground mb-3">Recent Incoming</h3>
              <div className="space-y-2">
                {incomingRequests.slice(0, 2).map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{req.patient}</p>
                      <p className="text-xs text-muted-foreground">{req.type} · ETA {req.eta}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      req.severity === "Critical" ? "bg-emergency/10 text-emergency" :
                      req.severity === "High" ? "bg-warning/10 text-warning" :
                      "bg-info/10 text-info"
                    }`}>
                      {req.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Beds Tab */}
        {activeTab === "beds" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {(Object.keys(beds) as (keyof typeof beds)[]).map((type) => (
              <div key={type} className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground capitalize">{type} Beds</p>
                  <p className="text-sm text-muted-foreground">
                    {beds[type]} available
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateBed(type, -1)}
                    className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-accent transition-colors"
                  >
                    <Minus className="w-4 h-4 text-foreground" />
                  </button>
                  <span className="text-xl font-bold text-foreground w-8 text-center">{beds[type]}</span>
                  <button
                    onClick={() => updateBed(type, 1)}
                    className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-primary-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {incomingRequests.map((req) => (
              <div key={req.id} className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-foreground">{req.patient}</p>
                    <p className="text-sm text-muted-foreground">{req.type}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    req.severity === "Critical" ? "bg-emergency/10 text-emergency" :
                    req.severity === "High" ? "bg-warning/10 text-warning" :
                    "bg-info/10 text-info"
                  }`}>
                    {req.severity}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ETA: {req.eta}</span>
                  <span>{req.time}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => acceptRequest(req.id)} className="flex-1 gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Accept
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <XCircle className="w-4 h-4" /> Decline
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
