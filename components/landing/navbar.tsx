import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black border-opacity-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          {'> algorhythm'}
        </Link>
        <div className="flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm hover:opacity-60 transition">
            how it works
          </Link>
          <Link href="#curriculum" className="text-sm hover:opacity-60 transition">
            curriculum
          </Link>
          <Link href="/learn" className="px-4 py-2 bg-black text-white text-sm font-medium hover:opacity-80 transition">
            start learning
          </Link>
        </div>
      </div>
    </nav>
  );
}
