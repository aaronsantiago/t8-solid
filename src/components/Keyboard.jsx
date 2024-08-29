import {onMount, createSignal, createEffect, Show} from "solid-js";

let rowLengths = [10, 10, 10];
let offsets = ["w-0", "w-2.5", "w-5"];
let keyboardLayouts = {
  qwerty: ["qwertyuiop", "asdfghjkl;", "zxcvbnm,./"],
  colemak: ["qwfpgjluy;", "arstdhneio", "zxcvbkm,./"],
  dvorak: ["',.pyfgcrl", "aoeuidhtns", ";qjkxbmwvz"],
};

let presets = {
  t8: {
    10: ["0", "10", "20"],
    11: ["1", "11", "21"],
    12: ["2", "12", "22"],
    13: ["3", "13", "23", "4", "14", "24"],
    16: ["6", "16", "26", "5", "15", "25"],
    17: ["7", "17", "27"],
    18: ["8", "18", "28"],
    19: ["9", "19", "29"],
  },
  t10: {
    10: ["0", "10", "20"],
    11: ["1", "11", "21"],
    12: ["2", "12", "22"],
    13: ["3", "13", "23"],
    14: ["4", "14", "24"],
    15: ["5", "15", "25"],
    16: ["6", "16", "26"],
    17: ["7", "17", "27"],
    18: ["8", "18", "28"],
    19: ["9", "19", "29"],
  },
  t2: {
    13: [ "0", "10", "20", "1", "11", "21", "2", "12", "22", "3", "13", "23", "4", "14", "24",
    ],
    16: [ "5", "15", "25", "6", "16", "26", "7", "17", "27", "8", "18", "28", "9", "19", "29",
    ],
  },
};
function Keyboard(props) {
  let [keyboardRows, setKeyboardRows] = createSignal([]);
  let [keyboardLayout, setKeyboardLayout] = createSignal("qwerty");

  let [t8KeyMapping, setT8KeyMapping] = createSignal({});
  let [sourceKey, setSourceKey] = createSignal(null);

  onMount(() => {
    for (let i = 0; i < 3; i++) {
      let row = {
        keys: [],
        offset: offsets[i],
      };
      for (let j = 0; j < rowLengths[i]; j++) {
        row.keys.push({
          keyRow: i,
          keyCol: j,
          keyId: i * 10 + j,
          pressedBy: null,
        });
      }
      setKeyboardRows([...keyboardRows(), row]);
    }
  });

  function handleClick(e) {
    if (e.target.id === "") {
      return;
    }
    if (e.button === 2) {
      let keyId = e.target.id;
      if (sourceKey() === keyId) {
        setSourceKey(null);
      } else {
        setSourceKey(keyId);
      }
    }
    if (e.button === 0) {
      if (sourceKey() !== null) {
        let keyId = e.target.id;
        let keyRow = Math.floor(keyId / 10);
        let keyCol = keyId % 10;

        let sourceKeyRow = Math.floor(sourceKey() / 10);
        let sourceKeyCol = sourceKey() % 10;

        let _t8KeyMapping = t8KeyMapping();
        if (!(sourceKey() in _t8KeyMapping)) {
          _t8KeyMapping[sourceKey()] = [];
        }
        let destinationKey = keyboardRows()[keyRow].keys[keyCol];
        if (destinationKey.pressedBy !== null) {
          let pressedBy = destinationKey.pressedBy;

          _t8KeyMapping[pressedBy] = _t8KeyMapping[pressedBy].filter(
            (key) => key !== keyId
          );
        }
        _t8KeyMapping[sourceKey()].push(keyId);

        setT8KeyMapping({..._t8KeyMapping});

        let _keyboardRows = keyboardRows();
        _keyboardRows[keyRow].keys[keyCol].pressedBy = sourceKey();
        _keyboardRows[keyRow] = {..._keyboardRows[keyRow]};
        setKeyboardRows([..._keyboardRows]);
      }
    }
    console.log(e);
  }

  createEffect(() => {
    console.log("t8KeyMapping updated", t8KeyMapping());
    let keyMapping = {};
    for (let key in t8KeyMapping()) {
      let keys = t8KeyMapping()[key];
      let sourceKeyRow = Math.floor(key / 10);
      let sourceKeyCol = key % 10;
      let _keyboardLayout = keyboardLayouts[keyboardLayout()];

      for (let k of keys) {
        let keyRow = Math.floor(k / 10);
        let keyCol = k % 10;
        keyMapping[_keyboardLayout[keyRow][keyCol]] =
          _keyboardLayout[sourceKeyRow][sourceKeyCol];
      }
    }

    props.setKeyMapping(keyMapping);
  });

  createEffect(() => {
    console.log("keyboard rows updated", keyboardRows());
  });

  createEffect(() => {
    console.log("source key updated", sourceKey());
  });

  function getKeyById(id) {
    let keyRow = Math.floor(id / 10);
    let keyCol = id % 10;
    return keyboardLayouts[keyboardLayout()][keyRow][keyCol];
  }

  function handleKeyboardLayoutSelection(e) {
    setKeyboardLayout(e.target.value);
  }

  function handleKeyboardPresetSelection(e) {
    let preset = e.target.value;
    let _keyboardRows = keyboardRows();
    preset = presets[preset];

    for (let sourceKey in preset) {
      let keys = preset[sourceKey];
      for (let k of keys) {
        let keyRow = Math.floor(k / 10);
        let keyCol = k % 10;
        _keyboardRows[keyRow].keys[keyCol].pressedBy = sourceKey;
      }
    }

    for (let i = 0; i < 3; i++) {
      _keyboardRows[i].keys = [..._keyboardRows[i].keys];
      _keyboardRows[i] = {..._keyboardRows[i]};
    }

    setKeyboardRows([..._keyboardRows]);

    setT8KeyMapping({...preset})

  }

  return (
    <div>
      <div class="flex flex-row gap-4">
        <select on:change={handleKeyboardLayoutSelection}>
          <For each={Object.keys(keyboardLayouts)}>
            {(layout) => <option value={layout}>{layout}</option>}
          </For>
        </select>
        <select on:change={handleKeyboardPresetSelection}>
          <For each={Object.keys(presets)}>
            {(preset) => <option value={preset}>{preset}</option>}
          </For>
        </select>
      </div>
      <div class="flex flex-col gap-4">
        <For each={keyboardRows()}>
          {(row) => (
            <div class="flex flex-row gap-4">
              {console.log("rendered")}
              <div class={row.offset}></div>
              <For each={row.keys}>
                {(key) => (
                  <div
                    id={key.keyId}
                    on:mousedown={handleClick}
                    on:contextmenu={(e) => e.preventDefault()}
                    class="relative select-none w-10 h-10 flex items-center justify-center"
                    classList={{
                      "bg-slate-400":
                        key.keyId != sourceKey() && key.pressedBy == null,
                      "bg-slate-500":
                        key.keyId != sourceKey() && key.pressedBy != null,
                      "text-slate-800": key.keyId != sourceKey(),
                      "bg-gray-300": key.keyId == sourceKey(),
                      "bg-gray-100": key.keyId == sourceKey(),
                    }}
                  >
                    {keyboardLayouts[keyboardLayout()][key.keyRow][key.keyCol]}
                    <Show when={key.pressedBy !== null}>
                      <div class="absolute top-1 right-1 text-xs">
                        {getKeyById(key.pressedBy)}
                      </div>
                      {/* <div class="absolute bottom-1 left-1 text-xs">
                        {key.pressedBy}
                      </div> */}
                    </Show>
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default Keyboard;
