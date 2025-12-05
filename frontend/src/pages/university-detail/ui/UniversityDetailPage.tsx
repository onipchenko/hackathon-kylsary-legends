import { useEffect, useState } from 'react';
import { Building2, Globe2, GraduationCap, MapPin, Trophy, Users } from 'lucide-react';
import { UniversityDetails } from '../../../entities/university/model/university';

type UniversityDetailPageProps = {
  slug: string | null;
};

const SkeletonLoader = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-64 rounded-2xl bg-gray-200" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-200 p-5 rounded-xl h-24" />
      ))}
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-gray-200 p-8 rounded-2xl h-40" />
        <div className="bg-gray-200 p-8 rounded-2xl h-60" />
      </div>
      <div className="bg-gray-200 p-6 rounded-2xl h-40" />
    </div>
  </div>
);

const UniversityDetailPage = ({ slug }: UniversityDetailPageProps) => {
  const [university, setUniversity] = useState<UniversityDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('No university specified.');
      return;
    }

    const fetchUniversityDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/universities/${slug}`);
        if (!response.ok) {
          throw new Error('University not found');
        }
        const data = await response.json();
        setUniversity(data);
      } catch (error) {
        console.error('Error fetching university details:', error);
        setError('Failed to load university details. Please try again later.');
        setUniversity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityDetails();
  }, [slug]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!university) {
    return <div className="text-center">University not found</div>;
  }

  const stats = [
    { label: "Students", value: university.students_count, icon: <Users className="text-blue-600" /> },
    { label: "Graduates yearly", value: university.graduates_yearly, icon: <GraduationCap className="text-indigo-600" /> },
    { label: "QS ranking", value: university.qs_ranking ? `#${university.qs_ranking}` : null, icon: <Trophy className="text-amber-500" /> },
    { label: "Campuses", value: university.campuses_count, icon: <Building2 className="text-teal-600" /> },
  ].filter(stat => stat.value !== null && stat.value !== undefined);


  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
        <img
          src={university.hero_image_url || 'https://via.placeholder.com/1200x400?text=University'}
          alt={university.name_ru}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{university.name_ru}</h2>
          </div>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">{s.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 uppercase font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{university.description}</p>
          </div>

          {university.programs && university.programs.length > 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Programs</h3>
              <div className="space-y-6">
                {university.programs.map((program) => (
                  <div key={program.id} className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-800">{program.name}</h4>
                    <p className="text-gray-600 mt-2 mb-4">{program.description}</p>
                    {program.program_stats && program.program_stats[0] && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
                        {program.program_stats[0].tuition_fee && (
                          <span className="font-medium">
                            Tuition: <span className="font-bold text-blue-600">{program.program_stats[0].tuition_fee.toLocaleString()} KZT</span>
                          </span>
                        )}
                        {program.program_stats[0].passing_score && (
                          <span className="font-medium">
                            Passing Score: <span className="font-bold text-indigo-600">{program.program_stats[0].passing_score}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-600 text-white p-6 rounded-2xl h-fit">
          <h3 className="font-bold text-xl mb-4">Contacts</h3>
          <ul className="space-y-4 text-blue-100">
            {university.city && (
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" />
                <span>{university.city}{university.country && `, ${university.country}`}</span>
              </li>
            )}
            {university.website && (
              <li className="flex items-center gap-3">
                <Globe2 className="w-5 h-5" />
                <a href={university.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {university.website}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;