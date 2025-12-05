import { useState, useEffect, type ReactNode } from 'react';
import {
  Building2,
  BookOpen,
  UserCheck,
  Cuboid,
  Globe2,
  Scale,
  ArrowLeft,
  CheckCircle2,
  Search,
  Menu,
  GraduationCap,
  Users,
  Trophy,
  Calendar,
  MapPin,
  ChevronRight,
  PlayCircle,
  Download,
  Send,
} from 'lucide-react';
import { navLinks, catalogCards } from './constants';

const App = () => {
  const [activeView, setActiveView] = useState<string | number>('home'); 
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Эффект для шапки при скролле
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeView === 'home' && pendingScroll) {
      const el = document.getElementById(pendingScroll);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setPendingScroll(null);
    }
  }, [activeView, pendingScroll]);

  const goToSection = (id: string) => {
    if (activeView !== 'home') {
      setPendingScroll(id);
      setActiveView('home');
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Данные карточек (Главное меню)
  const features = [
    {
      id: 1,
      title: "Об университете",
      description: "Миссия, история, рейтинги и руководство.",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-400",
      bg: "bg-blue-50"
    },
    {
      id: 2,
      title: "Академ. программы",
      description: "Каталог бакалавриата, магистратуры и PhD.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-blue-600 to-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      id: 3,
      title: "Приём и поступление",
      description: "Гранты, сроки подачи и список документов.",
      icon: <UserCheck className="w-6 h-6" />,
      color: "from-indigo-600 to-purple-500",
      bg: "bg-purple-50"
    },
    {
      id: 4,
      title: "3D-тур",
      description: "Виртуальная прогулка по кампусам.",
      icon: <Cuboid className="w-6 h-6" />,
      color: "from-purple-600 to-pink-500",
      bg: "bg-pink-50"
    },
    {
      id: 5,
      title: "Сотрудничество",
      description: "Международные программы и обмен студентами.",
      icon: <Globe2 className="w-6 h-6" />,
      color: "from-teal-500 to-emerald-400",
      bg: "bg-teal-50"
    },
    {
      id: 6,
      title: "Сравнение ВУЗов",
      description: "Аналитика и сравнение по ключевым метрикам.",
      icon: <Scale className="w-6 h-6" />,
      color: "from-orange-500 to-amber-400",
      bg: "bg-orange-50"
    }
  ];

  const universities = [
    { id: 1, name: "Kazakh National University", city: "Almaty", rating: 4.8, reviews: 2400, image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=60", tag: "Top 10" },
    { id: 2, name: "L.N. Gumilyov Eurasian National University", city: "Astana", rating: 4.7, reviews: 1900, image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=60", tag: "Top 20" },
    { id: 3, name: "Satbayev University", city: "Almaty", rating: 4.6, reviews: 1500, image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=60", tag: "Tech Leader" },
    { id: 4, name: "Asfendiyarov Kazakh National Medical University", city: "Almaty", rating: 4.9, reviews: 3100, image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=500&q=60", tag: "Medical" },
    { id: 5, name: "Nazarbayev University", city: "Astana", rating: 4.9, reviews: 3500, image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=500&q=60", tag: "Research" },
    { id: 6, name: "KIMEP University", city: "Almaty", rating: 4.5, reviews: 1200, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=60", tag: "Business" },
    { id: 7, name: "Al-Farabi Kazakh National University", city: "Almaty", rating: 4.8, reviews: 2800, image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=60", tag: "Top 10" },
    { id: 8, name: "Suleyman Demirel University", city: "Kaskelen", rating: 4.4, reviews: 900, image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=60", tag: "IT Focus" },
  ];

  // --- КОМПОНЕНТЫ РАЗДЕЛОВ ---

  // 1. Об университете
  const AboutComponent = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Profile */}
      <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
        <img src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Campus" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
          <div>
            <div className="flex items-center gap-2 text-blue-300 font-semibold mb-2 uppercase tracking-wider text-sm">Основан в 1934</div>
            <h2 className="text-4xl font-bold text-white mb-2">Национальный Университет</h2>
            <p className="text-gray-200 max-w-2xl">Ведущий центр образования, науки и инноваций, формирующий лидеров будущего.</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Студентов", val: "24k+", icon: <Users className="text-blue-600" /> },
          { label: "Преподавателей", val: "1,200", icon: <GraduationCap className="text-indigo-600" /> },
          { label: "Рейтинг QS", val: "#150", icon: <Trophy className="text-amber-500" /> },
          { label: "Факультетов", val: "16", icon: <Building2 className="text-teal-600" /> },
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">{s.icon}</div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{s.val}</div>
              <div className="text-xs text-gray-500 uppercase font-medium">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Tabs */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span> Миссия и Ценности
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Наша миссия — создание передовой образовательной среды, способствующей развитию человеческого капитала. Мы стремимся к интеграции образования, науки и производства.
            </p>
            <ul className="space-y-3">
              {['Академическая честность', 'Инновационный подход', 'Социальная ответственность'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ректорат</h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div>
                <div className="font-bold text-lg">Ахметов А.А.</div>
                <div className="text-blue-600 text-sm">Ректор университета</div>
                <div className="text-gray-500 text-sm mt-1">Доктор технических наук, профессор</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white p-6 rounded-2xl h-fit">
          <h3 className="font-bold text-xl mb-4">Контакты</h3>
          <ul className="space-y-4 text-blue-100">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1" />
              <span>г. Алматы, пр. Аль-Фараби, 71</span>
            </li>
            <li className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span>+7 (727) 377-33-33</span>
            </li>
            <li className="flex items-center gap-3">
              <Globe2 className="w-5 h-5" />
              <span>info@kaznu.kz</span>
            </li>
          </ul>
          <button className="w-full mt-6 bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Связаться с нами
          </button>
        </div>
      </div>
    </div>
  );

  // 2. Академические программы
  const ProgramsComponent = () => {
    const [filter, setFilter] = useState('All');
    const programs = [
      { name: "Информационные системы", level: "Bachelor", dur: "4 года", code: "6B06101" },
      { name: "Искусственный интеллект", level: "Master", dur: "2 года", code: "7M06102" },
      { name: "Экономика и бизнес", level: "Bachelor", dur: "4 года", code: "6B04101" },
      { name: "Биотехнологии", level: "PhD", dur: "3 года", code: "8D05101" },
    ];

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['All', 'Bachelor', 'Master', 'PhD'].map(t => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === t ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {t === 'All' ? 'Все программы' : t}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
             <input type="text" placeholder="Поиск программы..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
             <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {programs.filter(p => filter === 'All' || p.level === filter).map((prog, i) => (
            <div key={i} className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-indigo-200 cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                  ${prog.level === 'Bachelor' ? 'bg-blue-100 text-blue-700' : 
                    prog.level === 'Master' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                  {prog.level}
                </div>
                <div className="text-gray-400 text-sm font-mono">{prog.code}</div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{prog.name}</h4>
              <div className="flex items-center text-gray-500 text-sm gap-4">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {prog.dur}</span>
                <span className="flex items-center gap-1"><Globe2 className="w-4 h-4" /> RU/EN/KZ</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 3. Приём и поступление (Timeline)
  const AdmissionComponent = () => (
    <div className="max-w-4xl mx-auto py-4">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-gray-900">Путь абитуриента 2024</h3>
        <p className="text-gray-500 mt-2">5 простых шагов к поступлению в университет мечты</p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
        {[
          { title: "Подача документов онлайн", date: "1-30 Июня", desc: "Регистрация на портале DataHub и загрузка сканов.", status: "active" },
          { title: "Сдача ЕНТ / Вступительных", date: "Июль", desc: "Прохождение тестирования в назначенных центрах.", status: "pending" },
          { title: "Конкурс грантов", date: "1-10 Августа", desc: "Участие в республиканском конкурсе грантов.", status: "pending" },
          { title: "Зачисление", date: "25 Августа", desc: "Издание приказа о зачислении и подписание договора.", status: "pending" },
        ].map((step, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              {idx === 0 ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <div className="w-3 h-3 bg-gray-300 rounded-full" />}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{step.title}</span>
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{step.date}</span>
              </div>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 flex justify-center gap-4">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
           <Download className="w-5 h-5" /> Скачать гайд
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
           Подать заявку
        </button>
      </div>
    </div>
  );

  // 5. Международное сотрудничество
  const InternationalComponent = () => (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Мир возможностей</h3>
          <p className="text-slate-300 max-w-xl mb-6">Мы сотрудничаем с 150+ университетами в 40 странах мира. Программы двойного диплома, академическая мобильность и научные стажировки.</p>
          <div className="flex gap-4">
             <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">40+</div>
                <div className="text-xs text-slate-400">Стран</div>
             </div>
             <div className="text-center border-l border-slate-700 pl-4">
                <div className="text-3xl font-bold text-teal-400">150+</div>
                <div className="text-xs text-slate-400">ВУЗов-партнеров</div>
             </div>
             <div className="text-center border-l border-slate-700 pl-4">
                <div className="text-3xl font-bold text-teal-400">500</div>
                <div className="text-xs text-slate-400">Студентов/год</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><Globe2 className="text-teal-600" /> Erasmus+</h4>
            <p className="text-sm text-gray-500 mb-4">Грантовая программа Европейского Союза по обмену студентами и преподавателями.</p>
            <button className="text-teal-600 text-sm font-semibold hover:underline">Подробнее</button>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><Users className="text-blue-600" /> Двудипломное образование</h4>
            <p className="text-sm text-gray-500 mb-4">Получите два диплома: нашего университета и университета-партнера (США, Франция, Китай).</p>
            <button className="text-blue-600 text-sm font-semibold hover:underline">Список программ</button>
         </div>
      </div>
    </div>
  );

  // 6. Сравнение (обновленное)
  const ComparisonComponent = () => (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      {/* Header Comparison Selection */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* University 1 */}
            <div className="flex flex-col items-center flex-1 w-full">
                <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-3 border-4 border-white">
                    <Building2 className="text-blue-600 w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg">KazNU</h3>
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">Алматы</span>
            </div>

            {/* VS Badge */}
            <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-black italic shadow-xl z-10">VS</div>
            </div>

            {/* University 2 */}
            <div className="flex flex-col items-center flex-1 w-full relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">ВЫБОР</div>
                <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-3 border-4 border-indigo-100">
                    <Building2 className="text-indigo-600 w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg">ENU</h3>
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">Астана</span>
            </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">
            <div className="text-left pl-6">Параметр</div>
            <div>KazNU</div>
            <div>ENU</div>
        </div>
        {[
          { label: "Стоимость (год)", v1: "1.2 млн ₸", v2: "1.1 млн ₸", win: 2 },
          { label: "Общежитие", v1: "Есть (Очередь)", v2: "Гарантировано", win: 2 },
          { label: "Рейтинг трудоустройства", v1: "92%", v2: "89%", win: 1 },
          { label: "Военная кафедра", v1: "Есть", v2: "Есть", win: 0 },
          { label: "Язык обучения", v1: "KZ, RU, EN", v2: "KZ, RU, EN, TR", win: 2 },
        ].map((row, i) => (
            <div key={i} className="grid grid-cols-3 py-4 border-b border-gray-50 hover:bg-slate-50 transition-colors items-center text-center">
                <div className="text-left pl-6 font-medium text-gray-700">{row.label}</div>
                <div className={`font-semibold ${row.win === 1 ? 'text-green-600' : 'text-gray-600'}`}>
                    {row.v1}
                </div>
                <div className={`font-semibold ${row.win === 2 ? 'text-green-600' : 'text-gray-600'}`}>
                    {row.v2}
                </div>
            </div>
        ))}
        <div className="p-6 bg-gray-50 flex justify-end">
            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Скачать PDF отчет
            </button>
        </div>
      </div>
    </div>
  );

  // 4. 3D Тур (обновленный)
  const TourComponent = () => (
    <div className="flex flex-col h-full animate-in fade-in duration-700">
        <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <img 
                src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                alt="3D Tour Preview"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all border border-white/50">
                    <PlayCircle className="w-10 h-10 text-white fill-white/50" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-wide">Начать экскурсию</h3>
                <p className="text-gray-300 mt-2">Главный корпус • Библиотека • Технопарк</p>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
            {[
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=300&q=80",
                "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=300&q=80"
            ].map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden h-24 relative cursor-pointer hover:opacity-80 transition-opacity">
                    <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-xs font-bold">Локация {i+1}</div>
                </div>
            ))}
        </div>
    </div>
  );

  const CatalogPage = () => {
    const [city, setCity] = useState('All');
    const [tag, setTag] = useState('All');

    const cities = ['All', ...new Set(universities.map(u => u.city))];
    const tags = ['All', ...new Set(universities.map(u => u.tag))];

    const filteredUniversities = universities.filter(uni => {
      return (city === 'All' || uni.city === city) &&
             (tag === 'All' || uni.tag === tag);
    });

    return (
      <DetailWrapper title="Каталог вузов">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          {/* Левая колонка: список вузов */}
          <div className="md:col-span-8 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg font-semibold">ВУЗы</div>
                <div className="text-gray-600 text-sm">{filteredUniversities.length} активных предложений</div>
              </div>
              <div className="flex items-center gap-2">
                <select value={city} onChange={e => setCity(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'Все города' : c}</option>)}
                </select>
                <select value={tag} onChange={e => setTag(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  {tags.map(t => <option key={t} value={t}>{t === 'All' ? 'Все теги' : t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredUniversities.length > 0 ? filteredUniversities.map((u, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 relative">
                        <img src={u.image} alt={u.name} loading="lazy" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 px-3 py-1 bg-white/80 text-sm font-semibold rounded-full text-blue-700 border border-white/70 shadow-sm">
                          {u.tag}
                        </div>
                    </div>
                    <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">{u.name}</h3>
                            <span className="text-blue-600 font-semibold">{u.rating}/5</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> {u.city}
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setActiveView(1)} className="text-blue-600 text-sm font-semibold hover:underline">
                              О вузе
                            </button>
                            <button onClick={() => setActiveView(3)} className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
                              Поступить
                            </button>
                        </div>
                    </div>
                </div>
              )) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed">
                  <h3 className="text-xl font-medium text-gray-500">Университеты не найдены</h3>
                  <p className="text-gray-400 mt-2">Попробуйте изменить фильтры.</p>
                </div>
              )}
            </div>
          </div>

          {/* Правая колонка: чат-бот */}
          <div className="md:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 self-stretch sticky top-24 h-[calc(100vh-140px)] max-h-[calc(100vh-140px)]">
            <div>
              <p className="text-sm text-blue-600 font-semibold">Помощник</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">Чат-бот подбора вузов</h3>
              <p className="text-gray-500 text-sm mt-2">
                Формат диалога как в GPT: чатистория слева-направо, подсказки и поле ввода внизу.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-3 flex-1 min-h-[240px] overflow-y-auto text-sm text-gray-800">
              {[
                { role: 'assistant', text: 'Привет! Укажи город, направление или уровень — подберу подходящие вузы.' },
                { role: 'user', text: 'Ищу IT бакалавриат в Алматы' },
                { role: 'assistant', text: 'Подойдут: Al-Farabi KazNU (IT), Satbayev University (Tech). Открыть детали?' },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-blue-100 text-gray-900'
                        : 'bg-white text-gray-800 border border-gray-200'
                    } shadow-sm`}
                  >
                    <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                      {m.role === 'user' ? 'Вы' : 'Бот'}
                    </div>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {['Покажи вузы в Алматы', 'IT программы в Астане', 'Топ-3 по рейтингу'].map((q) => (
                <button key={q} className="text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 text-left">
                  {q}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 shadow-inner bg-white">
              <input
                type="text"
                placeholder="Например: бизнес бакалавриат в Алматы"
                className="flex-1 text-sm focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
                Отправить <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </DetailWrapper>
    );
  };

  // Wrapper для детальных страниц
  type DetailWrapperProps = {
    title: string;
    children: ReactNode;
  };

  const DetailWrapper = ({ title, children }: DetailWrapperProps) => (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
            <button 
                onClick={() => setActiveView('home')} 
                className="group flex items-center text-gray-500 mb-8 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm w-fit border border-gray-200"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                Вернуться на главную
            </button>
            
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
                <div className="h-1 w-20 bg-blue-600 rounded-full mt-4"></div>
            </div>

            {children}
        </div>
    </div>
  );

  // --- ГЛАВНАЯ СТРАНИЦА (HOME) ---
  const HomeView = () => (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-out ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">DH</div>
                <span className={`font-bold text-xl ${scrolled ? 'text-gray-800' : 'text-white'}`}>DataHub <span className="font-light opacity-80">Education</span></span>
            </div>
            <div className={`hidden md:flex items-center space-x-8 ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}>
                {navLinks.map((link) =>
                  link.action === 'scroll' ? (
                    <button
                      key={link.id}
                      onClick={() => goToSection(link.target as string)}
                      className="hover:text-blue-500 transition-colors font-medium"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <button
                      key={link.id}
                      onClick={() => setActiveView(link.target)}
                      className={`px-5 py-2 rounded-full font-medium transition-all ${scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-900 hover:bg-gray-100'}`}
                    >
                      {link.label}
                    </button>
                  )
                )}
            </div>
            <button className="md:hidden text-white"><Menu /></button>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="hero" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="Hero" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-sm font-medium mb-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
                Единая образовательная экосистема РК
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                Ваше будущее <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">начинается здесь</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                Аналитика, подбор программ и поступление в лучшие университеты страны в один клик. Прозрачно. Удобно. Бесплатно.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white p-2 rounded-full shadow-2xl max-w-2xl mx-auto flex items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                <div className="pl-4 text-gray-400"><Search className="w-5 h-5" /></div>
                <input 
                    type="text" 
                    placeholder="Поиск по ВУЗу или специальности..." 
                    className="flex-1 px-4 py-3 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-lg"
                />
                <button onClick={() => setActiveView(2)} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-md">
                    Найти
                </button>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-12 text-white/80 animate-in fade-in duration-1000 delay-300">
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">120+</div>
                    <div className="text-sm">ВУЗов</div>
                </div>
                <div className="w-px bg-white/20"></div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">4k+</div>
                    <div className="text-sm">Программ</div>
                </div>
                <div className="w-px bg-white/20"></div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">85k</div>
                    <div className="text-sm">Студентов</div>
                </div>
            </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
                <div 
                    key={f.id}
                    onClick={() => setActiveView(f.id)}
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 relative overflow-hidden transform hover:-translate-y-2"
                >
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${f.color} opacity-10 rounded-bl-[100px] transition-transform group-hover:scale-150`}></div>
                    
                    <div className="relative">
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-5xl font-black text-gray-100 select-none">{f.id}</span>
                            <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center text-gray-700 shadow-sm group-hover:scale-110 transition-transform`}>
                                {f.icon}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{f.title}</h3>
                        <p className="text-gray-500 leading-relaxed mb-6">{f.description}</p>
                        <div className="flex items-center text-blue-600 font-bold text-sm">
                            Перейти <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Catalog Section removed from home to show on dedicated page */}

      {/* Popular Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Популярные университеты</h2>
                <p className="text-gray-500 mt-2">Лидеры рейтинга по мнению студентов 2024</p>
            </div>
            <button onClick={() => setActiveView('catalog')} className="text-blue-600 font-medium hover:underline">Смотреть все</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {universities.slice(0,4).map((uni) => (
                <div key={uni.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gray-200 relative">
                         <img src={uni.image} className="w-full h-full object-cover" alt={uni.name} />
                         <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold text-green-600">{uni.tag}</div>
                    </div>
                    <div className="p-4">
                        <div className="font-bold text-gray-900 mb-1">{uni.name}</div>
                        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1"><MapPin className="w-3 h-3"/> {uni.city}</div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-blue-600">{uni.rating}/5</span>
                            <span className="text-gray-400 text-xs">{uni.reviews.toLocaleString()} отзывов</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">D</div>
                    <span className="font-bold text-xl">DataHub</span>
                </div>
                <p className="text-gray-400 max-w-sm">Мы создаем прозрачную цифровую среду для качественного образования, объединяя студентов и университеты в единое пространство.</p>
            </div>
            <div>
                <h4 className="font-bold mb-6">Платформа</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="hover:text-white cursor-pointer">О проекте</li>
                    <li className="hover:text-white cursor-pointer">Университеты</li>
                    <li className="hover:text-white cursor-pointer">Сотрудничество</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-6">Контакты</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                    <li>support@datahub.kz</li>
                    <li>+7 (777) 123-45-67</li>
                    <li>Астана, Expo C1</li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © 2024 DataHub Education. Все права защищены.
        </div>
      </footer>
    </div>
  );

  // Router Logic
  const renderContent = () => {
    switch(activeView) {
      case 'home': return <HomeView />;
      case 'catalog': return <CatalogPage />;
      case 1: return <DetailWrapper title="Об университете"><AboutComponent /></DetailWrapper>;
      case 2: return <DetailWrapper title="Академические программы"><ProgramsComponent /></DetailWrapper>;
      case 3: return <DetailWrapper title="Приём и поступление"><AdmissionComponent /></DetailWrapper>;
      case 4: return <DetailWrapper title="Виртуальный кампус (3D)"><TourComponent /></DetailWrapper>;
      case 5: return <DetailWrapper title="Международное сотрудничество"><InternationalComponent /></DetailWrapper>;
      case 6: return <DetailWrapper title="Сравнение университетов"><ComparisonComponent /></DetailWrapper>;
      default: return <HomeView />;
    }
  };

  return <div className="font-sans">{renderContent()}</div>;
};

export default App;
