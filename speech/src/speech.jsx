
import React, { useState } from 'react';

function SpeechRec() {
  const [isListening, setIsListening] = useState(false);
  const [output, setOutput] = useState('');

  const handleStart = () => {
    if (isListening) return; // Prevent multiple starts

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const newTranscript = event.results[0][0].transcript;
      setOutput(output + newTranscript); // Append new transcript
    };

    recognition.onend = () => {
      setIsListening(false);
      recognition.stop(); // Ensure recognition stops
    };

    recognition.start();
  };

  return (
    <div>
      <h1>Voice to Text App</h1>
      <div id="output">{output}</div>
      <button id="speech"onClick={handleStart}>{isListening ? 'Stop Listening' : 'Start Voice Input'}</button>
    </div>
  );
}

export default SpeechRec;