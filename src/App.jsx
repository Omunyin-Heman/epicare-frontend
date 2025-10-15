// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";
import WhereWeWork from "./components/WhereWeWork";
import GetInvolved from "./components/GetInvolved";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EpicareInfo from "./components/EpicareInfo";
import ScrollToTop from "./components/ScrollToTop";
import DashboardToolbar from "./components/DashboardToolbar";

// Pages
import Donate from "./pages/Donate";
import Partner from "./pages/Partner";
import Support from "./pages/Support";
import Volunteer from "./pages/Volunteer";
import VolunteerApplication from "./pages/VolunteerApplication";
import PartnerApplication from "./pages/PartnerApplication";
import PartnerDashboard from "./pages/PartnerDashboard";
import VolunteersDashboard from "./pages/VolunteersDashboard";
import ContactsDashboard from "./pages/ContactsDashboard";
import EducationPage from "./pages/EducationPage";
import HealthPage from "./pages/HealthPage";
import NutritionPage from "./pages/NutritionPage";
import NutritionChartPage from "./pages/NutritionChartPage";
import FoodPage from "./pages/FoodPage";
import GBVPage from "./pages/GBVPage";
import AgriculturePage from "./pages/AgriculturePage";

// Layout
import DashboardLayout from "./layout/DashboardLayout";

// ✅ HomePage component
function HomePage() {
  return (
    <>
      <HeroSlider />
      <Hero />
      <About />
      <WhereWeWork />
      <Programs />
      <EpicareInfo />
      <GetInvolved />
      <Contact />
      <Footer />
    </>
  );
}

// ✅ App content with conditional Header/Footer
function AppContent() {
  const location = useLocation();
  const noLayoutRoutes = [
    "/dashboard/partners",
    "/dashboard/volunteers",
    "/dashboard/contacts",
  ];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        {/* Home & static pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/support" element={<Support />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/volunteer/apply" element={<VolunteerApplication />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/partner/apply" element={<PartnerApplication />} />

        {/* ✅ Dashboard routes */}
        <Route
          path="/dashboard/partners"
          element={
            <DashboardLayout>
              <PartnerDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/volunteers"
          element={
            <DashboardLayout>
              <VolunteersDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/contacts"
          element={
            <DashboardLayout>
              <ContactsDashboard />
            </DashboardLayout>
          }
        />

        {/* Program pages */}
        <Route path="/education" element={<EducationPage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/nutrition-chart" element={<NutritionChartPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/gbv" element={<GBVPage />} />
        <Route path="/agriculture" element={<AgriculturePage />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

// ✅ App wrapper
function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
