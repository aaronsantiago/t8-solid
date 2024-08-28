
function generateT9Db(inputFile, mapping) {
  let allWords = inputFile.split('\n');

  let wordPriority = {};
  for (let [i, word] of allWords.entries()) {
    allWords[i] = word.trim();
    wordPriority[word] = i;
  }

  let t9Db = {};
  for (let word of allWords) {
    let curT9Db = t9Db;
    for (let [i, c] of word.split('').entries()) {
      c = mapping[c.toLowerCase()];
      if (!c) {
        break;
      }
      if (!(c in curT9Db)) {
        curT9Db[c] = {
          entries:[],
        };
      }
      if (curT9Db[c].entries.indexOf(word) === -1 && (i == word.length - 1)) {
        curT9Db[c].entries.push(word);
      }
      curT9Db = curT9Db[c];
    }
  }
  
  return t9Db;
}

function getCandidates(mapping, word, wordDb) {

}

export { generateT9Db, getCandidates };