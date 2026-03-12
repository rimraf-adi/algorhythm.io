export function Footer() {
  return (
    <footer className="border-t border-black border-opacity-20 py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-bold mb-4 tracking-tighter">{'> algorhythm'}</h3>
            <p className="text-sm text-gray-600">
              master data structures and algorithms through interactive visual learning.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4">resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:opacity-60 transition">documentation</a></li>
              <li><a href="#" className="hover:opacity-60 transition">blog</a></li>
              <li><a href="#" className="hover:opacity-60 transition">api reference</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4">community</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:opacity-60 transition">discord</a></li>
              <li><a href="#" className="hover:opacity-60 transition">github</a></li>
              <li><a href="#" className="hover:opacity-60 transition">twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-black border-opacity-20 pt-8 text-sm text-gray-600 text-center">
          <p>© 2026 algorhythm. built for learners, by nerds.</p>
        </div>
      </div>
    </footer>
  );
}
