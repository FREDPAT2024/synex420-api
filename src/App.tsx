import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './components/AuthProvider';
import Dashboard from './pages/Dashboard';
import PatientRegistration from './pages/PatientRegistration';
import PatientSearch from './pages/PatientSearch';
import Billing from './pages/Billing';
import Vitals from './pages/Vitals';
import Consultations from './pages/Consultations';
import ClinicalNotes from './pages/ClinicalNotes';
import Laboratory from './pages/Laboratory';
import Radiology from './pages/Radiology';
import Pharmacy from './pages/Pharmacy';
import Inpatient from './pages/Inpatient';
import Surgery from './pages/Surgery';
import Emergency from './pages/Emergency';
import Maternity from './pages/Maternity';
import Nursing from './pages/Nursing';
import HumanResources from './pages/HumanResources';
import Procurement from './pages/Procurement';
import Insurance from './pages/Insurance';
import Accounting from './pages/Accounting';
import Quality from './pages/Quality';
import Analytics from './pages/Analytics';
import PatientPortal from './pages/PatientPortal';
import Telemedicine from './pages/Telemedicine';
import Security from './pages/Security';
import Administration from './pages/Administration';
import Documents from './pages/Documents';
import PopulationHealth from './pages/PopulationHealth';
import MobileManagement from './pages/MobileManagement';
import Interoperability from './pages/Interoperability';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/registration" element={<PatientRegistration />} />
            <Route path="/search" element={<PatientSearch />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/ehr" element={<Consultations />} />
            <Route path="/vitals" element={<Vitals />} />
            <Route path="/notes" element={<ClinicalNotes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/lab" element={<Laboratory />} />
            <Route path="/radiology" element={<Radiology />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/inpatient" element={<Inpatient />} />
            <Route path="/surgery" element={<Surgery />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/maternity" element={<Maternity />} />
            <Route path="/nursing" element={<Nursing />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/procurement" element={<Procurement />} />
            <Route path="/hr" element={<HumanResources />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/portal" element={<PatientPortal />} />
            <Route path="/telemed" element={<Telemedicine />} />
            <Route path="/security" element={<Security />} />
            <Route path="/admin" element={<Administration />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/population" element={<PopulationHealth />} />
            <Route path="/mobile" element={<MobileManagement />} />
            <Route path="/interop" element={<Interoperability />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
