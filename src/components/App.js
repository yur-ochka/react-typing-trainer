import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import SettingsBar from "./SettingsBar";
import InfoBar from "./InfoBar";
import TextArea from "./TextArea";
import Keyboard from "./Keyboard";
import { mainKeys } from "./Keyboard";
const rootStyles = getComputedStyle(document.documentElement);
const applyTheme = (theme) => {
  for (const property of Object.keys(theme)) {
    const propertyName = "--" + property;
    document.documentElement.style.setProperty(propertyName, theme[property]);
  }
};

const lightTheme = {
  colorOnClick: "#FFA04D",
  colorOnKeyup: "#FFC999",
  BGcolor: "#FFE2C7",
  itemsColor: "#FFC999",
  textColor: "#6F3C0B",
  placeholderColor: "rgba(111, 60, 11, 0.6)",
};
const darkTheme = {
  colorOnClick: "#1e2125",
  colorOnKeyup: "#383f47",
  BGcolor: "#242B33",
  itemsColor: "#383f47",
  textColor: "azure",
  placeholderColor: "rgba(240, 255, 255, 0.5)",
};
export default function App() {
  const [finalMistakes, setFinalMistakes] = useState(0);
  const [remainingTime, setRemainingTime] = useState(10);
  const [finalPrintedChars, setFinalPrintedChars] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  let charNumber = 0;
  let countMistakes = 0;
  let countPrintedChars = 0;
  let interval = null;
  let expiredTime = 0;

  const [fullText, setFullText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setError("");
        const res = await fetch("http://localhost:3000/data", { signal });
        if (!res.ok) {
          setErrorText("No data");
          setIsError(true);
          throw new Error("Something went wrong...");
        }
        const data = await res.json();
        setFullText(data.message);
      } catch (err) {
        if (err.name === "AbortError") {
          setIsError(true);
          setErrorText("Fetch aborted! (timeout)");
        } else {
          console.error("Fetch error:", err);
          setIsError(true);
          setErrorText(err.name);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    const fetchTimeout = setTimeout(() => {
      controller.abort();
    }, 1000);
    return () => {
      clearTimeout(fetchTimeout);
      controller.abort();
    };
  }, []);
  function handleSetFinalMistakes(mistakes) {
    setFinalMistakes(mistakes);
  }
  function handleSetFinalPrintedChars(chars) {
    setFinalPrintedChars(chars);
  }
  function handleSetTypingSpeed(chars, time) {
    const speed = Math.round((chars / (time / 60)) * 100) / 100;
    setTypingSpeed(speed);
  }
  function increaseExpiredTime() {
    expiredTime++;
    if (expiredTime === remainingTime) {
      clearInterval(interval);
      handleSetFinalMistakes(countMistakes);
      handleSetFinalPrintedChars(countPrintedChars);
      handleSetTypingSpeed(countPrintedChars, expiredTime);
      document.querySelector("#typingArea").disabled = true;
    }
  }
  const [themeSwitchChecked, setThemeSwitchChecked] = useState(false);
  function handleSetThemeSwitchChecked() {
    setThemeSwitchChecked(!themeSwitchChecked);
    themeSwitchChecked ? applyTheme(darkTheme) : applyTheme(lightTheme);
  }

  function handleSetRemainingTime() {
    setRemainingTime((prev) => prev - 1);
  }
  const checkCharacter = (event) => {
    const str = document.querySelector("#typingArea").value.split("");
    //str[charNumber] = event.key;
    if (fullText)
      if (fullText[charNumber] === event.key) {
        document.querySelector("#typingArea").value = str.join("");
        charNumber++;
        countPrintedChars++;
      } else {
        const keyCode = event.code;
        const key = document.querySelector(`.${keyCode}`);
        if (!mainKeys.includes(keyCode)) {
          key.style.background = "red";
          countMistakes++;
        }
        event.preventDefault();
      }
  };

  document.addEventListener("keydown", handleKeyDown);

  function handleKeyDown(event) {
    if (document.querySelector("#typingArea") === document.activeElement) {
      if (!interval) interval = setInterval(increaseExpiredTime, 1000);
      const keyCode = event.code;
      console.log("Key pressed: " + keyCode);
      const key = document.querySelector(`.${keyCode}`);
      if (key) {
        key.style.background = rootStyles.getPropertyValue("--colorOnClick");
        checkCharacter(event);
      }
      if (event.key === "Backspace") {
        event.preventDefault();
      }
    }
  }

  document.addEventListener("keyup", handleKeyUp);

  function handleKeyUp(event) {
    if (document.querySelector("#typingArea") === document.activeElement) {
      const keyCode = event.code;
      console.log("Key released:", keyCode);
      const key = document.querySelector(`.${keyCode}`);
      if (key)
        key.style.background = rootStyles.getPropertyValue("--colorOnKeyup");
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
        <Error>{errorText}</Error>
      ) : (
        <Container>
          <SettingsBar
            themeSwitchChecked={themeSwitchChecked}
            handleSetThemeSwitchChecked={handleSetThemeSwitchChecked}
          ></SettingsBar>
          <InfoBar
            finalMistakes={finalMistakes}
            remainingTime={remainingTime}
            finalPrintedChars={finalPrintedChars}
            typingSpeed={typingSpeed}
          ></InfoBar>
          <TextArea fullText={fullText}></TextArea>
          <Keyboard key={themeSwitchChecked}></Keyboard>
        </Container>
      )}
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Error({ children }) {
  return <p className="loader">{children}</p>;
}

function Container({ children }) {
  return <div className="container">{children}</div>;
}
