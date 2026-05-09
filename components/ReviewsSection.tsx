"use client";

import { useState, useCallback } from "react";
import { Loader2, Plus, X, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import StarRating from "@/components/StarRating";
import type { Review } from "@/lib/types";

const PAGE_SIZE = 4;

export default function ReviewsSection({
  initialReviews,
  totalCount,
}: {
  initialReviews: Review[];
  totalCount: number;
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialReviews.length < totalCount);

  // Form states
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", message: "", rating: 5, project: "" });
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/reviews?limit=${PAGE_SIZE}&offset=${reviews.length}`
      );
      const data = await res.json();
      if (res.ok) {
        setReviews((prev) => [...prev, ...data.reviews]);
        setHasMore(data.hasMore);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [reviews.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => {
          setShowModal(false);
          setSaved(false);
          setForm({ name: "", message: "", rating: 5, project: "" });
        }, 2000);
      } else {
        alert("Failed to submit review");
      }
    } catch (err) {
      alert("Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-28 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="section-subtitle mb-4">Client Stories</p>
          <h2 className="section-title text-forest mb-5">
            What Our Clients Say
          </h2>
          <span className="line-accent mx-auto block mb-8" />
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-forest/20 text-forest text-sm tracking-widest uppercase hover:bg-forest hover:text-cream transition-colors"
          >
            <Plus size={16} /> Add Your Review
          </button>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className="p-8 border border-forest/10 bg-white relative group hover:border-gold/40 transition-colors duration-400 animate-fadeIn"
              style={{ animationDelay: `${(i % PAGE_SIZE) * 90}ms` }}
            >
              {/* Quote mark */}
              <span
                className="absolute top-6 right-8 text-7xl text-forest/6 leading-none select-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
                aria-hidden
              >
                ❝
              </span>
              <div className="mb-5">
                <StarRating rating={review.rating ?? 5} />
              </div>
              <p className="text-forest/70 leading-relaxed mb-6 text-[0.9375rem] italic">
                &ldquo;{review.message}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-forest/8">
                <div
                  className="w-9 h-9 bg-forest flex items-center justify-center text-cream text-sm font-bold flex-shrink-0"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-forest text-sm font-semibold">
                    {review.name}
                  </p>
                  {review.project && (
                    <p className="text-[0.7rem] text-gold tracking-wide">
                      {review.project}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More / All Loaded */}
        {hasMore ? (
          <div className="flex justify-center mt-14">
            <button
              onClick={loadMore}
              disabled={loading}
              className="group inline-flex items-center gap-2 px-7 py-3 border border-forest/20 text-forest/70 text-sm tracking-widest uppercase transition-all duration-300 hover:border-forest hover:text-forest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Loading...
                </>
              ) : (
                "See More Reviews"
              )}
            </button>
          </div>
        ) : reviews.length > PAGE_SIZE ? (
          <div className="flex justify-center mt-14">
            <p className="text-forest/30 text-xs tracking-[0.2em] uppercase">
              All reviews loaded
            </p>
          </div>
        ) : null}
      </div>

      {/* Add Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-forest/8">
              <h3 className="font-semibold text-forest" style={{ fontFamily: "'Playfair Display', serif" }}>
                Add Your Review
              </h3>
              <button onClick={() => setShowModal(false)} className="text-forest/40 hover:text-forest">
                <X size={18} />
              </button>
            </div>
            {saved ? (
              <div className="flex flex-col items-center justify-center py-16">
                <CheckCircle size={40} className="text-gold mb-4" />
                <p className="text-forest font-medium text-center px-4">Thank you for your review!<br/>It will appear here once approved.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {[
                  { name: "name", label: "Your Name *", required: true },
                  { name: "project", label: "Project Name", required: false },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">{f.label}</label>
                    <input name={f.name} required={f.required} value={(form as any)[f.name]} onChange={handleChange} className="form-input" />
                  </div>
                ))}
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">Rating</label>
                  <select name="rating" value={form.rating} onChange={handleChange} className="form-input">
                    {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[0.65rem] tracking-widest uppercase text-forest/50 mb-1.5">Your Review *</label>
                  <textarea name="message" required rows={4} value={form.message} onChange={handleChange} className="form-input resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={submitting} className="flex-1 py-3 bg-forest text-cream text-xs tracking-wider uppercase font-medium hover:bg-forest-mid transition-colors disabled:opacity-50">
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-5 py-3 border border-forest/20 text-forest/60 text-xs tracking-wider uppercase">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
