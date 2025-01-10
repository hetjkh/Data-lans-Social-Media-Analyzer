"use client";

import { Post, User, Comment } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostGrid } from "./PostGrid";
import { PostInteractions } from "./PostInteractions";

interface CreatorPostsProps {
  posts: Post[];
  comments: Comment[];
  users: User[];
}

export function CreatorPosts({ posts, comments, users }: CreatorPostsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Content & Interactions</h2>
      <Tabs defaultValue="posts">
        <TabsList className="mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <PostGrid posts={posts} />
        </TabsContent>
        <TabsContent value="interactions">
          <PostInteractions posts={posts} comments={comments} users={users} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}