'use client';
import { useState } from 'react';
import { Comment } from '../types';
import styles from './Comments.module.css';

type Props = {
  comment: Comment;
  onReply: (parentId: string, text: string) => void;
}

export default function CommentNode({ comment, onReply }: Props) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText('');
    setShowReply(false);
  };

  return (
    <div className={styles.node}>
      <div className={styles.comment}>

        {/* Author */}
        <p className={styles.author}>{comment.author}</p>

        {/* Text */}
        <p className={styles.text}>{comment.text}</p>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.btn}
            onClick={() => setShowReply(prev => !prev)}
          >
            {showReply ? 'Cancel' : 'Reply'}
          </button>
        </div>

        {/* Reply Input */}
        {showReply && (
          <div className={styles.replyBox}>
            <input
              className={styles.replyInput}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              autoFocus
            />
            <button className={styles.btn} onClick={handleReply}>
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Replies — recursion happens here */}
      {comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map(reply => (
            <CommentNode
              key={reply.id}
              comment={reply}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}