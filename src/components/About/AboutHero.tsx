import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe2, LucideIcon, Mountain, Target, TreePine, Users } from 'lucide-react';

type BranchColor = 'green' | 'blue';

interface Feature
{
    icon: LucideIcon;
    text: string;
}

interface ColorScheme
{
    primary: string;
    accent: string;
    highlight: string;
}

interface ColorSchemes
{
    [key: string]: ColorScheme;
}

interface HeroSectionProps
{
    features?: Feature[];
    branchColor?: BranchColor;
    className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    features = [
        { icon: TreePine, text: "Sustainable Practices" },
        { icon: Globe2, text: "Global Impact" },
        { icon: Users, text: "Community Focus" },
        { icon: Target, text: "Goal-Oriented" },
        { icon: Mountain, text: "Environmental Protection" }
    ],
    branchColor = 'green',
    className = ''
}) =>
{
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    const colorSchemes: ColorSchemes = {
        green: {
            primary: 'from-green-800 to-emerald-900',
            accent: 'text-green-300',
            highlight: 'from-green-100 to-green-300'
        },
        blue: {
            primary: 'from-blue-600 to-blue-800',
            accent: 'text-blue-300',
            highlight: 'from-blue-100 to-blue-300'
        }
    };

    const colors: ColorScheme = colorSchemes[branchColor] || colorSchemes.green;

    useEffect(() =>
    {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section
            ref={ref}
            className={`relative min-h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden 
        transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        >
            {/* Dynamic Background Layers */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={`absolute inset-0 bg-gradient-to-r ${colors.primary} transition-colors duration-500`}
                aria-hidden="true"
            />
            <div className="absolute inset-0" aria-hidden="true">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1.05 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-40 
            mix-blend-overlay transform scale-105 animate-subtle-float"
                    style={{
                        animation: 'subtleFloat 20s ease-in-out infinite',
                    }}
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative w-full max-w-7xl mx-auto pt-5 md:pt-0 px-4 sm:px-6 lg:px-8 text-center text-white"
            >
                {/* Main Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-6 tracking-tight leading-tight"
                >
                    Transforming Tourism
                    <motion.span
                        variants={itemVariants}
                        className={`block ${colors.accent} mt-2`}
                    >
                        for a Greener Future
                    </motion.span>
                </motion.h1>

                {/* Subheading with Custom Typography */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
                >
                    <span className={`bg-gradient-to-r ${colors.highlight} bg-clip-text text-transparent font-bold`}>
                        GTF
                    </span>
                    <span className="ml-3">
                        is pioneering sustainable tourism through innovative blockchain technology and community-driven initiatives.
                    </span>
                </motion.p>

                {/* Feature Icons Grid */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mt-12 max-w-4xl mx-auto"
                >
                    {features.map(({ icon: Icon, text }, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                            className="group flex flex-col items-center space-y-3 p-4 rounded-lg transition-colors duration-300"
                        >
                            <Icon
                                className={`h-8 w-8 ${colors.accent} transition-transform duration-300 group-hover:scale-110`}
                                aria-hidden="true"
                            />
                            <span className="text-sm font-medium text-gray-100 group-hover:text-white transition-colors duration-300">
                                {text}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent"
                aria-hidden="true"
            />
        </section>
    );
};

// Add custom animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes subtleFloat {
    0%, 100% { transform: translate(0, 0) scale(1.05); }
    50% { transform: translate(-5px, -5px) scale(1.07); }
  }
`;
document.head.appendChild(style);

export default HeroSection;