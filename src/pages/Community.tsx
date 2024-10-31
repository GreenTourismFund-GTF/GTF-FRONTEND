import { useState } from 'react';
import CommunityBanner from '../components/community/CommunityBanner';
import CommunityStats from '../components/community/CommunityStats';
import TopContributors from '../components/community/TopContributors';
import UpcomingEvents from '../components/community/UpcomingEvents';
import SearchAndFilters from '../components/community/SearchAndFilters';
import ProjectCard from '../components/community/ProjectSection/ProjectCard';
import projectImage from "../assets/about/project.png"
import projectImage2 from "../assets/about/project2.png"
import avatarImage from "../assets/about/avatar-1.png"
import avatarImage2 from "../assets/about/avatar-2.png"

const communityProjects = [
  {
    id: 1,
    title: "Sustainable Forest Restoration",
    location: "Amazon Rainforest, Brazil",
    image: projectImage,
    author: "Maria Silva",
    authorAvatar: avatarImage,
    likes: 1234,
    comments: 89,
    shares: 45,
    impact: "15,000 trees planted",
    fundingProgress: 85,
    fundingGoal: 50000,
    category: "Reforestation"
  },
  {
    id: 2,
    title: "Eco-Tourism Development",
    location: "Bali, Indonesia",
    image: projectImage2,
    author: "John Doe",
    authorAvatar: avatarImage2,
    likes: 892,
    comments: 56,
    shares: 34,
    impact: "300 local jobs created",
    fundingProgress: 65,
    fundingGoal: 75000,
    category: "Local Development"
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Global Green Tourism Summit",
    date: "2024-11-15",
    location: "Virtual",
    participants: 1500
  },
  {
    id: 2,
    title: "Community Tree Planting Day",
    date: "2024-12-01",
    location: "Multiple Locations",
    participants: 2500
  }
];

const topContributors = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: avatarImage,
    contribution: "250,000 GTF",
    projects: 12
  },
  {
    id: 2,
    name: "Michael Chang",
    avatar: avatarImage2,
    contribution: "180,000 GTF",
    projects: 8
  }
];

const CommunityPage = () =>
{
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <CommunityBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CommunityStats />
            <TopContributors contributors={topContributors} />
            <UpcomingEvents events={upcomingEvents} />
          </div>
          <div className="lg:col-span-2">
            <SearchAndFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="space-y-6">
              {communityProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
