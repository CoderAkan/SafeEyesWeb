import { useState, useEffect,  } from 'react';
import { Play, Square, Camera, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
//import React, {useRef} from 'react';      //temporary comment for dev build
const CameraStream = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentFrame, setCurrentFrame] = useState<string>('');
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [dangerAlerts, setDangerAlerts] = useState<any[]>([]);
  const [selectedCamera, setSelectedCamera] = useState(0);
  const [connectionError, setConnectionError] = useState<string>('');
//const canvasRef = useRef<HTMLCanvasElement>(null); //temporary comment for dev build

  useEffect(() => {
    // Since your backend uses Socket.IO but we can't use the client library,
    // we need to change your backend to use native WebSocket instead
    // For now, let's use native WebSocket and you'll need to update your backend
    
    const newSocket = new WebSocket('ws://localhost:3001');

    newSocket.onopen = () => {
      console.log('Connected to server');
      setIsConnected(true);
      setConnectionError('');

      newSocket.send(JSON.stringify({ 
        type: 'get-active-streams' 
      }));
    };

    newSocket.onclose = () => {
      console.log('Disconnected from server');
      setIsConnected(false);
      setIsStreaming(false);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
      setConnectionError('Connection failed');
    };

    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        console.log('Received WebSocket message:', data); 
  
        switch (data.type) {
          case 'video-frame':
            if (data.cameraId === selectedCamera) {
              setCurrentFrame(`data:image/jpeg;base64,${data.frame}`);
            }
            break;
          case 'ai-analysis':
            if (data.cameraId === selectedCamera) {
              setAiAnalysis(data.analysis);
            }
            break;
          case 'danger-alert':
            setDangerAlerts(prev => [data, ...prev.slice(0, 4)]);
            
            // Show browser notification if dangerous situation detected
            if (Notification.permission === 'granted') {
              new Notification('⚠️ Danger Detected!', {
                body: 'Dangerous situation detected in manufacturing area',
                icon: '/favicon.ico'
              });
            }
            break;
          case 'stream-started':
            if (data.cameraId === selectedCamera) {
              setIsStreaming(true);
            }
            break;
          case 'stream-stopped':
            if (data.cameraId === selectedCamera) {
              setIsStreaming(false);
              setCurrentFrame('');
            }
            break;
          case 'active-streams':
            console.log('Active streams:', data.streams);
            if (data.streams.includes(selectedCamera)) {
              setIsStreaming(true);
            }
            break;
          case 'error':
            console.error('Socket error:', data);
            setConnectionError(data.message || 'Socket error occurred');
            break;
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    setSocket(newSocket);

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      newSocket.close();
    };
  }, [selectedCamera]);

  const startStream = () => {
    console.log('startStream called', {
      socketExists: !!socket,
      readyState: socket?.readyState,
      selectedCamera
    });

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ 
        type: 'start-stream', 
        cameraId: selectedCamera 
      }));
    }
  };

  const stopStream = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ 
        type: 'stop-stream', 
        cameraId: selectedCamera 
      }));
    }
  };

  const clearAlerts = () => {
    setDangerAlerts([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manufacturing Safety Monitor</h1>
          <p className="text-gray-400">AI-powered dangerous situation detection system</p>
        </div>

        {/* Connection Status */}
        <div className="mb-6 flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isConnected ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
          }`}>
            {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isStreaming ? 'bg-blue-900/30 text-blue-400' : 'bg-gray-700 text-gray-400'
          }`}>
            <Camera size={16} />
            <span>{isStreaming ? 'Streaming' : 'Stopped'}</span>
          </div>

          {connectionError && (
            <div className="bg-red-900/30 text-red-400 px-3 py-2 rounded-lg text-sm">
              Error: {connectionError}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Stream */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Camera Feed</h2>
                <div className="flex items-center space-x-3">
                  <select 
                    value={selectedCamera}
                    onChange={(e) => setSelectedCamera(Number(e.target.value))}
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm"
                    disabled={isStreaming}
                  >
                    <option value={0}>Camera 0</option>
                    <option value={1}>Camera 1</option>
                  </select>
                  
                  {!isStreaming ? (
                    <button
                      onClick={startStream}
                      disabled={!isConnected}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Play size={16} />
                      <span>Start</span>
                    </button> 
                  ) : (
                    <button
                      onClick={stopStream}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Square size={16} />
                      <span>Stop</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                {currentFrame ? (
                  <img 
                    src={currentFrame} 
                    alt="Camera feed"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <Camera size={48} className="mx-auto mb-2" />
                      <p>
                        {!isConnected 
                          ? 'Connecting...' 
                          : isStreaming 
                            ? 'Loading video...' 
                            : 'Click Start to begin streaming'
                        }
                      </p>
                      {connectionError && (
                        <p className="text-red-400 text-sm mt-2">{connectionError}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* AI Analysis Overlay */}
                {aiAnalysis && currentFrame && (
                  <div className="absolute top-4 left-4 bg-black/70 rounded-lg p-3 text-sm">
                    <div className="text-green-400 mb-1">AI Analysis</div>
                    <div>Detections: {aiAnalysis.detections?.length || 0}</div>
                    <div className={`${aiAnalysis.is_dangerous ? 'text-red-400' : 'text-green-400'}`}>
                      Status: {aiAnalysis.is_dangerous ? 'DANGER' : 'SAFE'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Danger Alerts */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-red-400">⚠️ Danger Alerts</h3>
                {dangerAlerts.length > 0 && (
                  <button
                    onClick={clearAlerts}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {dangerAlerts.length === 0 ? (
                <p className="text-gray-500 text-sm">No danger alerts</p>
              ) : (
                <div className="space-y-3">
                  {dangerAlerts.slice(0, 5).map((alert, index) => (
                    <div key={index} className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle size={16} className="text-red-400" />
                        <span className="text-red-400 font-medium">Danger Detected</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                      {alert.alert?.detections && (
                        <div className="text-xs text-gray-400 mt-1">
                          {alert.alert.detections.length} detection(s)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Analysis Details */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
              
              {aiAnalysis ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-400">Last Update:</span>
                    <div className="text-sm">{new Date(aiAnalysis.timestamp).toLocaleTimeString()}</div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-400">Detections:</span>
                    <div className="text-sm">{aiAnalysis.detections?.length || 0}</div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-400">Safety Status:</span>
                    <div className={`text-sm font-medium ${
                      aiAnalysis.is_dangerous ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {aiAnalysis.is_dangerous ? 'DANGER DETECTED' : 'SAFE'}
                    </div>
                  </div>

                  {aiAnalysis.detections && aiAnalysis.detections.length > 0 && (
                    <div className="mt-4">
                      <span className="text-sm text-gray-400">Detected Objects:</span>
                      <div className="mt-2 space-y-2">
                        {aiAnalysis.detections.map((detection: any, index: number) => (
                          <div key={index} className="bg-gray-700 rounded p-2 text-sm">
                            <div className="flex justify-between">
                              <span>{detection.type}</span>
                              <span className="text-gray-400">{Math.round(detection.confidence * 100)}%</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Danger Level: {detection.danger_level}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No analysis data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraStream;