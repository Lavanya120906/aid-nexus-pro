import { Bed, Activity, Clock, MapPin, Star, Navigation, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Hospital {
  id: number;
  name: string;
  distance: string;
  eta: string;
  beds: number;
  icu: number;
  rating: number;
  specialties: string[];
  aiScore: number;
}

const HospitalCard = ({ hospital, isTop }: { hospital: Hospital; isTop?: boolean }) => {
  const { toast } = useToast();

  const handleNavigate = () => {
    toast({
      title: "Navigation started",
      description: `Fastest route to ${hospital.name}. ETA: ${hospital.eta}`,
    });
  };

  return (
    <div className={`bg-card rounded-2xl border p-4 card-hover ${isTop ? "border-primary shadow-md" : "border-border"}`}>
      {isTop && (
        <div className="flex items-center gap-1.5 mb-2">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold text-primary">AI Top Pick</span>
          <span className="ml-auto text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {hospital.aiScore}% match
          </span>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-sm">{hospital.name}</h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{hospital.distance}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{hospital.eta}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" />{hospital.rating}</span>
          </div>
        </div>
        {!isTop && (
          <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {hospital.aiScore}%
          </span>
        )}
      </div>

      {/* Availability */}
      <div className="flex gap-2 mt-3">
        <div className="flex-1 bg-success/10 rounded-xl px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <Bed className="w-3.5 h-3.5 text-success" />
            <span className="text-sm font-bold text-success">{hospital.beds}</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">Beds</p>
        </div>
        <div className={`flex-1 rounded-xl px-3 py-2 text-center ${hospital.icu > 2 ? "bg-success/10" : "bg-warning/10"}`}>
          <div className="flex items-center justify-center gap-1">
            <Activity className={`w-3.5 h-3.5 ${hospital.icu > 2 ? "text-success" : "text-warning"}`} />
            <span className={`text-sm font-bold ${hospital.icu > 2 ? "text-success" : "text-warning"}`}>{hospital.icu}</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">ICU</p>
        </div>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {hospital.specialties.map((s) => (
          <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent text-accent-foreground">{s}</span>
        ))}
      </div>

      <Button size="sm" className="w-full mt-3 gap-1.5" onClick={handleNavigate}>
        <Navigation className="w-3.5 h-3.5" />
        Navigate — {hospital.eta}
      </Button>
    </div>
  );
};

export default HospitalCard;
