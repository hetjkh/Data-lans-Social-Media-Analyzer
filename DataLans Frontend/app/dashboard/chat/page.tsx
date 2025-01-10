"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AILoader from "@/components/AILoader";
import { Badge } from "@/components/ui/badge";

interface Message {
  type: 'user' | 'bot';
  content: string;        
  data?: {
    likes?: number[];
    total?: number;
    userDetails?: {
      username: string;
      followers: number;
      totalLikes: number;
      totalComments: number;
      totalShares: number;
    };
  };
}

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const parseMessageData = (message: string) => {
    const data: Message['data'] = {};

    // Parse likes data
    if (message.includes('Total Likes:')) {
      const numbersBeforeEquals = message.split('=')[0].match(/\d+/g);
      const totalMatch = message.split('=')[1]?.match(/\d+/);
      
      if (numbersBeforeEquals && totalMatch) {
        data.likes = numbersBeforeEquals.map(num => parseInt(num));
        data.total = parseInt(totalMatch[0]);
      }
    }

    // Parse user details
    const userDetailsRegex = /Username: (.+)[\s\S]*?Followers: ([\d,]+)[\s\S]*?Total Likes: ([\d,]+)[\s\S]*?Total Comments: ([\d,]+)[\s\S]*?Total Shares: ([\d,]+)/;
    const userDetailsMatch = message.match(userDetailsRegex);
    
    if (userDetailsMatch) {
      data.userDetails = {
        username: userDetailsMatch[1] || '',
        followers: parseInt(userDetailsMatch[2]?.replace(',', '') || '0'),
        totalLikes: parseInt(userDetailsMatch[3]?.replace(',', '') || '0'),
        totalComments: parseInt(userDetailsMatch[4]?.replace(',', '') || '0'),
        totalShares: parseInt(userDetailsMatch[5]?.replace(',', '') || '0')
      };
    }

    return Object.keys(data).length > 0 ? data : undefined;
  };

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return;

    const newMessage: Message = { type: 'user', content: query };
    setChatHistory(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: query }),
      });

      const data = await response.json();
      
      if (data.success && data.message) {
        const messageData = parseMessageData(data.message);
        const botResponse: Message = {
          type: 'bot',
          content: data.message,
          data: messageData
        };
        
        setChatHistory(prev => [...prev, botResponse]);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error processing message:', error);
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I encountered an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false);
      setQuery("");
    }
  };

  // ////////////////////////

  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = (prompt) => {
    setQuery(prompt);
  };


  // //////////////////////

  const LikesChart = ({ data }: { data: number[] }) => {
    const chartData = data.map((value, index) => ({
      name: `Post ${index + 1}`,
      likes: value
    }));

    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-background border rounded-lg p-3 shadow-lg">
            <p className="font-medium">{payload[0].payload.name}</p>
            <p className="text-primary">Likes: {payload[0].value}</p>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="w-full h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'hsl(var(--foreground))' }}
              tickLine={{ stroke: 'hsl(var(--foreground))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--foreground))' }}
              tickLine={{ stroke: 'hsl(var(--foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="likes" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const UserDetails = ({ details }: { details: NonNullable<Message['data']>['userDetails'] }) => {
    return (
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-2">{details.username}</h3>
        <p>Followers: {details.followers}</p>
        <p>Total Likes: {details.totalLikes}</p>
        <p>Total Comments: {details.totalComments}</p>
        <p>Total Shares: {details.totalShares}</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <div className="border-b p-8 bg-card">
          <div className="flex items-center pl-[50px] gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">AI Assistant</h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} ${message.data ? 'max-w-[90%]' : 'max-w-[70%]'}`}>
                <Avatar className="h-8 w-8 shrink-0">
                  {message.type === 'user' ? (
                    <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  ) : (
                    <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </Avatar>
                <Card className={`p-3 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                } ${message.data ? 'w-full' : ''}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.data?.likes && <LikesChart data={message.data.likes} />}
                  {message.data?.userDetails && <UserDetails details={message.data.userDetails} />}
                </Card>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2">
                <Avatar className="h-8 w-8 shrink-0">
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                </Avatar>
                <Card className="p-3 bg-muted">
                  <AILoader />
                </Card>
              </div>
            </div>
          )}
        </div>

        <div className="container">
      <div className="space-x-2 mb-3 flex flex-wrap items-center justify-center">
        <Badge
          className="cursor-pointer"
          onClick={() => handleButtonClick("Give me total likes ⁠")}
        >
          give me total likes ⁠
        </Badge>
        <Badge
          className="cursor-pointer"
          onClick={() => handleButtonClick("Give me total comments ⁠")}
        >
          give me total comments ⁠ 
        </Badge>
        <Badge
          className="cursor-pointer"
          onClick={() => handleButtonClick("Give me this username details sarah.smith")}
        >
          give me this username details sarah.smith
        </Badge>
        <Badge
          className="cursor-pointer"
          onClick={() => handleButtonClick("What is the engagement rate for static posts? ⁠")}
        >
          What is the engagement rate for static posts? ⁠ 
        </Badge>

      </div>
    </div>

        <div className="border-t p-4 bg-card">
          <div className="flex gap-4 max-w-4xl mx-auto">
            <Input 
              placeholder="Ask me anything about your analytics..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

