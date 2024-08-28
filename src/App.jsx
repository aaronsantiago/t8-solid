import logo from './logo.svg';
import styles from './App.module.css';

import { generateT9Db } from './logic/t8-engine';
import { onMount, createSignal, createEffect } from 'solid-js';

let qwerty = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
];


let t8Qwerty = [
  'asdffjjkl;',
  'asdffjjkl',
  'asdffjj',
];
let t10Qwerty = [
  'asdfghjkl;',
  'asdfghjkl',
  'asdfghj',
];
let t2Qwerty = [
  'ffffjjjjjj',
  'ffffjjjjj',
  'ffffjjj',
];
let lhQwerty = [
  'qwerttrewq',
  'asdfggfdsa',
  'zxcvbbv',
];

let colemak = [
  'qwfpgjluy',
  'arstdhneio',
  'zxcvbkm',
];
let t8Colemak = [
  'arsttnnei',
  'arsttnneio',
  'arsttnn',
];
let t10Colemak = [
  'arstdhnei',
  'arstdhneio',
  'arstdhn',
];
let t2Colemak = [
  'tttttnnnn',
  'tttttnnnnn',
  'tttttnn',
];
let lhColemak = [
  'qwfpggpfw',
  'arstddtsra',
  'zxcvbbv',
];

qwerty = qwerty.join('');
t8Qwerty = t8Qwerty.join('');
t10Qwerty = t10Qwerty.join('');
t2Qwerty = t2Qwerty.join('');
lhQwerty = lhQwerty.join('');

colemak = colemak.join('');
t8Colemak = t8Colemak.join('');
t10Colemak = t10Colemak.join('');
t2Colemak = t2Colemak.join('');
lhColemak = lhColemak.join('');

let mappings = {
  qwerty8:{
    base:qwerty,
    mapping:t8Qwerty
  },
  qwerty10:{
    base:qwerty,
    mapping:t10Qwerty
  },
  qwerty2:{
    base:qwerty,
    mapping:t2Qwerty
  },
  qwertyLH:{
    base:qwerty,
    mapping:lhQwerty
  },
  colemak8:{
    base:colemak,
    mapping:t8Colemak
  },
  colemak10:{
    base:colemak,
    mapping:t10Colemak
  },
  colemak2:{
    base:colemak,
    mapping:t2Colemak
  },
  colemakLH:{
    base:colemak,
    mapping:lhColemak
  },
};

// for (let i = 0; i < qwerty.length; i++) {
//   mapping[qwerty[i]] = t9[i];
// }

// for (let i = 0; i < colemak.length; i++) {
//   mapping[colemak[i]] = t8Colemak[i];
// }

for (let mapping in mappings) {
  let base = mappings[mapping].base;
  let t9 = mappings[mapping].mapping;

  let newMapping = {};

  for (let i = 0; i < base.length; i++) {
    newMapping[base[i]] = t9[i];
  }

  mappings[mapping] = newMapping;
}



function App() {
  let inputTextArea;
  let t9Db = {};

  const [t9Words, setT9Words] = createSignal([]);
  const [input, setInput] = createSignal('');
  const [currentSelectedWord, setCurrentSelectedWord] = createSignal(0);
  const [mapping, setMapping] = createSignal(Object.keys(mappings)[0]);

  onMount(async () => {
    // let wordList = await fetch('/google-10000-english-usa.txt');
    let wordList = await fetch('/t8-solid/google-10000-english-usa.txt');
    t9Db = generateT9Db(await wordList.text(), mapping());
  });

  const handleInput = (e) => {
    if (e.key === ' ') {
      console.log(inputTextArea.value);
      inputTextArea.value = '';

      setInput((i) => i + t9Words()[currentSelectedWord()] + ' ');
      e.preventDefault();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      setCurrentSelectedWord((i) => (i + 1) % t9Words().length);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;

    let curT9Db = t9Db;
    for (let c of value) {
      if (!(c in curT9Db)) {
        setT9Words([]);
        return;
      }
      curT9Db = curT9Db[c];
    }

    setCurrentSelectedWord(0);
    setT9Words(curT9Db.entries);
  }

  const handleSelectMapping = (e) => {
    setMapping(e.target.value);
  }

  createEffect(async () => {
    console.log('mapping', mapping());
    let wordList = await fetch('/t8-solid/google-10000-english-usa.txt');
    // let wordList = await fetch('/google-10000-english-usa.txt');
    t9Db = generateT9Db(await wordList.text(), mappings[mapping()]);
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <select on:change={handleSelectMapping}>
          <For each={Object.keys(mappings)}>{(mappingName) =>
            <option value={mappingName}>{mappingName}</option>
          }</For>
        </select>
        <div>{input}</div>
        <div>
          <For each={t9Words()}>{(word, i) =>
            <li style={i() == currentSelectedWord() ? {"font-weight":"bolder"} : {}}>
              {word}
            </li>
          }</For></div>
        <textarea on:keydown={handleInput} on:input={handleChange} ref={inputTextArea}></textarea>
      </header>
    </div>
  );
}

export default App;
