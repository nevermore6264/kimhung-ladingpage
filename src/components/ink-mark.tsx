export function InkMark({ children }: { children: React.ReactNode }) {
  return (
    <span className="underline decoration-[#003ab9] decoration-[3px] underline-offset-[6px]">
      {children}
    </span>
  );
}
