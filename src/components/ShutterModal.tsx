import { ArrowRight, Radio } from "lucide-react";
import Button from "./Button";
import Dialog from "./Dialog";

type ShutterModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ShutterModal({ open, onClose }: ShutterModalProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Channel open" panelClassName="shutter-panel">
        <div className="shutter-kicker">
          <div className="label-mono flex items-center gap-2 text-primary">
            <Radio size={14} aria-hidden="true" />
            Contact transmission
          </div>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            You have reached Vouken&apos;s conversation desk. Share the terrain ahead and we will help map a practical
            route through it.
          </p>
          <div className="mt-8">
            <Button type="button" onClick={onClose}>
              Open enquiry form <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
    </Dialog>
  );
}
