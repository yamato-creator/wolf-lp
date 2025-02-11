import React, { useEffect, useState } from 'react';
import { Users, Globe, Building, ChevronDown, MapPin, CheckCircle, Target, Briefcase, Locate as Location, DollarSign, ArrowUpRight } from 'lucide-react';
import logo from './assets/images/logo.jpg';
import event1 from './assets/images/event1.jpg';
import event2 from './assets/images/event2.jpg';
import event3 from './assets/images/event3.jpg';
import event4 from './assets/images/event4.jpg';
import event5 from './assets/images/event5.jpg';
import event6 from './assets/images/event6.jpg';
import chart from './assets/images/chart.jpg';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // スプラッシュ画面を3秒後に非表示
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

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
            className="h-32 w-32 mx-auto mb-8 object-cover rounded-full animate-fade-in" 
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
      {/* Company Name Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm py-4">
        <div className="w-full px-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="Wolf Logo" className="h-12 w-12 object-cover rounded-full" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">株式会社wolf</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-12">
            <button
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xl md:text-2xl text-white hover:text-gray-300 transition-colors font-medium"
            >
              TOP
            </button>
            <button
              onClick={() => {
                const servicesSection = document.querySelector('.container h2');
                servicesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xl md:text-2xl text-white hover:text-gray-300 transition-colors font-medium"
            >
              SERVICES
            </button>
            <button
              onClick={() => document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-xl md:text-2xl text-white hover:text-gray-300 transition-colors font-medium"
            >
              EVENTS
            </button>
            <button
              onClick={() => {
                const companySection = document.querySelector('section:last-of-type');
                companySection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xl md:text-2xl text-white hover:text-gray-300 transition-colors font-medium"
            >
              COMPANY
            </button>
          </nav>
        </div>
      </header>

      <section className="relative h-screen w-full overflow-hidden" id="hero">
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-800 to-black opacity-90" />
          <img 
            src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=3840&q=100" 
            alt="Night sky" 
            className="absolute top-0 left-0 w-screen h-screen object-cover"
          />
        </div>
        
        <div className="absolute inset-0">
          <img 
            src="https://cdn.pixabay.com/photo/2018/09/20/22/26/wolf-3691971_1280.jpg" 
            alt="Wolf" 
            className="w-screen h-screen object-cover mix-blend-screen opacity-90"
            style={{
              objectPosition: 'center 20%'
            }}
          />
        </div>

        <div className="w-full relative z-10 py-80">
          <div className="px-6 flex flex-col items-start text-left absolute bottom-0 left-0">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-8 leading-tight animate-fade-in text-white drop-shadow-lg">
              狼のように<br/>アグレッシブに
            </h2>
            <h3 className="text-2xl md:text-3xl mb-4 md:mb-8 text-white font-bold drop-shadow-lg">
              盆地徹底
            </h3>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-12">
          <ChevronDown 
            className="w-12 h-12 mx-auto animate-bounce text-gray-300 cursor-pointer hover:text-gray-400 transition-colors"
            onClick={() => {
              const nextSection = document.getElementById('video-section');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* Services Section with Images */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">SERVICES</h2>
          <h3 className="text-xl md:text-2xl mb-8 md:mb-16 text-center text-gray-400">事業内容</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
      </section>

      {/* Video Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-800" id="video-section">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">EVENTS</h2>
          <h3 className="text-xl md:text-2xl mb-8 md:mb-16 text-center text-gray-400">イベント実績</h3>
          
          {/* YouTube Video */}
          <div className="max-w-[300px] md:max-w-[400px] mx-auto mb-16">
            <div className="relative pb-[177.78%] h-0 overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-400/20">
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
          <div className="relative w-screen overflow-hidden -ml-[50vw] left-1/2">
            <div className="flex animate-marquee whitespace-nowrap will-change-transform">
              {[...Array(6)].map((_, setIndex) => (
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
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-white to-gray-400">COMPANY</h2>
          <h3 className="text-xl md:text-2xl mb-8 md:mb-16 text-center text-gray-400">会社概要</h3>
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#1f2120] to-black rounded-2xl shadow-xl p-12 border border-gray-400/20">
            <div className="grid grid-cols-1 gap-8">
              <InfoRow icon={<Building className="w-6 h-6" />} label="会社名" value="株式会社wolf" />
              <InfoRow icon={<Users className="w-6 h-6" />} label="代表取締役" value="丸山康太" />
              <InfoRow icon={<MapPin className="w-6 h-6" />} label="所在地" value="東京都渋谷区神宮前六丁目23番4号桑名ビル2階" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceDetailCard = ({ icon, title, image, features }: { icon: React.ReactNode, title: string, image: string, features: string[] }) => (
  <div className="bg-gradient-to-br from-[#1f2120] to-black border border-gray-400/20 hover:shadow-2xl hover:shadow-gray-400/10 transition-all duration-300 overflow-hidden rounded-2xl group">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80"></div>
    </div>
    <div className="p-8">
      <div className="flex items-center mb-6">
        <div className="text-gray-300 mr-4 transform group-hover:rotate-12 transition-transform duration-300">{icon}</div>
        <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">{title}</h3>
      </div>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-200 group-hover:text-white transition-colors">
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