// websocket.gateway.ts
import { 
    WebSocketGateway, 
    WebSocketServer, 
    OnGatewayConnection, 
    OnGatewayDisconnect 
  } from '@nestjs/websockets';
  import { Server } from 'ws';
  import { CameraService } from './camera.service';
  import { Logger } from '@nestjs/common';
  import * as WebSocket from 'ws';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class WebSocketCameraGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    private readonly logger = new Logger(WebSocketCameraGateway.name);
    private connectedClients = new Map<string, WebSocket>();
  
    constructor(private readonly cameraService: CameraService) {
      // Listen for camera frames
      this.cameraService.on('frame', (data: { cameraId: number; frameBuffer: Buffer }) => {
        this.broadcastFrame(data.cameraId, data.frameBuffer);
      });
    }
  
    handleConnection(client: WebSocket): void {
      const clientId = Math.random().toString(36).substring(7);
      this.connectedClients.set(clientId, client);
      this.logger.log(`Client connected: ${clientId}`);
  
      client.on('message', (message: string) => {
        try {
          const data = JSON.parse(message);
          this.handleMessage(client, data);
        } catch (error) {
          this.logger.error('Error parsing message:', error);
        }
      });
  
      client.on('close', () => {
        this.connectedClients.delete(clientId);
        this.logger.log(`Client disconnected: ${clientId}`);
      });
    }
  
    handleDisconnect(client: WebSocket): void {
      // Cleanup handled in connection event
    }
  
    private async handleMessage(client: WebSocket, data: any): Promise<void> {
      switch (data.type) {
        case 'start-stream':
          try {
            await this.cameraService.startCameraStream(data.cameraId, 1); // Default user ID
            client.send(JSON.stringify({
              type: 'stream-started',
              cameraId: data.cameraId,
              status: 'success'
            }));
          } catch (error) {
            client.send(JSON.stringify({
              type: 'error',
              message: error.message,
              cameraId: data.cameraId
            }));
          }
          break;
  
        case 'stop-stream':
          try {
            this.cameraService.stopCameraStream(data.cameraId);
            client.send(JSON.stringify({
              type: 'stream-stopped',
              cameraId: data.cameraId,
              status: 'success'
            }));
          } catch (error) {
            client.send(JSON.stringify({
              type: 'error',
              message: error.message,
              cameraId: data.cameraId
            }));
          }
          break;
      }
    }
  
    private async broadcastFrame(cameraId: number, frameBuffer: Buffer): Promise<void> {
      if (this.connectedClients.size > 0) {
        const base64Frame = frameBuffer.toString('base64');
        
        const message = JSON.stringify({
          type: 'video-frame',
          cameraId,
          frame: base64Frame,
          timestamp: Date.now(),
        });
  
        // Broadcast to all connected clients
        this.connectedClients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
  
        // Process frame for AI analysis
        this.processFrameAsync(cameraId, frameBuffer);
      }
    }
  
    private async processFrameAsync(cameraId: number, frameBuffer: Buffer): Promise<void> {
      try {
        const aiResult = await this.cameraService.processFrameForAI(cameraId, frameBuffer);
        
        const analysisMessage = JSON.stringify({
          type: 'ai-analysis',
          cameraId,
          analysis: aiResult,
        });
  
        // If dangerous situation detected, send alert
        if (aiResult.is_dangerous) {
          const alertMessage = JSON.stringify({
            type: 'danger-alert',
            cameraId,
            alert: aiResult,
            timestamp: Date.now(),
          });
  
          this.connectedClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(alertMessage);
            }
          });
        }
  
        // Send AI analysis results
        this.connectedClients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(analysisMessage);
          }
        });
  
      } catch (error) {
        this.logger.error(`Error processing frame for AI (Camera ${cameraId}):`, error);
      }
    }
  }