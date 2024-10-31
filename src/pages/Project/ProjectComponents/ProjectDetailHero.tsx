// import React from 'react';
// import { motion } from 'framer-motion';
// import { Badge, ChevronLeft } from 'lucide-react';
// import { ProjectData } from '../../../lib/types';
// import { Button } from '../../../components/ui/button';



// const ProjectDetailHero = ({ projectData }: { projectData: ProjectData }) =>
// {
//     const fadeInUp = {
//         initial: { opacity: 0, y: 20 },
//         animate: { opacity: 1, y: 0 },
//         transition: { duration: 0.6 }
//     };

//     const stagger = {
//         animate: {
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     return (
//         <div className="relative overflow-hidden">
//             {/* Background with animated gradient overlay */}
//             <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700">
//                 <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 mix-blend-overlay" />
//             </div>

//             {/* Content container */}
//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
//                 <div className="grid gap-8 lg:grid-cols-2 items-center">
//                     {/* Left column with text content */}
//                     <motion.div
//                         variants={stagger}
//                         initial="initial"
//                         animate="animate"
//                         className="space-y-6"
//                     >
//                         {/* Back button */}
//                         <motion.div variants={fadeInUp}>
//                             <Button
//                                 variant="ghost"
//                                 className="text-white hover:bg-white/10 transition-colors"
//                                 onClick={() => window.history.back()}
//                             >
//                                 <ChevronLeft className="mr-2 h-4 w-4" />
//                                 Back to Projects
//                             </Button>
//                         </motion.div>

//                         {/* Category badge */}
//                         <motion.div variants={fadeInUp}>
//                             <Badge className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 text-sm">
//                                 {projectData.category}
//                             </Badge>
//                         </motion.div>

//                         {/* Title */}
//                         <motion.h1
//                             variants={fadeInUp}
//                             className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
//                         >
//                             {projectData.title}
//                         </motion.h1>

//                         {/* Description */}
//                         <motion.p
//                             variants={fadeInUp}
//                             className="text-lg md:text-xl text-green-100 max-w-2xl leading-relaxed"
//                         >
//                             {projectData.description}
//                         </motion.p>

//                         {/* Call to action */}
//                         <motion.div variants={fadeInUp} className="pt-4">
//                             <Button
//                                 className="bg-white text-green-700 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all"
//                             >
//                                 View Project Details
//                             </Button>
//                         </motion.div>
//                     </motion.div>

//                     {/* Right column with decorative elements */}
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.8 }}
//                         className="hidden lg:block"
//                     >
//                         <div className="relative h-96 w-full rounded-lg bg-white/10 backdrop-blur-sm shadow-2xl">
//                             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg" />
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjectDetailHero;

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { ProjectData } from '../../../lib/types';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';



interface ProjectDetailsHeroProps {
  projectData: ProjectData;
  onBack?: () => void;
}

const ProjectDetailsHero: React.FC<ProjectDetailsHeroProps> = ({ 
  projectData,
  onBack = () => window.history.back()
}) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-700">
      {/* Decorative background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-700/50" />
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-6 group"
            onClick={onBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Button>
        </motion.div>

        {/* Project details */}
        <motion.div
          initial="initial"
          animate="animate"
          className="space-y-6 max-w-4xl"
        >
          {/* Category and status */}
          <motion.div 
            variants={fadeInUp} 
            className="flex flex-wrap gap-3 items-center"
          >
            <Badge className="bg-white/20 text-white">
              {projectData.category}
            </Badge>
            {projectData.status && (
              <Badge className={`
                ${projectData.status === 'completed' ? 'bg-green-500' : ''}
                ${projectData.status === 'in-progress' ? 'bg-yellow-500' : ''}
                ${projectData.status === 'planned' ? 'bg-blue-500' : ''}
                text-white
              `}>
                {projectData.status.charAt(0).toUpperCase() + projectData.status.slice(1)}
              </Badge>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            {projectData.title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-green-50 max-w-3xl leading-relaxed"
          >
            {projectData.description}
          </motion.p>

          {/* Additional project metadata */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap gap-x-8 gap-y-4 text-green-100 pt-4"
          >
            {projectData.client && (
              <div>
                <dt className="text-sm text-green-200">Client</dt>
                <dd className="text-white font-medium">{projectData.client}</dd>
              </div>
            )}
            {projectData.date && (
              <div>
                <dt className="text-sm text-green-200">Date</dt>
                <dd className="text-white font-medium">{projectData.date}</dd>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default ProjectDetailsHero;