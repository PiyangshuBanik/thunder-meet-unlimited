
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MonitorSpeaker, 
  PhoneOff, 
  Users, 
  Settings,
  Grid3x3,
  Maximize,
  MessageSquare
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  isLocal: boolean;
  audioEnabled: boolean;
  videoEnabled: boolean;
  speaking: boolean;
}

interface MeetingInterfaceProps {
  meetingId: string;
  participants: Participant[];
}

export const MeetingInterface = ({ meetingId, participants }: MeetingInterfaceProps) => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'spotlight'>('grid');
  const [duration, setDuration] = useState(0);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleAudio = () => setAudioEnabled(!audioEnabled);
  const toggleVideo = () => setVideoEnabled(!videoEnabled);
  const toggleScreenShare = () => setScreenSharing(!screenSharing);
  const toggleLayout = () => setLayout(layout === 'grid' ? 'spotlight' : 'grid');

  const endCall = () => {
    window.location.href = '/';
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col relative">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-semibold">ThunderCall</h1>
          <span className="text-gray-300 text-sm">Meeting ID: {meetingId}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">{formatDuration(duration)}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowParticipants(!showParticipants)}
            className="text-white hover:bg-gray-700"
          >
            <Users className="h-4 w-4 mr-1" />
            {participants.length}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className={`h-full ${layout === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex justify-center items-center'}`}>
            {participants.map((participant) => (
              <div 
                key={participant.id}
                className={`bg-gray-800 rounded-lg relative overflow-hidden ${
                  layout === 'spotlight' && participant.speaking ? 'w-full h-full' : ''
                }`}
              >
                {videoEnabled ? (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white text-2xl">{participant.name[0]}</span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <VideoOff className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                {/* Participant Info */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-sm">
                  {participant.name}
                  {!participant.audioEnabled && <MicOff className="inline h-3 w-3 ml-1" />}
                  {participant.speaking && (
                    <div className="absolute -top-1 -left-1 w-full h-full border-2 border-green-400 rounded" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Participants Panel */}
        {showParticipants && (
          <div className="w-80 bg-gray-800 p-4">
            <h3 className="text-white font-semibold mb-4">Participants ({participants.length})</h3>
            <div className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                    {participant.name[0]}
                  </div>
                  <span className="text-white flex-1">{participant.name}</span>
                  <div className="flex space-x-1">
                    {!participant.audioEnabled && <MicOff className="h-4 w-4 text-red-400" />}
                    {!participant.videoEnabled && <VideoOff className="h-4 w-4 text-red-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant={audioEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full w-12 h-12"
          >
            {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>
          
          <Button
            variant={videoEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-12 h-12"
          >
            {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          
          <Button
            variant={screenSharing ? "secondary" : "outline"}
            size="lg"
            onClick={toggleScreenShare}
            className="rounded-full w-12 h-12"
          >
            <MonitorSpeaker className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={toggleLayout}
            className="rounded-full w-12 h-12"
          >
            {layout === 'grid' ? <Maximize className="h-5 w-5" /> : <Grid3x3 className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12"
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            onClick={endCall}
            className="rounded-full w-12 h-12"
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
