import { saveInquiry } from "@/lib/inquiries";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  if (!name || !phone) {
    return Response.json(
      { ok: false, error: "Cần họ tên và số điện thoại" },
      { status: 400 },
    );
  }
  const items = Array.isArray(body.items) ? body.items : [];
  const code = saveInquiry("lien-he", {
    name,
    phone,
    email: String(body.email ?? "").trim(),
    message: String(body.message ?? "").trim(),
    items: JSON.stringify(items),
  });
  return Response.json({ ok: true, code });
}
