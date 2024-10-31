import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import hero_1 from '../../assets/hero/hero_1.avif';
import hero_3 from '../../assets/hero/hero_3.avif';
import hero_4 from '../../assets/hero/hero_4.avif';
import hero10 from '../../assets/hero/hero10.jpg';
import hero11 from '../../assets/hero/hero11.jpg';
import { Link } from 'react-router-dom';

const Hero = () =>
{
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: hero_1,
            subtitle: "Wildlife Conservation",
            description: "Supporting endangered species protection"
        },
        {
            image: hero_3,
            subtitle: "Sustainable Tourism",
            description: "Promoting eco-friendly travel experiences"
        },
        {
            image: hero_4,
            subtitle: "Community Impact",
            description: "Empowering local communities"
        },
        {
            image: hero10,
            subtitle: "Wildlife Conservation",
            description: "Supporting endangered species protection"
        },
        {
            image: hero11,
            subtitle: "Sustainable Tourism",
            description: "Promoting eco-friendly travel experiences"
        }
    ];

    useEffect(() =>
    {
        const timer = setInterval(() =>
        {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="relative w-full h-[500px] sm:h-[550px] min-h-[400px] overflow-hidden bg-gray-900">
            {/* Background Carousel */}
            <div className="absolute inset-0 w-full h-full">
                {slides.map((slide, index) => (
                    index === currentSlide && (
                        <motion.div
                            key={index}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="absolute inset-0 bg-black/60 z-10" />
                            <img
                                src={slide.image}
                                alt={slide.subtitle}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )
                ))}
            </div>

            {/* Content Section */}
            <div className="relative z-20 h-full flex items-center">
                <motion.section
                    className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                >
                    <div className="text-center max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10 px-4 sm:px-6">
                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="transform -translate-y-2"
                        >
                            <span className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-green-500/30 text-green-300 rounded-full text-xs sm:text-sm font-medium tracking-wide">
                                {slides[currentSlide].subtitle}
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div className="space-y-2 sm:space-y-3" variants={fadeIn}>
                            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight sm:leading-tight md:leading-tight">
                                Investing in Nature
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mt-1 sm:mt-2">
                                    for a Sustainable Future
                                </span>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4"
                            variants={fadeIn}
                        >
                            Connect with wildlife tourism businesses and support sustainable practices through our decentralized funding platform.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6"
                            variants={fadeIn}
                        >
                            <button className="group bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base font-medium">
                                <Link to={"/projects"} className='text-white'>Explore Projects</Link>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 rounded-lg  transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base font-medium">
                                <span className="relative z-10">
                                    <Link to={"/about"} className='text-green-600'>Learn More</Link>
                                </span>
                                <div className="absolute inset-0 border border-white/30 rounded-lg group-hover:border-white/50 transition-colors" />
                                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </button>
                        </motion.div>

                        {/* Carousel Navigation */}
                        <div className="flex justify-center gap-2 sm:gap-3 pt-6 sm:pt-8">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all duration-300 ${currentSlide === index
                                        ? 'bg-green-400 w-6 sm:w-8'
                                        : 'bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <div className="absolute top-1/4 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-green-500/10 rounded-full filter blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-500/10 rounded-full filter blur-3xl" />
        </div>
    );
};

export default Hero;