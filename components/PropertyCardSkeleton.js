export default function PropertyCardSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="relative h-40 sm:h-48 md:h-52 bg-gray-200">
        <div className="absolute top-3 left-3 h-5 w-16 bg-gray-300 rounded-lg" />
        <div className="absolute bottom-3 left-3 h-6 w-24 bg-gray-300 rounded-md" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded-lg w-4/5" />
        <div className="h-4 bg-gray-100 rounded-lg w-3/5" />
        <div className="flex gap-4">
          <div className="h-4 bg-gray-100 rounded-lg w-16" />
          <div className="h-4 bg-gray-100 rounded-lg w-20" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-5 bg-gray-100 rounded-full w-16" />
          <div className="h-5 bg-gray-100 rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}
