# Jogo da Velha — Telegram Web App

Mini app estático para testar a integração de **Telegram Web Apps**. O jogador usa `X`; o bot usa `O`.

## Executar localmente

```bash
cd /home/harlley/Projects/telegram-jogo-da-velha
python3 -m http.server 8080
```

Abra `http://localhost:8080` no navegador. Fora do Telegram, o jogo continua funcional; dentro do app, ele usa `Telegram.WebApp.ready()`, expande a janela, respeita as cores do tema e ativa feedback háptico quando disponível.

## Publicar no Telegram

1. Publique estes arquivos em uma URL pública com **HTTPS** (GitHub Pages, Cloudflare Pages, Vercel etc.).
2. No [@BotFather](https://t.me/BotFather), configure o *Menu Button* do seu bot com a URL publicada.
3. Abra o botão de menu no chat com o bot.

O botão **Compartilhar placar** abre o compartilhamento nativo do Telegram quando executado como Web App.
