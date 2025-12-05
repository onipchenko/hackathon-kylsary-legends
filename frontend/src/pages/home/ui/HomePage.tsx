import { MapPin, Menu } from 'lucide-react';
import { type NavLink } from '../../../shared/config/constants';
import { type University } from '../../../entities/university/model/universities';

type HomePageProps = {
  navLinks: NavLink[];
  universities: University[];
  scrolled: boolean;
  onScrollTo: (id: string) => void;
  onNavigate: (view: string | number) => void;
  onSelectUniversity: (slug:string) => void;
};

const HomePage = ({
  navLinks,
  universities,
  // scrolled, // Scrolled state is no longer used for header styles
  onScrollTo,
  onNavigate,
  onSelectUniversity,
}: HomePageProps) => (
  <div className="min-h-screen bg-slate-50">
    <nav
      className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-md py-3 transition-all duration-500 ease-out"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
            DH
          </div>
          <span className="font-bold text-xl text-gray-800">
            DataHub <span className="font-light opacity-80">Education</span>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-gray-600">
          {navLinks
            .filter(link => link.id === 'hero' || link.id === 'catalog')
            .map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id === 'hero' ? 'home' : link.target)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  link.id === 'catalog'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-transparent text-gray-600 hover:text-blue-500'
                }`}
              >
                {link.label}
              </button>
            )
          )}
        </div>
        <button className="md:hidden text-gray-800">
          <Menu />
        </button>
      </div>
    </nav>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-24">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Popular universities</h2>
          <p className="text-gray-500 mt-2">Top picks from the 2024 ranking</p>
        </div>
        <button onClick={() => onNavigate('catalog')} className="text-blue-600 font-medium hover:underline">
          Open catalog
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {universities.slice(0, 4).map((uni) => (
          <div
            key={uni.id}
            onClick={() => onSelectUniversity(uni.slug)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="h-32 bg-gray-200 relative">
              <img src={uni.image} className="w-full h-full object-cover" alt={uni.name} />
              <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold text-green-600">
                {uni.tags[0]}
              </div>
            </div>
            <div className="p-4">
              <div className="font-bold text-gray-900 mb-1">{uni.name}</div>
              <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {uni.city}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">D</div>
            <span className="font-bold text-xl">DataHub</span>
          </div>
          <p className="text-gray-400 max-w-sm">
            DataHub aggregates educational programs, rankings, and admission steps in one place to make your choice simple.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Navigation</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Programs</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Contacts</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>support@datahub.kz</li>
            <li>+7 (777) 123-45-67</li>
            <li>Astana, Expo C1</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        (c) 2024 DataHub Education. All rights reserved.
      </div>
    </footer>
  </div>
);

export default HomePage;
