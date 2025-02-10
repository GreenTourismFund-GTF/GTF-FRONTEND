import { motion } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import projectImage from "../../assets/about/project.png"
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
type Props = {}

interface Project
{
    id: number;
    title: string;
    description: string;
    category: 'Environment' | 'Education' | 'Healthcare';
    goal: number;
    raised: number;
    location: 'Africa' | 'Asia' | 'South America';
    duration: 'short' | 'medium' | 'long';
    impact: 'high' | 'medium' | 'low';
    tags: string[];
}

// Sample project data
const projectsData: Project[] = [
    {
        id: 1,
        title: "Wildlife Sanctuary Project",
        description: "Supporting local conservation efforts and sustainable tourism practices.",
        category: "Environment",
        goal: 50000,
        raised: 37500,
        location: "Africa",
        duration: "short",
        impact: "high",
        tags: ["conservation", "wildlife", "sustainability"]
    },
    {
        id: 2,
        title: "Tech Education Initiative",
        description: "Bringing coding education to underprivileged communities.",
        category: "Education",
        goal: 30000,
        raised: 25000,
        location: "Asia",
        duration: "medium",
        impact: "medium",
        tags: ["education", "technology", "community"]
    },
    {
        id: 3,
        title: "Clean Water Access",
        description: "Installing water purification systems in rural areas.",
        category: "Healthcare",
        goal: 45000,
        raised: 40000,
        location: "South America",
        duration: "long",
        impact: "high",
        tags: ["water", "health", "infrastructure"]
    }]

function FeaturedProjects({ }: Props)
{
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.h2
                className="text-3xl font-bold text-gray-900 mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -5 }}
                        className="group"
                    >
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow bg-white">
                            <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <img
                                    src={projectImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge variant="secondary" className="bg-white/90">
                                        {project.category}
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-green-600 font-medium">
                                            ${project.raised.toLocaleString()} raised
                                        </span>
                                        <span className="text-gray-600">
                                            of ${project.goal.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-600 rounded-full transition-all duration-500"
                                            style={{ width: `${(project.raised / project.goal) * 100}%` }}
                                        />
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {project.tags.map(tag => (
                                            <Badge key={tag} variant="outline" className="capitalize">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Button className="w-full group">
                                        <Link to={"/multi"} className='text-white hover:text-white'>Learn More</Link>
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

        </section>

    )
}

export default FeaturedProjects

