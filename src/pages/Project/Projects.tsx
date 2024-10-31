import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Filter, ArrowRight, Search, MessageSquare } from 'lucide-react';
import imagetest from '../../assets/hero/hero_5.jpeg';
import projectImage from "../../assets/about/project.png"
import { Link } from 'react-router-dom';

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

interface Question
{
  id: keyof Filters;
  question: string;
  options: string[];
}

interface Filters
{
  impact: string;
  duration: string;
  category: string;
  location: string;
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
  }
];

const ProjectsPage: React.FC = () =>
{
  const [filters, setFilters] = useState<Filters>({
    impact: "",
    duration: "",
    category: "",
    location: ""
  });

  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const questions: Question[] = [
    {
      id: "impact",
      question: "What level of impact are you looking for?",
      options: ["high", "medium", "low"]
    },
    {
      id: "duration",
      question: "What project duration do you prefer?",
      options: ["short", "medium", "long"]
    },
    {
      id: "category",
      question: "Which category interests you most?",
      options: ["Environment", "Education", "Healthcare"]
    },
    {
      id: "location",
      question: "Which region do you want to support?",
      options: ["Africa", "Asia", "South America"]
    }
  ];

  const handleFilterChange = (questionId: keyof Filters, value: string): void =>
  {
    const newFilters = { ...filters, [questionId]: value };
    setFilters(newFilters);
    filterProjects(newFilters, searchQuery);
  };

  const filterProjects = (currentFilters: Filters, query: string): void =>
  {
    let filtered = projectsData;

    // Apply filters
    filtered = filtered.filter(project =>
    {
      return Object.entries(currentFilters).every(([key, value]) =>
      {
        return value === "" || (typeof project[key as keyof Project] === 'string' && (project[key as keyof Project] as string).toLowerCase() === value.toLowerCase());
      });
    });

    // Apply search query
    if (query)
    {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  };

  const handleSearch = async () =>
  {
    setIsSearching(true);
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    filterProjects(filters, searchQuery);
    setIsSearching(false);
  };

  const clearFilters = (): void =>
  {
    setFilters({
      impact: "",
      duration: "",
      category: "",
      location: ""
    });
    setSearchQuery("");
    setFilteredProjects(projectsData);
  };

  // New function to handle search input changes
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    filterProjects(filters, newQuery); // Automatically filter as user types
  };

  return (
    <div className="min-h-[370px] bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Background - Updated with green gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-900 to-emerald-950 text-white">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-[url(${imagetest})] mix-blend-overlay opacity-20`} />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-emerald-700/90" />
        </div>

        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Impactful Projects
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Find and support projects that align with your interests and values.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input
                  placeholder="Describe the project you're looking for..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="pl-10 pr-4 h-12"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                className="min-w-[120px]"
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowQuestions(!showQuestions)}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                {showQuestions ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </div>
        </div>

        {/* Rest of the component remains unchanged */}
        {/* Recommendation Questions */}
        <AnimatePresence>
          {showQuestions && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-12 bg-white rounded-lg p-6 shadow-lg border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <p className="font-medium">{q.question}</p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((option) => (
                        <Button
                          key={option}
                          variant={filters[q.id] === option ? "default" : "outline"}
                          onClick={() => handleFilterChange(q.id, option)}
                          className="capitalize"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {Object.values(filters).some(f => f !== "") && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  className="mt-6"
                >
                  Clear all filters
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
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

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">No projects match your current criteria.</p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;