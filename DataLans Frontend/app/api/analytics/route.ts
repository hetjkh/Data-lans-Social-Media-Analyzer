import { NextResponse } from 'next/server';
import { mockPosts } from '@/lib/mock-data';
import { calculateMetrics } from '@/lib/analytics/metrics';
import type { EngagementMetrics } from '@/lib/types';

export async function GET() {
  try {
    const metrics: Record<string, EngagementMetrics> = {
      reel: calculateMetrics(mockPosts.filter(p => p.type === 'reel')),
      carousel: calculateMetrics(mockPosts.filter(p => p.type === 'carousel')),
      image: calculateMetrics(mockPosts.filter(p => p.type === 'image')),
    };

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}