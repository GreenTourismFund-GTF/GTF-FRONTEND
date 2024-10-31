import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import About from '../pages/About';
import Community from '../pages/Community';
import Projects from '../pages/Project/Projects';
import Contact from '../pages/Contact';
import ProjectDetailPage from '../pages/Project/Project';
import MultiProjectDetailPage from '../pages/Project/MultipleWalletProject';
import CreateProject from '../pages/Project/CreateProject';
import AdminAdvanced from '../components/AdminDashboard/AdminAdvanced';


const Routers = () =>
{
    return <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project" element={<ProjectDetailPage />} />
        <Route path="/multi" element={<MultiProjectDetailPage />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminAdvanced />} />
    </Routes>
};

export default Routers;