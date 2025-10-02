class TypingEffect {
    constructor(element, phrases, typingSpeed = 100, erasingSpeed = 50, pauseDuration = 1500) {
        this.element = element;
        this.phrases = phrases;
        this.typingSpeed = typingSpeed;
        this.erasingSpeed = erasingSpeed;
        this.pauseDuration = pauseDuration;
        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isStopped = false;
    }

    start() {
        this.type();
    }

    stop() {
        this.isStopped = true;
    }

    type() {
        if (this.isStopped) return;

        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isDeleting) {
            this.currentCharIndex--;
        } else {
            this.currentCharIndex++;
        }

        this.element.textContent = currentPhrase.substring(0, this.currentCharIndex);

        let typeSpeed = this.typingSpeed;
        
        if (this.isDeleting) {
            typeSpeed = this.erasingSpeed;
        }

        if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
            typeSpeed = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}
