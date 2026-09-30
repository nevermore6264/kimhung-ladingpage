export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-background text-navy" role="status">
      <span className="font-heading text-[28px] font-medium">Kim Hưng</span>
      <span className="boot-track" aria-hidden>
        <span className="boot-fill" />
      </span>
      <p className="text-[14px] text-muted-foreground">Đang mở trang</p>
      <span className="sr-only">Đang tải</span>
    </div>
  );
}
