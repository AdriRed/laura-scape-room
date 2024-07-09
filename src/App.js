import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import "./App.css";

const alfabetoSinL = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const pesos = {'A': 18, 'B': 8, 'C': 5, 'D': 1, 'E': 14, 'F': 13, 'G': 9, 'H': 11, 'I': 2, 'J': 19, 'K': 17, 'M': 20, 'N': 3, 'O': 24, 'P': 22, 'Q': 16, 'R': 15, 'S': 23, 'T': 6, 'U': 21, 'V': 25, 'W': 12, 'X': 10, 'Y': 7, 'Z': 4}

function convertirCombinacionAEntero(letras) {
  let letrasNumero = 0;
  for (let i = 0; i < 5; i++) {
    const posicion = alfabetoSinL.indexOf(letras[i]);
    letrasNumero = (letrasNumero * 25 + posicion + pesos[letras[i]]) % 1000; // Mantener el número dentro del rango de 3 dígitos
  }
  return letrasNumero.toString().padStart(3, "0");
}

const Letter = ({ letter, disable, onClick }) => {
  const [, ref] = useDrag({
    type: "letter",
    canDrag: !disable,
    item: { letter },
  });
  return (
    <div
      ref={ref}
      className={disable ? "disable-letter" : "letter"}
      onClick={onClick}
    >
      {letter}
    </div>
  );
};

const DropZone = ({ index, letter, onDrop, onClick }) => {
  const [{ isOver }, ref] = useDrop({
    accept: "letter",
    drop: (item) => onDrop(item.letter, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={ref}
      className={`drop-zone ${isOver ? "over" : ""}`}
      onClick={() => onClick(index)}
    >
      {letter}
    </div>
  );
};

function App() {
  const [selectedLetters, setSelectedLetters] = useState(Array(5).fill(null));
  const [result, setResult] = useState(null);

  useEffect(() => {
    console.log(selectedLetters)
  }, [selectedLetters])

  const handleDrop = (letter, index) => {
    if (0 <= index && index <= 5) {
      const newSelectedLetters = [...selectedLetters];
      newSelectedLetters[index] = letter;
      setSelectedLetters(newSelectedLetters);
    }
  };

  const handleClick = (index) => {
    const newSelectedLetters = [...selectedLetters];
    newSelectedLetters[index] = null;
    setSelectedLetters(newSelectedLetters);
    setResult(null);
  };

  const handleCalculate = () => {
    if (selectedLetters.every((letter) => letter !== null)) {
      setResult(convertirCombinacionAEntero(selectedLetters));
    } else {
      alert("Por favor, selecciona exactamente 5 letras.");
    }
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="App">
        <div className="letters">
          {alfabetoSinL.map((letter) => (
            <Letter
              key={letter}
              letter={letter}
              disable={selectedLetters.includes(letter)}
              onClick={() => handleDrop(letter, selectedLetters.indexOf(null))}
            />
          ))}
        </div>
        <div className="drop-zones">
          {selectedLetters.map((letter, index) => (
            <DropZone
              key={index}
              index={index}
              letter={letter}
              onDrop={handleDrop}
              onClick={handleClick}
            />
          ))}
        </div>
        <button onClick={handleCalculate} disabled={selectedLetters.filter(x => x).length < 5}>Calcular</button>
        <div className="result " style={result === null ? {color: 'white'} : undefined}>Cobinació: {result}</div>
      </div>
    </DndProvider>
  );
}

export default App;
