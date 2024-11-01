const isBrowser = typeof window !== "undefined";

const speechToText = (continuous = false) => {
  if (
    !isBrowser ||
    (!window.SpeechRecognition && !window.webkitSpeechRecognition)
  ) {
    throw new Error("Speech Recognition is not supported in this environment.");
  }

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  recognition.continuous = continuous;
  recognition.start();

  return {
    getTranscript() {
      return new Promise((resolve, reject) => {
        recognition.addEventListener("result", (e) => {
          const transcript = Array.from(e.results)
            .map((result) => result[0].transcript)
            .join("");
          resolve(transcript);
        });
        recognition.addEventListener("error", (e) => {
          reject(new Error("Speech recognition error: " + e.error));
        });
        recognition.addEventListener("end", () => {
          if (!continuous) {
            reject(
              new Error("Speech recognition ended without capturing results.")
            );
          } else {
            recognition.start();
          }
        });
      });
    },
    stopSpeech() {
      recognition.stop();
    },
  };
};

const textToSpeech = (
  text,
  lang = "en-US",
  volume = 1,
  rate = 1,
  pitch = 1,
  voiceIndex = 5
) => {
  if (!isBrowser)
    return Promise.reject(
      "Text-to-Speech is not supported in this environment."
    );

  return new Promise((resolve, reject) => {
    try {
      const speech = new SpeechSynthesisUtterance();
      const voices = window.speechSynthesis.getVoices();

      if (voiceIndex < voices.length) {
        speech.voice = voices[voiceIndex];
      } else {
        console.warn("Voice index out of range, using default voice.");
      }

      speech.text = text;
      speech.lang = lang;
      speech.volume = volume;
      speech.rate = rate;
      speech.pitch = pitch;

      speech.onend = resolve;
      speech.onerror = (e) =>
        reject(new Error("Text-to-Speech error: " + e.error));

      window.speechSynthesis.speak(speech);
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};

const getVoices = () => {
  if (!isBrowser) return [];

  return new Promise((resolve, reject) => {
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        resolve(voices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          resolve(window.speechSynthesis.getVoices());
        };
      }
    } catch (error) {
      reject(new Error("Failed to get voices: " + error.message));
    }
  });
};

export { speechToText, textToSpeech, getVoices };
