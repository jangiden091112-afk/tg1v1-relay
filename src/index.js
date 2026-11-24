// 훈련장 1v1 전용 중계 서버 (Cloudflare Workers + Durable Objects, 무료 플랜)
// 방 코드마다 방(Room) 하나. 한 사람이 보낸 메시지를 같은 방의 다른 사람에게 그대로 전달해요.
import { DurableObject } from 'cloudflare:workers';

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const m = url.pathname.match(/^\/room\/([A-Za-z0-9_\/.-]{1,64})$/);
    if (!m) return new Response('tg1v1 relay ok', { headers: { 'content-type': 'text/plain; charset=utf-8', 'access-control-allow-origin': '*' } });
    if (req.headers.get('Upgrade') !== 'websocket') return new Response('websocket only', { status: 426 });
    return env.ROOMS.getByName(m[1]).fetch(req);
  },
};

export class Room extends DurableObject {
  async fetch(req) {
    if (this.ctx.getWebSockets().length >= 16) return new Response('room full', { status: 429 });
    const [client, server] = Object.values(new WebSocketPair());
    this.ctx.acceptWebSocket(server); // 조용할 때는 잠들어서 무료 한도를 아껴요
    return new Response(null, { status: 101, webSocket: client });
  }
  async webSocketMessage(ws, msg) {
    if (typeof msg !== 'string' || msg.length > 60000) return;
    for (const o of this.ctx.getWebSockets()) if (o !== ws) { try { o.send(msg); } catch (e) {} }
  }
  async webSocketClose(ws) { try { ws.close(); } catch (e) {} }
  async webSocketError(ws) { try { ws.close(); } catch (e) {} }
}
