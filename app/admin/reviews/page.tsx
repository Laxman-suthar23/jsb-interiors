"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, CheckCircle } from "lucide-react";
import StarRating from "@/components/StarRating";
import { reviewsData as initialReviews } from "@/lib/data";

interface ReviewForm { name: string; message: string; rating: number; project: string; }
const emptyForm: ReviewForm = { name: "", message: "", rating: 5, project: "" };

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ReviewForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.name === "rating" ? Number(e.target.value) : e.target.value }));

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true); setSaved(false); };
  const openEdit = (r: typeof initialReviews[0]) => {
    setForm({ name: r.name, message: r.message, rating: r.rating ?? 5, project: r.project ?? "" });
    setEditId(r.id); setShowModal(true); setSaved(false);
  };
  const handleDelete = (id: string) => { if (confirm("Delete this review?")) setReviews(prev => prev.filter(r => r.id !== id)); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setReviews(prev => prev.map(r => r.id === editId ? { ...r, ...form } : r));
    } else {
      setReviews(prev => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setSaved(true);
    setTimeout(() => { setShowModal(false); setSaved(false); }, 1200);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-[#1e3b22] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Reviews</h2>
          <p className="text-[#1e3b22]/45 text-sm">{reviews.length} testimonials</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3b22] text-[#f5f0e8] text-xs tracking-wider uppercase font-medium hover:bg-[#2d5230] transition-colors">
          <Plus size={14} />Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-[#1e3b22]/8 p-7 relative group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#1e3b22] flex items-center justify-center text-[#f5f0e8] text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1e3b22]">{review.name}</p>
                  {review.project && <p className="text-[0.65rem] text-[#c9a84c] tracking-wide">{review.project}</p>}
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(review)} className="w-7 h-7 flex items-center justify-center text-[#1e3b22]/40 hover:text-[#1e3b22] border border-[#1e3b22]/15 hover:border-[#1e3b22]/40 transition-all">
                  <Pencil size={11} />
                </button>
                <button onClick={() => handleDelete(review.id)} className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 transition-all">
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
            <StarRating rating={review.rating ?? 5} />
            <p className="text-[#1e3b22]/60 text-sm leading-relaxed mt-4 italic">"{review.message}"</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-[#1e3b22]/8">
              <h3 className="font-semibold text-[#1e3b22]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {editId ? "Edit Review" : "Add New Review"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#1e3b22]/40 hover:text-[#1e3b22]"><X size={18} /></button>
            </div>
            {saved ? (
              <div className="flex flex-col items-center justify-center py-16">
                <CheckCircle size={40} className="text-[#c9a84c] mb-4" />
                <p className="text-[#1e3b22] font-medium">Saved!</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-6 space-y-5">
                {[
                  { name: "name", label: "Client Name *", required: true, type: "input" },
                  { name: "project", label: "Project Reference", required: false, type: "input" },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-[0.65rem] tracking-widest uppercase text-[#1e3b22]/50 mb-1.5">{f.label}</label>
                    <input name={f.name} required={f.required} value={(form as Record<string, unknown>)[f.name] as string} onChange={handleChange} className="form-input" />
                  </div>
                ))}
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-[#1e3b22]/50 mb-1.5">Rating</label>
                  <select name="rating" value={form.rating} onChange={handleChange} className="form-input">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r !== 1 ? "s" : ""}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-[#1e3b22]/50 mb-1.5">Review Message *</label>
                  <textarea required name="message" rows={5} value={form.message} onChange={handleChange} className="form-input resize-none" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 py-3 bg-[#1e3b22] text-[#f5f0e8] text-xs tracking-wider uppercase font-medium hover:bg-[#2d5230] transition-colors">
                    {editId ? "Save Changes" : "Add Review"}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-5 py-3 border border-[#1e3b22]/20 text-[#1e3b22]/60 text-xs tracking-wider uppercase">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
