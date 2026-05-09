"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, CheckCircle, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface Review {
  id: string;
  name: string;
  message: string;
  rating: number | null;
  project: string | null;
  approved: boolean;
  createdAt: any;
}

interface ReviewForm {
  name: string;
  message: string;
  rating: number;
  project: string;
  approved: boolean;
}

const emptyForm: ReviewForm = {
  name: "",
  message: "",
  rating: 5,
  project: "",
  approved: true,
};

export default function AdminReviewsList({ initialReviews }: { initialReviews: any[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ReviewForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : name === 'rating' ? parseInt(value) : value 
    }));
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowModal(true);
    setSaved(false);
  };

  const openEdit = (r: Review) => {
    setForm({
      name: r.name,
      message: r.message,
      rating: r.rating ?? 5,
      project: r.project ?? "",
      approved: r.approved ?? false,
    });
    setEditId(r.id);
    setShowModal(true);
    setSaved(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this review?")) {
      try {
        const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
        if (res.ok) {
          setReviews(prev => prev.filter(r => r.id !== id));
          router.refresh();
        }
      } catch (err) {
        alert("Failed to delete review");
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editId ? "PATCH" : "POST";
      const url = editId ? `/api/reviews/${editId}` : "/api/reviews";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        const savedReview = data.review;

        if (editId) {
          setReviews(prev => prev.map(r => r.id === editId ? savedReview : r));
        } else {
          setReviews(prev => [savedReview, ...prev]);
        }
        
        setSaved(true);
        router.refresh();
        setTimeout(() => {
          setShowModal(false);
          setSaved(false);
        }, 1200);
      } else {
        alert("Failed to save review");
      }
    } catch (err) {
      alert("Error saving review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold text-forest mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Reviews</h2>
          <p className="text-forest/45 text-sm">{reviews.length} total testimonials</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-forest text-cream text-xs tracking-wider uppercase font-medium hover:bg-forest-mid transition-colors">
          <Plus size={14} /> Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-forest/8 p-7 relative group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-forest flex items-center justify-center text-cream text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-forest">{review.name}</p>
                    <span className={`text-[0.6rem] px-2 py-0.5 uppercase tracking-wider ${review.approved ? 'bg-forest/10 text-forest' : 'bg-gold/20 text-gold'}`}>
                      {review.approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  {review.project && <p className="text-[0.65rem] text-forest/50 tracking-wide uppercase font-medium mt-0.5">{review.project}</p>}
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(review)} className="w-8 h-8 flex items-center justify-center text-forest/40 hover:text-forest border border-forest/15 hover:border-forest/40 transition-all">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(review.id)} className="w-8 h-8 flex items-center justify-center text-red-300 hover:text-red-500 border border-forest/15 hover:border-red-100 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="flex gap-0.5 mb-4">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={14} className={s <= (review.rating ?? 5) ? "fill-gold text-gold" : "text-gold/20"} />
              ))}
            </div>
            <p className="text-forest/60 text-sm leading-relaxed italic">"{review.message}"</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-forest/10">
            <p className="text-forest/30 uppercase tracking-[0.2em] text-xs">No reviews found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-forest/8">
              <h3 className="font-semibold text-forest" style={{ fontFamily: "'Playfair Display', serif" }}>
                {editId ? "Edit Review" : "Add New Review"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-forest/40 hover:text-forest"><X size={18} /></button>
            </div>
            {saved ? (
              <div className="flex flex-col items-center justify-center py-16">
                <CheckCircle size={40} className="text-gold mb-4" />
                <p className="text-forest font-medium">Saved!</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-6 space-y-5">
                {[
                  { name: "name", label: "Client Name *", required: true },
                  { name: "project", label: "Associated Project", required: false },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">{f.label}</label>
                    <input name={f.name} required={f.required} value={form[f.name as keyof ReviewForm] as string} onChange={handleChange} className="form-input" />
                  </div>
                ))}
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">Rating</label>
                  <select name="rating" value={form.rating} onChange={handleChange} className="form-input">
                    {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">Review Message *</label>
                  <textarea name="message" required rows={4} value={form.message} onChange={handleChange} className="form-input resize-none" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="approved" checked={form.approved} onChange={handleChange} className="w-4 h-4 accent-forest" />
                  <span className="text-sm text-forest/70">Approved (visible on website)</span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={loading} className="flex-1 py-3 bg-forest text-cream text-xs tracking-wider uppercase font-medium hover:bg-forest-mid transition-colors disabled:opacity-50">
                    {loading ? "Saving..." : editId ? "Save Changes" : "Add Review"}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-5 py-3 border border-forest/20 text-forest/60 text-xs tracking-wider uppercase">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
