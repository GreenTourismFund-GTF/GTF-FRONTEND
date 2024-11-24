import React, { useState, useEffect } from 'react';
import { Target, Globe2, TreePine, Leaf, HandHeart, RefreshCw, Sparkles, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mission from "../../assets/about/mission.png";

interface TabItem
{
    id: 'vision' | 'mission' | 'values';
    icon: LucideIcon;
    title: string;
    content?: string;
    list?: Array<{
        icon: LucideIcon;
        text: string;
    }>;
}

const MissionSection: React.FC = () =>
{
    const [activeTab, setActiveTab] = useState<TabItem['id']>('vision');
    const [isInView, setIsInView] = useState<boolean>(false);

    useEffect(() =>
    {
        setIsInView(true);
    }, []);

    const tabs: TabItem[] = [
        {
            id: 'vision',
            icon: Target,
            title: 'Our Vision',
            content: 'We envision a world where tourism becomes a powerful force for environmental conservation and community development.',
        },
        {
            id: 'mission',
            icon: Globe2,
            title: 'Our Mission',
            content: 'To revolutionize tourism funding by connecting eco-conscious travelers with sustainable projects worldwide.',
        },
        {
            id: 'values',
            icon: TreePine,
            title: 'Our Values',
            list: [
                { icon: Leaf, text: 'Sustainability First' },
                { icon: HandHeart, text: 'Community Impact' },
                { icon: RefreshCw, text: 'Innovation' },
            ],
        },
    ];

    return (
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Tab Navigation */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex rounded-xl border border-gray-200 p-1.5 bg-white/80 backdrop-blur-sm shadow-lg">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`bg-gray-50 relative px-8 py-3.5 rounded-lg font-medium transition-all duration-300 ease-in-out
                  ${activeTab === tab.id
                                        ? 'text-white'
                                        : 'text-gray-600 hover:text-green-600'
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-green-500 rounded-lg shadow-lg"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                )}
                                <span className="relative">
                                    {tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -40 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <AnimatePresence mode="wait">
                            {tabs.map((tab) => (
                                activeTab === tab.id && (
                                    <motion.div
                                        key={tab.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
                                            <tab.icon className="h-10 w-10 text-green-500" />
                                            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                                                {tab.title}
                                            </span>
                                        </h2>

                                        {tab.content && (
                                            <p className="text-xl leading-relaxed text-gray-600">
                                                {tab.content}
                                            </p>
                                        )}

                                        {tab.list && (
                                            <ul className="space-y-6">
                                                {tab.list.map((item, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.2 }}
                                                        className="flex items-center gap-4 group"
                                                    >
                                                        <div className="p-3 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors duration-300">
                                                            <item.icon className="h-6 w-6 text-green-500" />
                                                        </div>
                                                        <span className="text-lg text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                                                            {item.text}
                                                        </span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 40 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden group">
                            <img
                                src={mission}
                                alt="GTF Mission"
                                className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl"
                        >
                            <Sparkles className="h-8 w-8 text-green-500" />
                        </motion.div>

                        <div className="absolute -top-4 -right-4 bg-green-50 p-6 rounded-full shadow-lg hidden lg:block">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="w-12 h-12 flex items-center justify-center"
                            >
                                <TreePine className="h-8 w-8 text-green-500" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;