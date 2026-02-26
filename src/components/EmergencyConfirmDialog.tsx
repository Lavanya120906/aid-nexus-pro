import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Phone } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const EmergencyConfirmDialog = ({ open, onOpenChange, onConfirm }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm mx-auto">
        <AlertDialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-emergency/10 flex items-center justify-center mb-2">
            <AlertTriangle className="w-8 h-8 text-emergency" />
          </div>
          <AlertDialogTitle className="text-center text-xl">Confirm Emergency Alert</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This will immediately alert the nearest hospitals and dispatch emergency services to your GPS location.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="bg-muted rounded-xl p-3 text-sm text-muted-foreground space-y-1">
          <p>• Your live location will be shared</p>
          <p>• Nearest hospital will be notified</p>
          <p>• Emergency contacts will be alerted</p>
          <p>• Medical profile will be sent to responders</p>
        </div>
        <AlertDialogFooter className="flex-col sm:flex-col gap-2">
          <AlertDialogAction
            onClick={onConfirm}
            className="w-full bg-emergency hover:bg-emergency/90 text-emergency-foreground font-bold"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            SEND EMERGENCY ALERT
          </AlertDialogAction>
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmergencyConfirmDialog;
