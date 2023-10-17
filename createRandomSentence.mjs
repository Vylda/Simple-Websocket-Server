import lexicon from './lexicon.mjs';

const puntactions = ['.', '?', '!', '…'];

const createRandomSentence = () => {
  const lexiconLength = lexicon.length;
  const wordsCount = Math.floor(Math.random() * 4) + 4;
  const words = [];
  for (let i = 0; i < wordsCount; i++) {
    const randomIndex = Math.floor(Math.random() * lexiconLength);
    words.push(lexicon[randomIndex]);
  }

  const firstWord = words[0];
  words[0] = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  const randomPunctation =puntactions[Math.floor(Math.random() * puntactions.length)];

 return `${words.join(' ')}${randomPunctation}`;
};

export default createRandomSentence;
