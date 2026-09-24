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
  const code = saveInquiry("dang-ky", {
    name,
    phone,
    email: String(body.email ?? "").trim(),
    company: String(body.company ?? "").trim(),
    need: String(body.need ?? "").trim(),
  });
  return Response.json({ ok: true, code });
}
