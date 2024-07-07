import logo from "./peus.png";
import "./App.css";
import { useId, useState } from "react";
import {
  Button,
  Field,
  FluentProvider,
  Input,
  Label,
  makeStyles,
  shorthands,
  Title1,
  Title3,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap("2px"),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "400px",
  },
});

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

function App() {
  const [text, setText] = useState("");
  const [showTranslatedCode, setShowTranslatedCode] = useState(false);
  const [showError, setShowError] = useState(null);
  const [translatedCode, setTranslatedCode] = useState(null);
  const inputId = useId("input");
  const styles = useStyles();

  const translateCode = (letras) => {
    // Convertir las letras a un número basado en su posición en el alfabeto
    let letrasNumero = 0;
    for (let i = 0; i < 5; i++) {
      const posicion = alfabetoSinL.indexOf(letras[i]);
      if (posicion === -1) {
        throw new Error(`Letra inválida: ${letras[i]}`);
      }
      letrasNumero = (letrasNumero * 25 + posicion) % 1000; // Mantener el número dentro del rango de 3 dígitos
    }
    setTranslatedCode(letrasNumero);
  };

  return (
    <FluentProvider theme={webDarkTheme}>
      <header className="App-header">
        <Title1>Subconscient de la Laura</Title1>
        <img src={logo} className="App-logo" alt="logo" />
        <Field
          className={styles.root}
          validationState={showError ? "error" : "none"}
          validationMessage={showError}
          label="Ola que tal se ve?"
        >
          <Input
            id={inputId}
            value={text}
            onChange={(x) => {
              setShowError(null);
              setText(x.target.value);
            }}
            pattern="[A-Z]"
            maxLength={5}
          />
        </Field>
        <Button
          onClick={() => {
            setShowError(null);
            setShowTranslatedCode(false);
            if (!alfabetoSinL.every(x => text.includes(x))) {
              setShowError("Codi només de letres en majúscules!");
            } else if (text.length !== 5) {
              setShowError("Codi de 5 lletres només!");
            } else {
              translateCode(text)
              setShowTranslatedCode(true);
            }
          }}
        >
          Text
        </Button>
        {showTranslatedCode && (
          <Title3>El codi és {translatedCode}</Title3>
        )}
      </header>
    </FluentProvider>
  );
}

export default App;
