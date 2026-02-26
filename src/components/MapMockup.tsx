import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

const hospitals = [
  { x: 35, y: 30, name: "City General" },
  { x: 60, y: 55, name: "St. Mary's" },
  { x: 25, y: 70, name: "Metro Emergency" },
  { x: 75, y: 35, name: "University Hospital" },
];

const MapMockup = () => {
  return (
    <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-primary/5 border border-border">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-primary/20" style={{ top: `${(i + 1) * 12.5}%` }} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-primary/20" style={{ left: `${(i + 1) * 12.5}%` }} />
        ))}
      </div>

      {/* Roads */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-primary/15" />
      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary/15" />
      <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-primary/10" />
      <div className="absolute left-0 right-0 top-1/3 h-0.5 bg-primary/10" />

      {/* User Location */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute z-10"
        style={{ left: "48%", top: "48%" }}
      >
        <div className="w-4 h-4 bg-primary rounded-full border-2 border-primary-foreground shadow-lg" />
        <div className="absolute -inset-2 bg-primary/20 rounded-full" />
      </motion.div>

      {/* Hospital Pins */}
      {hospitals.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="absolute flex flex-col items-center"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
        >
          <MapPin className="w-5 h-5 text-emergency fill-emergency/30 -mb-0.5" />
          <span className="text-[9px] font-semibold text-foreground bg-card/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
            {h.name}
          </span>
        </motion.div>
      ))}

      {/* Label */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-card/90 rounded-lg px-2.5 py-1.5 shadow-sm">
        <Navigation className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-semibold text-foreground">Live Tracking</span>
        <span className="w-1.5 h-1.5 bg-success rounded-full" />
      </div>
    </div>
  );
};

export default MapMockup;
