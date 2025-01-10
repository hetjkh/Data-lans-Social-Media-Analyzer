"use client";

import { mockUsers, mockPosts, mockComments } from "@/lib/mock-data";
import { analyzeCreatorStats } from "@/lib/analytics/creator";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreatorPostTypeDistribution } from "@/components/creator/CreatorPostTypeDistribution";
import { CreatorEngagementTrend } from "@/components/creator/CreatorEngagementTrend";
import { HashtagsAnalysis } from "@/components/analytics/HashtagsAnalysis";
import { PostingTimeAnalysis } from "@/components/analytics/PostingTimeAnalysis";
import { CreatorPosts } from "@/components/creator/CreatorPosts";
import { UserStats } from "@/components/creator/UserStats";
import { UserInteractionHistory } from "@/components/creator/UserInteractionHistory";
import { Badge } from "@/components/ui/badge";
import { Insights } from "@/components/insights/Insights";
import { Device } from "@/components/charts/Device";
import { Visitor } from "@/components/charts/Visitor";
import { Likes } from "@/components/charts/Likes";


export function CreatorPageClient({ id }: { id: string }) {
  const user = mockUsers.find((u) => u.id === id);
  const userPosts = mockPosts.filter((p) => p.userId === id);
  const stats = analyzeCreatorStats(userPosts);
  
  if (!user) return <div>Creator not found</div>;

  return (
    <div className="p-8">
            <div className="relative z-0 w-full h-[250px] rounded-md overflow-hidden">
                    <img
                      src="/images/banner.png"
                      className="relative inset-0 w-full h-full object-cover"
                    />
                  </div>
      {/* User Profile Header */}
      <div className="flex items-center gap-6 mb-8 ml-2 mt-[-60px]">
        <Avatar className="h-40 w-40">
          <AvatarImage src={user.avatarUrl} alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="mt-20">
          <h1 className="text-3xl font-bold uppercase mb-3">{user.username}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
          <Badge>{user.username}</Badge>
          <Badge>{user.followersCount.toLocaleString()} Followers</Badge>
          <Badge>{user.followingCount.toLocaleString()} Following</Badge>

          </div>
        </div>
      </div>

      {/* User Statistics */}
      <UserStats posts={userPosts} />

      {/* Content Distribution and Engagement Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* <CreatorPostTypeDistribution postsByType={stats.postsByType} />
        <CreatorEngagementTrend data={stats.engagementTrend} /> */}
        <Visitor />
        <Likes/>
      </div>

      {/* Posts and Interactions */}
      <div className="mb-8">
        <CreatorPosts 
          posts={userPosts}
          comments={mockComments}
          users={mockUsers}
        />
      </div>

      {/* User Interaction History */}
      <UserInteractionHistory 
        user={user}
        allPosts={mockPosts}
        allComments={mockComments}
        allUsers={mockUsers}
      />

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HashtagsAnalysis hashtags={stats.topHashtags} />
        <PostingTimeAnalysis patterns={stats.postingTimes} />
      </div>
    </div>
  );
}