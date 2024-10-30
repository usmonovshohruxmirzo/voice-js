# voice-js

`voice-js` is a simple JavaScript library for speech synthesis and speech recognition. It allows you to convert text to speech and recognize speech input, making it ideal for adding voice capabilities to web applications.

## Installation

```bash
npm install @webbro-software/voice-js
```

## Features

- **Text-to-Speech**: Converts text to spoken audio with customizable options.
- **Speech-to-Text**: Converts spoken words to text using the Web Speech API.
- **Voice Management**: Retrieves available voices for text-to-speech.

## Usage

### Import the Library

After installation, you can import and use the functions in your code:

```javascript
const {
  textToSpeech,
  speechToText,
  getVoices,
} = require("@webbro-software/voice-js");
```

### 1. Text-to-Speech

The `textToSpeech` function converts text into spoken audio.

#### Example:

```javascript
textToSpeech("Hello, world!", "en-US", 1, 1, 1);
```

#### Parameters:

- `text` (string): Text to be spoken.
- `lang` (string): Language code for the voice (default: `"en-US"`).
- `volume` (number): Volume of the speech (0 to 1, default: `1`).
- `rate` (number): Speed of the speech (0.1 to 10, default: `1`).
- `pitch` (number): Pitch of the speech (0 to 2, default: `1`).

### 2. Speech-to-Text

The `speechToText` function listens to spoken input and converts it to text.

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

- `getTranscript()`: Starts listening and returns a promise that resolves to the recognized text.
- `stopSpeech()`: Stops the speech recognition session.

### 3. Get Available Voices

The `getVoices` function retrieves all available voices for text-to-speech.

#### Example:

```javascript
getVoices();
```

#### Usage:

This function outputs the list of available voices to the console, allowing you to choose specific voices for `textToSpeech`.

## Browser Compatibility

This library relies on the Web Speech API, which is supported in most modern browsers, particularly Chrome. Ensure that users have microphone access enabled for speech recognition.

## Error Handling

Both `textToSpeech` and `speechToText` handle unsupported environments gracefully by logging an error if the Web Speech API is unavailable.

## License

MIT License. See [LICENSE](./LICENSE) for more information.
