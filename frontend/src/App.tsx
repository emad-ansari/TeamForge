// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Projects from "./pages/Projects.tsx";
import ProjectDetails from "./pages/ProjectDetails.tsx";
import Tasks from "./pages/Tasks.tsx";
import Settings from "./pages/Settings.tsx";
import InvitePage from "./pages/InvitePage.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Toaster } from "sonner";

import { ProjectModalProvider } from "./contexts/ProjectModalContext.tsx";
import { TaskModalProvider } from "./contexts/TaskModalContext.tsx";
import { PublicRoute } from "./components/PublicRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";

// const queryClient = new QueryClient();

const App = () => (
  // <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TaskModalProvider>
        <ProjectModalProvider>
          <BrowserRouter>
          <Routes>
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/invite/:token" element={<InvitePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
        </ProjectModalProvider>
      </TaskModalProvider>
    </TooltipProvider>
  // </QueryClientProvider>
);

export default App;
