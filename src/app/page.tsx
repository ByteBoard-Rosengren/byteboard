"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Typography, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getPosts } from "@/lib/api";
import CreatePostModal from "@/components/CreatePostModal";
import Navbar from "@/components/Navbar";

const { Title, Text } = Typography;

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Title level={3} className="!mb-0">Posts Feed</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreatePostOpen(true)}
          >
            Create Post
          </Button>
        </div>

        {posts.length === 0 ? (
          <Card>
            <Text>No posts yet. Be the first to create one!</Text>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.post_id}
                hoverable
                onClick={() => router.push(`/posts/${post.post_id}`)}
                className="cursor-pointer"
              >
                <Title level={4}>{post.title}</Title>
                <Text className="text-gray-600">by {post.author}</Text>
                <p className="mt-2">{post.content}</p>
                <Text className="text-sm text-gray-400">
                  {new Date(post.date_posted).toLocaleDateString()}
                </Text>
              </Card>
            ))}
          </div>
        )}
      </main>
      <CreatePostModal
        open={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPostCreated={(post) => setPosts((prev) => [post, ...prev])}
      />
    </div>
  );
}
