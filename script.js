const data = [
  {
    word: 'trained',
    prompt: 'They had ___ for months before the competition.',
    answer: 'trained',
    hint: 'They prepared their body and skills.'
  },
  {
    word: 'victory',
    prompt: 'The players celebrated their hard-earned ___.',
    answer: 'victory',
    hint: 'Winning a match or competition.'
  },
  {
    word: 'rewarded',
    prompt: 'The team was ___ for their excellent performance.',
    answer: 'rewarded',
    hint: 'They received something for doing well.'
  },
  {
    word: 'astonishing',
    prompt: 'Her progress in training was truly ___.',
    answer: 'astonishing',
    hint: 'Very surprising in a good way.'
  },
  {
    word: 'devoted',
    prompt: 'She has ___ years of her life to this project.',
    answer: 'devoted',
    hint: 'Gave time and energy to something important.'
  },
  {
    word: 'failure',
    prompt: 'Sometimes ___ teaches us more than success.',
    answer: 'failure',
    hint: 'When something does not go as planned.'
  },
  {
    word: 'record',
    prompt: 'He broke the national ___ in the race.',
    answer: 'record',
    hint: 'The best result ever reached.'
  },
  {
    word: 'proud',
    prompt: 'The coach felt very ___ of her team.',
    answer: 'proud',
    hint: 'A happy feeling about a good result.'
  },
  {
    word: 'exceptional',
    prompt: 'The singer gave an ___ performance.',
    answer: 'exceptional',
    hint: 'Very special or unusually good.'
  },
  {
    word: 'to achieve a goal',
    prompt: 'It takes time and effort ___ like that.',
    answer: 'to achieve a goal',
    hint: 'To reach something you were working for.'
  }
];

let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp || fb.textContent) return; // prevent double scoring

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- ENTER KEY ---------- */
container.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkAnswer();
});

/* ---------- INIT ---------- */
renderCard(current);













