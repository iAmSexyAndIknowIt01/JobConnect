export default function Footer() {
  return (
    <footer className="bg-linear-to-t from-gray-900 via-gray-800 to-gray-700 text-gray-300 py-10 mt-0">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} <span className="text-blue-400">JobMatch Japan</span> — Таны итгэлт ажлын хамтрагч.
        </p>
        <div className="flex justify-center gap-6 text-gray-400 text-xl">
          <a href="#" className="hover:text-blue-400 transition"><i className="ri-facebook-fill"></i></a>
          <a href="#" className="hover:text-blue-400 transition"><i className="ri-twitter-x-line"></i></a>
          <a href="#" className="hover:text-blue-400 transition"><i className="ri-linkedin-fill"></i></a>
        </div>
      </div>
    </footer>
  );
}
