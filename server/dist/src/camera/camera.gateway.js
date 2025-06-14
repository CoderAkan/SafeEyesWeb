"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebSocketCameraGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketCameraGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const ws_1 = require("ws");
const camera_service_1 = require("./camera.service");
const common_1 = require("@nestjs/common");
const WebSocket = require("ws");
let WebSocketCameraGateway = WebSocketCameraGateway_1 = class WebSocketCameraGateway {
    constructor(cameraService) {
        this.cameraService = cameraService;
        this.logger = new common_1.Logger(WebSocketCameraGateway_1.name);
        this.connectedClients = new Map();
        this.cameraService.on('frame', (data) => {
            this.broadcastFrame(data.cameraId, data.frameBuffer);
        });
    }
    handleConnection(client) {
        const clientId = Math.random().toString(36).substring(7);
        this.connectedClients.set(clientId, client);
        this.logger.log(`Client connected: ${clientId}`);
        client.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                this.handleMessage(client, data);
            }
            catch (error) {
                this.logger.error('Error parsing message:', error);
            }
        });
        client.on('close', () => {
            this.connectedClients.delete(clientId);
            this.logger.log(`Client disconnected: ${clientId}`);
        });
    }
    handleDisconnect(client) {
    }
    async handleMessage(client, data) {
        switch (data.type) {
            case 'start-stream':
                try {
                    await this.cameraService.startCameraStream(data.cameraId, 1);
                    client.send(JSON.stringify({
                        type: 'stream-started',
                        cameraId: data.cameraId,
                        status: 'success'
                    }));
                }
                catch (error) {
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
                }
                catch (error) {
                    client.send(JSON.stringify({
                        type: 'error',
                        message: error.message,
                        cameraId: data.cameraId
                    }));
                }
                break;
        }
    }
    async broadcastFrame(cameraId, frameBuffer) {
        if (this.connectedClients.size > 0) {
            const base64Frame = frameBuffer.toString('base64');
            const message = JSON.stringify({
                type: 'video-frame',
                cameraId,
                frame: base64Frame,
                timestamp: Date.now(),
            });
            this.connectedClients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
            this.processFrameAsync(cameraId, frameBuffer);
        }
    }
    async processFrameAsync(cameraId, frameBuffer) {
        try {
            const aiResult = await this.cameraService.processFrameForAI(cameraId, frameBuffer);
            const analysisMessage = JSON.stringify({
                type: 'ai-analysis',
                cameraId,
                analysis: aiResult,
            });
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
            this.connectedClients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(analysisMessage);
                }
            });
        }
        catch (error) {
            this.logger.error(`Error processing frame for AI (Camera ${cameraId}):`, error);
        }
    }
};
exports.WebSocketCameraGateway = WebSocketCameraGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", ws_1.Server)
], WebSocketCameraGateway.prototype, "server", void 0);
exports.WebSocketCameraGateway = WebSocketCameraGateway = WebSocketCameraGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [camera_service_1.CameraService])
], WebSocketCameraGateway);
//# sourceMappingURL=camera.gateway.js.map