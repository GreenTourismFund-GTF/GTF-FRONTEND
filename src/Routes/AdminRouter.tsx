import { Routes, Route } from 'react-router-dom';
import AdminAdvanced from '../components/AdminDashboard/AdminAdvanced';


const AdminRouters = () =>
{
    return <Routes>
        <Route path="/admin" element={<AdminAdvanced />} />
    </Routes>
};

export default AdminRouters;