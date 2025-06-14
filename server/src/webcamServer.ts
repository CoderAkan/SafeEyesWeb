import * as WebSocket from 'ws';
import { spawn } from 'child_process';

const wss = new WebSocket.Server({ port: 3001 });

console.log('WebSocket server running on ws://localhost:3001');

wss.on('connection', (ws) => {
    console.log('Client connected');
    let ffmpegProcess: any = null;

    ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        
        if (data.type === 'start-stream') {
            console.log('Starting webcam stream...');
            
            ffmpegProcess = spawn('ffmpeg', [
                '-f', 'dshow',
                '-i', 'video=USB2.0 HD UVC WebCam', // Will update this after checking available devices
                '-f', 'mjpeg',
                '-pix_fmt', 'yuv420p',
                '-r', '30',
                '-q:v', '5',
                '-s', '640x480',
                'pipe:1'
            ]);

            ffmpegProcess.stdout.on('data', (data: Buffer) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({
                        type: 'video-frame',
                        frame: data.toString('base64'),
                        cameraId: 0
                    }));
                }
            });

            ffmpegProcess.stderr.on('data', (data: Buffer) => {
                console.log('FFmpeg log:', data.toString());
            });
        }
        
        if (data.type === 'stop-stream' && ffmpegProcess) {
            ffmpegProcess.kill('SIGTERM');
            ffmpegProcess = null;
            console.log('Stream stopped');
        }
    });

    ws.on('close', () => {
        if (ffmpegProcess) {
            ffmpegProcess.kill('SIGTERM');
            ffmpegProcess = null;
        }
        console.log('Client disconnected');
    });
});