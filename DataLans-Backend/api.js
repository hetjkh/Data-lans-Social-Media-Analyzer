import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { DataAPIClient } from '@datastax/astra-db-ts';
import dotenv from 'dotenv';

dotenv.config();

const LANGFLOW_CONFIG = {
  BASE_API_URL: process.env.LANGFLOW_BASE_API_URL,
  LANGFLOW_ID: process.env.LANGFLOW_ID,
  FLOW_ID: process.env.FLOW_ID,
  APPLICATION_TOKEN: process.env.APPLICATION_TOKEN,
};

const LANGFLOW_CONFIG_SECOND = {
  BASE_API_URL_SECOND: process.env.LANGFLOW_BASE_API_URL_SECOND,
  LANGFLOW_ID_SECOND: process.env.LANGFLOW_ID_SECOND,
  FLOW_ID_SECOND: process.env.FLOW_ID_SECOND,
  APPLICATION_TOKEN_SECOND: process.env.APPLICATION_TOKEN_SECOND,
};

const app = express();
const client = new DataAPIClient(process.env.ASTRA_APPLICATION_TOKEN);
const db = client.db(process.env.ASTRA_DB_URL);
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input value is required.' });
  }

  console.log(`Input received from client: ${input}`);

  const payload = {
    input_value: input,
    output_type: 'chat',
    input_type: 'chat',
    tweaks: {
      'ChatInput-EBq7W': {},
      'AstraDBToolComponent-yYelR': {},
      'ParseData-XYEzQ': {},
      'Prompt-JOFIo': {},
      'ChatOutput-LUxmd': {},
      'GroqModel-dfGx4': {},
    },
  };

  const headers = {
    Authorization: `Bearer ${LANGFLOW_CONFIG.APPLICATION_TOKEN}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(
      `${LANGFLOW_CONFIG.BASE_API_URL}/lf/${LANGFLOW_CONFIG.LANGFLOW_ID}/api/v1/run/${LANGFLOW_CONFIG.FLOW_ID}?stream=false`,
      payload,
      { headers },
    );

    const outputs = response.data?.outputs || [];
    if (outputs.length > 0) {
      const artifacts = outputs[0]?.outputs[0]?.artifacts;
      if (artifacts && artifacts.message) {
        return res.json({ success: true, message: artifacts.message });
      }
      return res.json({ success: false, message: 'No message found in artifacts.' });
    }
    return res.json({ success: false, message: 'No valid outputs found in response.' });
  } catch (error) {
    console.error('Chat API error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.get('/user/1', async (req, res) => {
  try {
    const userCollection = db.collection('user');
    const user = await userCollection.find({ id: '1' }).toArray();

    const postCollection = db.collection('post');
    const posts = await postCollection.find({ userId: '1' }).toArray();

    let totalPosts = 0;
    let totalLikes = 0;
    let totalShares = 0;
    let totalComments = 0;
    let totalReels = 0;
    let totalCarousels = 0;
    let totalImages = 0;
    let mostLikedPost = null;
    let mostSharedPost = null;
    let mostCommentedPost = null;
    let totalEngagement = 0;

    posts.forEach((post) => {
      totalPosts++;
      totalLikes += post.likes;
      totalShares += post.shares;
      totalComments += post.comments;

      if (!mostLikedPost || post.likes > mostLikedPost.likes) mostLikedPost = post;
      if (!mostSharedPost || post.shares > mostSharedPost.shares) mostSharedPost = post;
      if (!mostCommentedPost || post.comments > mostCommentedPost.comments) mostCommentedPost = post;

      if (post.type === 'reel') totalReels++;
      if (post.type === 'carousel') totalCarousels++;
      if (post.type === 'image') totalImages++;

      totalEngagement += post.likes + post.shares + post.comments;
    });

    const engagementRate = totalPosts > 0 ? totalEngagement / totalPosts : 0;

    res.json({
      user: user[0],
      totalPosts,
      totalLikes,
      totalShares,
      totalComments,
      totalReels,
      totalCarousels,
      totalImages,
      mostLikedPost,
      mostSharedPost,
      mostCommentedPost,
      engagementRate,
      posts,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/insights', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input value is required.' });
  }

  console.log(`Input received from client: ${input}`);

  const payload = {
    input_value: input,
    output_type: 'chat',
    input_type: 'chat',
    tweaks: {
      'ChatInput-EBq7W': {},
      'AstraDBToolComponent-yYelR': {},
      'ParseData-XYEzQ': {},
      'Prompt-JOFIo': {},
      'ChatOutput-LUxmd': {},
      'GroqModel-dfGx4': {},
    },
  };

  const headers = {
    Authorization: `Bearer ${LANGFLOW_CONFIG_SECOND.APPLICATION_TOKEN_SECOND}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(
      `${LANGFLOW_CONFIG_SECOND.BASE_API_URL_SECOND}/lf/${LANGFLOW_CONFIG_SECOND.LANGFLOW_ID_SECOND}/api/v1/run/${LANGFLOW_CONFIG_SECOND.FLOW_ID_SECOND}?stream=false`,
      payload,
      { headers },
    );

    const outputs = response.data?.outputs || [];
    if (outputs.length > 0) {
      const artifacts = outputs[0]?.outputs[0]?.artifacts;
      if (artifacts && artifacts.message) {
        return res.json({ success: true, message: artifacts.message });
      }
      return res.json({ success: false, message: 'No message found in artifacts.' });
    }
    return res.json({ success: false, message: 'No valid outputs found in response.' });
  } catch (error) {
    console.error('Chat API error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
