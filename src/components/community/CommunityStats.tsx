import { Globe } from 'lucide-react';

const CommunityStats = () => (
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Globe className="h-5 w-5 text-green-500" />
      Community Stats
    </h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Total Members</span>
        <span className="font-semibold">25,439</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Active Projects</span>
        <span className="font-semibold">142</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Total Impact</span>
        <span className="font-semibold">$2.5M</span>
      </div>
    </div>
  </div>
);

export default CommunityStats;
