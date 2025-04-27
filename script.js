const notes = [
  { name: "C4", file: "C4.mp3" },
  { name: "C#/Db4", file: "Cs4.mp3" },
  { name: "D4", file: "D4.mp3" },
  { name: "D#/Eb4", file: "Ds4.mp3" },
  { name: "E4", file: "E4.mp3" },
  { name: "F4", file: "F4.mp3" },
  { name: "F#/Gb4", file: "Fs4.mp3" },
  { name: "G4", file: "G4.mp3" },
  { name: "G#/Ab4", file: "Gs4.mp3" },
  { name: "A4", file: "A4.mp3" },
  { name: "A#/Bb4", file: "As4.mp3" },
  { name: "B4", file: "B4.mp3" },
  { name: "C5", file: "C5.mp3" }
];

let currentNote = null;
let answered = false;
let correctCount = 0;
let incorrectCount = 0;

const startBtn = document.getElementById('startBtn');
const replayBtn = document.getElementById('replayBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const referenceBtn = document.getElementById('referenceBtn');
const choicesDiv = document.getElementById('choices');
const buttonsDiv = document.getElementById('buttons');
const resultDiv = document.getElementById('result');
const correctCountSpan = document.getElementById('correctCount');
const incorrectCountSpan = document.getElementById('incorrectCount');
const totalCountSpan = document.getElementById('totalCount');
const percentageSpan = document.getElementById('percentage');

// Helper function to play a note
function playNote(fileName) {
  const audio = new Audio(`audio/${fileName}`);
  audio.play();
}

// Start or Next Question
function startGame() {
  if (!answered && currentNote) {
    alert("Please select an answer before moving on!");
    return;
  }

  buttonsDiv.classList.remove('hidden');
  resultDiv.textContent = "";
  answered = false;

  // Randomly select a note
  currentNote = notes[Math.floor(Math.random() * notes.length)];
  playNote(currentNote.file);

  // Generate choice buttons
  choicesDiv.innerHTML = "";
  notes.forEach(note => {
    const btn = document.createElement('button');
    btn.textContent = note.name;
    btn.addEventListener('click', () => makeGuess(note.name));
    choicesDiv.appendChild(btn);
  });

  startBtn.textContent = "Next";
}

// Handle guess
func
