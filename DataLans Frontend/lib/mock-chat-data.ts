export const mockChatData = {
  conversations: [
    {
      id: "1",
      user: "What are the top performing posts?",
      bot: {
        content: "Here are the top performing posts based on engagement:",
        data: [
          {
            postId: "p123",
            userId: "u456",
            metrics: {
              likes: 15234,
              comments: 892,
              shares: 456,
              engagement: 16582
            },
            trend: [
              { date: "2024-01", value: 12000 },
              { date: "2024-02", value: 13500 },
              { date: "2024-03", value: 15234 }
            ]
          },
          {
            postId: "p124",
            userId: "u789",
            metrics: {
              likes: 12453,
              comments: 756,
              shares: 389,
              engagement: 13598
            },
            trend: [
              { date: "2024-01", value: 10000 },
              { date: "2024-02", value: 11200 },
              { date: "2024-03", value: 12453 }
            ]
          }
        ]
      }
    },
    {
      id: "2",
      user: "Show me user engagement trends",
      bot: {
        content: "Here's the user engagement analysis:",
        data: {
          trends: [
            { period: "Jan", engagement: 45678 },
            { period: "Feb", engagement: 52340 },
            { period: "Mar", engagement: 61234 }
          ],
          topUsers: [
            { id: "u456", engagement: 16582, growth: "+12%" },
            { id: "u789", engagement: 13598, growth: "+8%" }
          ]
        }
      }
    }
  ],
  suggestions: [
    "Show top likes",
    "Analyze user engagement",
    "Compare post performance",
    "Show trending hashtags",
    "Find most active users"
  ]
};

export const mockUserProfiles = {
  "u456": {
    username: "sarah.smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    stats: {
      totalPosts: 234,
      avgEngagement: 8756,
      topCategory: "Photography",
      growthRate: "+15%"
    }
  },
  "u789": {
    username: "mike.photo",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    stats: {
      totalPosts: 189,
      avgEngagement: 6543,
      topCategory: "Travel",
      growthRate: "+9%"
    }
  }
};