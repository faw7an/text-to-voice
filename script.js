document.addEventListener("DOMContentLoaded", function () {
    let speech = new SpeechSynthesisUtterance();
    let voices = [];
    let voiceSelect = document.querySelector("#voiceSelect");

    // Populate the voices once they are loaded by the browser
    window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        speech.voice = voices[0];

        // Add the voices to the select dropdown
        voices.forEach((voice, i) => {
            let option = new Option(voice.name, i);
            voiceSelect.appendChild(option);
        });
    }

    // Change the selected voice when user picks one
    voiceSelect.addEventListener("change", () => {
        speech.voice = voices[voiceSelect.value];
    });

    // Click event for the "Listen" button
    document.querySelector(".btn").addEventListener("click", () => {
        let userInput = document.querySelector("#text-input").value;

        // Sanitize the user input using DOMPurify to prevent XSS attacks
        let sanitizedInput = DOMPurify.sanitize(userInput);

        // Set the sanitized input to be spoken
        speech.text = sanitizedInput;

        // Speak the sanitized input
        window.speechSynthesis.speak(speech);
    });
});
