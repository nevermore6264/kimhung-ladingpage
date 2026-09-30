import { Breadcrumbs } from "@/components/breadcrumbs";
import { OptInForm } from "@/components/opt-in-form";
import { PageIntro } from "@/components/page-intro";
import { company } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Đăng ký tư vấn",
  description: "Đăng ký để Kim Hưng tư vấn que thử, máy đo nồng độ cồn và thiết bị an ninh.",
  path: "/dang-ky",
});

export default function DangKyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Đăng ký tư vấn" },
        ]}
      />
      <PageIntro
        eyebrow="Tư vấn"
        title="Để lại nhu cầu, Kim Hưng gọi lại"
        lede={`Kim Hưng gọi lại trong giờ hành chính — hotline ${company.hotline}.`}
      />
      <section className="mx-auto max-w-[640px] px-5 py-10 sm:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-[20px] font-bold text-navy">Để lại thông tin</h2>
          <OptInForm />
        </div>
      </section>
    </>
  );
}
