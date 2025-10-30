import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export interface Settings {
  punctuation: boolean;
  numbers: boolean;
  language: string;
  soundOnClick: boolean;
  smoothCaret: boolean;
  confidenceMode: boolean;
}

const SettingsModal = ({ open, onClose, settings, onSettingsChange }: SettingsModalProps) => {
  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Test Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Test Settings</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="punctuation" className="text-base">Punctuation</Label>
                <p className="text-sm text-muted-foreground">Add punctuation to the test</p>
              </div>
              <Switch
                id="punctuation"
                checked={settings.punctuation}
                onCheckedChange={(checked) => updateSetting("punctuation", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="numbers" className="text-base">Numbers</Label>
                <p className="text-sm text-muted-foreground">Add numbers to the test</p>
              </div>
              <Switch
                id="numbers"
                checked={settings.numbers}
                onCheckedChange={(checked) => updateSetting("numbers", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="language" className="text-base">Language</Label>
                <p className="text-sm text-muted-foreground">Select test language</p>
              </div>
              <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                <SelectTrigger className="w-[180px] bg-input border-border">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Behavior Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Behavior</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smoothCaret" className="text-base">Smooth Caret</Label>
                <p className="text-sm text-muted-foreground">Smooth caret animation</p>
              </div>
              <Switch
                id="smoothCaret"
                checked={settings.smoothCaret}
                onCheckedChange={(checked) => updateSetting("smoothCaret", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="soundOnClick" className="text-base">Sound on Click</Label>
                <p className="text-sm text-muted-foreground">Play sound when typing</p>
              </div>
              <Switch
                id="soundOnClick"
                checked={settings.soundOnClick}
                onCheckedChange={(checked) => updateSetting("soundOnClick", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="confidenceMode" className="text-base">Confidence Mode</Label>
                <p className="text-sm text-muted-foreground">Hide errors until test ends</p>
              </div>
              <Switch
                id="confidenceMode"
                checked={settings.confidenceMode}
                onCheckedChange={(checked) => updateSetting("confidenceMode", checked)}
              />
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Keyboard Shortcuts */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Keyboard Shortcuts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Restart test</span>
                <span className="font-mono text-foreground">Tab + Enter</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Redo test</span>
                <span className="font-mono text-foreground">Ctrl + Shift + R</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Change mode</span>
                <span className="font-mono text-foreground">Ctrl + Shift + M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Settings</span>
                <span className="font-mono text-foreground">Ctrl + Shift + S</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
