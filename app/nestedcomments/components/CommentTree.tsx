'use client';
import { useState } from 'react';
import { Comment } from '../types';
import { initialComments } from '../data/initialData';
import CommentNode from './CommentNode';

// recursive function to add reply to correct parent
const addReplyToComment = (
  comments: Comment[],
  parentId: string,
  newReply: Comment
): Comment[] => {
  return comments.map(comment => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, newReply] };
    }
    return {
      ...comment,
      replies: addReplyToComment(comment.replies, parentId, newReply)
    };
  });
};

export default function CommentTree() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleReply = (parentId: string, text: string) => {
    const newReply: Comment = {
      id: crypto.randomUUID(),
      author: 'You',
      text,
      replies: [],
    };

    setComments(prev => addReplyToComment(prev, parentId, newReply));
  };

  return (
    <div>
      {comments.map(comment => (
        <CommentNode
          key={comment.id}
          comment={comment}
          onReply={handleReply}
        />
      ))}
    </div>
  );
}