import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProjects, deleteProject, getImageUrl } from '../../services/api';
import { clearSuperToken } from '../../super-admin/superAuth';
import { Plus, Edit2, Trash2, LogOut, Loader2, ExternalLink } from 'lucide-react';

const SuperAdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProjectsList = async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      if (response.success) {
        setProjects(response.data || []);
      }
    } catch (err) {
      setError('Failed to fetch projects. Please verify connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsList();
  }, []);

  const handleLogout = () => {
    clearSuperToken();
    navigate('/super-admin/login', { replace: true });
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the project "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await deleteProject(id);
      if (response.success) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (err) {
      alert(err?.message || 'Failed to delete the project.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f8f0dd] font-noto">
      {/* Top Navbar */}
      <nav className="border-b border-[#f8f0dd]/10 bg-[#121212]/90 backdrop-blur-md px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="bg-[#AF221F] text-[#f8f0dd] font-[arkhip] px-3 py-1 text-sm rounded">KV</span>
          <h1 className="font-[arkhip] tracking-wider uppercase text-lg hidden sm:block">Super-Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs uppercase tracking-widest text-[#f8f0dd]/60 hover:text-white transition-colors flex items-center gap-1">
            View Live Site <ExternalLink size={12} />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#AF221F]/10 hover:bg-[#AF221F]/20 text-[#AF221F] border border-[#AF221F]/20 rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer font-semibold"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-[arkhip] uppercase tracking-wide">Manage Projects</h2>
            <p className="text-[#f8f0dd]/50 text-sm mt-1">Add, update, or remove completed and ongoing developer projects</p>
          </div>
          <Link
            to="/super-admin/projects/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#AF221F] hover:bg-[#8e1b18] text-[#f8f0dd] rounded-lg transition-colors font-semibold uppercase tracking-wider text-xs"
          >
            <Plus size={16} /> Add New Project
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#AF221F]/10 border border-[#AF221F]/30 text-[#AF221F] text-sm rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#AF221F]" size={40} />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-[#121212] border border-[#f8f0dd]/10 rounded-2xl">
            <p className="text-[#f8f0dd]/50">No projects found. Create one to get started!</p>
          </div>
        ) : (
          <div className="bg-[#121212] border border-[#f8f0dd]/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#f8f0dd]/10 bg-[#1c1c1c] text-xs uppercase tracking-widest text-[#f8f0dd]/60">
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">RERA ID</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f8f0dd]/5">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img
                          src={project.image ? getImageUrl(project.image) : 'https://placehold.co/100x60'}
                          alt={project.title}
                          className="w-16 h-10 object-cover rounded-lg border border-[#f8f0dd]/10"
                        />
                        <div>
                          <p className="font-semibold text-sm">{project.title}</p>
                          <p className="text-xs text-[#f8f0dd]/40">ID: {project.id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          project.type === 'completed' 
                            ? 'bg-green-950/65 text-green-400 border border-green-900/50' 
                            : 'bg-yellow-950/65 text-yellow-400 border border-yellow-900/50'
                        }`}>
                          {project.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#f8f0dd]/70">
                        {project.location || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-[#f8f0dd]/60">
                        {project.reraid || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/super-admin/projects/${project.id}/edit`}
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/10 rounded-lg transition-colors"
                            title="Edit Project"
                          >
                            <Edit2 size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(project.id, project.title)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
