import { useState, useEffect } from "react";

const initiateRecognition = () => {
  const global = window as any;
  const SpeechRecognition =
    global.SpeechRecognition || global.webkitSpeechRecognition;
  const SpeechRecognitionEvent =
    global.SpeechRecognitionEvent || global.webkitSpeechRecognitionEvent;

  // is supported on browser?
  if (!SpeechRecognition || !SpeechRecognitionEvent)
    throw new Error("Speech recognition not supported");

  //settings
  const recognition = new SpeechRecognition();
  recognition.continous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return recognition;
};

interface HookMethods {
  startRecognition: () => boolean;
  stopRecognition: () => boolean;
  getTranscript: () => string;
}

export default function useSpeechRecognition(): HookMethods {
  const [results, setResults] = useState<string[]>([]);
  const [recognitionEngine, setRecognitionEngine] = useState<any | null>(null);
  const [listening, setListening] = useState<string>("not set");

  //set the recognition engine
  useEffect(() => {
    // set recognition engine if it's not set
    let currentEngine: any = recognitionEngine;
    if (!currentEngine) {
      currentEngine = initiateRecognition();
      //store engine for later use
      setRecognitionEngine(currentEngine);
    }
    return () => {
      // destroy recognition engine
      currentEngine = null;
    };
  }, []);

  //handle recognition events
  useEffect(() => {
    if (listening === "not set") return;
    //add event listener for results, looping, and start the recognition engine
    if (listening === "listening") {
      recognitionEngine.addEventListener("result", (e: any) => {
        setResults((results) => [...results, e.results[0][0].transcript]);
      });
      recognitionEngine.addEventListener("end", () => {
        recognitionEngine.start();
      });
      recognitionEngine.start();
    }
    //remove looping and stop the recognition engine
    if (listening === "not listening") {
      recognitionEngine.removeEventListener("end", () => {
        recognitionEngine.start();
      });
      recognitionEngine.stop();
    }
    return () => {};
  }, [listening]);

  //METHOD 1: start recognition
  function startRecognition() {
    if (!recognitionEngine) throw new Error("Recognition engine not set");
    setListening("listening");
    return true;
  }

  //METHOD 2: stop recognition
  function stopRecognition() {
    if (listening !== "listening") throw new Error("Not listening");
    setListening("not listening");
    return true;
  }

  //METHOD 3: get transcript
  function getTranscript() {
    const currentResults = [...results];
    setResults([]);
    return currentResults
      .map((result) => capitalizeFirstLetter(result))
      .join(". ");
  }

  const methodsToReturn = {
    startRecognition,
    stopRecognition,
    getTranscript,
  };

  return methodsToReturn;
}

const capitalizeFirstLetter = (str: string) => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
};
