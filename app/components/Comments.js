'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Trash2, AlertTriangle, Shield } from 'lucide-react';

// Simple XSS protection function
const sanitizeInput = (input) => {
  if (!input) return input;
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove on* attributes
    .trim();
};

export default function Comments({ blogDate }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [userComments, setUserComments] = useState(new Set());
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle input changes with sanitization
  const handleInputChange = useCallback((field, value) => {
    const sanitizedValue = sanitizeInput(value);
    setNewComment(prev => ({ ...prev, [field]: sanitizedValue }));
  }, []);

  // Optimize comment submission with useCallback
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Sanitize inputs before submission
    const sanitizedAuthor = sanitizeInput(newComment.author);
    const sanitizedContent = sanitizeInput(newComment.content);
    
    if (!sanitizedAuthor || !sanitizedContent) return;

    try {
      const res = await fetch(`/api/blogs/${blogDate}/comments`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: sanitizedAuthor,
          content: sanitizedContent,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to post comment');
      }

      const { comment } = await res.json();
      
      // Sanitize the response data
      const sanitizedComment = {
        ...comment,
        author: sanitizeInput(comment.author),
        content: sanitizeInput(comment.content),
      };
      
      // Update state optimistically
      setComments(prevComments => [...prevComments, sanitizedComment]);

      // Add comment to user's comments set
      setUserComments(prev => new Set([...prev, sanitizedComment.id]));

      // Reset form
      setNewComment({ author: '', content: '' });
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }, [blogDate, newComment]);

  // Fetch comments with sanitization
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/blogs/${blogDate}/comments`);
        if (!res.ok) {
          throw new Error('Failed to fetch comments');
        }
        const { comments } = await res.json();
        
        // Sanitize all comments
        const sanitizedComments = comments.map(comment => ({
          ...comment,
          author: sanitizeInput(comment.author),
          content: sanitizeInput(comment.content),
        }));
        
        setComments(sanitizedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [blogDate]);

  // Comment component for individual comments
  const Comment = ({ comment }) => {
    const canDelete = isAdmin || userComments.has(comment.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900" title={comment.author}>
                  {comment.author}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </div>
              {canDelete && (
                <button
                  onClick={() => setCommentToDelete({ 
                    id: comment.id,
                    isPermanent: isAdmin 
                  })}
                  className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                  aria-label={isAdmin ? "Delete comment permanently" : "Delete your comment"}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-gray-700 whitespace-pre-wrap break-words">{comment.content}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  // Delete confirmation modal
  const DeleteConfirmationModal = () => {
    if (!commentToDelete) return null;

    const isPermanent = commentToDelete.isPermanent;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              {isPermanent ? 'Permanently Delete Comment' : 'Delete Your Comment'}
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            {isPermanent 
              ? 'Are you sure you want to permanently delete this comment? This action cannot be undone and the comment will be removed for all users.'
              : 'Are you sure you want to delete your comment? This will only remove it from your current session.'}
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setCommentToDelete(null)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteComment(
                commentToDelete.id,
                commentToDelete.isPermanent
              )}
              className={`px-4 py-2 text-sm text-white rounded-lg transition-colors ${
                isPermanent 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isPermanent ? 'Delete Permanently' : 'Delete'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  // Add delete comment handler
  const handleDeleteComment = useCallback(async (commentId, isPermanent = false) => {
    try {
      const res = await fetch(`/api/blogs/${blogDate}/comments`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          commentId,
          isPermanent
        }),
      });

      if (res.ok) {
        // Update state optimistically
        setComments(prevComments => prevComments.filter(c => c.id !== commentId));

        // Remove from user's comments if it was their comment
        if (!isPermanent) {
          setUserComments(prev => {
            const newSet = new Set(prev);
            newSet.delete(commentId);
            return newSet;
          });
        }
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setCommentToDelete(null);
    }
  }, [blogDate]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6" />
        Comments
      </h2>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newComment.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            maxLength={50} // Prevent extremely long names
            pattern="[^<>]*" // Prevent HTML tags
            title="Please enter a valid name without HTML tags"
          />
        </div>
        <textarea
          value={newComment.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
          required
          maxLength={1000} // Prevent extremely long comments
          pattern="[^<>]*" // Prevent HTML tags
          title="Please enter a valid comment without HTML tags"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {commentToDelete && <DeleteConfirmationModal />}
      </AnimatePresence>
    </div>
  );
} 