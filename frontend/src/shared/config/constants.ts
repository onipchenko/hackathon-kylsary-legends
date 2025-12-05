export type NavLink = {
  id: string;
  label: string;
  action: 'scroll' | 'route';
  target: string | number;
};

export const navLinks: NavLink[] = [
  { id: 'hero', label: 'Home', action: 'scroll', target: 'hero' },
  { id: 'features', label: 'Features', action: 'scroll', target: 'features' },
  { id: 'catalog', label: 'Catalog', action: 'route', target: 'catalog' },
  { id: 'apply', label: 'Apply', action: 'route', target: 3 },
];

export type CatalogCard = {
  name: string;
  city: string;
  rating: string;
  tag: string;
  img: string;
};

export const catalogCards: CatalogCard[] = [
  {
    name: 'Al-Farabi KazNU',
    city: 'Almaty',
    rating: '4.8',
    tag: 'National',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'ENU',
    city: 'Astana',
    rating: '4.6',
    tag: 'Research',
    img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Satbayev University',
    city: 'Almaty',
    rating: '4.5',
    tag: 'Tech',
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Nazarbayev University',
    city: 'Astana',
    rating: '4.9',
    tag: 'Research',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'KIMEP University',
    city: 'Almaty',
    rating: '4.4',
    tag: 'Business',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'KazATU',
    city: 'Astana',
    rating: '4.2',
    tag: 'Agritech',
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'KazGASA',
    city: 'Almaty',
    rating: '4.1',
    tag: 'Architecture',
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Abai University',
    city: 'Almaty',
    rating: '4.0',
    tag: 'Pedagogy',
    img: 'https://images.unsplash.com/photo-1455734729978-db1ae4f687fc?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'AUES',
    city: 'Almaty',
    rating: '4.3',
    tag: 'Engineering',
    img: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Karaganda University',
    city: 'Karaganda',
    rating: '4.1',
    tag: 'Classic',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'South Kazakhstan University',
    city: 'Shymkent',
    rating: '4.0',
    tag: 'Regional',
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'WKATU Zhangir Khan',
    city: 'Oral',
    rating: '3.9',
    tag: 'Agritech',
    img: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'KBTU',
    city: 'Almaty',
    rating: '4.7',
    tag: 'Tech',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'KEU',
    city: 'Almaty',
    rating: '4.0',
    tag: 'Economics',
    img: 'https://images.unsplash.com/photo-1509099836639-18ba02e2e6ba?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'KazNPU',
    city: 'Almaty',
    rating: '3.8',
    tag: 'Pedagogy',
    img: 'https://images.unsplash.com/photo-1503675970135-0113a06d9c94?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Shakarim University',
    city: 'Semey',
    rating: '3.9',
    tag: 'Regional',
    img: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'ENU College of IT',
    city: 'Astana',
    rating: '4.5',
    tag: 'IT',
    img: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'AITU',
    city: 'Astana',
    rating: '4.3',
    tag: 'Tech',
    img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'KazUEFIT',
    city: 'Astana',
    rating: '4.1',
    tag: 'Finance',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'MUIT',
    city: 'Almaty',
    rating: '4.2',
    tag: 'Telecom',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Toraigyrov University',
    city: 'Pavlodar',
    rating: '3.9',
    tag: 'Engineering',
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
];
