import { useState } from "react";
import { motion } from "framer-motion";
import { 
  AlertTriangle, MapPin, Navigation, Phone, User, Bed, Activity,
  Clock, Star, ChevronRight, Bell, Menu, LogOut, Heart, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import EmergencyConfirmDialog from "@/components/EmergencyConfirmDialog";
import HospitalCard from "@/components/HospitalCard";
import MapMockup from "@/components/MapMockup";

const hospitals = [
  { id: 1, name: "City General Hospital", distance: "1.2 km", eta: "4 min", beds: 12, icu: 3, rating: 4.8, specialties: ["Trauma", "Cardiology"], aiScore: 95 },
  { id: 2, name: "St. Mary's Medical Center", distance: "2.8 km", eta: "8 min", beds: 5, icu: 1, rating: 4.6, specialties: ["Neurology", "Orthopedics"], aiScore: 87 },
  { id: 3, name: "Metro Emergency Care", distance: "3.5 km", eta: "11 min", beds: 20, icu: 6, rating: 4.9, specialties: ["Emergency", "Pediatrics"], aiScore: 82 },
  { id: 4, name: "University Hospital", distance: "5.1 km", eta: "15 min", beds: 8, icu: 2, rating: 4.7, specialties: ["Trauma", "Burns"], aiScore: 75 },
];

const UserDashboard = () => {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmergencyConfirm = () => {
    setEmergencyOpen(false);
    toast({
      title: "🚨 Emergency Alert Sent!",
      description: "Nearest hospital notified. Ambulance dispatched. ETA: 4 minutes.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">MedAssist AI</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emergency rounded-full" />
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-foreground/50"
          onClick={() => setMenuOpen(false)}
        >
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="w-72 h-full bg-card border-r border-border p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">Blood: O+ | Age: 28</p>
              </div>
            </div>
            <nav className="space-y-2">
              {[
                { label: "My Profile", icon: User },
                { label: "Emergency Contacts", icon: Phone },
                { label: "Medical History", icon: Activity },
              ].map(({ label, icon: Icon }) => (
                <button key={label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  {label}
                </button>
              ))}
            </nav>
            <button
              onClick={() => { setMenuOpen(false); navigate("/"); }}
              className="absolute bottom-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </motion.div>
        </motion.div>
      )}

      <main className="max-w-lg mx-auto px-4 pb-32">
        {/* Profile Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-card rounded-2xl border border-border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Good morning,</p>
              <p className="text-lg font-bold text-foreground">John Doe</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-primary/10 text-accent-foreground rounded-full font-semibold">O+</span>
              <span className="px-2.5 py-1 bg-muted text-muted-foreground rounded-full font-medium">Age 28</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>GPS Active — 40.7128° N, 74.0060° W</span>
            <span className="w-1.5 h-1.5 bg-success rounded-full ml-1" />
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4"
        >
          <MapMockup />
        </motion.div>

        {/* AI Recommendation Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">AI Recommended</h2>
          </div>
          <span className="text-xs text-muted-foreground">Based on distance & availability</span>
        </motion.div>

        {/* Hospital Cards */}
        <div className="mt-3 space-y-3">
          {hospitals.map((hospital, i) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
            >
              <HospitalCard hospital={hospital} isTop={i === 0} />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Emergency FAB */}
      <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setEmergencyOpen(true)}
          className="emergency-pulse flex items-center gap-3 px-8 py-4 bg-emergency text-emergency-foreground rounded-full font-bold text-lg shadow-2xl"
        >
          <AlertTriangle className="w-6 h-6" />
          EMERGENCY SOS
        </motion.button>
      </div>

      <EmergencyConfirmDialog
        open={emergencyOpen}
        onOpenChange={setEmergencyOpen}
        onConfirm={handleEmergencyConfirm}
      />
    </div>
  );
};

export default UserDashboard;
