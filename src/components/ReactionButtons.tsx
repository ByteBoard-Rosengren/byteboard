'use client';

import { useState } from 'react';
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons';

interface Props {
    likes: number;
    dislikes: number;
    userReaction: 'like' | 'dislike' | null;
    onReact: (reaction: 'like' | 'dislike') => void;
    disabled?: boolean;
}

const btnStyle = (hovered: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 14,
    background: 'none',
    border: `1px solid ${hovered ? '#4a90d9' : '#444'}`,
    borderRadius: 6,
    padding: '3px 8px',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
});

export default function ReactionButtons({ likes, dislikes, userReaction, onReact, disabled }: Props) {
    const [likeHovered, setLikeHovered] = useState(false);
    const [dislikeHovered, setDislikeHovered] = useState(false);

    return (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}>
            <button
                onClick={() => !disabled && onReact('like')}
                disabled={disabled}
                style={btnStyle(likeHovered)}
                onMouseEnter={() => setLikeHovered(true)}
                onMouseLeave={() => setLikeHovered(false)}
            >
                {userReaction === 'like' ? <LikeFilled /> : <LikeOutlined />}
                <span>{likes}</span>
            </button>
            <button
                onClick={() => !disabled && onReact('dislike')}
                disabled={disabled}
                style={btnStyle(dislikeHovered)}
                onMouseEnter={() => setDislikeHovered(true)}
                onMouseLeave={() => setDislikeHovered(false)}
            >
                {userReaction === 'dislike' ? <DislikeFilled /> : <DislikeOutlined />}
                <span>{dislikes}</span>
            </button>
        </div>
    );
}
