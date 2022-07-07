import { useState, useEffect, useReducer } from "react";

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

export default function useSpeechRecognition(): HookMethods {
  const [results, setResults] = useState<string[]>([]);
  const [recognitionEngine, setRecognitionEngine] = useState<any | null>(null);
  let listening = false;

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

  //METHOD 1: start recognition
  function startRecognition() {
    // add event listener for results and looping
    recognitionEngine.addEventListener("result", (e: any) => {
      console.log(e.results[0][0].transcript);
      setResults((results) => [...results, e.results[0][0].transcript]);
    });
    listening = true;
    recognitionEngine.addEventListener("end", (e: any) => {
      setLooping();
    });
    //start
    recognitionEngine.start();

    return true;
  }

  //METHOD 2: stop recognition
  function stopRecognition() {
    listening = false;
    recognitionEngine.stop();
    return true;
  }

  //METHOD 3: get transcript
  function getTranscript() {
    return results;
  }

  const setLooping = () => {
    console.log(listening);
    if (listening) return recognitionEngine.start();
    return recognitionEngine.stop();
  };

  const methodsToReturn = {
    startRecognition,
    stopRecognition,
    getTranscript,
  };

  return methodsToReturn;
}
