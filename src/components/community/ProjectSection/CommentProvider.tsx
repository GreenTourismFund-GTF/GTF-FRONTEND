import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

type CommentAction =
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'DELETE_COMMENT'; payload: string }
  | { type: 'EDIT_COMMENT'; payload: { id: string; content: string } }
  | { type: 'ADD_REPLY'; payload: { parentId: string; reply: Comment } }
  | { type: 'TOGGLE_LIKE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const CommentContext = createContext<{
  state: CommentState;
  dispatch: React.Dispatch<CommentAction>;
} | null>(null);

const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload),
      };
    
    case 'EDIT_COMMENT':
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload.id
            ? { ...comment, content: action.payload.content }
            : comment
        ),
      };
    
    case 'ADD_REPLY':
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload.parentId
            ? { ...comment, replies: [...comment.replies, action.payload.reply] }
            : comment
        ),
      };
    
    case 'TOGGLE_LIKE':
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === action.payload
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        ),
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  return (
    <CommentContext.Provider value={{ state, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};