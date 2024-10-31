import React, { useState } from 'react';
import { MoreVertical, Heart, Reply, Edit2, Trash2 } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

interface CommentSectionProps {
  projectId: number;
}

export const CommentSection = ({ projectId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Current User',
      authorAvatar: '/placeholder-avatar.jpg',
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleAddReply = (commentId: string, replyContent: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: 'Current User',
      authorAvatar: '/placeholder-avatar.jpg',
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }
      return comment;
    }));

    setReplyingTo(null);
  };

  const handleEditComment = (commentId: string, newContent: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content: newContent };
      }
      return comment;
    }));
    setEditingComment(null);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
    <div className={`flex gap-3 ${isReply ? 'ml-12 mt-3' : 'mt-4'}`}>
      <img src={comment.authorAvatar} alt={comment.author} className="w-8 h-8 rounded-full" />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-sm">{comment.author}</h4>
              <p className="text-xs text-gray-500">
                {new Date(comment.timestamp).toLocaleDateString()}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-gray-100 p-1 rounded">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {
                  setEditingComment(comment.id);
                  setEditContent(comment.content);
                }}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {editingComment === comment.id ? (
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditComment(comment.id, editContent);
            }}>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border rounded-md resize-none"
                rows={3}
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingComment(null)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm">{comment.content}</p>
          )}
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500">
            <Heart className="h-4 w-4" />
            <span>{comment.likes}</span>
          </button>
          <button
            onClick={() => setReplyingTo(comment.id)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600"
          >
            <Reply className="h-4 w-4" />
            <span>Reply</span>
          </button>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-3">
            <form onSubmit={(e) => {
              e.preventDefault();
              const textarea = e.currentTarget.querySelector('textarea');
              if (textarea) {
                handleAddReply(comment.id, textarea.value);
                textarea.value = '';
              }
            }}>
              <textarea
                placeholder="Write a reply..."
                className="w-full p-2 border rounded-md resize-none"
                rows={2}
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                >
                  Reply
                </button>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {comment.replies.map(reply => (
          <CommentItem key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      
      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 border rounded-lg resize-none"
          rows={3}
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};