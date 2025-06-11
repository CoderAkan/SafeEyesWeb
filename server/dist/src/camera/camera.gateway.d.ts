import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'ws';
import { CameraService } from './camera.service';
import * as WebSocket from 'ws';
export declare class WebSocketCameraGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly cameraService;
    server: Server;
    private readonly logger;
    private connectedClients;
    constructor(cameraService: CameraService);
    handleConnection(client: WebSocket): void;
    handleDisconnect(client: WebSocket): void;
    private handleMessage;
    private broadcastFrame;
    private processFrameAsync;
}
