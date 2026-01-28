import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TwinProvider } from "@/contexts/TwinContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import CreateTwin from "./pages/CreateTwin";
import Dashboard from "./pages/Dashboard";
import Simulate from "./pages/Simulate";
import Chat from "./pages/Chat";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TwinProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/create-twin" element={<CreateTwin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/simulate" element={<Simulate />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TwinProvider>
  </QueryClientProvider>
);

export default App;
