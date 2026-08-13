import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProjectById, createProject, updateProject } from '../../services/api';
import { ArrowLeft, Plus, Trash2, Upload, Loader2 } from 'lucide-react';

const COMMON_AMENITIES = [
  'Power Backup',
  'Lift',
  'Security',
  'Intercom Facility',
  'Rain Water Harvesting',
  'Fire Fighting Equipment',
  'Parking',
  'Club House',
  'Gymnasium',
  'Swimming Pool',
  'Jogging Track',
  'Cycling Track',
  'Indoor Games Room',
  'Meditation Area',
  'Internet/Wifi Connectivity',
  'Waste Disposal',
  'Multipurpose Courts',
  'Indoor Squash & Badminton Courts',
  'Solar Energy',
  'Early Learning Centre',
  'Library And Business Centre',
  'Flower Gardens',
  'Maintenance Staff',
  'Water Storage'
];

const SuperAdminProjectForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('completed');
  const [reraid, setReraid] = useState('');
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [rating, setRating] = useState('4.0');
  const [description, setDescription] = useState('');

  // Main Image
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Gallery
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]); // Array of existing image URLs

  // Brochure PDF
  const [brochureFile, setBrochureFile] = useState(null);
  const [existingBrochure, setExistingBrochure] = useState('');

  // Highlights (Array of objects { label, value })
  const [highlights, setHighlights] = useState([
    { label: 'Units', value: '' },
    { label: 'Project Size', value: '' },
    { label: 'Launch Date', value: '' },
    { label: 'Total Towers', value: '' }
  ]);

  // Amenities (Array of strings)
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [customAmenity, setCustomAmenity] = useState('');

  useEffect(() => {
    if (isEdit) {
      const loadProject = async () => {
        try {
          const response = await getProjectById(id);
          if (response.success && response.data) {
            const proj = response.data;
            setTitle(proj.title || '');
            setType(proj.type || 'completed');
            setReraid(proj.reraid || '');
            setLocation(proj.location || '');
            setPincode(proj.pincode || '');
            setRating(proj.rating || '4.0');
            setDescription(proj.description || '');
            setImagePreview(proj.image || '');
            setExistingGallery(proj.images || []);
            setExistingBrochure(proj.brochure || '');
            setSelectedAmenities(proj.amneties || []);
            setHighlights(proj.highlights || [
              { label: 'Units', value: '' },
              { label: 'Project Size', value: '' },
              { label: 'Launch Date', value: '' },
              { label: 'Total Towers', value: '' }
            ]);
          }
        } catch (err) {
          setError('Failed to load project details.');
        } finally {
          setFetching(false);
        }
      };
      loadProject();
    }
  }, [id, isEdit]);

  // Handle Main Image Select
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle Gallery Select
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(prev => [...prev, ...files]);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews(prev => [...prev, ...previews]);
  };

  const removeNewGalleryImage = (index) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (index) => {
    setExistingGallery(prev => prev.filter((_, i) => i !== index));
  };

  // Highlights management
  const handleHighlightChange = (index, field, val) => {
    setHighlights(prev => {
      const updated = [...prev];
      updated[index][field] = val;
      return updated;
    });
  };

  const addHighlight = () => {
    setHighlights(prev => [...prev, { label: '', value: '' }]);
  };

  const removeHighlight = (index) => {
    setHighlights(prev => prev.filter((_, i) => i !== index));
  };

  // Amenities management
  const handleAmenityCheck = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddCustomAmenity = (e) => {
    e.preventDefault();
    if (customAmenity.trim() && !selectedAmenities.includes(customAmenity.trim())) {
      setSelectedAmenities(prev => [...prev, customAmenity.trim()]);
      setCustomAmenity('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('reraid', reraid || '');
    formData.append('location', location || '');
    formData.append('pincode', pincode || '');
    formData.append('rating', rating || '4.0');
    formData.append('description', description || '');

    // Filter highlights
    const validHighlights = highlights.filter(h => h.label.trim() && h.value.trim());
    formData.append('highlights', JSON.stringify(validHighlights));

    // Amenities
    formData.append('amneties', JSON.stringify(selectedAmenities));

    // Main Cover image file
    if (imageFile) {
      formData.append('image_file', imageFile);
    }

    // New gallery images
    galleryFiles.forEach(file => {
      formData.append('gallery_files[]', file);
    });

    // Brochure file
    if (brochureFile) {
      formData.append('brochure_file', brochureFile);
    }

    if (isEdit) {
      formData.append('existing_gallery', JSON.stringify(existingGallery));
    }

    try {
      let response;
      if (isEdit) {
        // Laravel spoofing for PUT inside FormData is handled via direct POST to routes that resolve it
        response = await updateProject(id, formData);
      } else {
        response = await createProject(formData);
      }

      if (response.success) {
        navigate('/super-admin/dashboard');
      }
    } catch (err) {
      setError(err?.message || 'Failed to save project. Ensure all fields are valid.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex justify-center items-center">
        <Loader2 className="animate-spin text-[#AF221F]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f8f0dd] font-noto pb-20">
      {/* Top Navbar */}
      <nav className="border-b border-[#f8f0dd]/10 bg-[#121212]/90 backdrop-blur-md px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link to="/super-admin/dashboard" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-[#f8f0dd]/70 hover:text-white">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-[arkhip] tracking-wider uppercase text-lg">
            {isEdit ? 'Edit Project' : 'Add New Project'}
          </h1>
        </div>
      </nav>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10">
        {error && (
          <div className="mb-6 p-4 bg-[#AF221F]/10 border border-[#AF221F]/30 text-[#AF221F] text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* GENERAL INFO SECTION */}
          <div className="bg-[#121212] border border-[#f8f0dd]/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-md font-[arkhip] uppercase tracking-wide border-b border-[#f8f0dd]/10 pb-3">General Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 mb-2 font-semibold">Project Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Divine Valley"
                  className="w-full bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-3 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 mb-2 font-semibold">Project Status / Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-3 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
                >
                  <option value="completed">Completed</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 mb-2 font-semibold">RERA Number</label>
                <input
                  type="text"
                  value={reraid}
                  onChange={(e) => setReraid(e.target.value)}
                  placeholder="e.g. P52100080676 or NA"
                  className="w-full bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-3 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 mb-2 font-semibold">Location (City/Area)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kothrud, Pune"
                  className="w-full bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-3 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 mb-2 font-semibold">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 411038"
                  className="w-full bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-3 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 mb-2 font-semibold">Rating / Star score</label>
                <input
                  type="text"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="e.g. 4.2 or NA"
                  className="w-full bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-3 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 mb-2 font-semibold">Project Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe this project in detail..."
                className="w-full bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-3 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
              />
            </div>
          </div>

          {/* COVER & GALLERY IMAGE UPLOADS */}
          <div className="bg-[#121212] border border-[#f8f0dd]/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-md font-[arkhip] uppercase tracking-wide border-b border-[#f8f0dd]/10 pb-3">Project Media</h3>
            
            {/* Main Cover image */}
            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 font-semibold">Main Cover Image</label>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="cover preview"
                    className="w-40 h-24 object-cover rounded-lg border border-[#f8f0dd]/10"
                  />
                )}
                <div className="flex-1 w-full">
                  <label className="flex flex-col items-center justify-center border border-dashed border-[#f8f0dd]/15 hover:border-[#AF221F] rounded-lg p-4 cursor-pointer transition-colors bg-[#1c1c1c]">
                    <Upload size={20} className="text-[#f8f0dd]/40 mb-2" />
                    <span className="text-xs text-[#f8f0dd]/60">Select Cover Image File</span>
                    <input type="file" onChange={handleMainImageChange} accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Gallery images */}
            <div className="space-y-4 pt-4">
              <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 font-semibold">Gallery Images</label>
              
              <label className="flex flex-col items-center justify-center border border-dashed border-[#f8f0dd]/15 hover:border-[#AF221F] rounded-lg p-6 cursor-pointer transition-colors bg-[#1c1c1c]">
                <Upload size={24} className="text-[#f8f0dd]/40 mb-2" />
                <span className="text-xs text-[#f8f0dd]/60">Add multiple gallery photos</span>
                <input type="file" multiple onChange={handleGalleryChange} accept="image/*" className="hidden" />
              </label>

              {/* Display existing and new files previews */}
              {((isEdit && existingGallery.length > 0) || galleryPreviews.length > 0) && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  
                  {/* Existing Gallery Images */}
                  {isEdit && existingGallery.map((url, index) => (
                    <div key={`existing-${index}`} className="relative group border border-[#f8f0dd]/10 rounded-lg overflow-hidden h-20 bg-black">
                      <img src={url} alt="existing gallery preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExistingGalleryImage(index)}
                        className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}

                  {/* New Previews */}
                  {galleryPreviews.map((url, index) => (
                    <div key={`new-${index}`} className="relative group border border-[#f8f0dd]/10 rounded-lg overflow-hidden h-20 bg-black">
                      <img src={url} alt="new gallery preview" className="w-full h-full object-cover opacity-85" />
                      <button
                        type="button"
                        onClick={() => removeNewGalleryImage(index)}
                        className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* Brochure PDF Upload */}
            <div className="space-y-4 pt-4 border-t border-[#f8f0dd]/5">
              <label className="block text-xs uppercase tracking-widest text-[#f8f0dd]/60 font-semibold">Project Brochure (PDF)</label>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {existingBrochure && (
                  <div className="text-xs bg-[#1c1c1c] px-3 py-2 border border-[#f8f0dd]/10 rounded-lg">
                    <span className="text-[#f8f0dd]/60">Current PDF: </span>
                    <a href={existingBrochure} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 font-semibold">
                      View Brochure
                    </a>
                  </div>
                )}
                
                {brochureFile && (
                  <div className="text-xs bg-[#1c1c1c] px-3 py-2 border border-[#f8f0dd]/10 rounded-lg">
                    <span className="text-green-400">Selected PDF: </span>
                    <span className="font-semibold">{brochureFile.name}</span>
                  </div>
                )}

                <div className="flex-1 w-full">
                  <label className="flex flex-col items-center justify-center border border-dashed border-[#f8f0dd]/15 hover:border-[#AF221F] rounded-lg p-4 cursor-pointer transition-colors bg-[#1c1c1c]">
                    <Upload size={20} className="text-[#f8f0dd]/40 mb-2" />
                    <span className="text-xs text-[#f8f0dd]/60">Select Brochure PDF File</span>
                    <input type="file" onChange={(e) => setBrochureFile(e.target.files[0])} accept="application/pdf" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

          </div>

          {/* HIGHLIGHTS SECTION */}
          <div className="bg-[#121212] border border-[#f8f0dd]/10 rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-[#f8f0dd]/10 pb-3">
              <h3 className="text-md font-[arkhip] uppercase tracking-wide">Key Metrics & Highlights</h3>
              <button
                type="button"
                onClick={addHighlight}
                className="flex items-center gap-1 text-xs text-[#AF221F] hover:text-[#8e1b18] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Plus size={14} /> Add Metric
              </button>
            </div>

            <div className="space-y-4">
              {highlights.map((h, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={h.label}
                      onChange={(e) => handleHighlightChange(index, 'label', e.target.value)}
                      placeholder="Label (e.g. Project Size)"
                      className="bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
                    />
                    <input
                      type="text"
                      value={h.value}
                      onChange={(e) => handleHighlightChange(index, 'value', e.target.value)}
                      placeholder="Value (e.g. 15 acres)"
                      className="bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="p-2 text-red-500/60 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AMENITIES SECTION */}
          <div className="bg-[#121212] border border-[#f8f0dd]/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-md font-[arkhip] uppercase tracking-wide border-b border-[#f8f0dd]/10 pb-3">Amenities</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {COMMON_AMENITIES.map((amenity) => (
                <label key={amenity} className="flex items-center gap-3 text-sm text-[#f8f0dd]/80 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityCheck(amenity)}
                    className="rounded border-[#f8f0dd]/20 accent-[#AF221F] w-4 h-4 bg-[#1c1c1c]"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>

            {/* Custom Amenities */}
            <div className="pt-4 border-t border-[#f8f0dd]/5 flex gap-4">
              <input
                type="text"
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                placeholder="Type other custom amenity..."
                className="flex-1 bg-[#1c1c1c] border border-[#f8f0dd]/15 text-[#f8f0dd] px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#AF221F] transition-colors text-sm"
              />
              <button
                type="button"
                onClick={handleAddCustomAmenity}
                className="px-5 py-2.5 bg-[#AF221F]/10 hover:bg-[#AF221F]/20 text-[#AF221F] border border-[#AF221F]/20 rounded-lg text-xs uppercase tracking-widest font-semibold cursor-pointer"
              >
                Add Custom
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="flex gap-4 justify-end pt-4">
            <Link
              to="/super-admin/dashboard"
              className="px-6 py-3 bg-[#1c1c1c] border border-[#f8f0dd]/10 rounded-lg text-[#f8f0dd]/60 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#AF221F] hover:bg-[#8e1b18] text-[#f8f0dd] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors duration-300 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={14} /> Saving Project...
                </>
              ) : (
                'Save Project'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SuperAdminProjectForm;
