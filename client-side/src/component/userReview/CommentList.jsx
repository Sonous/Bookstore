import React, { useState } from 'react';
import CommentCard from './CommentCard';

const CommentList = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'User 1',
            text: 'Hay qua shop',
            likes: 0,
            replies: []
        },
        {
            id: 2,
            author: 'User 2',
            text: 'Mid',
            likes: 0,
            replies: []
        }
    ]);

    const handleLike = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? { ...comment, likes: comment.likes + 1 }
                    : {
                          ...comment,
                          replies: comment.replies.map(reply =>
                              reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
                          )
                      }
            )
        );
    };

    const handleReply = (commentId, replyText) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? {
                          ...comment,
                          replies: [
                              ...comment.replies,
                              { id: Date.now(), author: 'You', text: replyText, likes: 0, replies: [] }
                          ]
                      }
                    : comment
            )
        );
    };

    return (
        <div>
            <h2>Comments</h2>
            {comments.map(comment => (
                <CommentCard 
                    key={comment.id} 
                    comment={comment} 
                    onLike={handleLike} 
                    onReply={handleReply} 
                    isTopLevel={true} // Mark top-level comments as such
                />
            ))}
        </div>
    );
};

export default CommentList;