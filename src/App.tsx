import React, { useEffect, useState, useRef } from 'react';
import { Users, Globe, Building, ChevronDown, MapPin, CheckCircle, Target, Briefcase } from 'lucide-react';
import logo from './assets/images/logo.jpg';
import event1 from './assets/images/event1.jpg';
import event2 from './assets/images/event2.jpg';
import event3 from './assets/images/event3.jpg';
import event4 from './assets/images/event4.jpg';
import event5 from './assets/images/event5.jpg';
import event6 from './assets/images/event6.jpg';
import chart from './assets/images/chart.jpg';

// スクロールインジケーター
const ScrollIndicator = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollWidth(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-2">
      <div className="h-full bg-gray-800/50"></div>
      <div 
        className="h-full bg-gradient-to-r from-white to-gray-300 absolute top-0 left-0" 
        style={{ width: `${scrollWidth}%`, boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }} 
      />
    </div>
  );
};

// テキストアニメーションコンポーネント
const AnimatedText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <div 
        className="animate-text-reveal" 
        style={{ animationDelay: `${delay}s` }}
      >
        {text}
      </div>
    </div>
  );
};

// 文字ごとのアニメーション
const CharByCharText = ({ text, className, baseDelay = 0 }: { text: string, className?: string, baseDelay?: number }) => {
  return (
    <div className={className}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="inline-block animate-fade-in"
          style={{ 
            animationDelay: `${baseDelay + index * 0.05}s`,
            animationDuration: '0.5s',
            letterSpacing: text === "アグレッシブに" ? "-0.05em" : "normal"
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

// カウントアップアニメーションコンポーネント
const CountUpAnimation = ({ end, duration = 2000, prefix = '', suffix = '' }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef}>
      {prefix}{count}{suffix}
    </span>
  );
};

// Add this new animation component
const GlowingText = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <div 
      className={`${className || ''} relative overflow-hidden`}
      style={{ 
        animation: `pulse 3s infinite ${delay}s`,
        animationTimingFunction: 'ease-in-out'
      }}
    >
      {children}
    </div>
  );
};

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('hero');
  
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    events: useRef<HTMLElement>(null),
    company: useRef<HTMLElement>(null),
    stats: useRef<HTMLElement>(null)
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // 画面内に入ったセクションを検出
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
            setVisibleSections(prev => 
              prev.includes(key) ? prev : [...prev, key]
            );
            
            // 現在のアクティブセクションを設定
            if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5) {
              setActiveSection(key);
            }
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);

    // スプラッシュ画面を3秒後に非表示
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // 初期ロード時にスクロールイベントを発火させる
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <img 
            src={logo} 
            alt="Wolf Logo" 
            className="h-32 w-32 mx-auto mb-8 object-cover rounded-full animate-pulse" 
          />
          <h1 className="text-6xl md:text-8xl font-bold text-white animate-fade-in">
            株式会社wolf
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1f2120] to-black w-full">
      <ScrollIndicator />
      
      {/* Company Name Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm py-4 mt-2">
        <div className="w-full px-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="Wolf Logo" className="h-12 w-12 object-cover rounded-full animate-float" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">株式会社wolf</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-12">
            <button
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-xl md:text-2xl ${activeSection === 'hero' ? 'text-white font-bold' : 'text-gray-400'} hover:text-gray-300 transition-colors font-medium relative group`}
            >
              TOP
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'hero' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
            <button
              onClick={() => {
                const servicesSection = document.querySelector('.container h2');
                servicesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-xl md:text-2xl ${activeSection === 'services' ? 'text-white font-bold' : 'text-gray-400'} hover:text-gray-300 transition-colors font-medium relative group`}
            >
              SERVICES
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'services' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
            <button
              onClick={() => document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-xl md:text-2xl ${activeSection === 'stats' ? 'text-white font-bold' : 'text-gray-400'} hover:text-gray-300 transition-colors font-medium relative group`}
            >
              ACHIEVEMENTS
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'stats' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
            <button
              onClick={() => document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-xl md:text-2xl ${activeSection === 'events' ? 'text-white font-bold' : 'text-gray-400'} hover:text-gray-300 transition-colors font-medium relative group`}
            >
              EVENTS
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'events' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
            <button
              onClick={() => {
                const companySection = document.querySelector('section:last-of-type');
                companySection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-xl md:text-2xl ${activeSection === 'company' ? 'text-white font-bold' : 'text-gray-400'} hover:text-gray-300 transition-colors font-medium relative group`}
            >
              COMPANY
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${activeSection === 'company' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          </nav>
        </div>
      </header>

      <section 
        ref={sectionRefs.hero}
        className="relative h-screen w-full overflow-hidden" 
        id="hero"
      >
        {/* Geometric background with animated elements */}
        <div className="absolute inset-0 bg-black">
          {/* Animated geometric shapes */}
          <div className="absolute w-full h-full overflow-hidden">
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1f2120] to-black opacity-75" />
            
            {/* Diagonal lines - 他のセクションに合わせて調整 */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={`diag-${i}`}
                  className="absolute h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent transform -rotate-45 origin-top-left"
                  style={{ 
                    top: `${30 + i * 30}%`,
                    left: '0',
                    width: '200%',
                    opacity: 0.15,
                    transform: `translateY(${scrollY * 0.1}px) rotate(-45deg)`,
                  }}
                />
              ))}
            </div>
            
            {/* Animated geometric shapes - 他のセクションに合わせて調整 */}
            <div className="absolute inset-0">
              {/* Large circle */}
              <div 
                className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full opacity-15 border border-gray-400/20"
                style={{ 
                  transform: `translateY(${scrollY * 0.05}px)`,
                  background: 'linear-gradient(135deg, rgba(75,85,99,0.05) 0%, rgba(0,0,0,0) 70%)',
                }}
              />
              
              {/* Small circle */}
              <div 
                className="absolute bottom-[15%] left-[10%] w-[150px] h-[150px] rounded-full opacity-15 border border-gray-400/20"
                style={{ 
                  transform: `translateY(${-scrollY * 0.03}px)`,
                  background: 'linear-gradient(135deg, rgba(75,85,99,0.05) 0%, rgba(0,0,0,0) 70%)',
                }}
              />
              
              {/* Rectangle element - 他のセクションに合わせて追加 */}
              <div 
                className="absolute top-[40%] left-[15%] w-[200px] h-[100px] opacity-10 border border-gray-400/20"
                style={{ 
                  transform: `translateY(${scrollY * 0.07}px) rotate(15deg)`,
                  background: 'linear-gradient(135deg, rgba(31,33,32,0.3) 0%, rgba(0,0,0,0) 70%)',
                }}
              />
            </div>
            
            {/* Subtle glow effect - 他のセクションに合わせて調整 */}
            <div 
              className="absolute top-1/2 left-1/2 w-[800px] h-[500px] rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                background: 'radial-gradient(ellipse, rgba(75,85,99,0.1) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(40px)'
              }}
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-16 lg:px-24">
          <div className="max-w-4xl text-center">
            {/* Main heading with character animation */}
            <h2 className="text-6xl md:text-7xl lg:text-9xl font-bold mb-6 md:mb-8 leading-tight text-white">
              <CharByCharText 
                text="狼のように" 
                className="block mb-2"
                baseDelay={0.5}
              />
              <CharByCharText 
                text="アグレッシブに" 
                className="block"
                baseDelay={1.2}
              />
            </h2>
            
            {/* Animated line - 他のセクションに合わせて調整 */}
            <div className="h-[3px] w-[120px] bg-gradient-to-r from-gray-700 via-gray-300 to-gray-700 mb-8 animate-fade-in mx-auto" style={{ animationDelay: '2s' }} />
            
            {/* Tagline with glowing effect */}
            <GlowingText className="text-3xl md:text-4xl text-gray-300 font-bold" delay={2}>
              盆地徹底
            </GlowingText>
            
            {/* Animated arrow */}
            <div className="mt-16 md:mt-24 animate-fade-in" style={{ animationDelay: '2.5s' }}>
              <div className="group cursor-pointer inline-flex items-center gap-2"
                onClick={() => {
                  const nextSection = document.querySelector('.container h2');
                  nextSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">DISCOVER</span>
                <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white animate-bounce transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Images */}
      <section 
        ref={sectionRefs.services}
        className={`py-24 bg-gradient-to-b from-black to-gray-800 transition-opacity duration-1000 ${visibleSections.includes('services') ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 animate-shimmer">SERVICES</h2>
          <h3 className="text-xl md:text-2xl mb-8 md:mb-16 text-center text-gray-400">事業内容</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`transition-all duration-700 delay-100 ${visibleSections.includes('services') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <ServiceDetailCard
                icon={<Globe className="w-12 h-12" />}
                title="イベント企画・運営"
                image={event3}
                features={[
                  "企業の求める目的に合わせた各種イベントの企画・運営",
                  "東京タワーRED貸切パーティーの実績",
                  "トランポランド貸切イベントの実績",
                ]}
              />
            </div>
            <div className={`transition-all duration-700 delay-300 ${visibleSections.includes('services') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <ServiceDetailCard
                icon={<Briefcase className="w-12 h-12" />}
                title="法人営業支援"
                image="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1920"
                features={[
                  "完全保証型の営業支援「UURO」をパートナーとして運営",
                  "月2件の商談を確実に創出し、成果が出なければ返金",
                  "50万円～100万円の成果報酬型プランを提供",
                  "月間300アポ実績あり"
                ]}
              />
            </div>
            <div className={`transition-all duration-700 delay-500 ${visibleSections.includes('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <ServiceDetailCard
                icon={<Target className="w-12 h-12" />}
                title="適性検査サービス"
                image={chart}
                features={[
                  "早稲田大学教授陣監修の250問で、人材の才能を科学的に診断",
                  "導入企業で採用コスト削減・売上向上を実現、最短6ヶ月で効果実感",
                  "感覚から数値化された評価へ。最適な人材を確実に見極めます"
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={sectionRefs.stats}
        id="stats-section"
        className={`py-24 bg-gradient-to-b from-gray-800 to-black transition-all duration-1000 ${visibleSections.includes('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 animate-shimmer">ACHIEVEMENTS</h2>
          <h3 className="text-xl md:text-2xl mb-8 md:mb-16 text-center text-gray-400">
            <AnimatedText text="実績" delay={0.3} />
          </h3>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div className="bg-gradient-to-br from-[#1f2120] to-black border border-gray-400/20 rounded-2xl p-8 md:p-10 text-center hover:shadow-2xl hover:shadow-gray-400/10 transition-all duration-300 transform hover:scale-105 h-[180px] flex flex-col justify-center items-center">
              <p className="text-gray-300 text-lg font-medium mb-2">月間アポイント実績</p>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                  <CountUpAnimation end={300} />
                </span>
                <span className="text-gray-300 text-base font-medium mt-1">件以上</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1f2120] to-black border border-gray-400/20 rounded-2xl p-8 md:p-10 text-center hover:shadow-2xl hover:shadow-gray-400/10 transition-all duration-300 transform hover:scale-105 h-[180px] flex flex-col justify-center items-center">
              <p className="text-gray-300 text-lg font-medium mb-2">取引企業数</p>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                  <CountUpAnimation end={20} />
                </span>
                <span className="text-gray-300 text-base font-medium mt-1">社以上</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1f2120] to-black border border-gray-400/20 rounded-2xl p-8 md:p-10 text-center hover:shadow-2xl hover:shadow-gray-400/10 transition-all duration-300 transform hover:scale-105 h-[180px] flex flex-col justify-center items-center">
              <p className="text-gray-300 text-lg font-medium mb-2">イベント実績</p>
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                  <CountUpAnimation end={40} />
                </span>
                <span className="text-gray-300 text-base font-medium mt-1">件以上</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section 
        ref={sectionRefs.events}
        className={`py-24 bg-gradient-to-b from-black to-gray-800 transition-all duration-1000 ${visibleSections.includes('events') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
        id="video-section"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 animate-shimmer">EVENTS</h2>
          <h3 className="text-xl md:text-2xl mb-8 md:mb-16 text-center text-gray-400">イベント実績</h3>
          
          {/* YouTube Video */}
          <div className={`max-w-[300px] md:max-w-[400px] mx-auto mb-16 transition-all duration-700 delay-200 ${visibleSections.includes('events') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative pb-[177.78%] h-0 overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-400/20 hover-glow">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/E8SFHkp0KUI?enablejsapi=1"
                title="YouTube Shorts"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Infinite Scroll Images */}
          <div className={`relative w-screen overflow-hidden -ml-[50vw] left-1/2 transition-all duration-700 delay-400 ${visibleSections.includes('events') ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex animate-marquee whitespace-nowrap will-change-transform absolute top-0 left-0">
              {[...Array(2)].map((_, setIndex) => (
                <div key={`set-${setIndex}`} className="flex shrink-0">
                  {[event1, event2, event3, event4, event5, event6].map((image, imageIndex) => (
                    <div key={`image-${setIndex}-${imageIndex}`} className="w-[500px] h-[300px] mx-4">
                      <img 
                        src={image} 
                        alt={`Event ${imageIndex + 1}`} 
                        className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex animate-marquee2 whitespace-nowrap will-change-transform absolute top-0 left-0">
              {[...Array(2)].map((_, setIndex) => (
                <div key={`set2-${setIndex}`} className="flex shrink-0">
                  {[event1, event2, event3, event4, event5, event6].map((image, imageIndex) => (
                    <div key={`image2-${setIndex}-${imageIndex}`} className="w-[500px] h-[300px] mx-4">
                      <img 
                        src={image} 
                        alt={`Event ${imageIndex + 1}`} 
                        className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* 高さを確保するためのスペーサー */}
            <div className="h-[300px]"></div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section 
        ref={sectionRefs.company}
        className={`py-24 bg-gradient-to-b from-black to-gray-800 transition-all duration-1000 ${visibleSections.includes('company') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400 animate-shimmer">COMPANY</h2>
          <h3 className="text-xl md:text-2xl mb-8 md:mb-16 text-center text-gray-400">
            <AnimatedText text="会社概要" delay={0.3} />
          </h3>
          <div className={`max-w-3xl mx-auto bg-gradient-to-br from-[#1f2120] to-black rounded-2xl shadow-xl p-12 border border-gray-400/20 transition-all duration-700 delay-200 hover-lift ${visibleSections.includes('company') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="grid grid-cols-1 gap-8">
              <InfoRow icon={<Building className="w-6 h-6" />} label="会社名" value="株式会社wolf" />
              <InfoRow icon={<Users className="w-6 h-6" />} label="代表取締役" value="吉澤響介" />
              <InfoRow icon={<MapPin className="w-6 h-6" />} label="所在地" value="東京都渋谷区神宮前六丁目23番4号桑野ビル2階" />
            </div>
          </div>
          
          {/* 追加のフッターセクション */}
          <div className={`mt-24 text-center transition-all duration-1000 delay-500 ${visibleSections.includes('company') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CharByCharText 
              text="狼のようにアグレッシブに、盆地徹底" 
              className="text-xl md:text-2xl text-gray-400 mb-4"
              baseDelay={0.5}
            />
            <p className="text-gray-500 mb-8">© 2025 株式会社wolf All Rights Reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceDetailCard = ({ icon, title, image, features }: { icon: React.ReactNode, title: string, image: string, features: string[] }) => (
  <div className="bg-gradient-to-br from-[#1f2120] to-black border border-gray-400/20 hover:shadow-2xl hover:shadow-gray-400/10 transition-all duration-300 overflow-hidden rounded-2xl group h-[450px] flex flex-col">
    <div className="relative h-56 overflow-hidden flex-shrink-0">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80"></div>
    </div>
    <div className="p-5 flex-grow">
      <div className="flex items-center mb-3">
        <div className="text-gray-300 mr-4 transform group-hover:rotate-12 transition-transform duration-300">{icon}</div>
        <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">{title}</h3>
      </div>
      <ul className="space-y-0">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-200 group-hover:text-white transition-colors mb-1">
            <CheckCircle className="w-5 h-5 mr-3 text-gray-300 flex-shrink-0 mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 py-4 border-b border-gray-400/20">
    <div className="text-gray-300">{icon}</div>
    <div className="font-bold text-gray-300 md:w-32">{label}</div>
    <div className="text-white md:flex-1">{value}</div>
  </div>
);

export default LandingPage;