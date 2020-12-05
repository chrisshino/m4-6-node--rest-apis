const { words } = require("../data/words");

// write your handlers here...

const getWord = (id) => {
  return words.find((word) => {
    return word.id === id;
  });
};

const randomWord = () => {
  const randomWord = Math.floor(Math.random() * words.length);
  return {
    wordLength: words[randomWord].letterCount,
    wordId: words[randomWord].id,
  };
};

const correctWord = (id, letter) => {
  const word = words.find((word) => {
    return word.id === id
  })
  
  const splitArr = word.word.split('')
  const mappedArr = splitArr.map(el => {
    if (el === letter) {
      return true
    } else {
      return false
    }
  })
  return mappedArr
}
module.exports = { getWord, randomWord, correctWord };