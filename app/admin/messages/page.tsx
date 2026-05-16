export const runtime = "nodejs";
import { Mail, Calendar, User, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function deleteMessage(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.contact.delete({ where: { id } });
    revalidatePath("/admin/messages");
  }

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-forest mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Inquiries</h2>
        <p className="text-forest/45 text-sm">Manage messages from the contact form.</p>
      </div>

      <div className="bg-white border border-forest/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-forest/5 border-b border-forest/8">
                <th className="px-6 py-4 text-[0.7rem] tracking-widest uppercase text-forest/50 font-semibold">Date</th>
                <th className="px-6 py-4 text-[0.7rem] tracking-widest uppercase text-forest/50 font-semibold">Contact</th>
                <th className="px-6 py-4 text-[0.7rem] tracking-widest uppercase text-forest/50 font-semibold">Subject</th>
                <th className="px-6 py-4 text-[0.7rem] tracking-widest uppercase text-forest/50 font-semibold">Message</th>
                <th className="px-6 py-4 text-[0.7rem] tracking-widest uppercase text-forest/50 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/6">
              {messages.map((m) => (
                <tr key={m.id} className="hover:bg-forest/[0.02] transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-forest/60 text-xs">
                      <Calendar size={13} className="text-gold" />
                      {new Date(m.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-forest font-medium text-sm">
                        <User size={13} className="text-forest/30" />
                        {m.name}
                      </div>
                      <div className="flex items-center gap-2 text-forest/40 text-xs mt-1">
                        <Mail size={12} />
                        {m.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-forest/80 text-sm font-medium">{m.subject || "No Subject"}</p>
                  </td>
                  <td className="px-6 py-5 max-w-xs">
                    <p className="text-forest/50 text-xs leading-relaxed line-clamp-2">{m.message}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={m.id} />
                      <button className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 transition-all rounded">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Mail size={32} className="text-forest/10 mx-auto mb-4" />
                    <p className="text-forest/30 text-sm italic">No messages found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
