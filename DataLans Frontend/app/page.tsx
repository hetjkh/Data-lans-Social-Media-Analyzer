import Head from "next/head";
import { redirect } from "next/navigation";

export default function Home() {
  return(
    <Head>
      {/* Primary Meta Tags */}
      <title>Social Media Performance Analyzer | AI-Powered Insights & Charts</title>
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
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
  redirect("/dashboard");
}