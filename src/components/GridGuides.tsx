export default function GridGuides() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[15] hidden lg:block max-w-[1440px] mx-auto px-6"
    >
      <div className="w-full h-full grid grid-cols-4 gap-6">
        <div className="h-full border-l border-[#111110]/[0.04]" />
        <div className="h-full border-l border-[#111110]/[0.04]" />
        <div className="h-full border-l border-[#111110]/[0.04]" />
        <div className="h-full border-l border-r border-[#111110]/[0.04]" />
      </div>
    </div>
  );
}
