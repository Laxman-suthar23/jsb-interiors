"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Loader2,
  CheckCircle,
  ExternalLink,
  ImagePlus,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProjectForm {
  title: string;
  slug: string;
  clientName: string;
  architect: string;
  type: string;
  location: string;
  duration: string;
  description: string;
  coverImage: string;
  featured: boolean;
}

const emptyForm: ProjectForm = {
  title: "",
  slug: "",
  clientName: "",
  architect: "",
  type: "Apartment",
  location: "",
  duration: "",
  description: "",
  coverImage: "",
  featured: false,
};

export default function AdminProjectsList({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ─── Cover image upload state ──────────────────────────────────────
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);

  // ─── Gallery images state ──────────────────────────────────────────
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUploadCount, setGalleryUploadCount] = useState({ done: 0, total: 0 });
  const [galleryError, setGalleryError] = useState<string | null>(null);

  // ─── Validation errors from API ────────────────────────────────────
  const [saveError, setSaveError] = useState<string | null>(null);

  const isUploading = coverUploading || galleryUploading;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (name === "title")
      setForm((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }));
    setSaveError(null);
  };

  const openAdd = () => {
    setForm(emptyForm);
    setGalleryImages([]);
    setEditId(null);
    setShowModal(true);
    setSaved(false);
    setSaveError(null);
    setCoverError(null);
    setGalleryError(null);
  };

  const openEdit = (p: any) => {
    setForm({
      title: p.title,
      slug: p.slug,
      clientName: p.clientName,
      architect: p.architect,
      type: p.type,
      location: p.location,
      duration: p.duration,
      description: p.description ?? "",
      coverImage: p.coverImage,
      featured: p.featured,
    });
    // Load existing gallery images from project relation
    setGalleryImages(
      p.images ? p.images.map((img: any) => img.url) : []
    );
    setEditId(p.id);
    setShowModal(true);
    setSaved(false);
    setSaveError(null);
    setCoverError(null);
    setGalleryError(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this project?")) {
      try {
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
        if (res.ok) {
          setProjects((prev) => prev.filter((p) => p.id !== id));
          router.refresh();
        }
      } catch (err) {
        alert("Failed to delete project");
      }
    }
  };

  // ─── Upload a single file to /api/upload ───────────────────────────
  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }
    return data.url || null;
  }, []);

  // ─── Cover image upload ────────────────────────────────────────────
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    setCoverError(null);
    try {
      const url = await uploadFile(file);
      if (url) {
        setForm((prev) => ({ ...prev, coverImage: url }));
      }
    } catch (err: any) {
      setCoverError(err.message || "Cover image upload failed");
    } finally {
      setCoverUploading(false);
      // Reset the input so the same file can be re-selected
      e.target.value = "";
    }
  };

  // ─── Gallery multiple upload ───────────────────────────────────────
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setGalleryUploading(true);
    setGalleryError(null);
    setGalleryUploadCount({ done: 0, total: files.length });

    const newUrls: string[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const url = await uploadFile(files[i]);
        if (url) {
          newUrls.push(url);
          setGalleryImages((prev) => [...prev, url]);
        }
      } catch (err: any) {
        errors.push(`${files[i].name}: ${err.message}`);
      }
      setGalleryUploadCount({ done: i + 1, total: files.length });
    }

    if (errors.length > 0) {
      setGalleryError(`${errors.length} file(s) failed: ${errors[0]}`);
    }

    setGalleryUploading(false);
    // Reset the input
    e.target.value = "";
  };

  // ─── Remove a gallery image ────────────────────────────────────────
  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ─── Save project ─────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setLoading(true);
    try {
      const method = editId ? "PATCH" : "POST";
      const url = editId ? `/api/projects/${editId}` : "/api/projects";

      const payload = {
        ...form,
        images: galleryImages,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        const savedProject = data.project;

        if (editId) {
          setProjects((prev) =>
            prev.map((p) => (p.id === editId ? savedProject : p)),
          );
        } else {
          setProjects((prev) => [savedProject, ...prev]);
        }

        setSaved(true);
        router.refresh();
        setTimeout(() => {
          setShowModal(false);
          setSaved(false);
        }, 1200);
      } else {
        // Show API validation errors
        if (data.details) {
          const messages = Object.entries(data.details)
            .map(([field, errs]) => `${field}: ${(errs as string[]).join(", ")}`)
            .join("; ");
          setSaveError(messages);
        } else {
          setSaveError(data.error || "Failed to save project");
        }
      }
    } catch (err) {
      setSaveError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2
            className="text-2xl font-bold text-forest mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Projects
          </h2>
          <p className="text-forest/45 text-sm">
            {projects.length} total projects
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-forest text-cream text-xs tracking-wider uppercase font-medium hover:bg-forest-mid transition-colors"
        >
          <Plus size={14} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-forest/8 overflow-hidden group"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors" />
              {project.featured && (
                <span className="absolute top-3 left-3 bg-gold text-forest text-[0.6rem] tracking-widest uppercase px-2.5 py-1 font-semibold">
                  Featured
                </span>
              )}
              {project.images && project.images.length > 0 && (
                <span className="absolute top-3 right-3 bg-forest/80 text-cream text-[0.6rem] tracking-wider px-2 py-1">
                  {project.images.length} photos
                </span>
              )}
            </div>
            <div className="p-5">
              <p className="text-[0.65rem] tracking-widest uppercase text-gold mb-1">
                {project.type}
              </p>
              <h3
                className="font-semibold text-forest mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {project.title}
              </h3>
              <p className="text-xs text-forest/45 mb-4">
                {project.clientName} · {project.location}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openEdit(project)}
                  className="flex items-center gap-1.5 text-xs text-forest/60 hover:text-forest transition-colors"
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="ml-auto flex items-center gap-1.5 text-xs text-forest/40 hover:text-forest transition-colors"
                >
                  <ExternalLink size={12} />
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-forest/10">
            <p className="text-forest/30 uppercase tracking-[0.2em] text-xs">No projects found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-forest/8 sticky top-0 bg-white z-10">
              <h3
                className="font-semibold text-forest"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {editId ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-forest/40 hover:text-forest"
              >
                <X size={18} />
              </button>
            </div>
            {saved ? (
              <div className="flex flex-col items-center justify-center py-16">
                <CheckCircle size={40} className="text-gold mb-4" />
                <p className="text-forest font-medium">
                  Saved successfully!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-6 space-y-5">
                {/* API error banner */}
                {saveError && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    <span>{saveError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "title", label: "Project Title *", required: true },
                    { name: "slug", label: "Slug *", required: true },
                    {
                      name: "clientName",
                      label: "Client Name *",
                      required: true,
                    },
                    { name: "architect", label: "Architect *", required: true },
                    { name: "location", label: "Location *", required: true },
                    {
                      name: "duration",
                      label: "Duration (e.g. 35 days)",
                      required: false,
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">
                        {field.label}
                      </label>
                      <input
                        name={field.name}
                        required={field.required}
                        value={
                          (form as unknown as Record<string, unknown>)[
                            field.name
                          ] as string
                        }
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">
                    Project Type
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="form-input"
                  >
                    {["Apartment", "Villa", "Cottage"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    className="form-input resize-none"
                  />
                </div>

                {/* ── Cover Image ─────────────────────────────────── */}
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">
                    Cover Image
                  </label>
                  <div className="border border-forest/20 p-4">
                    {form.coverImage && (
                      <div className="relative aspect-video mb-4 overflow-hidden">
                        <Image
                          src={form.coverImage}
                          alt="Cover"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, coverImage: "" }))}
                          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-forest/60 hover:text-forest transition-colors">
                      {coverUploading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Upload size={16} />
                      )}
                      {coverUploading ? "Uploading..." : "Upload from device"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        disabled={coverUploading}
                        className="hidden"
                      />
                    </label>
                    {coverError && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                        <AlertCircle size={12} /> {coverError}
                      </p>
                    )}

                  </div>
                </div>

                {/* ── Gallery Images ──────────────────────────────── */}
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">
                    Gallery Images
                    {galleryImages.length > 0 && (
                      <span className="text-forest/30 ml-2 normal-case">
                        ({galleryImages.length} image{galleryImages.length !== 1 ? "s" : ""})
                      </span>
                    )}
                  </label>
                  <div className="border border-forest/20 p-4">
                    {/* Gallery preview grid */}
                    {galleryImages.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                        {galleryImages.map((url, index) => (
                          <div key={`${url}-${index}`} className="relative aspect-square overflow-hidden group/thumb">
                            <Image
                              src={url}
                              alt={`Gallery ${index + 1}`}
                              fill
                              sizes="120px"
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="absolute top-1 right-1 bg-black/50 hover:bg-red-600 text-white p-0.5 opacity-0 group-hover/thumb:opacity-100 transition-all"
                            >
                              <X size={12} />
                            </button>
                            <span className="absolute bottom-1 left-1 bg-black/50 text-white text-[0.55rem] px-1.5 py-0.5">
                              {index + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload button */}
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-forest/60 hover:text-forest transition-colors">
                      {galleryUploading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <ImagePlus size={16} />
                      )}
                      {galleryUploading
                        ? `Uploading ${galleryUploadCount.done}/${galleryUploadCount.total}...`
                        : "Add gallery images"}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        disabled={galleryUploading}
                        className="hidden"
                      />
                    </label>

                    {/* Gallery upload progress */}
                    {galleryUploading && (
                      <div className="mt-2">
                        <div className="w-full bg-forest/10 h-1.5 overflow-hidden">
                          <div
                            className="bg-forest h-full transition-all duration-300"
                            style={{
                              width: `${galleryUploadCount.total > 0
                                ? (galleryUploadCount.done / galleryUploadCount.total) * 100
                                : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {galleryError && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                        <AlertCircle size={12} /> {galleryError}
                      </p>
                    )}

                    <p className="text-[0.65rem] text-forest/30 mt-2">
                      Select multiple files at once. JPG, PNG, WebP, GIF — max 10 MB each.
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="w-4 h-4 accent-forest"
                  />
                  <span className="text-sm text-forest/70">
                    Feature on homepage
                  </span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading || isUploading}
                    className="flex-1 py-3 bg-forest text-cream text-xs tracking-wider uppercase font-medium hover:bg-forest-mid transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? "Saving..."
                      : isUploading
                        ? "Wait for uploads..."
                        : editId
                          ? "Save Changes"
                          : "Add Project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-forest/20 text-forest/60 text-xs tracking-wider uppercase hover:bg-forest/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
