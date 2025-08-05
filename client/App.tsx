import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import SalesManagement from "./pages/SalesManagement";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Tasks from "./pages/Tasks";
import OKRs from "./pages/OKRs";
import Documents from "./pages/Documents";
import Issues from "./pages/Issues";
import RiskManagement from "./pages/RiskManagement";
import Inventory from "./pages/Inventory";
import Communication from "./pages/Communication";
import Integrations from "./pages/Integrations";
import Departments from "./pages/Departments";
import ProfileSettings from "./pages/ProfileSettings";
import Notifications from "./pages/Notifications";
import Attendance from "./pages/Attendance";
import LeaveManagement from "./pages/LeaveManagement";
import Payroll from "./pages/Payroll";
import HumanResources from "./pages/HumanResources";
import OnboardingManagement from "./pages/OnboardingManagement";
import OffboardingManagement from "./pages/OffboardingManagement";
import TrainingManagement from "./pages/TrainingManagement";
import MeetingManagement from "./pages/MeetingManagement";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="hproject-theme">
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
              path="/okrs"
              element={
                <DashboardLayout>
                  <OKRs />
                </DashboardLayout>
              }
            />
            <Route
              path="/analytics"
              element={
                <DashboardLayout>
                  <Analytics />
                </DashboardLayout>
              }
            />
            <Route
              path="/sales"
              element={
                <DashboardLayout>
                  <SalesManagement />
                </DashboardLayout>
              }
            />
            <Route
              path="/documents"
              element={
                <DashboardLayout>
                  <Documents />
                </DashboardLayout>
              }
            />
            <Route
              path="/communication"
              element={
                <DashboardLayout>
                  <Communication />
                </DashboardLayout>
              }
            />
            <Route
              path="/issues"
              element={
                <DashboardLayout>
                  <Issues />
                </DashboardLayout>
              }
            />
            <Route
              path="/risks"
              element={
                <DashboardLayout>
                  <RiskManagement />
                </DashboardLayout>
              }
            />
            <Route
              path="/inventory"
              element={
                <DashboardLayout>
                  <Inventory />
                </DashboardLayout>
              }
            />
            <Route
              path="/departments"
              element={
                <DashboardLayout>
                  <Departments />
                </DashboardLayout>
              }
            />
            <Route
              path="/integrations"
              element={
                <DashboardLayout>
                  <Integrations />
                </DashboardLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              }
            />
            <Route
              path="/notifications"
              element={
                <DashboardLayout>
                  <Notifications />
                </DashboardLayout>
              }
            />
            <Route
              path="/attendance"
              element={
                <DashboardLayout>
                  <Attendance />
                </DashboardLayout>
              }
            />
            <Route
              path="/leave-management"
              element={
                <DashboardLayout>
                  <LeaveManagement />
                </DashboardLayout>
              }
            />
            <Route
              path="/payroll"
              element={
                <DashboardLayout>
                  <Payroll />
                </DashboardLayout>
              }
            />
            <Route
              path="/human-resources"
              element={
                <DashboardLayout>
                  <HumanResources />
                </DashboardLayout>
              }
            />
            <Route
              path="/onboarding"
              element={
                <DashboardLayout>
                  <OnboardingManagement />
                </DashboardLayout>
              }
            />
            <Route
              path="/offboarding"
              element={
                <DashboardLayout>
                  <OffboardingManagement />
                </DashboardLayout>
              }
            />
            <Route
              path="/training"
              element={
                <DashboardLayout>
                  <TrainingManagement />
                </DashboardLayout>
              }
            />
            <Route
              path="/meetings"
              element={
                <DashboardLayout>
                  <MeetingManagement />
                </DashboardLayout>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
