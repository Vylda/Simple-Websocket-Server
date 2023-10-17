# Simple Websocket server

## Instalation

```bash
git clone git@github.com:Vylda/Simple-Websocket-Server.git
cd simple-websocket-server
npm install
```

## Usage

```bash
node server.mjs [--port <port>] [--disconnectTime <timeout>]
```

- disconnectTime: time in ms after which the client will be disconnected
  - default: 120000
  - disabled: 0
- port: port on which the server will listen
  - default: 8080

or

```bash
npm start
```
