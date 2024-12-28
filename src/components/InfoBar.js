import { useState, useEffect, useRef } from "react";

export default function InfoBar({
  finalMistakes,
  remainingTime,
  finalPrintedChars,
  typingSpeed,
}) {
  const [time, setTime] = useState(remainingTime);
  const intervalRef = useRef(null);

  function handleSetTime() {
    setTime((prev) => {
      if (prev === 0) {
        clearInterval(intervalRef.current);
        return 0;
      }
      return prev - 1;
    });
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (document.querySelector("#typingArea") === document.activeElement) {
        if (!intervalRef.current) {
          intervalRef.current = setInterval(handleSetTime, 1000);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="info">
      <MistakesCount finalMistakes={finalMistakes} />
      <RemainingTime time={time} />
      <PrintedCharsCount finalPrintedChars={finalPrintedChars} />
      <SpeedCount typingSpeed={typingSpeed} />
    </div>
  );
}

function MistakesCount({ finalMistakes }) {
  return <div className="mistakes">Mistakes: {finalMistakes}</div>;
}

function RemainingTime({ time }) {
  return <div className="time">Remaining time: {time}s</div>;
}

function PrintedCharsCount({ finalPrintedChars }) {
  return <div className="charsCount">Printed chars: {finalPrintedChars}</div>;
}

function SpeedCount({ typingSpeed }) {
  return <div className="speed">Chars per minute: {typingSpeed}</div>;
}
