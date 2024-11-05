# voice-js

`voice-js` is a JavaScript library for converting text to speech and speech to text, with customizable options for language, volume, rate, and pitch. It also provides a utility to fetch available voices for enhanced text-to-speech experiences.

## Installation

```bash
npm install @webbro-software/voice-js
```

## Features

- **Text-to-Speech**: Convert text to spoken audio with customizable settings.
- **Speech-to-Text**: Convert spoken words to text using the Web Speech API.
- **Voice Management**: Retrieve available voices for text-to-speech, with error handling for unsupported environments.

## Usage

### Importing the Library

```javascript
import {
  speechToText,
  textToSpeech,
  getVoices,
} from "@webbro-software/voice-js";
```

### 1. Text-to-Speech

The `textToSpeech` function converts provided text into spoken audio, with options for language, volume, rate, pitch, and voice.

#### Example:

```javascript
textToSpeech("Hello, world!", "en-US", 1, 1, 1, 5);
```

#### Parameters:

- `text` (string): Text to be spoken.
- `lang` (string): Language code for the voice (default: `"en-US"`).
- `volume` (number): Volume of the speech (range: `0` to `1`, default: `1`).
- `rate` (number): Speed of the speech (range: `0.1` to `10`, default: `1`).
- `pitch` (number): Pitch of the speech (range: `0` to `2`, default: `1`).
- `voice` (number): Index of the voice to use from the available voices list (default: `5`).

**Note**: Voice availability and the exact number of voices vary across browsers.

### 2. Speech-to-Text

The `speechToText` function listens to spoken input and returns it as a text string.

#### Example:

```javascript
const recognition = speechToText();

recognition
  .getTranscript()
  .then((transcript) => console.log("Recognized Text:", transcript))
  .catch((error) => console.error("Error:", error));

// To stop listening
recognition.stopSpeech();
```

#### Methods:

- `getTranscript()`: Starts listening and returns a promise with the recognized text. Includes error handling for issues such as unsupported environments or recognition failures.
- `stopSpeech()`: Stops the current speech recognition session manually.

### 3. Get Available Voices

The `getVoices` function retrieves all available voices for text-to-speech, useful for selecting specific voices.

#### Example:

```javascript
getVoices();
```

#### Usage:

The `getVoices` function logs the list of available voices to the console when `window.speechSynthesis.onvoiceschanged` fires, which occurs when new voices are loaded. This allows you to inspect and select voices for `textToSpeech`.

### Error Handling

- **`speechToText`**: Throws errors if the Web Speech API isn’t supported. Provides meaningful error messages if recognition fails, such as `"Speech recognition error: network"` or `"Speech recognition ended without capturing results."`
- **`textToSpeech` and `getVoices`**: Both functions check for browser compatibility and handle unsupported environments gracefully.

## Browser Compatibility

This library uses the Web Speech API, supported by most modern browsers. For speech recognition, ensure microphone access is enabled in the browser.

## License

MIT License. See [LICENSE](./LICENSE) for more details.

---

![NPM Downloads](https://img.shields.io/npm/dw/@webbro-software/voice-js)
