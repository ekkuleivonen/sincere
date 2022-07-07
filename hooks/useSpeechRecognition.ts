import { useState, useEffect, useRef } from "react";
import { render } from "react-dom";

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
  getTranscript: () => string[];
}

//let recognition: any | null = null;
//let results: string[] = [];

export default function useSpeechRecognition(): HookMethods {
  const [results, setResults] = useState<string[]>([]);
  const [recognitionEngine, setRecognitionEngine] = useState<any | null>(null);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log("render count: ", renderCount.current);
    // set recognition engine
    let currentEngine: any = recognitionEngine;
    if (!currentEngine) {
      currentEngine = initiateRecognition();
      setRecognitionEngine(currentEngine);
    }
    // add event listeners
    currentEngine.addEventListener("result", (e: any) => {
      console.log(e.results[0][0].transcript);
      setResults([...results, e.results[0][0].transcript]);
    });

    currentEngine.addEventListener("end", () => {
      currentEngine.start();
    });

    return () => {
      //remove event listeners
      currentEngine.removeEventListener("result", (e: any) => {
        setResults([...results, e.results[0][0].transcript]);
      });

      currentEngine.removeEventListener("end", () => {
        currentEngine.start();
      });

      // destroy recognition engine
      currentEngine = null;
    };
  }, []);

  function startRecognition() {
    recognitionEngine.start();

    return true;
  }

  function stopRecognition() {
    recognitionEngine.stop();
    return true;
  }

  function getTranscript() {
    return results;
  }

  const methodsToReturn = {
    startRecognition,
    stopRecognition,
    getTranscript,
  };

  return methodsToReturn;
}
