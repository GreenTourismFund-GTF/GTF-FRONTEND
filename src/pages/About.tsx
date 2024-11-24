import React, { useEffect, useRef } from 'react';
import
{

  Users,
  ArrowUpRight,
  Mountain,
  HandHeart,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';
import HeroSection from '../components/About/AboutHero';
import MissionSection from '../components/About/MissionSection';
import StatsSection from '../components/About/StatsSection';
import unEnv from "../assets/about/un-env.png";
import ecoTour from "../assets/about/ecotour.png";
import global from "../assets/about/global.png";
import wideFund from "../assets/about/widefund.png";
import kenny from "../assets/about/kenny.png";
import { Link } from 'react-router-dom';
interface TeamMember
{
  name: string;
  role: string;
  image: string;
  bio: string;
  links: {
    twitter: string;
    linkedin: string;
  };
}

interface Partner
{
  name: string;
  logo: string;
}

interface CountState
{
  projects: number;
  countries: number;
  impact: number;
  community: number;
}

interface VisibilityState
{
  [key: string]: boolean;
}


const About: React.FC = () =>
{
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  const [count, setCount] = useState<CountState>({
    projects: 0,
    countries: 0,
    impact: 0,
    community: 0
  });

  const statsRef = useRef<HTMLElement | null>(null);
  const targetStats: CountState = {
    projects: 150,
    countries: 45,
    impact: 25,
    community: 20
  };

  useEffect(() =>
  {
    const observer = new IntersectionObserver(
      (entries) =>
      {
        entries.forEach((entry) =>
        {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));

          if (entry.target.id === 'stats' && entry.isIntersecting)
          {
            Object.keys(targetStats).forEach((stat) =>
            {
              const increment = targetStats[stat as keyof CountState] / 50;
              let current = 0;
              const timer = setInterval(() =>
              {
                current += increment;
                if (current >= targetStats[stat as keyof CountState])
                {
                  current = targetStats[stat as keyof CountState];
                  clearInterval(timer);
                }
                setCount(prev => ({
                  ...prev,
                  [stat]: Math.floor(current)
                }));
              }, 50);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) =>
    {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const teamMembers: TeamMember[] = [
    {
      name: "Arowolo kehinde",
      role: "Founder & CEO",
      image: kenny,
      bio: "20+ years in sustainable tourism",
      links: { twitter: "#", linkedin: "#" }
    },
    {
      name: "Arowolo kehinde",
      role: "Head of Sustainability",
      image: kenny,
      bio: "Environmental scientist & consultant",
      links: { twitter: "#", linkedin: "#" }
    },
    {
      name: "Arowolo kehinde",
      role: "Community Director",
      image: kenny,
      bio: "Expert in community-driven initiatives",
      links: { twitter: "#", linkedin: "#" }
    }
  ];

  const partners: Partner[] = [
    { name: "UN Environment Programme", logo: unEnv },
    { name: "World Wildlife Fund", logo: wideFund },
    { name: "Global Sustainable Tourism Council", logo: global },
    { name: "International Ecotourism Society", logo: ecoTour }
  ];



  return (
    <div className="min-h-screen bg-white">

      <HeroSection />
      <MissionSection />
      <StatsSection count={targetStats} />


      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <Users className="h-8 w-8 text-green-500" />
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`transform transition-all duration-500 delay-${index * 200} ${isVisible.team
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-20 opacity-0'
                  }`}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full object-fit h-64  transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-green-600 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex gap-4">
                      <a href={member.links.twitter} className="text-gray-400 hover:text-green-600 transition-colors">
                        <ArrowUpRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <HandHeart className="h-8 w-8 text-green-500" />
            Our Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className={`transform transition-all duration-500 delay-${index * 100} ${isVisible.partners
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
                  }`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-32 h-32 object-contain f grayscale hover:grayscale-0 transition-all duration-300"
                />
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-900 bg-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <Mountain className="h-8 w-8 text-green-100" />
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join our community of change-makers and help shape the future of sustainable tourism.
          </p>
          <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200 transform hover:-translate-y-1 flex items-center gap-2 mx-auto">
            <RefreshCw className="h-5 w-5" />
            <Link to={"/community"} className='text-green-600 hover:text-green-700'>Get Started Today</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;