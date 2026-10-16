export default function Loading() {
  return (
    <main className="bg-surface min-h-screen pt-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-24">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-surface-container-low rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="h-96 bg-surface-container-low rounded-xl animate-pulse" />
    </main>
  );
}
