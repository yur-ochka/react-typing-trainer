const keys = [
  [
    "Tab",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "BracketLeft",
    "BracketRight",
    "Backspace",
  ],
  [
    "CapsLock",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Semicolon",
    "Quote",
    "Backslash",
    "Enter",
  ],
  [
    "ShiftLeft",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "Comma",
    "Period",
    "Slash",
    "ShiftRight",
  ],
  ["Space"],
];
const keysText = [
  [
    "Tab",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "[",
    "]",
    "Backspace",
  ],
  [
    "CapsLock",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    ":",
    "'",
    "\\",
    "Enter",
  ],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
  [""],
];
export const mainKeys = [
  "Tab",
  "Backspace",
  "CapsLock",
  "Enter",
  "ShiftLeft",
  "ShiftRight",
];

export default function Keyboard() {
  return (
    <div className="keyboard">
      {keys.map((row) => (
        <KeyboardRow row={row} key={keys.indexOf(row)}></KeyboardRow>
      ))}
    </div>
  );
}

function KeyboardRow({ row }) {
  return (
    <div className="keyboard-row">
      {row.map((key) => (
        <KeyboardKey
          row={row}
          keyName={key}
          key={row.indexOf(key)}
        ></KeyboardKey>
      ))}
    </div>
  );
}

function KeyboardKey({ row, keyName }) {
  const rowIndex = keys.indexOf(row);
  return (
    <div className={keyName.length > 1 ? keyName : `Key${keyName}`}>
      {keysText[rowIndex][row.indexOf(keyName)]}
    </div>
  );
}
