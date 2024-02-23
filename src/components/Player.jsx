import { useState } from "react";

export default function Player({ name, symbol, onNameChange, isActive }) {
  const [newName, setNewName] = useState(name);
  const [currFunc, setCurrFunc] = useState("normal");

  let nameArea, button;
  function saveName() {
    setCurrFunc("normal");
    onNameChange((prevNames) => {
      let newNames = [...prevNames];
      if (symbol === "X") newNames[0] = newName;
      else if (symbol === "O") newNames[1] = newName;
      return newNames;
    });
  }
  if (currFunc === "normal") {
    nameArea = <span className="player-name">{newName}</span>;
    button = <button onClick={() => setCurrFunc("edit")}>Edit</button>;
  } else if (currFunc === "edit") {
    nameArea = (
      <input
        autoFocus
        required
        type="text"
        value={newName}
        onChange={(event) => {
          setNewName(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") saveName();
        }}
      />
    );
    button = <button onClick={saveName}>Save</button>;
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {nameArea}
        <span className="player-symbol">{symbol}</span>
      </span>
      {button}
    </li>
  );
}
