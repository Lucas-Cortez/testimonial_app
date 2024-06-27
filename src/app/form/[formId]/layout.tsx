export default function TestimonialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <header className="flex h-16 w-full items-center border-b bg-white">
        <div className="mx-auto flex h-full w-full max-w-screen-lg items-center justify-between">Logo</div>
      </header>

      {children}
    </div>
  );
}
