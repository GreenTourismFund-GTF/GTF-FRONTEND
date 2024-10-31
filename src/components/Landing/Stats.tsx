import { Globe, Users, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Stats = () =>
{
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const stats = [
        {
            value: "500+",
            label: "Projects Funded",
            icon: Globe,
            description: "Supporting global conservation initiatives across 6 continents",
            growth: "+27% this year",
            detail: "Active in 45 countries"
        },
        {
            value: "100K",
            label: "Community Members",
            icon: Users,
            description: "Growing network of dedicated environmental supporters",
            growth: "+48% this year",
            detail: "93% engagement rate"
        },
        {
            value: "$2M+",
            label: "Total Contributions",
            icon: DollarSign,
            description: "Direct funding to sustainable wildlife projects",
            growth: "+65% this year",
            detail: "Average $4.2K per project"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
            }
        }
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-100/20 rounded-full mix-blend-multiply blur-3xl animate-blob" />
                <div className="absolute -bottom-8 right-1/4 w-96 h-96 bg-emerald-100/20 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-50/20 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000" />
            </div>

            <motion.section
                ref={containerRef}
                className="relative py-12 lg:py-16"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-20"
                        variants={itemVariants}
                    >
                        <span className="px-4 py-1.5 rounded-full text-xl font-medium bg-green-50 text-green-600 inline-block mb-4">
                            Our Progress
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                            Making a Measurable Impact
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Transforming wildlife conservation through transparent, community-driven initiatives
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative group perspective"
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.div
                                    className="relative overflow-hidden rounded-2xl h-[290px] bg-white p-6 shadow-lg transition-all duration-500 group-hover:shadow-xl"
                                    whileHover={{
                                        rotateX: 5,
                                        rotateY: 5,
                                        transition: { duration: 0.4 }
                                    }}
                                >
                                    {/* Animated Gradient Border */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-emerald-200 to-green-200 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                                    {/* Floating Background Elements */}
                                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-green-50 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150" />
                                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:scale-150 delay-100" />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <motion.div
                                                className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl"
                                                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <stat.icon className="w-8 h-8 text-green-600" />
                                            </motion.div>
                                            <motion.div
                                                className="flex items-center text-sm font-medium px-3 py-1 rounded-full bg-green-50 text-green-600"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                {stat.growth}
                                            </motion.div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                                                    {stat.value}
                                                </h3>
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {stat.label}
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {stat.description}
                                                </p>
                                                <div className="flex items-center text-sm text-gray-500 bg-gray-50 rounded-lg p-2">
                                                    <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
                                                    {stat.detail}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Stats;