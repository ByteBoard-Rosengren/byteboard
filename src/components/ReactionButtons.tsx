import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons';

interface Props {
    likes: number;
    dislikes: number;
    userReaction: 'like' | 'dislike' | null;
    onReact: (reaction: 'like' | 'dislike') => void;
    disabled?: boolean; //true when user is not logged in
}

export default function ReactionButtons({ likes, dislikes, userReaction, onReact, disabled }: Props) {
    return (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center'}}>
            <button onClick={() => !disabled && onReact('like')} disabled={disabled}>
                {userReaction === 'like' ? <LikeFilled /> : <LikeOutlined />}
                <span>{likes}</span>
            </button>
            <button onClick={() => !disabled && onReact('dislike')} disabled={disabled}>
                {userReaction === 'dislike' ? <DislikeFilled /> : <DislikeOutlined />}
                <span>{dislikes}</span>
            </button>
        </div>
    );
}
