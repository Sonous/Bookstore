import React, { useState } from 'react';

const CommentCard = ({ comment, onLike, onReply, isTopLevel }) => {
    const [replyText, setReplyText] = useState('');
    const [showReplyInput, setShowReplyInput] = useState(false);

    const handleReplySubmit = () => {
        if (replyText) {
            onReply(comment.id, replyText);
            setReplyText('');
            setShowReplyInput(false); // Hide input after submitting
        }
    };

    return (
        <div className="comment mb-4 p-2 border border-gray-400 rounded-xl">
            <div>
                <strong>{comment.author}</strong>: {comment.text}
            </div>
            {isTopLevel && (
                <div className="actions flex gap-4">
                    <button onClick={() => onLike(comment.id)}>Like ({comment.likes})</button>
                    <button onClick={() => setShowReplyInput(!showReplyInput)}>Reply</button>
                </div>
            )}

            {showReplyInput && (
                <div className="reply-input mt-2 border border-gray-400 flex justify-between px-10 ml-10 rounded-xl">
                    <input
                        className="bg-transparent"
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                    />
                    <button onClick={handleReplySubmit}>Submit</button>
                </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
                <div className="replies ml-40 w-2/3 items-end ">
                    {comment.replies.map((reply) => (
                        <CommentCard
                            key={reply.id}
                            comment={reply}
                            onLike={onLike} // Keep this for potential future use, but handle likes conditionally in your main component
                            onReply={onReply}
                            isTopLevel={false} // Mark replies as not top-level
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentCard;
