"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const child_process_1 = require("child_process");
const wss = new WebSocket.Server({ port: 3001 });
console.log('WebSocket server running on ws://localhost:3001');
wss.on('connection', (ws) => {
    console.log('Client connected');
    let ffmpegProcess = null;
    ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        if (data.type === 'start-stream') {
            console.log('Starting webcam stream...');
            ffmpegProcess = (0, child_process_1.spawn)('ffmpeg', [
                '-f', 'dshow',
                '-i', 'video=USB2.0 HD UVC WebCam',
                '-f', 'mjpeg',
                '-pix_fmt', 'yuv420p',
                '-r', '30',
                '-q:v', '5',
                '-s', '640x480',
                'pipe:1'
            ]);
            ffmpegProcess.stdout.on('data', (data) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({
                        type: 'video-frame',
                        frame: data.toString('base64'),
                        cameraId: 0
                    }));
                }
            });
            ffmpegProcess.stderr.on('data', (data) => {
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
//# sourceMappingURL=webcamServer.js.map