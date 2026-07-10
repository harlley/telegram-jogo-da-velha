# Exemplo: escolha de horário

Este Mini App simula o agendamento de uma consulta. Ao confirmar, ele envia ao bot um JSON usando `Telegram.WebApp.sendData()`:

```json
{"type":"appointment_selection","date":"2026-07-14","time":"14:00","service":"consulta de demonstração"}
```

Para testar a integração real, defina a URL `/agendamento/` como o *Menu Button* de um bot no @BotFather. Sem o contexto de um bot, o app exibe o JSON que seria enviado.
