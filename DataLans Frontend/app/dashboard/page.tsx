'use client'

import { useEffect, useState } from "react";
import Head from 'next/head';

import {
  TrendingUp, Users, Heart, Share2, MessageCircle, Clock, Hash
} from "lucide-react";
import { StatsCard } from "@/components/metrics/StatsCard";

import { Insights } from "@/components/insights/Insights";
import { Device } from "@/components/charts/Device";
import { Visitor } from "@/components/charts/Visitor";
import { Likes } from "@/components/charts/Likes";
import { TopCreatorsList } from "@/components/creators/TopCreatorsList";

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [topCreators, setTopCreators] = useState([]);
  const userId = 1 // Replace with fallback as needed

  useEffect(() => {
    fetch(`http://localhost:3001/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data:", error));

    // Example: Fetch top creators (if applicable)
    fetch(`http://localhost:3001/top-creators`)
      .then((response) => response.json())
      .then((data) => setTopCreators(data))
      .catch((error) => console.error("Error fetching top creators:", error));
  }, [userId]);

  if (!userData) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
          <Head>
      {/* Primary Meta Tags */}
      <title>DataLans | AI-Powered Insights & Charts</title>
      <meta
        name="description"
        content="Analyze and visualize social media engagement with AI-powered insights and stunning charts. Built with Next.js, LangFlow, and Astra DB."
      />
      <meta name="keywords" content="Social Media Analytics, AI Insights, Data Visualization, Next.js, LangFlow, Astra DB" />
      <meta name="author" content="Your Name or Team Name" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://yourwebsite.com/" />
      <meta property="og:title" content="Social Media Performance Analyzer | AI-Powered Insights & Charts" />
      <meta
        property="og:description"
        content="Analyze and visualize social media engagement with AI-powered insights and stunning charts. Built with Next.js, LangFlow, and Astra DB."
      />
      <meta property="og:image" content="https://yourwebsite.com/og-image.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://yourwebsite.com/" />
      <meta property="twitter:title" content="Social Media Performance Analyzer | AI-Powered Insights & Charts" />
      <meta
        property="twitter:description"
        content="Analyze and visualize social media engagement with AI-powered insights and stunning charts. Built with Next.js, LangFlow, and Astra DB."
      />
      <meta property="twitter:image" content="https://yourwebsite.com/twitter-image.png" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="p-8">
      <h1 className="text-2xl pl-[50px] font-bold mb-8">Analytics Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Posts"
          value={userData.totalPosts}
          icon={Clock}
          gradient="from-[#017AFF] to-[#017AFF]"
          iconColor="text-[#fff]/30"
        />
        <StatsCard
          title="Total Likes"
          value={userData.totalLikes}
          icon={Heart}
          gradient="from-[#F34971] to-[#F34971]"
          iconColor="text-[#fff]/30"
        />
        <StatsCard
          title="Total Comments"
          value={userData.totalComments}
          icon={MessageCircle}
          gradient="from-[#00D37F] to-[#00D37F]"
          iconColor="text-[#fff]/30"
        />
        <StatsCard
          title="Total Shares"
          value={userData.totalShares}
          icon={Share2}
          gradient="from-[#017AFF] to-[#017AFF]"
          iconColor="text-[#fff]/30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <Insights />
        <Visitor />
        <Likes />
        {/* <TopCreatorsList creators={topCreators} /> */}
      </div>
    </div>
    </div>
  );
}
