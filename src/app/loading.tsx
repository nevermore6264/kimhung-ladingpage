export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status">
      <span className="spinner size-8 text-sky" />
      <span className="sr-only">Đang tải</span>
    </div>
  );
}
