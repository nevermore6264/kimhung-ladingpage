import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Kim Hưng | Que thử ma túy, máy đo nồng độ cồn, thiết bị an ninh",
  description:
    "Lập phiếu trang bị cho lực lượng: máy đo nồng độ cồn, que thử ma túy hiện trường và cổng dò an ninh. Hồ sơ, giấy tờ, giá sỉ.",
  path: "/",
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage />;
}
