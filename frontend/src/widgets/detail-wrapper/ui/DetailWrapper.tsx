import { type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

export type DetailWrapperProps = {
  title: string;
  onBack: () => void;
  children: ReactNode;
};

const DetailWrapper = ({ title, onBack, children }: DetailWrapperProps) => (
  <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="group flex items-center text-gray-500 mb-8 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm w-fit border border-gray-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to main view
      </button>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full mt-4"></div>
      </div>

      {children}
    </div>
  </div>
);

export default DetailWrapper;
