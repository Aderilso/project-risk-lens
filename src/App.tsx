import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { MainLayout } from "./components/layout/MainLayout";
import { UsersPage } from "./pages/admin/UsersPage";
import { ProjectsPage } from "./pages/coordinator/ProjectsPage";
import { ProjectDashboard } from "./pages/coordinator/ProjectDashboard";
import { ManagerHome } from "./pages/manager/ManagerHome";
import { ManagerProjectPage } from "./pages/manager/ManagerProjectPage";
import { GestorProjectPage } from "./pages/manager/GestorProjectPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserProvider>
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/coordinator/projects" replace />} />
              
              {/* Admin Routes */}
              <Route path="/admin/users" element={<UsersPage />} />
              
              {/* Coordinator Routes */}
              <Route path="/coordinator/projects" element={<ProjectsPage />} />
              <Route path="/coordinator/projects/:projectId" element={<ProjectDashboard />} />
              
              {/* Manager Routes */}
              <Route path="/manager" element={<ManagerHome />} />
              <Route path="/manager/projects/:projectId" element={<ManagerProjectPage />} />
              
              {/* Gestor Routes */}
              <Route path="/gestor/projetos/:projectId" element={<GestorProjectPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
