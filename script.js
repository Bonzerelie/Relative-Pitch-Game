// Initialize variables
let currentNote = null;
let answered = false;
let correctCount = 0;
let incorrectCount = 0;

const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn'); // New Next Button
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

// List of notes with their corresponding file names (Added C5 note)
const notes = [
  { name: 'C', file: 'C4.mp3' },
  { name: 'C#/Db', file: 'Csharp4.mp3' },
  { name: 'D', file: 'D4.mp3' },
  { name: 'D#/Eb', file: 'Dsharp4.mp3' },
  { name: 'E', file: 'E4.mp3' },
  { name: 'F', file: 'F4.mp3' },
  { name: 'F#/Gb', file: 'Fsharp4.mp3' },
  { name: 'G', file: 'G4.mp3' },
  { name: 'G#/Ab', file: 'Gsharp4.mp3' },
  { name: 'A', file: 'A4.mp3' },
  { name: 'A#/Bb', file: 'Asharp4.mp3' },
  { name: 'B', file: 'B4.mp3' },
  { name: 'C5', file: 'C5.mp3' }  // Added C5
];

// Function to play a note
function playNote(file) {
  const audio = new Audio('audio/' + file); // Assuming your audio folder is called 'audio'
  audio.play();
}

// Start or move to next question
function startGame() {
  // Prevent moving to next question before answering
  if (currentNote && !answered) {
    alert("Please select an answer before moving on!");
    return;
  }

  // Show answer buttons and 'Next' button
  startBtn.classList.add('hidden');
  nextBtn.classList.remove('hidden');
  buttonsDiv.classList.remove('hidden'); // Make sure the buttons appear after starting

  // Reset result display
  resultDiv.textContent = "";
  answered = false;

  // Randomly select a note
  currentNote = notes[Math.floor(Math.random() * notes.length)];
  playNote(currentNote.file);

  // Generate choice buttons with just the note letters (e.g., "C" instead of "C4")
  choicesDiv.innerHTML = "";
  notes.forEach(note => {
    const btn = document.createElement('button');
    // Display only the letter part of the note (e.g., "C" instead of "C4")
    btn.textContent = note.name.replace(/[0-9]/g, '');  // Remove numbers
    btn.addEventListener('click', () => makeGuess(note.name));
    choicesDiv.appendChild(btn);
  });
}

// Handle user's guess
function makeGuess(selectedName) {
  if (answered) return;

  if (selectedName === currentNote.name) {
    resultDiv.textContent = "✅ Correct!\n";
    correctCount++;
  } else {
    resultDiv.textContent = `❌ Wrong! It was ${currentNote.name}\n`;
    incorrectCount++;
  }

  answered = true;
  updateScore();
}

// Replay the current note
function replayNote() {
  if (currentNote) {
    playNote(currentNote.file);
  }
}

// Play reference note C4
function playReferenceNote() {
  playNote("C4.mp3");
}

// Update the displayed score
function updateScore() {
  correctCountSpan.textContent = correctCount;
  incorrectCountSpan.textContent = incorrectCount;
  const total = correctCount + incorrectCount;
  totalCountSpan.textContent = total;
  const percentage = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  percentageSpan.textContent = `${percentage}%`;
}

// Reset the game
function resetScore() {
  correctCount = 0;
  incorrectCount = 0;
  currentNote = null;
  answered = false;
  updateScore();
  resultDiv.textContent = "";
  startBtn.textContent = "Start";
  startBtn.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  buttonsDiv.classList.add('hidden');
}

// Event listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', startGame); // Ensure next works
replayBtn.addEventListener('click', replayNote);
referenceBtn.addEventListener('click', playReferenceNote);
resetScoreBtn.addEventListener('click', resetScore);
