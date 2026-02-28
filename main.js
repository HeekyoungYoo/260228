
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
          font-size: 1.5rem;
          font-weight: bold;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          background-color: #eee;
          color: #333;
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
    this.span.textContent = this.getAttribute('number') || '?';
    const number = parseInt(this.getAttribute('number'), 10);
    if (!isNaN(number)) {
        this.style.backgroundColor = this.getColorForNumber(number);
        this.style.color = 'white';
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

const generateBtn = document.getElementById('generate-btn');
const lottoBalls = document.querySelectorAll('lotto-ball');

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}

generateBtn.addEventListener('click', () => {
  const newNumbers = generateLottoNumbers();
  lottoBalls.forEach((ball, index) => {
    ball.setAttribute('number', newNumbers[index]);
  });
});
