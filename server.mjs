import ParseArgs from "@thaerious/parseargs";
import { WebSocketServer } from 'ws';
import createRandomSentence from "./createRandomSentence.mjs";

const defaultArgs = {
  port: '8080',
  disconnectTime: '120000',
}
const args = new ParseArgs();
const options = { ...defaultArgs, ...args };
const port = parseInt(options.port);
const disconnectTime = parseInt(options.disconnectTime);

let timeout, interval;

const clearTimers = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  };
  if (interval) {
    clearInterval(interval);
    interval = undefined;
  }
};

if (isNaN(port)) {
  console.error('Port must be a number!');
  process.exit(1);
}

if (isNaN(disconnectTime)) {
  console.error('Disconnect time must be a number!');
  process.exit(1);
}

const wss = new WebSocketServer({ port: options.port });
let randomSentence;

wss.on('connection', (ws) => {
  randomSentence = createRandomSentence();
  const start = Date.now();

  ws.on('error', console.error);

  if (disconnectTime !== 0 && !timeout) {
    clearTimers();
    timeout = setTimeout(() => {
      console.log(`\x1b[31mTime has expired!\x1b[0m`);
      ws.send('Time has expired! Disconnecting!');
      ws.close();
      clearTimers();
    }, disconnectTime);
    interval = setInterval(() => {
      console.log(`\x1b[35;2mTime to auto disconnect: ${disconnectTime - (Date.now() - start)} ms.\x1b[0m`);
    }, 1000);
  }

  ws.on('message', (data) => {
    const text = data.toString();
    console.log(`\x1b[34;2mreceived: ${text}\x1b[0m`);
    const message = `You say: ${text}\nMy answer: ${randomSentence}`;
    console.log(`\x1b[33;2msending: ${message}.\x1b[0m`);
    ws.send(message);
    randomSentence = createRandomSentence();
  });

  ws.on('close', () => {
    console.log('\x1b[31mClient disconnected\x1b[0m');
    clearTimers();
  });

  console.log(`\x1b[33;2msending: welcome message.\x1b[0m`);
  const welcomeMessage = `Welcome to the Simple Websocket Server (like AI chatbot)!\nAuto disconnect time: ${disconnectTime} ms (${new Date(Date.now() + disconnectTime).toLocaleTimeString()})`;
  ws.send(welcomeMessage);
});


console.log(`\x1b[32mServer running on ws://localhost:${wss.address().port}/\x1b[0m`)
