import { NextResponse } from 'next/server';
import { twitterClient } from '@/lib/twitter/client';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const user = await twitterClient.v2.userByUsername(params.username, {
      'user.fields': ['profile_image_url', 'public_metrics'],
    });

    const tweets = await twitterClient.v2.userTimeline(user.data.id, {
      max_results: 100,
      'tweet.fields': ['created_at', 'public_metrics', 'attachments'],
      'media.fields': ['type', 'url'],
      expansions: ['attachments.media_keys'],
    });

    return NextResponse.json({
      user: user.data,
      tweets: tweets.data,
    });
  } catch (error) {
    console.error('Twitter API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Twitter data' },
      { status: 500 }
    );
  }
}