
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MeetingInterface } from '@/components/MeetingInterface';

const Meeting = () => {
  const { meetingId } = useParams();
  const [joined, setJoined] = useState(false);
  const [participants] = useState([
    { id: '1', name: 'You', isLocal: true, audioEnabled: true, videoEnabled: true, speaking: false },
  ]);

  useEffect(() => {
    if (meetingId) {
      // Show join message
      const joinMessage = `To join this meeting, click the link or enter meeting ID: ${meetingId}`;
      console.log(joinMessage);
    }
  }, [meetingId]);

  if (!joined) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Meeting</h2>
          <p className="text-gray-600 mb-6">Meeting ID: {meetingId}</p>
          <div className="space-y-4">
            <button
              onClick={() => setJoined(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Join with Camera & Microphone
            </button>
            <button
              onClick={() => setJoined(true)}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Join Audio Only
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MeetingInterface 
      meetingId={meetingId || ''}
      participants={participants}
    />
  );
};

export default Meeting;
