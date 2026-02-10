import { FaCheck, FaEye, FaFileDownload, FaTimes } from 'react-icons/fa';
import { getAdminToken } from '../../admin/adminAuth';
import { useGetApplicationsQuery, useUpdateApplicationStatusMutation } from '../../services/careersApi';

const AdminCareers = () => {
    const { data: response, isLoading, refetch } = useGetApplicationsQuery();
    const [updateStatus] = useUpdateApplicationStatusMutation();
    const token = getAdminToken();

    // response is { success: true, data: [...] }
    const applications = response?.data || [];

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to update status', error);
            alert('Failed to update status');
        }
    };

    const handleDownload = async (id, filePath, applicantName) => {
        try {
            const res = await fetch(`http://localhost:8000/api/admin/careers/${id}/resume`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Download failed');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            // Get extension from file path or default to pdf
            const extension = filePath.split('.').pop() || 'pdf';
            const safeName = applicantName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            a.download = `resume_${safeName}.${extension}`;

            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download error', error);
            alert('Failed to download resume');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'reviewed': return 'bg-yellow-100 text-yellow-800';
            case 'contacted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) return <div className="p-8">Loading applications...</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Career Applications</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No applications found.
                                </td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{app.full_name}</div>
                                        <div className="text-xs text-gray-500">{new Date(app.created_at).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {app.position}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{app.email}</div>
                                        <div className="text-sm text-gray-500">{app.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button
                                            onClick={() => handleDownload(app.id, app.resume_path, app.full_name)}
                                            className="text-primary hover:text-red-800 flex items-center gap-1"
                                            title="Download Resume"
                                        >
                                            <FaFileDownload /> Download
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            {app.status !== 'reviewed' && (
                                                <button onClick={() => handleStatusUpdate(app.id, 'reviewed')} className="text-yellow-600 hover:text-yellow-900" title="Mark Reviewed"><FaEye /></button>
                                            )}
                                            {app.status !== 'contacted' && (
                                                <button onClick={() => handleStatusUpdate(app.id, 'contacted')} className="text-green-600 hover:text-green-900" title="Mark Contacted"><FaCheck /></button>
                                            )}
                                            {app.status !== 'rejected' && (
                                                <button onClick={() => handleStatusUpdate(app.id, 'rejected')} className="text-red-600 hover:text-red-900" title="Reject"><FaTimes /></button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCareers;
