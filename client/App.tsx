import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <DashboardLayout>
                <Projects />
              </DashboardLayout>
            }
          />
          <Route
            path="/teams"
            element={
              <DashboardLayout>
                <Teams />
              </DashboardLayout>
            }
          />
          <Route
            path="/tasks"
            element={
              <DashboardLayout>
                <Tasks />
              </DashboardLayout>
            }
          />
          <Route
            path="/analytics"
            element={
              <DashboardLayout>
                <PlaceholderPage
                  title="Analytics"
                  description="View comprehensive analytics and insights for your projects and teams."
                />
              </DashboardLayout>
            }
          />
          <Route
            path="/documents"
            element={
              <DashboardLayout>
                <PlaceholderPage
                  title="Documents"
                  description="Manage and organize all your project documents in one place."
                />
              </DashboardLayout>
            }
          />
          <Route
            path="/communication"
            element={
              <DashboardLayout>
                <PlaceholderPage
                  title="Communication"
                  description="Team chat, meetings, and collaboration tools."
                />
              </DashboardLayout>
            }
          />
          <Route
            path="/issues"
            element={
              <DashboardLayout>
                <PlaceholderPage
                  title="Issues"
                  description="Track and manage project issues and bugs."
                />
              </DashboardLayout>
            }
          />
          <Route
            path="/risks"
            element={
              <DashboardLayout>
                <PlaceholderPage
                  title="Risk Management"
                  description="Identify, assess, and mitigate project risks."
                />
              </DashboardLayout>
            }
          />
          <Route
            path="/inventory"
            element={
              <DashboardLayout>
                <PlaceholderPage
                  title="Inventory Management"
                  description="Manage items, stock levels, and supply chain."
                />
              </DashboardLayout>
            }
          />
          <Route
            path="/integrations"
            element={
              <DashboardLayout>
                <PlaceholderPage
                  title="Integrations"
                  description="Connect with external tools and services."
                />
              </DashboardLayout>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
