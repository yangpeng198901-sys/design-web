import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  Plus, 
  Sparkles, 
  Trash2, 
  Layers, 
  Globe, 
  Activity, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  Image, 
  ArrowRight, 
  CornerDownRight, 
  Check, 
  Sliders, 
  Send,
  Building,
  Home,
  Coffee,
  HelpCircle
} from 'lucide-react';
import { sampleProjects, sampleMaterials, designQuizQuestions, quizResults, i18nConfig } from './i18n';
import { Language, Project, MaterialItem, QuizQuestion, ChatMessage, QuizResult } from './types';

export default function App() {
  // Localization state
  const [lang, setLang] = useState<Language>('zh');
  const t = i18nConfig[lang];

  // Active section tracking (portfolio, moodboard, quiz, AI consultant, studio)
  const [activeTab, setActiveTab] = useState<'projects' | 'moodboard' | 'quiz' | 'consultant' | 'about'>('projects');

  // Hero slideshow state
  const [heroSlide, setHeroSlide] = useState(0);

  // Filtered project portfolio states
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Mood board interactive items list
  const [boardMaterials, setBoardMaterials] = useState<MaterialItem[]>([]);
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [diagnosis, setDiagnosis] = useState<{
    dominantVibe: string;
    vibeZH: string;
    vibeEN: string;
    score: number;
    recommendedColors: string[];
  } | null>(null);

  // Design Quiz state machines
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]); // styles stored
  const [quizResultsOutput, setQuizResultsOutput] = useState<QuizResult | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);

  // AI Curation Chat salon states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: t.aiConsult.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiCurating, setIsAiCurating] = useState(false);

  // Contact / Commission form states
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: 'residential',
    size: '',
    notes: ''
  });
  const [formSubmissionState, setFormSubmissionState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Rotate custom hero slideshow slides
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % t.hero.slides.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [t.hero.slides.length]);

  // Handle Moodboard dynamic atmosphere calculation whenever materials list is altered
  useEffect(() => {
    if (boardMaterials.length < 2) {
      setDiagnosis(null);
      return;
    }

    // Accumulate the votes for style styles based on material categories
    const counts: Record<string, number> = {};
    // Let's analyze how materials map to our core styles
    // m1, m2, m5 -> Japandi
    // m3, m2, m7 -> Wabi-Sabi
    // m5, m6, m8 -> Bauhaus Minimalist
    // m7, m8, m9 -> Organic Luxury
    boardMaterials.forEach(item => {
      // Custom heuristic weights
      if (item.id === 'm1' || item.id === 'm2') {
        counts['Japandi'] = (counts['Japandi'] || 0) + 1.2;
      }
      if (item.id === 'm3' || item.id === 'm2') {
        counts['Wabi-Sabi'] = (counts['Wabi-Sabi'] || 0) + 1.5;
      }
      if (item.id === 'm5' || item.id === 'm6') {
        counts['Bauhaus Minimalist'] = (counts['Bauhaus Minimalist'] || 0) + 1.4;
      }
      if (item.id === 'm7' || item.id === 'm8') {
        counts['Organic luxury'] = (counts['Organic luxury'] || 0) + 1.3;
      }
      if (item.id === 'm9') {
        counts['Organic luxury'] = (counts['Organic luxury'] || 0) + 1.2;
        counts['Wabi-Sabi'] = (counts['Wabi-Sabi'] || 0) + 0.8;
      }
    });

    // Find style with max values
    let bestStyle = 'Japandi';
    let maxVal = 0;
    Object.entries(counts).forEach(([style, val]) => {
      if (val > maxVal) {
        maxVal = val;
        bestStyle = style;
      }
    });

    // Grab corresponding profile
    const styleProfile = quizResults[bestStyle];
    if (styleProfile) {
      setDiagnosis({
        dominantVibe: bestStyle,
        vibeZH: styleProfile.styleNameZH,
        vibeEN: styleProfile.styleNameEN,
        score: Math.min(65 + Math.round(maxVal * 15), 100),
        recommendedColors: styleProfile.recommendedPalette
      });
    }
  }, [boardMaterials]);

  // Run dynamic analysis for aesthetic quiz once answers are submitted completely
  const handleQuizAnswer = (styleTag: string) => {
    const updatedAnswers = [...quizAnswers, styleTag];
    setQuizAnswers(updatedAnswers);

    if (currentQuizIndex + 1 < designQuizQuestions.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      // All answered, generate outcomes
      setQuizLoading(true);
      setTimeout(() => {
        // Find top voted style tag
        const votes: Record<string, number> = {};
        updatedAnswers.forEach(ans => {
          votes[ans] = (votes[ans] || 0) + 1;
        });

        let mainWinner = 'Japandi';
        let topCount = 0;
        Object.entries(votes).forEach(([tag, qty]) => {
          if (qty > topCount) {
            topCount = qty;
            mainWinner = tag;
          }
        });

        const targetResult = quizResults[mainWinner];
        setQuizResultsOutput(targetResult);
        setQuizLoading(false);
      }, 1400);
    }
  };

  const restartQuiz = () => {
    setQuizAnswers([]);
    setCurrentQuizIndex(0);
    setQuizResultsOutput(null);
    setQuizStarted(false);
  };

  // Call server API for generative space consultation
  const transmitConsultation = async (customPrompt?: string) => {
    const rawToUse = customPrompt || chatInput;
    if (!rawToUse.trim() || isAiCurating) return;

    // Reset input fields
    if (!customPrompt) setChatInput('');

    // Prepend user message immediately to the context
    const newUserMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      text: rawToUse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newUserMsg]);
    setIsAiCurating(true);

    try {
      // Map existing messages to API body history format
      const apiHistory = chatMessages.slice(1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: rawToUse,
          language: lang,
          history: apiHistory
        })
      });

      if (!res.ok) {
        throw new Error('HTTP failure response');
      }

      const data = await res.json();
      const modelAnswer = data.text || 'Error parsing generated concept.';

      setChatMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'model',
          text: modelAnswer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'model',
          text: t.aiConsult.error,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiCurating(false);
    }
  };

  // Static submission trigger for bespoke inquiry
  const submitBespokeInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formInput.name || !formInput.email || !formInput.phone || !formInput.size) {
      setFormSubmissionState('error');
      return;
    }

    setFormSubmissionState('sending');
    setTimeout(() => {
      setFormSubmissionState('success');
      // Reset form variables
      setFormInput({
        name: '',
        email: '',
        phone: '',
        roomType: 'residential',
        size: '',
        notes: ''
      });
    }, 1500);
  };

  // Helper formatting engine to translate simple markdown response returned by backend into beautiful DOM structures
  const renderMarkdownAlternative = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Render Headings
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-lg font-bold tracking-tight font-display mt-5 mb-2 text-studio-dark border-l-2 border-studio-accent pl-3">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('#### ')) {
        return <h5 key={idx} className="text-sm font-semibold tracking-wide uppercase font-display text-studio-accent mt-4 mb-1.5">{line.replace('#### ', '')}</h5>;
      }
      // Render Bullet Points
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const pureContent = line.replace(/^[-*]\s+/, '');
        // Check for internal inline bold tags (**text**)
        return (
          <li key={idx} className="ml-5 list-disc text-sm text-studio-muted leading-relaxed mb-1">
            {parseBoldText(pureContent)}
          </li>
        );
      }
      // Standard Paragraph
      if (line.trim() === '') {
        return <div key={idx} className="h-2"></div>;
      }
      return <p key={idx} className="text-sm leading-relaxed text-studio-muted mb-2 font-sans">{parseBoldText(line)}</p>;
    });
  };

  const parseBoldText = (text: string) => {
    const regex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="font-semibold text-studio-dark">{match[1]}</strong>);
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div id="aura-app-root" className="min-h-screen bg-[#F8F7F4] text-studio-dark font-sans flex flex-col relative selection:bg-studio-accent/20">
      
      {/* 1. Global Fine-Grid Background lines evoking arch plan blueprint */}
      <div className="absolute inset-0 draft-bg pointer-events-none opacity-40 z-0" />

      {/* 2. Sticky Master Navigation Header */}
      <nav id="master-navigation" className="sticky top-0 z-50 glass bg-white/70 border-b border-black/[0.06] backdrop-blur-md px-4 sm:px-12 py-5 transition-editorial flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div>
            <span className="text-lg font-bold tracking-widest text-studio-dark block line-clamp-1 font-display hover:text-studio-accent transition-colors">UP.SPACE 向上生长空间艺术</span>
            <span className="text-[9px] tracking-widest text-studio-muted block md:inline border-t border-black/5 mt-0.5">Interior Studio</span>
          </div>
        </div>

        {/* Desktop Tab System */}
        <div className="hidden lg:flex items-center space-x-1.5 p-1 bg-black/[0.03] rounded-full">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${activeTab === 'projects' ? 'bg-studio-dark text-white shadow-sm' : 'text-studio-muted hover:text-studio-dark'}`}
          >
            {t.nav.projects}
          </button>
          <button 
            onClick={() => setActiveTab('moodboard')}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${activeTab === 'moodboard' ? 'bg-studio-dark text-white shadow-sm' : 'text-studio-muted hover:text-studio-dark'}`}
          >
            {t.nav.moodboard}
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${activeTab === 'quiz' ? 'bg-studio-dark text-white shadow-sm' : 'text-studio-muted hover:text-studio-dark'}`}
          >
            {t.nav.quiz}
          </button>
          <button 
            onClick={() => setActiveTab('consultant')}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${activeTab === 'consultant' ? 'bg-studio-dark text-white shadow-sm' : 'text-studio-muted hover:text-studio-dark'}`}
          >
            {t.nav.consultant}
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${activeTab === 'about' ? 'bg-studio-dark text-white shadow-sm' : 'text-studio-muted hover:text-studio-dark'}`}
          >
            {t.nav.team}
          </button>
        </div>

        {/* Control and Translation Switcher */}
        <div className="flex items-center space-x-3.5">
          {/* Mobile Tab Selector modal block (shown as small pills on smaller displays) */}
          <div className="lg:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="bg-[#F8F7F4] border border-black/10 text-xs font-bold tracking-widest uppercase py-1.5 px-3.5 focus:outline-none focus:border-studio-accent rounded-sm"
            >
              <option value="projects">{t.nav.projects}</option>
              <option value="moodboard">{t.nav.moodboard}</option>
              <option value="quiz">{t.nav.quiz}</option>
              <option value="consultant">{t.nav.consultant}</option>
              <option value="about">{t.nav.team}</option>
            </select>
          </div>

          <div className="flex items-center border border-black/[0.08] p-0.5 rounded-sm bg-white">
            <button 
              onClick={() => setLang('en')}
              className={`px-2 py-1 text-[10px] font-bold tracking-widest transition-all ${lang === 'en' ? 'bg-studio-dark text-white' : 'text-studio-muted hover:text-studio-dark'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('zh')}
              className={`px-2 py-1 text-[10px] font-bold tracking-widest transition-all ${lang === 'zh' ? 'bg-studio-dark text-white' : 'text-studio-muted hover:text-studio-dark'}`}
            >
              中文
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Immersive Main Segment Area */}
      <main className="flex-1 z-10 relative flex flex-col">
        
        {/* HERO SLIDESHOW BAR (Always showcased initially for top artistic weight) */}
        <header id="studio-headline-hero" className="border-b border-black/[0.06] bg-white bg-opacity-40 py-10 md:py-16 px-4 sm:px-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-left relative z-10">
            <div className="inline-flex items-center space-x-2 text-[10px] font-semibold tracking-widest text-studio-accent uppercase mb-3 bg-studio-accent/10 px-2.5 py-1.5 rounded-sm">
              <span className="w-1.5 h-1.5 bg-studio-accent rounded-full animate-ping" />
              <span>{t.hero.tag}</span>
            </div>

            {/* Seamless Slideshow Text fade loop */}
            <div className="h-[120px] sm:h-[140px] flex items-center mb-4">
              <div key={heroSlide} className="transition-all duration-700 transform translate-y-0 opacity-100">
                <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-studio-dark mb-3 font-display leading-[1.15]">
                  {t.hero.slides[heroSlide].heading}
                </h2>
                <p className="text-xs sm:text-sm text-studio-muted max-w-lg leading-relaxed font-sans">
                  {t.hero.slides[heroSlide].sub}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-6">
              <button 
                onClick={() => {
                  const inquiryElement = document.getElementById('studio-inquiry-box');
                  if (inquiryElement) {
                    inquiryElement.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveTab('about');
                  }
                }}
                className="bg-studio-dark text-white px-7 py-3 text-xs font-bold uppercase tracking-widest hover:bg-studio-accent transition-all duration-300 flex items-center gap-2 rounded-sm"
              >
                <span>{t.hero.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center space-x-2.5">
                <span className="text-[11px] font-bold tracking-widest text-studio-accent uppercase border-b-2 border-studio-accent/20 pb-0.5 ">{t.hero.scrollDown}</span>
              </div>
            </div>
          </div>

          {/* Quick numbers widget */}
          <div className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-col gap-4 text-center md:text-right border-t md:border-t-0 md:border-l border-black/[0.06] pt-6 md:pt-0 md:pl-12 min-w-[200px]">
            <div>
              <span className="text-2xl sm:text-3xl font-light tracking-tight font-display text-studio-dark block">140+</span>
              <span className="text-[9px] uppercase tracking-widest text-[#8C8C8C]">{t.hero.statProjects}</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-light tracking-tight font-display text-studio-dark block">18</span>
              <span className="text-[9px] uppercase tracking-widest text-[#8C8C8C]">{t.hero.statAwards}</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-light tracking-tight font-display text-studio-dark block">12</span>
              <span className="text-[9px] uppercase tracking-widest text-[#8C8C8C]">{t.hero.statExperience}</span>
            </div>
          </div>
        </header>

        {/* TAB MODULE SWITCHER */}
        <section className="flex-1 bg-white/45 flex flex-col">

          {/* TAB 1: CURATED PORTFOLIO SHOWCASE */}
          {activeTab === 'projects' && (
            <div id="tab-portfolio-exhibit" className="py-12 px-4 sm:px-12 flex-1 flex flex-col">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-light tracking-tight font-display text-studio-dark mb-2">
                    {t.projects.title}
                  </h3>
                  <p className="text-xs text-[#8C8C8C] leading-relaxed">
                    {t.projects.subtitle}
                  </p>
                </div>

                {/* Flat Filter Controls */}
                <div className="flex flex-wrap gap-1 bg-black/[0.03] p-1 rounded-sm self-start">
                  {['all', 'residential', 'commercial', 'hospitality'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProjectFilter(cat)}
                      className={`px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-all ${projectFilter === cat ? 'bg-white text-studio-dark font-black shadow-xs' : 'text-studio-muted hover:text-studio-dark'}`}
                    >
                      {cat === 'all' && t.projects.all}
                      {cat === 'residential' && t.projects.residential}
                      {cat === 'commercial' && t.projects.commercial}
                      {cat === 'hospitality' && t.projects.hospitality}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 flex-1">
                {sampleProjects
                  .filter(p => projectFilter === 'all' || p.category === projectFilter)
                  .map((project) => (
                    <article 
                      key={project.id} 
                      onClick={() => setSelectedProject(project)}
                      className="group cursor-pointer bg-[#F8F7F4] border border-black/[0.06] hover:border-studio-dark/55 transition-editorial flex flex-col h-full rounded-sm overflow-hidden"
                    >
                      <div className="relative aspect-video filter saturate-90 group-hover:saturate-100 transition-all duration-500 overflow-hidden bg-zinc-200">
                        <img 
                          src={project.mainImage} 
                          alt={lang === 'zh' ? project.titleZH : project.titleEN}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-studio-dark/85 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-xs scale-90 group-hover:scale-100 transition-transform">
                          {project.year}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-[#8C8C8C] mb-1">
                            {lang === 'zh' ? project.categoryLabelZH : project.categoryLabelEN} — {lang === 'zh' ? project.locationZH : project.locationEN}
                          </div>
                          <h4 className="text-lg font-light tracking-tight group-hover:text-studio-accent transition-colors font-display line-clamp-1">
                            {lang === 'zh' ? project.titleZH : project.titleEN}
                          </h4>
                          <p className="text-xs text-studio-muted leading-relaxed line-clamp-2 mt-2 font-sans italic">
                            {lang === 'zh' ? project.subtitleZH : project.subtitleEN}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-black/[0.04] flex items-center justify-between">
                          {/* Colored Atmospheric base nodes */}
                          <div className="flex space-x-1">
                            {project.palette.slice(0, 3).map((clr, i) => (
                              <span 
                                key={i} 
                                className="w-2.5 h-2.5 rounded-full block border border-black/10" 
                                style={{ backgroundColor: clr }}
                                title={clr}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-studio-dark inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            {t.projects.viewDetails} <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>

              {/* PROJECT OVERLAY DRAWER MODAL ENVELOPE */}
              {selectedProject && (
                <div id="drawer-room-overview" className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end transition-opacity duration-300">
                  <div className="w-full max-w-4xl bg-[#F8F7F4] h-full flex flex-col shadow-2xl relative border-l border-black/10 animate-slide-left overflow-y-auto">
                    
                    {/* Sticky Overlay Header */}
                    <header className="sticky top-0 bg-white border-b border-black/[0.06] p-6 z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#BBA28D] bg-[#F3ECE5] px-2.5 py-1 rounded-sm">
                          {lang === 'zh' ? selectedProject.categoryLabelZH : selectedProject.categoryLabelEN}
                        </span>
                        <span className="text-xs text-studio-muted font-mono">{selectedProject.detail.specs.vibe}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors group"
                      >
                        <X className="w-5 h-5 text-studio-dark group-hover:rotate-90 transition-transform duration-300" />
                      </button>
                    </header>

                    {/* Main Overlay Content */}
                    <div className="p-6 sm:p-12 space-y-10">
                      {/* Sub-headline Section */}
                      <div>
                        <span className="text-xs text-[#8C8C8C] font-mono tracking-widest block uppercase mb-1">PROJECT CONCEPT / 空间意境</span>
                        <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-studio-dark font-serif italic mb-2">
                          {lang === 'zh' ? selectedProject.titleZH : selectedProject.titleEN}
                        </h3>
                        <p className="text-sm font-sans text-studio-muted font-light leading-relaxed max-w-2xl">
                          {lang === 'zh' ? selectedProject.subtitleZH : selectedProject.subtitleEN}
                        </p>
                      </div>

                      {/* Main Big Display Image & Gallery Strip */}
                      <figure className="space-y-4">
                        <div className="aspect-video w-full overflow-hidden bg-zinc-200 border border-black/10">
                          <img 
                            src={selectedProject.mainImage} 
                            alt="Large display room" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {selectedProject.gallery.map((img, i) => (
                            <div key={i} className="aspect-video overflow-hidden bg-zinc-300 border border-black/10">
                              <img src={img} alt="Gallery item" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                          ))}
                        </div>
                      </figure>

                      {/* Specification & Design Intent split */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-black/[0.06]">
                        {/* Meta Spec panel */}
                        <div className="bg-black/[0.03] p-6 rounded-sm space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C8C8C] pb-2 border-b border-black/[0.06]">
                            TECHNICAL INDEX / 数据轴
                          </h4>
                          <div>
                            <span className="text-[10px] text-studio-muted block uppercase">{t.projects.areaLabel}</span>
                            <span className="text-sm font-semibold text-studio-dark">{selectedProject.area}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-studio-muted block uppercase">{t.projects.locationLabel}</span>
                            <span className="text-sm font-semibold text-studio-dark">{lang === 'zh' ? selectedProject.locationZH : selectedProject.locationEN}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-studio-muted block uppercase">{t.projects.yearLabel}</span>
                            <span className="text-sm font-semibold text-studio-dark">{selectedProject.year}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-studio-muted block uppercase">{t.projects.vibeLabel}</span>
                            <span className="text-sm font-semibold text-studio-accent">{selectedProject.detail.specs.vibe}</span>
                          </div>
                        </div>

                        {/* Detailed custom essay */}
                        <div className="lg:col-span-2 space-y-5">
                          <div className="space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#8C8C8C]">{t.projects.conceptTitle}</span>
                            <p className="text-sm leading-relaxed text-studio-muted-dark font-sans whitespace-pre-line text-justify">
                              {lang === 'zh' ? selectedProject.detail.conceptZH : selectedProject.detail.conceptEN}
                            </p>
                          </div>

                          {/* Atmospheric Colors Palette */}
                          <div className="pt-4 border-t border-black/[0.04] space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#8C8C8C]">{t.projects.colorPalette}</span>
                            <div className="flex flex-wrap gap-3">
                              {selectedProject.palette.map((clr, index) => (
                                <div key={index} className="flex items-center space-x-2 bg-white px-2 py-1.5 border border-black/[0.05] rounded-sm">
                                  <span className="w-5 h-5 rounded-full block border border-black/10" style={{ backgroundColor: clr }} />
                                  <span className="text-[10px] font-mono text-studio-dark">{clr}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Curated Materials */}
                          <div className="pt-4 border-t border-black/[0.04] space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#8C8C8C]">{t.projects.materialsTitle}</span>
                            <div className="flex flex-wrap gap-2">
                              {(lang === 'zh' ? selectedProject.detail.materialsZH : selectedProject.detail.materialsEN).map((mName, index) => (
                                <span key={index} className="px-3 py-1.5 bg-studio-dark/5 text-studio-dark text-[11px] font-mono rounded-sm">
                                  {mName}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-6 border-t border-black/[0.1] text-center">
                        <button 
                          onClick={() => setSelectedProject(null)}
                          className="px-8 py-3.5 border border-studio-dark text-xs font-bold uppercase tracking-widest hover:bg-studio-dark hover:text-white transition-all duration-300 rounded-sm"
                        >
                          {t.projects.close}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* TAB 2: INTERACTIVE MOOD BOARD */}
          {activeTab === 'moodboard' && (
            <div id="tab-mood-board" className="py-12 px-4 sm:px-12 flex-1 flex flex-col md:flex-row gap-8">
              
              {/* Materials Selection Dock */}
              <div className="w-full md:w-5/12 space-y-6">
                <div>
                  <h3 className="text-2xl font-light tracking-tight font-display text-studio-dark mb-2">
                    {t.moodboard.title}
                  </h3>
                  <p className="text-xs text-studio-muted leading-relaxed">
                    {t.moodboard.subtitle}
                  </p>
                </div>

                <div className="bg-orange-50 bg-opacity-70 text-studio-accent border border-studio-accent/25 px-4 py-3.5 text-xs rounded-sm">
                  {t.moodboard.instruction}
                </div>

                {/* Filter Material Categories */}
                <div className="flex flex-wrap gap-1 border-b border-black/[0.06] pb-3">
                  {['all', 'flooring', 'wall', 'cabinet', 'textile', 'accent'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setMaterialFilter(cat)}
                      className={`px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase rounded-sm transition-all ${materialFilter === cat ? 'bg-studio-dark text-white' : 'text-studio-muted hover:text-studio-dark'}`}
                    >
                      {cat === 'all' && t.moodboard.categories.all}
                      {cat === 'flooring' && t.moodboard.categories.flooring}
                      {cat === 'wall' && t.moodboard.categories.wall}
                      {cat === 'cabinet' && t.moodboard.categories.cabinet}
                      {cat === 'textile' && t.moodboard.categories.textile}
                      {cat === 'accent' && t.moodboard.categories.accent}
                    </button>
                  ))}
                </div>

                {/* Material Catalog list */}
                <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[460px] overflow-y-auto pr-1">
                  {sampleMaterials
                    .filter(m => materialFilter === 'all' || m.category === materialFilter)
                    .map((item) => {
                      const alreadyAdded = boardMaterials.some(bm => bm.id === item.id);
                      return (
                        <div 
                          key={item.id}
                          onClick={() => {
                            if (alreadyAdded) {
                              setBoardMaterials(prev => prev.filter(bm => bm.id !== item.id));
                            } else {
                              setBoardMaterials(prev => [...prev, item]);
                            }
                          }}
                          className={`group cursor-pointer border rounded-sm p-2 transition-all relative overflow-hidden flex flex-col justify-between ${alreadyAdded ? 'bg-studio-accent/10 border-studio-accent ring-1 ring-studio-accent/50' : 'bg-white border-black/[0.06] hover:border-black/30'}`}
                        >
                          <div>
                            <div className="aspect-square w-full rounded-sm overflow-hidden bg-gray-100 mb-2 relative">
                              <img src={item.image} alt={item.nameEN} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              {item.colorHex && (
                                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border border-black/10 block" style={{ backgroundColor: item.colorHex }} />
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-studio-dark leading-tight line-clamp-1">
                              {lang === 'zh' ? item.nameZH : item.nameEN}
                            </span>
                          </div>
                          
                          <div className="mt-2 pt-1 border-t border-black/[0.04] flex items-center justify-between">
                            <span className="text-[8px] uppercase tracking-widest text-studio-muted">
                              {lang === 'zh' ? item.categoryLabelZH : item.categoryLabelEN}
                            </span>
                            
                            {alreadyAdded ? (
                              <span className="w-4 h-4 bg-studio-accent text-white rounded-full flex items-center justify-center scale-90">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                            ) : (
                              <span className="p-0.5 bg-black/5 hover:bg-black/10 rounded-full text-studio-dark group-hover:rotate-95 transition-transform">
                                <Plus className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Sandbox Working Canvas Plot Area */}
              <div className="flex-1 bg-white border border-black/[0.06] rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xs">
                
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-4 mb-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-studio-dark flex items-center gap-2">
                      <Layers className="w-4 h-4 text-studio-accent" />
                      {t.moodboard.boardTitle}
                    </h4>
                    <span className="text-[10px] text-[#8C8C8C]">{boardMaterials.length} Elements Selected / 已选板材</span>
                  </div>

                  {boardMaterials.length > 0 && (
                    <button 
                      onClick={() => setBoardMaterials([])}
                      className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center gap-1.5 px-3 py-1.5 transition-colors rounded-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {t.moodboard.buttonClear}
                    </button>
                  )}
                </div>

                {/* Drag / Select workspace block view */}
                <div className="flex-1 min-h-[220px] bg-[#F8F7F4] border-2 border-dashed border-black/[0.08] rounded-sm p-4 flex flex-wrap gap-4 items-center justify-center relative">
                  
                  {boardMaterials.length === 0 ? (
                    <div className="text-center max-w-xs space-y-2 pointer-events-none">
                      <Layers className="w-8 h-8 text-studio-muted mx-auto opacity-30 animate-pulse" />
                      <p className="text-xs text-studio-muted italic">
                        {t.moodboard.boardPlaceholder}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                      {boardMaterials.map((element) => (
                        <div 
                          key={element.id}
                          className="bg-white border border-black/[0.06] p-2.5 rounded-sm shadow-xs flex items-center space-x-3 group relative animate-fade-in"
                        >
                          <img src={element.image} alt="" className="w-10 h-10 object-cover rounded-xs border border-black/5" />
                          <div className="flex-1 min-w-0">
                            <span className="text-[11px] font-bold block text-studio-dark truncate">
                              {lang === 'zh' ? element.nameZH : element.nameEN}
                            </span>
                            <span className="text-[9px] text-[#8C8C8C] block truncate">
                              {lang === 'zh' ? element.textureDescriptionZH : element.textureDescriptionEN}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setBoardMaterials(prev => prev.filter(bm => bm.id !== element.id));
                            }}
                            className="absolute -top-1.5 -right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Atmospheric Diagnosis Assessment module */}
                <div className="mt-6 pt-5 border-t border-black/[0.06] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C8C8C]">
                    🎯 {t.moodboard.summaryTitle}
                  </h4>

                  {!diagnosis ? (
                    <p className="text-xs text-[#8C8C8C] italic">
                      {t.moodboard.summaryEmpty}
                    </p>
                  ) : (
                    <div className="bg-black/[0.02] p-5 rounded-xs border border-black/[0.04] grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-8 items-center animate-fade-in">
                      
                      {/* Dominant design aura */}
                      <div>
                        <span className="text-[9px] text-studio-muted uppercase tracking-widest block">{t.moodboard.summaryResultHeader}</span>
                        <span className="text-base font-bold text-studio-accent block tracking-tight font-display">
                          {lang === 'zh' ? diagnosis.vibeZH : diagnosis.vibeEN}
                        </span>
                      </div>

                      {/* Compatibility Index Bar meters */}
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-studio-muted mb-1 font-mono">
                          <span>{t.moodboard.matchedVibe}</span>
                          <span className="font-bold text-studio-dark">{diagnosis.score}%</span>
                        </div>
                        <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-studio-accent h-full transition-all duration-700" style={{ width: `${diagnosis.score}%` }} />
                        </div>
                      </div>

                      {/* Matching custom color chips */}
                      <div>
                        <span className="text-[9px] text-studio-muted uppercase tracking-widest block mb-1.5">Atmosphere Colors</span>
                        <div className="flex items-center space-x-1.5">
                          {diagnosis.recommendedColors.map((clrHex, i) => (
                            <span 
                              key={i} 
                              className="w-5 h-5 rounded-full block border border-black/10 shadow-xs" 
                              style={{ backgroundColor: clrHex }}
                              title={clrHex}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}


          {/* TAB 3: SPATIAL RESONANCE DESIGN QUIZ */}
          {activeTab === 'quiz' && (
            <div id="tab-spatial-quiz" className="py-12 px-4 sm:px-12 flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
              {!quizStarted && !quizResultsOutput ? (
                <div className="text-center space-y-6 max-w-xl animate-fade-in py-8">
                  <div className="w-14 h-14 bg-studio-accent/10 text-studio-accent rounded-full flex items-center justify-center mx-auto">
                    <Activity className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-light tracking-tight font-display text-studio-dark">
                      {t.quiz.title}
                    </h3>
                    <p className="text-xs text-studio-muted max-w-md mx-auto leading-relaxed">
                      {t.quiz.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setQuizStarted(true);
                      setQuizAnswers([]);
                      setCurrentQuizIndex(0);
                    }}
                    className="bg-studio-dark text-white text-xs font-bold uppercase tracking-widest px-8 py-4 px-10 hover:bg-studio-accent transition-all duration-300 rounded-sm"
                  >
                    {t.quiz.start}
                  </button>
                </div>
              ) : quizLoading ? (
                <div className="text-center py-16 space-y-4 animate-pulse">
                  <Sparkles className="w-10 h-10 text-studio-accent mx-auto animate-spin" />
                  <p className="text-sm tracking-widest uppercase font-bold text-studio-muted">
                    {t.quiz.calculating}
                  </p>
                </div>
              ) : quizResultsOutput ? (
                /* OUTCOME SCREEN CARD */
                <div className="w-full bg-white border border-black/[0.06] rounded-sm p-6 sm:p-10 space-y-8 shadow-xs animate-fade-in">
                  
                  {/* Title block */}
                  <div className="border-b border-black/[0.06] pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C8C] block mb-1">
                        {t.quiz.styleTagPrefix} / 极简方向
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-light tracking-tight text-studio-accent font-display">
                        {lang === 'zh' ? quizResultsOutput.styleNameZH : quizResultsOutput.styleNameEN}
                      </h4>
                    </div>

                    <div className="bg-black/5 px-4 py-2.5 rounded-xs text-right">
                      <span className="text-[9px] uppercase tracking-widest text-studio-muted block">{t.quiz.matchRate}</span>
                      <span className="text-xl font-bold text-studio-dark font-display">{quizResultsOutput.matchScore}%</span>
                    </div>
                  </div>

                  {/* Core description block */}
                  <div className="space-y-2.5">
                    <p className="text-sm leading-relaxed text-studio-dark font-sans text-justify">
                      {lang === 'zh' ? quizResultsOutput.descZH : quizResultsOutput.descEN}
                    </p>
                  </div>

                  {/* Estimated Cost budget range */}
                  <div className="bg-studio-accent/5 p-4 rounded-sm border border-studio-accent/10 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-studio-muted tracking-wide">{t.quiz.estimatedBudget}</span>
                    <span className="text-base font-bold text-studio-dark font-mono">{quizResultsOutput.estimatedCostRange}</span>
                  </div>

                  {/* Multi recommendations list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Advice recommendations */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-studio-dark border-b border-black/[0.06] pb-1.5 flex items-center gap-1.5">
                        <CornerDownRight className="w-3.5 h-3.5 text-studio-accent" />
                        {t.quiz.tipsTitle}
                      </h5>
                      <ul className="space-y-2">
                        {(lang === 'zh' ? quizResultsOutput.tipsZH : quizResultsOutput.tipsEN).map((tip, idx) => (
                          <li key={idx} className="text-xs text-studio-muted font-sans flex items-start gap-2 leading-relaxed">
                            <span className="w-1 h-1 bg-studio-accent rounded-full mt-1.5 shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Curated Materials Canvas mapping */}
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-studio-dark border-b border-black/[0.06] pb-1.5">
                        🔍 {t.quiz.materialMatchTitle}
                      </h5>
                      <div className="grid grid-cols-3 gap-2">
                        {quizResultsOutput.relevantMaterials.map(matId => {
                          const matObj = sampleMaterials.find(sm => sm.id === matId);
                          if (!matObj) return null;
                          return (
                            <div key={matId} className="group/item border border-black/[0.04] p-1 bg-[#F8F7F4] rounded-sm relative" title={lang === 'zh' ? matObj.nameZH : matObj.nameEN}>
                              <img src={matObj.image} alt="" className="w-full aspect-square object-cover rounded-xs" />
                              <span className="text-[8px] text-studio-dark font-semibold mt-1 truncate block px-0.5">
                                {lang === 'zh' ? matObj.nameZH : matObj.nameEN}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* CTA button tools */}
                  <div className="pt-6 border-t border-black/[0.06] flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex items-center space-x-1 border border-[#EAE5DB] p-0.5 rounded-sm bg-[#F8F7F4]">
                      {quizResultsOutput.recommendedPalette.map((pClr, i) => (
                        <span key={i} className="w-4 h-4 rounded-full block border border-black/10" style={{ backgroundColor: pClr }} />
                      ))}
                    </div>

                    <button 
                      onClick={restartQuiz}
                      className="px-6 py-2.5 border border-studio-dark text-xs font-bold uppercase tracking-widest hover:bg-studio-dark hover:text-white transition-all duration-300 rounded-sm"
                    >
                      {t.quiz.restart}
                    </button>
                  </div>

                </div>
              ) : (
                /* ACTIVE QUESTION METERS */
                <div className="w-full bg-white border border-black/[0.06] rounded-sm p-6 sm:p-10 space-y-6 shadow-xs animate-fade-in">
                  
                  {/* Step status */}
                  <div className="flex items-center justify-between text-[10px] text-studio-muted uppercase font-mono pb-2 border-b border-black/[0.06]">
                    <span>{t.quiz.questionText} {currentQuizIndex + 1} / {designQuizQuestions.length}</span>
                    <span className="text-studio-accent font-bold">Progress indicator / 进度</span>
                  </div>

                  {/* Question header */}
                  <h4 className="text-xl sm:text-2xl font-light text-studio-dark tracking-tight font-display mb-4">
                    {lang === 'zh' ? designQuizQuestions[currentQuizIndex].questionZH : designQuizQuestions[currentQuizIndex].questionEN}
                  </h4>

                  {/* Multiple options blocks */}
                  <div className="space-y-3.5">
                    {designQuizQuestions[currentQuizIndex].options.map((opt, i) => (
                      <div 
                        key={i}
                        onClick={() => handleQuizAnswer(opt.styleTag)}
                        className="p-4 bg-[#F8F7F4] border border-black/[0.06] hover:border-studio-accent hover:bg-white transition-all duration-300 cursor-pointer rounded-sm flex items-start space-x-3 group"
                      >
                        <span className="w-6 h-6 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-xs font-bold uppercase shrink-0 text-studio-muted group-hover:bg-studio-accent group-hover:text-white group-hover:border-studio-accent transition-colors">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <div className="flex-1">
                          <p className="text-xs sm:text-xs leading-relaxed text-studio-dark group-hover:text-studio-accent transition-colors font-sans">
                            {lang === 'zh' ? opt.labelZH : opt.labelEN}
                          </p>
                          <span className="text-[8px] uppercase font-bold tracking-widest text-[#8C8C8C] mt-1 block">
                            {t.quiz.styleTagPrefix}: {opt.styleTag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-studio-muted font-mono pt-4 border-t border-black/[0.04]">
                    <span>AURA — Tailored diagnostics</span>
                    <button onClick={restartQuiz} className="underline hover:text-studio-dark">{t.quiz.restart}</button>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* TAB 4: GENERATIVE AI CURATION CONSULTANT */}
          {activeTab === 'consultant' && (
            <div id="tab-ai-consultant" className="py-12 px-4 sm:px-12 flex-1 flex flex-col md:flex-row gap-8">
              
              {/* Introduction Guidelines Block */}
              <div className="w-full md:w-5/12 space-y-6">
                <div>
                  <h3 className="text-2xl font-light tracking-tight font-display text-studio-dark mb-2">
                    {t.aiConsult.title}
                  </h3>
                  <p className="text-xs text-studio-muted leading-relaxed">
                    {t.aiConsult.subtitle}
                  </p>
                </div>

                <div className="bg-white border border-black/[0.06] p-6 rounded-sm space-y-4 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C8C8C] pb-2 border-b border-black/[0.06]">
                    🤖 {t.aiConsult.introTitle}
                  </h4>
                  <p className="text-xs text-studio-muted leading-relaxed font-sans">
                    {t.aiConsult.introDesc}
                  </p>

                  <div className="bg-studio-accent/5 p-3 rounded-xs border border-studio-accent/15 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-studio-accent shrink-0 animate-pulse" />
                    <span className="text-[10px] text-studio-accent font-semibold leading-normal">
                      Runs server-side using Gemini model logic for deep visual responses.
                    </span>
                  </div>
                </div>

                {/* Aesthetic presets list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C8C8C]">
                    📋 {t.aiConsult.presetHeader}
                  </h4>
                  <div className="space-y-2">
                    {t.aiConsult.presets.map((pset, idx) => (
                      <button
                        key={idx}
                        disabled={isAiCurating}
                        onClick={() => transmitConsultation(pset.prompt)}
                        className="w-full text-left p-3 border border-[#EAE5DB] hover:border-studio-accent bg-[#F5F5F3] hover:bg-white transition-all text-xs font-medium rounded-sm block font-sans text-studio-dark flex items-center justify-between group disabled:opacity-55"
                      >
                        <span className="truncate pr-4">{pset.label}</span>
                        <ChevronRight className="w-4 h-4 text-[#8C8C8C] group-hover:translate-x-1 transition-transform group-hover:text-studio-accent" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time chat dialogue screen */}
              <div className="flex-1 bg-white border border-black/[0.06] rounded-sm p-4 sm:p-6 flex flex-col justify-between shadow-xs">
                
                {/* Chat header index */}
                <div className="border-b border-black/[0.06] pb-3 mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-studio-dark flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-studio-accent animate-pulse" />
                      Aura Spatial Assistant
                    </span>
                    <span className="text-[9px] text-[#8C8C8C] font-mono">Server node / 交互服务器</span>
                  </div>

                  {chatMessages.length > 1 && (
                    <button 
                      onClick={() => setChatMessages([{
                        id: 'init',
                        role: 'model',
                        text: t.aiConsult.greeting,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }])}
                      className="text-xs text-studio-muted hover:text-studio-dark font-sans flex items-center gap-1 hover:underline"
                    >
                      Clear History
                    </button>
                  )}
                </div>

                {/* Messages stream roll overlay */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-[300px] max-h-[460px] mb-4">
                  {chatMessages.map((msg) => {
                    const isModel = msg.role === 'model';
                    return (
                      <div 
                        key={msg.id}
                        className={`flex flex-col ${isModel ? 'items-start' : 'items-end'} animate-fade-in`}
                      >
                        <div className="flex items-center space-x-1.5 mb-1 text-[9px] tracking-widest uppercase font-mono text-studio-muted">
                          {isModel ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-studio-accent" />
                              <span>{t.nav.brand} DIRECTOR</span>
                            </>
                          ) : (
                            <>
                              <span>CLIENT RECIPIENT</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8C8C8C]" />
                            </>
                          )}
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div className={`max-w-[85%] rounded-xs px-4 py-3 border text-xs leading-relaxed ${isModel ? 'bg-[#FDFDFD] border-black/[0.06] text-[#333333]' : 'bg-[#121211] border-studio-dark text-[#F8F7F4] shadow-xs'}`}>
                          {isModel ? (
                            <div className="space-y-1 font-sans">
                              {renderMarkdownAlternative(msg.text)}
                            </div>
                          ) : (
                            <p className="font-sans whitespace-pre-wrap">{msg.text}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Thinking skeleton loader */}
                  {isAiCurating && (
                    <div className="flex flex-col items-start animate-pulse">
                      <div className="flex items-center space-x-1.5 mb-1 text-[9px] tracking-widest uppercase font-mono text-[#8C8C8C]">
                        <span className="w-1.5 h-1.5 rounded-full bg-studio-accent animate-ping" />
                        <span>{t.nav.brand} COMPOSING Blueprints</span>
                      </div>
                      <div className="bg-[#FAFAFA] border border-black/[0.06] rounded-xs px-4 py-4 w-[60%] space-y-2">
                        <div className="h-3 bg-black/10 rounded-sm w-[90%]" />
                        <div className="h-3 bg-black/10 rounded-sm w-[75%]" />
                        <div className="h-3 bg-black/10 rounded-sm w-[50%]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input action toolbar */}
                <div className="border-t border-black/[0.06] pt-4 flex items-center gap-3">
                  <textarea 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        transmitConsultation();
                      }
                    }}
                    placeholder={t.aiConsult.placeholder}
                    className="flex-1 bg-[#F8F7F4] border border-black/[0.08] focus:border-studio-dark focus:outline-none p-3 text-xs leading-normal resize-none h-14 font-sans rounded-xs"
                    disabled={isAiCurating}
                  />

                  <button
                    onClick={() => transmitConsultation()}
                    disabled={isAiCurating || !chatInput.trim()}
                    className="bg-studio-dark hover:bg-studio-accent text-white px-4 h-14 flex items-center justify-center transition-colors rounded-xs shrink-0 disabled:opacity-40"
                    title={t.aiConsult.send}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          )}


          {/* TAB 5: COMPANY HISTORY & TEAM PHILOSOPHY */}
          {activeTab === 'about' && (
            <div id="tab-about-studio" className="py-12 px-4 sm:px-12 flex-1 space-y-12 max-w-5xl mx-auto w-full">
              
              {/* Philosophy essay section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-b border-black/[0.06] pb-10">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8C8C8C] font-mono">OUR MANIFESTO / 宣言</span>
                  <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-studio-dark font-display leading-tight">
                    {t.team.title}
                  </h3>
                  <p className="text-xs text-studio-muted-dark leading-relaxed font-sans text-justify pt-2">
                    {t.team.philosophyText}
                  </p>
                </div>

                {/* Large high contrast display block */}
                <div className="bg-studio-dark p-8 md:p-10 text-[#F8F7F4] relative rounded-sm overflow-hidden flex flex-col justify-between h-[250px] shadow-sm">
                  <div className="absolute top-0 right-0 text-[110px] uppercase font-black tracking-tighter text-white/[0.03] select-none pointer-events-none -mr-4 -mt-8 font-display">AURA</div>
                  <blockquote className="text-sm italic font-serif leading-relaxed max-w-sm relative z-10">
                    "Space is not a vacuum to be filled. It is an envelope of silence to be carefully lit and tactilely composed."
                  </blockquote>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/[0.1] pt-6 relative z-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">HQ Coordinate</span>
                      <span className="text-xs font-bold text-white font-sans">{t.team.stats.locations}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">Laurel Counts</span>
                      <span className="text-xs font-bold text-white font-sans">{t.team.stats.awards}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Members Exhibition */}
              <div className="space-y-6">
                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C8C8C]">{t.nav.team}</span>
                  <h3 className="text-2xl font-light tracking-tight font-display mt-1 text-studio-dark">
                    {t.team.subtitle}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {t.team.members.map((member, i) => (
                    <div 
                      key={i} 
                      className="bg-white border border-black/[0.06] p-4 rounded-sm flex flex-col space-y-4 shadow-xs"
                    >
                      <div className="aspect-square w-full rounded-xs overflow-hidden bg-gray-100">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover filter saturate-50 hover:saturate-100 transition-all duration-500" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-studio-accent font-mono block mb-0.5">
                          {member.role}
                        </span>
                        <h4 className="text-lg font-bold tracking-tight text-studio-dark font-display">
                          {member.name}
                        </h4>
                        <p className="text-xs text-studio-muted leading-relaxed mt-2 font-sans text-justify">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </section>

        {/* 4. CONTACT DESK (Highly styled premium contact information panel) */}
        <section id="studio-inquiry-box" className="bg-[#F5F5F3] border-t border-black/[0.06] py-16 px-4 sm:px-12">
          <div className="max-w-3xl mx-auto space-y-12">
            
            {/* Information coordinate columns */}
            <div className="space-y-8">
              <div className="space-y-4 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-studio-accent font-mono block">CONTACT INFORMATION / 联系方式</span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-studio-dark font-display leading-tight">
                  {t.contact.title}
                </h3>
                <p className="text-xs text-[#8C8C8C] leading-relaxed font-sans max-w-xl mx-auto">
                  {t.contact.subtitle}
                </p>
              </div>

              {/* Direct Office Lines */}
              <div className="space-y-6 pt-8 border-t border-black/[0.06]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-studio-dark text-center">
                  📍 {t.contact.officeTitle}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
                  {t.contact.offices.map((office, idx) => (
                    <div key={idx} className="space-y-3 bg-white border border-black/[0.04] p-6 rounded-sm shadow-2xs">
                      <span className="text-xs font-bold text-studio-dark tracking-wide font-display">{office.city}</span>
                      <div className="text-[11px] text-[#8C8C8C] space-y-2 font-sans">
                        <p className="flex items-start gap-1.5 leading-relaxed">
                          <MapPin className="w-3.5 h-3.5 text-studio-accent shrink-0 mt-0.5" /> <span>{office.street}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-studio-accent shrink-0" /> {office.phone}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-studio-accent shrink-0" /> {office.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-studio-muted font-mono text-center pt-4">
                AURA Studio © {new Date().getFullYear()} — All Concepts Curated Globally.
              </div>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}
