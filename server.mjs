import ParseArgs from "@thaerious/parseargs";
import { WebSocketServer } from 'ws';
import createRandomSentence from "./createRandomSentence.mjs";


const defaultArgs = {
  port: '8000',
};
const args = new ParseArgs();

const options = { ...defaultArgs, ...args };
const port = parseInt(options.port);

if (isNaN(port)) {
  console.error('Port must be a number!');
  process.exit(1);
}

const wss = new WebSocketServer({ port: options.port });
let randomSentence;

wss.on('connection', (ws) => {
  randomSentence = createRandomSentence();

  ws.on('error', console.error);

  ws.on('message', (data) => {
    const text = data.toString();
    console.log(`\x1b[34;2mreceived: ${text}\x1b[0m`);
    const message = `You say: ${text}\nMy answer: ${randomSentence}`;
    console.log(`\x1b[33;2msending: ${message}.\x1b[0m`);
    ws.send(message);
    randomSentence = createRandomSentence();
  });

  console.log(`\x1b[33;2msending: welcome message.\x1b[0m`);
  ws.send('Welcome to the Simple Websocket Server (like AI chatbot)!');
});


console.log(`\x1b[32mServer running on ws://localhost:${wss.address().port}/\x1b[0m`)
