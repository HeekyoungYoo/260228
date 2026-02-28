class LottoBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
          font-weight: bold;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          background-color: var(--ball-bg, #eee);
          color: var(--ball-text, #333);
          transition: all 0.3s;
        }
      </style>
      <span></span>
    `;
    this.span = this.shadowRoot.querySelector('span');
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['number'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'number') {
      this.render();
    }
  }

  render() {
    const num = this.getAttribute('number') || '?';
    this.span.textContent = num;
    const number = parseInt(num, 10);
    if (!isNaN(number)) {
        this.style.backgroundColor = this.getColorForNumber(number);
        this.style.color = 'white';
    } else {
        this.style.backgroundColor = '';
        this.style.color = '';
    }
  }

  getColorForNumber(number) {
      if (number <= 10) return '#f44336'; // Red
      if (number <= 20) return '#ff9800'; // Orange
      if (number <= 30) return '#ffc107'; // Amber
      if (number <= 40) return '#4caf50'; // Green
      return '#2196f3'; // Blue
  }
}

customElements.define('lotto-ball', LottoBall);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    html.removeAttribute('data-theme');
    themeToggle.textContent = 'Dark Mode';
  } else {
    html.setAttribute('data-theme', 'dark');
    themeToggle.textContent = 'Light Mode';
  }
});

// Lotto Generation Logic
const generateBtn = document.getElementById('generate-btn');
const lottoBalls = document.querySelectorAll('lotto-ball');

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

generateBtn.addEventListener('click', () => {
  const newNumbers = generateLottoNumbers();
  lottoBalls.forEach((ball, index) => {
    ball.setAttribute('number', newNumbers[index]);
  });
});
