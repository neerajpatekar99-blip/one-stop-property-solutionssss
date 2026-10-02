import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="text-center px-4 max-w-md mx-auto">
        <div className="font-serif text-9xl text-brand font-bold mb-4 opacity-20">
          404
        </div>
        <h1 className="font-serif text-3xl text-navy-800 mb-3">
          Property Not Found
        </h1>
        <p className="text-navy-500 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's
          get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary py-3 px-6">
            <Home size={16} />
            Go Home
          </Link>
          <Link href="/properties" className="btn-outline py-3 px-6">
            <ArrowLeft size={16} />
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
