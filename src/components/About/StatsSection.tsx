import React, { useEffect, useState } from 'react';
import { TreePine, Globe2, Target, Users, LucideIcon } from 'lucide-react';
import { useInView } from 'framer-motion';

interface CountData
{
  projects: number;
  countries: number;
  impact: number;
  community: number;
}

interface StatCardProps
{
  icon: LucideIcon;
  value: keyof CountData;
  label: string;
  prefix?: string;
  animatedValue: number;
}

interface StatsSectionProps
{
  count: CountData;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  prefix = '',
  animatedValue
}) => (
  <div className="relative group">
    <div className="transform transition-all duration-300 hover:scale-105">
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-4 shadow-lg">
              <Icon className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="pt-8 text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
              {prefix}{animatedValue}+
            </div>
            <div className="text-gray-600 font-medium">{label}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StatsSection: React.FC<StatsSectionProps> = ({ count }) =>
{
  const [animatedCounts, setAnimatedCounts] = useState<CountData>({
    projects: 0,
    countries: 0,
    impact: 0,
    community: 0
  });

  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2
  });

  useEffect(() =>
  {
    if (isInView)
    {
      const duration = 2000; // Animation duration in milliseconds
      const steps = 60;
      const interval = duration / steps;

      const animateValue = (
        start: number,
        end: number,
        setter: (value: number) => void
      ): void =>
      {
        let current = 0;
        const increment = end / steps;
        const timer = setInterval(() =>
        {
          current += increment;
          if (current >= end)
          {
            clearInterval(timer);
            setter(end);
          } else
          {
            setter(Math.floor(current));
          }
        }, interval);
      };

      Object.entries(count).forEach(([key, value]) =>
      {
        animateValue(
          0,
          value,
          (newValue) => setAnimatedCounts(prev => ({
            ...prev,
            [key]: newValue
          }))
        );
      });
    }
  }, [isInView, count]);

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-teal-50 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Impact</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20">
          <StatCard
            icon={TreePine}
            value="projects"
            label="Active Projects"
            animatedValue={animatedCounts.projects}
          />
          <StatCard
            icon={Globe2}
            value="countries"
            label="Countries Reached"
            animatedValue={animatedCounts.countries}
          />
          <StatCard
            icon={Target}
            value="impact"
            label="Impact Generated"
            prefix="$"
            animatedValue={animatedCounts.impact}
          />
          <StatCard
            icon={Users}
            value="community"
            label="Community Members"
            animatedValue={animatedCounts.community}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;