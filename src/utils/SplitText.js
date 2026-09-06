// Lightweight, pure JS implementation of SplitText compatible with GSAP animations
export class SplitText {
  constructor(target, options = {}) {
    this.elements = [];
    this.lines = [];
    this.words = [];
    this.chars = [];

    const targets = typeof target === 'string' 
      ? document.querySelectorAll(target) 
      : target instanceof NodeList || Array.isArray(target) 
        ? target 
        : target ? [target] : [];

    targets.forEach(el => {
      if (!el) return;
      this.elements.push(el);

      const text = el.textContent || '';
      const wordsArr = text.trim().split(/\s+/);
      
      el.innerHTML = '';
      const lineSpan = document.createElement('div');
      lineSpan.style.display = 'block';
      lineSpan.style.overflow = 'hidden';

      const lineInner = document.createElement('span');
      lineInner.style.display = 'inline-block';
      lineInner.textContent = text;
      lineSpan.appendChild(lineInner);
      el.appendChild(lineSpan);

      this.lines.push(lineInner);
    });
  }

  revert() {
    this.elements.forEach((el, i) => {
      if (el && this.lines[i]) {
        el.textContent = this.lines[i].textContent;
      }
    });
  }
}

export default SplitText;
