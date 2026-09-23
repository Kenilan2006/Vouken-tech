import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import SolutionsPage from './pages/SolutionsPage'
import InnovationPage from './pages/InnovationPage'
import FuturePage from './pages/FuturePage'
import InsightsPage from './pages/InsightsPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/services/:slug" element={<ServiceDetailPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/projects/:slug" element={<ProjectDetailPage />} />
    <Route path="/solutions" element={<SolutionsPage />} />
    <Route path="/innovation" element={<InnovationPage />} />
    <Route path="/future-technology" element={<FuturePage />} />
    <Route path="/insights" element={<InsightsPage />} />
    <Route path="/careers" element={<CareersPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></Layout>
}
