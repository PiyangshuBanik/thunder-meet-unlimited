
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Users, Share2, Shield, Clock, Zap } from 'lucide-react';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [meetingId, setMeetingId] = useState('');

  const generateMeetingId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const createMeeting = () => {
    const newMeetingId = generateMeetingId();
    window.location.href = `/meeting/${newMeetingId}`;
  };

  const joinMeeting = () => {
    if (meetingId.trim()) {
      window.location.href = `/meeting/${meetingId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Thunder<span className="text-blue-600">Call</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect, collaborate, and communicate with crystal-clear video calls. 
            Host meetings for up to 100 participants with advanced features.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Button 
              onClick={createMeeting}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <Video className="mr-2 h-5 w-5" />
              Start New Meeting
            </Button>
            
            <div className="flex w-full md:w-auto gap-2">
              <Input
                placeholder="Enter meeting ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={joinMeeting}
                variant="outline"
                disabled={!meetingId.trim()}
              >
                Join
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Up to 100 Participants</CardTitle>
              <CardDescription>
                Host large meetings with crystal-clear audio and video
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Share2 className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Screen Sharing</CardTitle>
              <CardDescription>
                Share your screen, applications, or specific tabs seamlessly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Background Filters</CardTitle>
              <CardDescription>
                Apply beautiful backgrounds and blur effects to your video
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Unlimited Duration</CardTitle>
              <CardDescription>
                No time limits on your meetings - talk as long as you need
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="h-10 w-10 text-yellow-600 mb-2" />
              <CardTitle>Smart Spotlight</CardTitle>
              <CardDescription>
                Automatic focus on the active speaker for better engagement
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Video className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle>HD Video Quality</CardTitle>
              <CardDescription>
                Experience crisp, high-definition video in all your meetings
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of teams already using ThunderCall for their video conferencing needs.
          </p>
          <Button 
            onClick={createMeeting}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Start Your First Meeting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
