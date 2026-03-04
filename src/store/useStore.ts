import { create } from "zustand";

interface Post {
  post_id: number;
  user_id: number;
  username: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Profile {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  github_link: string;
  city: string;
  state: string;
}

interface Comment {
  comment_id: number;
  post_id: number;
  user_id: number;
  username: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Notification {
  notification_id: number;
  user_id: number;
  post_id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface Store {
  // Posts state
  posts: Post[];
  currentPost: Post | null;
  setPosts: (posts: Post[]) => void;
  setCurrentPost: (post: Post | null) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: number, updatedPost: Partial<Post>) => void;
  removePost: (postId: number) => void;

  // Comments state
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateComment: (commentId: number, updatedComment: Partial<Comment>) => void;
  removeComment: (commentId: number) => void;

  // Profile state
  profiles: Profile[];
  currentProfile: Profile | null;
  setProfiles: (profiles: Profile[]) => void;
  setCurrentProfile: (profile: Profile | null) => void;

  // Notifications state
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  markNotificationRead: (notificationId: number) => void;

  // UI state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  // Posts state
  posts: [],
  currentPost: null,
  setPosts: (posts) => set({ posts }),
  setCurrentPost: (post) => set({ currentPost: post }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (postId, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.post_id === postId ? { ...post, ...updatedPost } : post
      ),
    })),
  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.post_id !== postId),
    })),

  // Comments state
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (comment) =>
    set((state) => ({ comments: [...state.comments, comment] })),
  updateComment: (commentId, updatedComment) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.comment_id === commentId
          ? { ...comment, ...updatedComment }
          : comment
      ),
    })),
  removeComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter(
        (comment) => comment.comment_id !== commentId
      ),
    })),

  // Profile state
  profiles: [],
  currentProfile: null,
  setProfiles: (profiles) => set({ profiles }),
  setCurrentProfile: (profile) => set({ currentProfile: profile }),

  // Notification state
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  markNotificationRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.notification_id === notificationId ? { ...n, is_read: true } : n
      ),
    })),

  // UI state
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
