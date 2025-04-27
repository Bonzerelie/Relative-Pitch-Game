// Define the audio files for each note
const audioFiles = {
  "C": "audio/C4.mp3",
  "C#/Db": "audio/Csharp4.mp3",
  "D": "audio/D4.mp3",
  "D#/Eb": "audio/Dsharp4.mp3",
  "E": "audio/E4.mp3",
  "F": "audio/F4.mp3",
  "F#/Gb": "audio/Fsharp4.mp3",
  "G": "audio/G4.mp3",
  "G#/Ab": "audio/Gsharp4.mp3",
  "A": "audio/A4.mp3",
  "A#/Bb": "audio/Asharp4.mp3",
  "B": "audio/B4.mp3",
  "C5": "audio/C5.mp3"
};

// Define the chromatic scale notes
const notes = [
  { name: "C", freq: 261.63 },
  { name: "C#/Db", freq: 277.18 },
  { name: "D", freq: 293.66 },
  { name: "D#/Eb", freq: 311.13 },
  { name: "E", freq: 329.63 },
  { name: "F", freq: 349.23 },
  { name: "F#/Gb", freq: 369.99 },
  { name: "G", freq: 392.00 },
  { name: "G#/Ab", freq: 415.30 },
  { name: "A", freq: 440.00 },
  { name: "A#/Bb", freq: 466.16 },
  { name: "B", freq: 493.88 },
  { name: "C5", freq: 523.25 }
];

let currentNote; // To hold the random note being played
let correctCount = 0;
let incorrectCount = 0;
let questionAnswered = false; // Flag to track if the question has been answered

const startBtn = document.getElementById('startBtn');
const referenceBtn = document.getElementById('referenceBtn');
const answerButtons = document.querySelectorAll('.answerBtn');
const replayBtn = document.getElementById('replayBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');

const buttonsDiv = document.getElementById('buttons');
const resultDiv = document.getElementById('result');
const correctCountSpan = document.getElementById('correctCount');
const incorrectCountSpan = document.getElementById('incorrectCount');
const totalCountSpan = document.getElementById('totalCount');
const percentageSpan = document.getElementById('percentage');

// Function to play a note from the audio files
function playNote(noteName) {
  const audio = new Audio(audioFiles[noteName]);
  audio.play();
}

// Function to play C4 note as reference
function playC4() {
  playNote('C'); // Plays the C4 note from the audio
}

// Function to start or proceed to the next note
function startOrNext() {
  if (startBtn.textContent === 'Start') {
    resultDiv.textContent = "";
    
    // Randomly pick a note from the chromatic scale
    currentNote = notes[Math.floor(Math.random() * notes.length)];
    
    // Play the selected note from the audio
    playNote(currentNote.name);
    
    // Display the answer buttons with sharp/flat notation
    answerButtons.forEach((button, index) => {
      button.textContent = notes[index].name;  // Set button labels to note names (including flats)
    });

    buttonsDiv.classList.remove('hidden');
    questionAnswered = false;
    startBtn.textContent = 'Next'; // Change "Start" to "Next"
  } else {
    if (!questionAnswered) {
      alert("Please answer the question before moving to the next note!");
      return;
    }

    resultDiv.textContent = "";
    
    // Randomly pick a note from the chromatic scale
    currentNote = notes[Math.floor(Math.random() * notes.length)];
    
    // Play the selected note from the audio
    playNote(currentNote.name);

    // Display the answer buttons again
    answerButtons.forEach((button, index) => {
      button.textContent = notes[index].name;  // Set button labels to note names (including flats)
    });

    buttonsDiv.classList.remove('hidden');
    questionAnswered = false;
    startBtn.textContent = 'Next'; // Keep the text as "Next" after the first question
  }
}

// Function to handle guesses
function makeGuess(guess) {
  const correct = guess === currentNote.name;
  
  let feedback = "";
  if (correct) {
    feedback += "✅ Correct!\n\n";
    correctCount++;
  } else {
    feedback += "❌ Wrong! The correct note was " + currentNote.name + ".\n\n";
    incorrectCount++;
  }

  resultDiv.textContent = feedback;
  
  // Hide answer buttons after selection
  buttonsDiv.classList.add('hidden');
  updateScore();
  questionAnswered = true;
  startBtn.disabled = false; // Enable the "Next" button after answering
}

// Function to update the score
function updateScore() {
  correctCountSpan.textContent = correctCount;
  incorrectCountSpan.textContent = incorrectCount;
  const total = correctCount + incorrectCount;
  totalCountSpan.textContent = total;
  const percentage = total === 0 ? 0 : Math.round((correctCount / total) * 100);
  percentageSpan.textContent = `${percentage}%`;
}

// Function to reset the score and game state
function resetScore() {
  correctCount = 0;
  incorrectCount = 0;
  updateScore();
  resultDiv.textContent = "";
  startBtn.textContent = 'Start';  // Change "Next" back to "Start"
  startBtn.disabled = false; // Enable the "Start" button again
  questionAnswered = false;
  buttonsDiv.classList.add('hidden'); // Hide the answer buttons when resetting the game
}

// Function to handle the replay functionality
function replayNote() {
  playNote(currentNote.name);  // Replay the current note when clicked
}

// Event listeners
startBtn.addEventListener('click', startOrNext); // Now calls startOrNext directly for both actions
referenceBtn.addEventListener('click', playC4);
answerButtons.forEach(button => {
  button.addEventListener('click', () => makeGuess(button.textContent));
});
replayBtn.addEventListener('click', replayNote);  // Use the new replay function
resetScoreBtn.addEventListener('click', resetScore);
