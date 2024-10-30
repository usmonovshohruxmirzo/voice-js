const isBrowser = typeof window !== "undefined";

const speechToText = () => {
  if (
    !isBrowser ||
    (!window.SpeechRecognition && !window.webkitSpeechRecognition)
  ) {
    throw new Error("Speech Recognition is not supported in this environment.");
  }

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
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
          reject(
            new Error("Speech recognition ended without capturing results.")
          );
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
  voice = 5
) => {
  if (!isBrowser) return;

  try {
    const speech = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();

    speech.text = text;
    speech.lang = lang;
    speech.volume = volume;
    speech.rate = rate;
    speech.pitch = pitch;
    speech.voice = voices[voice];

    window.speechSynthesis.speak(speech);
  } catch (error) {
    console.log(error.message);
  }
};

const getVoices = () => {
  if (!isBrowser) return;

  try {
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available Voices:", voices);
    };
  } catch (error) {
    console.log(error.message);
  }
};

export { speechToText, textToSpeech, getVoices };
