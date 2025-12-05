import { useMemo, useState, useRef, useEffect } from 'react';
import { MapPin, Send } from 'lucide-react';
import DetailWrapper from '../../../widgets/detail-wrapper/ui/DetailWrapper';
import { type University } from '../../../entities/university/model/universities';

type CatalogPageProps = {
  universities: University[];
  onSelectView: (view: string | number) => void;
  onBack: () => void;
};

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

const CatalogPage = ({ universities, onSelectView, onBack }: CatalogPageProps) => {
  const [city, setCity] = useState('All');
  const [tag, setTag] = useState('All');
  const [highlightedUniversityIds, setHighlightedUniversityIds] = useState<number[]>([]);

  const resetFilters = () => {
    setCity('All');
    setTag('All');
    setHighlightedUniversityIds([]);
  };

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! Tell me your goals, budget, and preferred city.' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const cities = useMemo(() => ['All', ...new Set(universities.map((u) => u.city))], [universities]);
  const tags = useMemo(() => ['All', ...new Set(universities.flatMap((u) => u.tags))], [universities]);

  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      const cityMatches = city === 'All' || uni.city === city;
      const tagMatches = tag === 'All' || uni.tags.includes(tag);
      const idMatches = highlightedUniversityIds.length === 0 || highlightedUniversityIds.includes(uni.id);

      return cityMatches && tagMatches && idMatches;
    });
  }, [universities, city, tag, highlightedUniversityIds]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || userInput;
    if (!textToSend.trim()) return;

    const newUserMessage: Message = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const assistantResponse = await response.json();
      const newAssistantMessage: Message = { role: 'assistant', text: String(assistantResponse.text) };
      setMessages((prev) => [...prev, newAssistantMessage]);
      
      // Process actions from AI
      if (assistantResponse.action) {
        if (assistantResponse.action.filters) {
          // Only set filters if they are explicitly provided
          if (assistantResponse.action.filters.city) {
            setCity(assistantResponse.action.filters.city);
          } else {
            setCity('All'); // Reset if not provided
          }
          if (assistantResponse.action.filters.tag) {
            setTag(assistantResponse.action.filters.tag);
          } else {
            setTag('All'); // Reset if not provided
          }
        } else {
          // If no filters object is present, reset both city and tag
          setCity('All');
          setTag('All');
        }

        if (assistantResponse.action.highlight_ids) {
          setHighlightedUniversityIds(assistantResponse.action.highlight_ids);
        } else {
          setHighlightedUniversityIds([]); // Clear highlights if no new ones
        }
      } else {
        // If no action object is present, reset all filters and highlights
        setCity('All');
        setTag('All');
        setHighlightedUniversityIds([]);
      }

    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage: Message = { role: 'assistant', text: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <DetailWrapper title="University catalog" onBack={onBack}>
      <div className="grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg font-semibold">ALL</div>
              <div className="text-gray-600 text-sm">
                {filteredUniversities.length} universities match your filters
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All cities' : c}
                  </option>
                ))}
              </select>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All tags' : t}
                  </option>
                ))}
              </select>
              <button
                onClick={resetFilters}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((u) => (
                <div
                  key={u.id}
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow ${
                    highlightedUniversityIds.includes(u.id) ? 'border-blue-500 ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="h-48 relative">
                    <img src={u.image} alt={u.name} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-3 py-1 bg-white/80 text-sm font-semibold rounded-full text-blue-700 border border-white/70 shadow-sm">
                      {u.tags[0]}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{u.name}</h3>
                      <span className="text-blue-600 font-semibold">from {u.min_price} KZT</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {u.city}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => onSelectView(u.slug)}
                        className="text-blue-600 text-sm font-semibold hover:underline"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onSelectView(3)}
                        className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
                      >
                        Admission
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed">
                <h3 className="text-xl font-medium text-gray-500">No universities fit your filters</h3>
                <p className="text-gray-400 mt-2">Try changing the city or tag to see more options.</p>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 self-stretch sticky top-24 h-[calc(100vh-140px)] max-h-[calc(100vh-140px)]">
          <div>
            <p className="text-sm text-blue-600 font-semibold">Smart choice</p>
            <h3 className="text-xl font-bold text-gray-900 mt-1">AI assistant helps you decide</h3>
            <p className="text-gray-500 text-sm mt-2">
              Shortlist universities with GPT tips about strengths, scholarships, and student reviews.
            </p>
          </div>

          <div ref={chatContainerRef} className="bg-gray-50 rounded-lg p-3 space-y-3 flex-1 min-h-[240px] overflow-y-auto text-sm text-gray-800">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed animate-in fade-in ${
                    m.role === 'user'
                      ? 'bg-blue-100 text-gray-900'
                      : 'bg-white text-gray-800 border border-gray-200'
                  } shadow-sm`}
                >
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">
                    {m.role === 'user' ? 'You' : 'Advisor'}
                  </div>
                  {m.text}
                </div>
              </div>
            ))}
             {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed bg-white text-gray-800 border border-gray-200 shadow-sm">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Advisor</div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {['I want top-5 universities', 'IT programs in Astana', 'Dormitory availability'].map((q) => (
              <button key={q} onClick={() => handleQuickReply(q)} className="text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 text-left">
                {q}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 shadow-inner bg-white">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
              className="flex-1 text-sm focus:outline-none bg-transparent"
            />
            <button 
              onClick={() => handleSendMessage()}
              disabled={isLoading}
              className="bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </DetailWrapper>
  );
};

export default CatalogPage;
