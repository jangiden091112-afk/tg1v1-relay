# 훈련장 1v1 전용 중계 서버

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/iden1112/claude-game-tools/tree/relay-server/servers/tg1v1-relay)

Cloudflare 무료 플랜(Workers + Durable Objects)으로 돌아가요. 카드 필요 없음.

1. 위 버튼 → Cloudflare 가입/로그인 → GitHub 연결 → **Deploy**
2. 다 되면 나오는 주소(`https://tg1v1-relay.<이름>.workers.dev`)를 게임의 「내 서버 주소」 칸에 붙여 넣기
3. 주소를 브라우저로 열면 `tg1v1 relay ok` 가 보이면 성공

동작: `wss://<주소>/room/<방 코드>` 로 접속한 사람끼리 메시지를 그대로 주고받아요.
무료 한도(하루 요청 100,000개, 받는 웹소켓 메시지는 20개당 1개로 계산)를 넘으면 그날만 멈추고 돈은 안 나가요.
