import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import { ThemeProvider } from "@/components/theme-provider";
import OpenAI from "openai";
import SettingsDialog from './components/SettingsDialog';

const queryClient = new QueryClient();

const App = () => {
  const [openAIConfig, setOpenAIConfig] = useState({
    baseURL: localStorage.getItem('openai_base_url') || '',
    apiKey: localStorage.getItem('openai_api_key') || '',
  });

  const openaiClient = new OpenAI(openAIConfig);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {navItems.map(({ to, page: Page }) => (
                <Route key={to} path={to} element={<Page openaiClient={openaiClient} />} />
              ))}
            </Routes>
          </BrowserRouter>
          <SettingsDialog openAIConfig={openAIConfig} setOpenAIConfig={setOpenAIConfig} />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
