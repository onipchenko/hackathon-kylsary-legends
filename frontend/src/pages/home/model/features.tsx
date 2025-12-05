import { type ReactNode } from 'react';
import { Building2, BookOpen, Cuboid, Globe2, Scale, UserCheck } from 'lucide-react';

export type FeatureCard = {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  bg: string;
};

export const featureCards: FeatureCard[] = [
  {
    id: 1,
    title: 'About the university',
    description: 'History, mission, and campus overview.',
    icon: <Building2 className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-400',
    bg: 'bg-blue-50',
  },
  {
    id: 2,
    title: 'Programs',
    description: 'Bachelor, Master, and PhD study tracks.',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-blue-600 to-indigo-500',
    bg: 'bg-indigo-50',
  },
  {
    id: 3,
    title: 'Admissions',
    description: 'Key dates, requirements, and application steps.',
    icon: <UserCheck className="w-6 h-6" />,
    color: 'from-indigo-600 to-purple-500',
    bg: 'bg-purple-50',
  },
  {
    id: 4,
    title: '3D tour',
    description: 'Walk through campus facilities in 3D.',
    icon: <Cuboid className="w-6 h-6" />,
    color: 'from-purple-600 to-pink-500',
    bg: 'bg-pink-50',
  },
  {
    id: 5,
    title: 'International',
    description: 'Exchange programs and global partners.',
    icon: <Globe2 className="w-6 h-6" />,
    color: 'from-teal-500 to-emerald-400',
    bg: 'bg-teal-50',
  },
  {
    id: 6,
    title: 'Comparison',
    description: 'Compare universities across core metrics.',
    icon: <Scale className="w-6 h-6" />,
    color: 'from-orange-500 to-amber-400',
    bg: 'bg-orange-50',
  },
];
