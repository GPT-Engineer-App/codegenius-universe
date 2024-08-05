import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings } from 'lucide-react';

const SettingsDialog = ({ openAIConfig, setOpenAIConfig }) => {
  const [localConfig, setLocalConfig] = useState(openAIConfig);

  useEffect(() => {
    setLocalConfig(openAIConfig);
  }, [openAIConfig]);

  const handleSave = () => {
    setOpenAIConfig(localConfig);
    localStorage.setItem('openai_base_url', localConfig.baseURL);
    localStorage.setItem('openai_api_key', localConfig.apiKey);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OpenAI Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="baseURL" className="text-right">
              Base URL
            </label>
            <Input
              id="baseURL"
              value={localConfig.baseURL}
              onChange={(e) => setLocalConfig({ ...localConfig, baseURL: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="apiKey" className="text-right">
              API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              value={localConfig.apiKey}
              onChange={(e) => setLocalConfig({ ...localConfig, apiKey: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleSave}>Save Settings</Button>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
