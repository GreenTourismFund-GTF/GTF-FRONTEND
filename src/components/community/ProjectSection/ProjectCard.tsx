import { useState } from 'react';
import { Heart, MessageSquare, Share2, BookmarkPlus} from 'lucide-react';
import { CommentSection } from './CommentSection';
import { ShareModal } from './ShareModal';
import { cn } from '../../../lib/utils';
import { CommentProvider } from './CommentProvider';

interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  impact: string;
  fundingProgress: number;
  fundingGoal: number;
  category: string;
}

interface ProjectCardProps {
  project: Project;
}

// Make sure CommentSection.tsx has this interface
export interface CommentSectionProps {
  projectId: number;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(project.likes);
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <CommentProvider>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <img src={project.authorAvatar} alt={project.author} className="w-10 h-10 rounded-full" />
            <div>
              <h4 className="font-medium">{project.author}</h4>
              <p className="text-sm text-gray-500">{project.location}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Funding Progress</span>
              <span className="font-medium">{project.fundingProgress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${project.fundingProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">
                ${(project.fundingGoal * project.fundingProgress / 100).toLocaleString()} raised
              </span>
              <span className="text-gray-500">
                Goal: ${project.fundingGoal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={cn(
                  "flex bg-gray-50 items-center gap-1 transition-colors duration-200",
                  isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
                )}
              >
                <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
                <span>{likesCount}</span>
              </button>

              <button
                onClick={() => setShowComments(!showComments)}
                className="flex bg-gray-50 items-center gap-1 text-gray-600 hover:text-green-600 transition-colors duration-200"
              >
                <MessageSquare className="h-5 w-5" />
                <span>{project.comments}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex bg-gray-50 items-center gap-1 text-gray-600 hover:text-green-600 transition-colors duration-200"
              >
                <Share2 className="h-5 w-5" />
                <span>{project.shares}</span>
              </button>
            </div>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                "flex bg-gray-50 items-center gap-1 transition-colors duration-200",
                isSaved ? "text-green-600" : "text-gray-600 hover:text-green-600"
              )}
            >
              <BookmarkPlus className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-6 border-t pt-6">
              <CommentSection projectId={project.id} />
            </div>
          )}

          {/* Share Modal */}
          {showShareModal && (
            <ShareModal
              projectId={project.id}
              title={project.title}
              onClose={() => setShowShareModal(false)}
            />
          )}
        </div>
      </div>
    </CommentProvider>
  );
};

export default ProjectCard;