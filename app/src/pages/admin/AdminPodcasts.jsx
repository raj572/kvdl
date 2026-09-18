import { useEffect, useState } from "react";
import {
  createPodcast,
  deletePodcast,
  getAdminPodcasts,
  updatePodcast,
} from "../../services/api";

const extractVideoId = (url) => {
  if (!url) return null;
  const pattern =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
  const match = url.match(pattern);
  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
  return null;
};

const AdminPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New Podcast Form State
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  // Edit Modal State
  const [editingPodcast, setEditingPodcast] = useState(null);

  const fetchPodcastsList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdminPodcasts();
      if (res?.success) {
        setPodcasts(res.data || []);
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch podcasts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcastsList();
  }, []);

  const handleAddPodcast = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!youtubeUrl.trim()) {
      setError("Please paste a valid YouTube video URL.");
      return;
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      setError("Invalid YouTube URL. Supported formats: youtube.com/watch?v=..., youtu.be/..., shorts, etc.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await createPodcast({
        youtube_url: youtubeUrl.trim(),
        sort_order: parseInt(sortOrder) || 0,
      });

      if (res?.success) {
        setSuccess("Podcast added successfully!");
        setYoutubeUrl("");
        setSortOrder(0);
        fetchPodcastsList();
      }
    } catch (err) {
      setError(err?.message || "Failed to add podcast.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (podcast) => {
    try {
      const updatedStatus = !podcast.is_active;
      const res = await updatePodcast(podcast.id, {
        is_active: updatedStatus,
      });
      if (res?.success) {
        setPodcasts((prev) =>
          prev.map((p) => (p.id === podcast.id ? { ...p, is_active: updatedStatus } : p))
        );
      }
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this podcast?")) return;

    try {
      const res = await deletePodcast(id);
      if (res?.success) {
        setSuccess("Podcast deleted successfully!");
        setPodcasts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      setError(err?.message || "Failed to delete podcast.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingPodcast) return;
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await updatePodcast(editingPodcast.id, {
        youtube_url: editingPodcast.youtube_url,
        sort_order: editingPodcast.sort_order,
      });

      if (res?.success) {
        setSuccess("Podcast updated successfully!");
        setEditingPodcast(null);
        fetchPodcastsList();
      }
    } catch (err) {
      setError(err?.message || "Failed to update podcast.");
    } finally {
      setSubmitting(false);
    }
  };

  const previewVideoId = extractVideoId(youtubeUrl);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold font-[arkhip] text-black">
            Manage Podcasts
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Add YouTube podcasts to display dynamically in the About section of the landing page.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded-xl text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")} className="font-bold text-lg">&times;</button>
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded-xl text-sm flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess("")} className="font-bold text-lg">&times;</button>
        </div>
      )}

      {/* Add Podcast Form */}
      <div className="bg-black text-white p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
        <h2 className="text-xl font-bold font-[arkhip] text-primary flex items-center gap-2">
          <span>+</span> Add New Podcast
        </h2>

        <form onSubmit={handleAddPodcast} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                YouTube URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Paste any YouTube URL (watch, shorts, or share links).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary text-sm"
              />
              <p className="text-[11px] text-gray-400 mt-1">Lower numbers display first.</p>
            </div>
          </div>

          {/* Live Video Preview */}
          {previewVideoId && (
            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                Live Video Preview
              </p>
              <div className="aspect-video max-w-md mx-auto rounded-lg overflow-hidden border border-white/20 shadow-md">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${previewVideoId}`}
                  title="YouTube video preview"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-primary text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add Podcast"}
            </button>
          </div>
        </form>
      </div>

      {/* Podcast List */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md space-y-6">
        <h2 className="text-xl font-bold font-[arkhip] text-black">
          Existing Podcasts ({podcasts.length})
        </h2>

        {loading ? (
          <div className="py-12 text-center text-gray-500 text-sm">
            Loading podcasts...
          </div>
        ) : podcasts.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm">
            No podcasts added yet. Use the form above to add your first podcast!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl overflow-hidden bg-[#faf8f5] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${item.video_id}`}
                      title="Podcast Video"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-gray-500">
                        Order: {item.sort_order}
                      </span>
                      <span
                        onClick={() => handleToggleActive(item)}
                        className={`cursor-pointer px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider ${
                          item.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.is_active ? "Active" : "Hidden"}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-400 font-mono truncate">
                      ID: {item.video_id}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-gray-200/60 mt-2">
                  <button
                    onClick={() => setEditingPodcast({ ...item })}
                    className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingPodcast && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black text-white w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold font-[arkhip] text-primary">
                Edit Podcast
              </h3>
              <button
                onClick={() => setEditingPodcast(null)}
                className="text-gray-400 hover:text-white text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  YouTube URL
                </label>
                <input
                  type="url"
                  required
                  value={editingPodcast.youtube_url}
                  onChange={(e) =>
                    setEditingPodcast({ ...editingPodcast, youtube_url: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={editingPodcast.sort_order}
                  onChange={(e) =>
                    setEditingPodcast({ ...editingPodcast, sort_order: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingPodcast(null)}
                  className="px-4 py-2 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-primary text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-yellow-400"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPodcasts;
