import { Trophy } from 'lucide-react';

interface Contributor {
  id: number;
  name: string;
  avatar: string;
  contribution: string;
  projects: number;
}

interface TopContributorsProps {
  contributors: Contributor[];
}

const TopContributors = ({ contributors }: TopContributorsProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Trophy className="h-5 w-5 text-green-500" />
      Top Contributors
    </h3>
    <div className="space-y-4">
      {contributors.map((contributor) => (
        <div key={contributor.id} className="flex items-center gap-3">
          <img src={contributor.avatar} alt={contributor.name} className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <h4 className="font-medium">{contributor.name}</h4>
            <p className="text-sm text-gray-500">
              {contributor.contribution} • {contributor.projects} projects
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TopContributors;
