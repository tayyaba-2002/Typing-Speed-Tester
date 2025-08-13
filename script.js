const paragraphs = [
  `Learning to code takes patience and persistence. Each day you practice, you build muscle memory and confidence. Mistakes are part of the process, so focus on improving rather than perfection.`,
  `Software engineers solve real problems by writing clear code. You can test your code, learn from failures, and refine your logic. In the process, you learn to collaborate and grow.`,
  `Typing skills are essential: for writing emails, coding, or composing reports. With regular practice, you can increase your accuracy and speed, making your workflow smoother.`,
  `Practice consistently to build speed and accuracy. It’s important to take breaks and maintain good posture to avoid strain and fatigue.`,
  `As your skills improve, challenge yourself with longer paragraphs and complex vocabulary to build endurance and mastery.`
];

let currentParagraph = "";
let startTime;
let timerInterval;
let typingStarted = false;

const sentenceDisplay = document.getElementById("sentence");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const retryButton = document.getElementById("retry");
const clickSound = document.getElementById("click-sound"); // ✅ use ONE id
const keys = document.querySelectorAll(".key");

function loadParagraph() {
  currentParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  sentenceDisplay.textContent = currentParagraph;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    timeDisplay.textContent = elapsedSeconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function calculateStats() {
  const typed = input.value;
  const timeMinutes = (Date.now() - startTime) / 1000 / 60;
  const wordCount = currentParagraph.trim().split(/\s+/).length;
  const wpm = Math.round(wordCount / timeMinutes);
  let correctChars = 0;
  for (let i = 0; i < currentParagraph.length; i++) {
    if (typed[i] === currentParagraph[i]) correctChars++;
  }
  const accuracy = Math.round((correctChars / currentParagraph.length) * 100);

  wpmDisplay.textContent = isFinite(wpm) ? wpm : 0;
  accuracyDisplay.textContent = isFinite(accuracy) ? accuracy : 0;
}

// Highlight pressed key
function highlightKey(code) {
  const keyDiv = document.querySelector(`.key[data-key="${code}"]`);
  if (keyDiv) {
    keyDiv.classList.add("pressed");
  }
}

function removeHighlight(code) {
  const keyDiv = document.querySelector(`.key[data-key="${code}"]`);
  if (keyDiv) {
    keyDiv.classList.remove("pressed");
  }
}

// Event listeners
input.addEventListener("input", () => {
  if (!typingStarted) {
    typingStarted = true;
    startTimer();
  }
  if (input.value.length >= currentParagraph.length) {
    stopTimer();
    calculateStats();
  }
});

window.addEventListener("keydown", (e) => {
  highlightKey(e.code); // still highlight the pressed key
  clickSound.currentTime = 0; // rewind to start
  clickSound.play(); // play the click sound
});

retryButton.addEventListener("click", () => {
  input.value = "";
  typingStarted = false;
  stopTimer();
  timeDisplay.textContent = "0";
  wpmDisplay.textContent = "0";
  accuracyDisplay.textContent = "0";
  loadParagraph();
  input.focus();
});

// Initial load
loadParagraph();
