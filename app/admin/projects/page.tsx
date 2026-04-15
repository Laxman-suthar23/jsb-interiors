"use client";

import { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { projectsData } from "@/lib/data";

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

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(projectsData);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

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
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowModal(true);
    setSaved(false);
  };
  const openEdit = (p: (typeof projectsData)[0]) => {
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
    setEditId(p.id);
    setShowModal(true);
    setSaved(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?"))
      setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "jsb-interiors",
      );
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: fd },
      );
      const data = await res.json();
      if (data.secure_url)
        setForm((prev) => ({ ...prev, coverImage: data.secure_url }));
    } catch {
      // Fallback: use a placeholder
      setForm((prev) => ({
        ...prev,
        coverImage:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, ...form } : p)),
      );
    } else {
      const newProject = {
        ...form,
        id: Date.now().toString(),
        images: form.coverImage ? [form.coverImage] : [],
        featured: form.featured,
      };
      setProjects((prev) => [...prev, newProject]);
    }
    setSaved(true);
    setTimeout(() => {
      setShowModal(false);
      setSaved(false);
    }, 1200);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2
            className="text-2xl font-bold text-[#1e3b22] mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Projects
          </h2>
          <p className="text-[#1e3b22]/45 text-sm">
            {projects.length} total projects
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3b22] text-[#f5f0e8] text-xs tracking-wider uppercase font-medium hover:bg-[#2d5230] transition-colors"
        >
          <Plus size={14} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-[#1e3b22]/8 overflow-hidden group"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#1e3b22]/0 group-hover:bg-[#1e3b22]/20 transition-colors" />
              {project.featured && (
                <span className="absolute top-3 left-3 bg-[#c9a84c] text-[#1e3b22] text-[0.6rem] tracking-widest uppercase px-2.5 py-1 font-semibold">
                  Featured
                </span>
              )}
            </div>
            <div className="p-5">
              <p className="text-[0.65rem] tracking-widest uppercase text-[#c9a84c] mb-1">
                {project.type}
              </p>
              <h3
                className="font-semibold text-[#1e3b22] mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {project.title}
              </h3>
              <p className="text-xs text-[#1e3b22]/45 mb-4">
                {project.clientName} · {project.location}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openEdit(project)}
                  className="flex items-center gap-1.5 text-xs text-[#1e3b22]/60 hover:text-[#1e3b22] transition-colors"
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
                  className="ml-auto flex items-center gap-1.5 text-xs text-[#1e3b22]/40 hover:text-[#1e3b22] transition-colors"
                >
                  <ExternalLink size={12} />
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#1e3b22]/8 sticky top-0 bg-white">
              <h3
                className="font-semibold text-[#1e3b22]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {editId ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#1e3b22]/40 hover:text-[#1e3b22]"
              >
                <X size={18} />
              </button>
            </div>
            {saved ? (
              <div className="flex flex-col items-center justify-center py-16">
                <CheckCircle size={40} className="text-[#c9a84c] mb-4" />
                <p className="text-[#1e3b22] font-medium">
                  Saved successfully!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-6 space-y-5">
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
                      <label className="block text-[0.65rem] tracking-widest uppercase text-[#1e3b22]/50 mb-1.5">
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
                  <label className="block text-[0.65rem] tracking-widest uppercase text-[#1e3b22]/50 mb-1.5">
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
                  <label className="block text-[0.65rem] tracking-widest uppercase text-[#1e3b22]/50 mb-1.5">
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
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-[#1e3b22]/50 mb-1.5">
                    Cover Image
                  </label>
                  <div className="border border-[#1e3b22]/20 p-4">
                    {form.coverImage && (
                      <div className="relative aspect-video mb-4 overflow-hidden">
                        <Image
                          src={form.coverImage}
                          alt="Cover"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-[#1e3b22]/60 hover:text-[#1e3b22] transition-colors">
                      {uploading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Upload size={16} />
                      )}
                      {uploading ? "Uploading..." : "Upload from device"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[0.65rem] text-[#1e3b22]/30 mt-2">
                      Or paste a URL:
                    </p>
                    <input
                      name="coverImage"
                      value={form.coverImage}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="form-input mt-2 text-xs"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#1e3b22]"
                  />
                  <span className="text-sm text-[#1e3b22]/70">
                    Feature on homepage
                  </span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#1e3b22] text-[#f5f0e8] text-xs tracking-wider uppercase font-medium hover:bg-[#2d5230] transition-colors"
                  >
                    {editId ? "Save Changes" : "Add Project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-[#1e3b22]/20 text-[#1e3b22]/60 text-xs tracking-wider uppercase hover:bg-[#1e3b22]/5 transition-colors"
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
