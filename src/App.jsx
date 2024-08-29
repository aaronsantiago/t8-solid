import logo from './logo.svg';
import styles from './App.module.css';

import { generateT9Db } from './logic/t8-engine';
import { onMount, createSignal, createEffect } from 'solid-js';
import Keyboard from './components/Keyboard';


function App() {
  let inputTextArea;
  let t9Db = {};

  const [t9Words, setT9Words] = createSignal([]);
  const [input, setInput] = createSignal('');
  const [currentSelectedWord, setCurrentSelectedWord] = createSignal(0);

  const [keyMapping, setKeyMapping] = createSignal({});


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

  createEffect(async () => {
    console.log('keyMapping', keyMapping());
    let wordList = await fetch('/t8-solid/google-10000-english-usa.txt');
    // let wordList = await fetch('/google-10000-english-usa.txt');
    t9Db = generateT9Db(await wordList.text(), keyMapping());
  });

  return (
    <div class="flex flex-col h-screen w-screen justify-items-center items-center">
      <div class="h-full">
        <header>
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
      <div class="h-full">
        <Keyboard setKeyMapping={setKeyMapping}/>
      </div>
    </div>
  );
}

export default App;
