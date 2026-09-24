export default function Loading() {
  return (
    <div className="stage flex min-h-[60vh] flex-col items-center justify-center gap-5 text-white" role="status">
      <span className="flex size-14 items-center justify-center bg-white text-[20px] font-black text-navy">KH</span>
      <span className="boot-track" aria-hidden>
        <span className="boot-fill" />
      </span>
      <p className="text-[14px] text-white/80">Đang tải hồ sơ</p>
      <span className="sr-only">Đang tải</span>
    </div>
  );
}
