import { Breadcrumbs } from "@/components/breadcrumbs";
import { OptInForm } from "@/components/opt-in-form";
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
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-[960px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:px-20">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.14em] text-sky uppercase">Tư vấn</p>
            <h1 className="mt-3 font-heading text-[32px] leading-[1.05] font-semibold text-navy sm:text-[40px]">
              Để lại nhu cầu, Kim Hưng gọi lại
            </h1>
            <p className="mt-4 text-[16px] leading-[1.6] text-muted-foreground">
              Để lại nhu cầu, Kim Hưng gọi lại trong giờ hành chính — hotline{" "}
              {company.hotline}.
            </p>
          </div>
          <div className="border border-border bg-ice p-6 sm:p-8">
            <h2 className="mb-6 text-[20px] font-bold text-navy">Để lại thông tin</h2>
            <OptInForm />
          </div>
        </div>
      </section>
    </>
  );
}
