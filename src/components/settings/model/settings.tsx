import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Rabbit } from "lucide-react";
import TrainingSettings from "../train/train";

export default function ModelSettings() {
  return (
    <>
      <Select>
        <SelectTrigger
          id="model"
          className="items-start [&_[data-description]]:hidden"
        >
          <SelectValue
            placeholder="Select a model"
            defaultValue={"gemini-pro"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gemini-pro">
            <div className="flex items-start gap-3 text-muted-foreground">
              <Rabbit className="size-5" />
              <div className="grid gap-0.5">
                <p>
                  Google{" "}/
                  <span className="font-medium text-foreground"> Gemini Pro</span>
                </p>
                <p className="text-xs" data-description>
                  Google&rsquo;s most advanced model for text generation.
                </p>
              </div>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <TrainingSettings />
    </>
  );
}
