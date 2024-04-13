import { useEmail } from "@/hooks/use-email-mode";
import GSuiteSettings from "./gsuite/settings";
import EmailMode from "./mode/mode";
import ModelSettings from "./model/settings";

export type SettingsProps = {
  asDrawer?: boolean;
};

const SettingsForm = () => {
  return (
    <form className="grid w-full items-start gap-6">
      <EmailMode />
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
      </fieldset>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">G Suite</legend>
      </fieldset>
    </form>
  );
};

export default function Settings({ asDrawer }: SettingsProps) {
  if (asDrawer) {
    return (
      <div className="relative flex-col items-start gap-8">
        <SettingsForm />
      </div>
    );
  }
  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <SettingsForm />
    </div>
  );
}
