// js/TitleTypingEffect.js
class TitleTypingEffect {
    constructor(typingSpeed = 160, erasingSpeed = 30, pauseDuration = 1800) {
        // Фиксированные фразы для заголовка вкладки
        this.phrases = [
            "Hi!",
            "Knife",
            "!#",
            "Kn1f3", 
            "13",
            "Don't look at me",
            "Nojik",
            "Are you still there?",
            "K13"
        ];
        this.typingSpeed = typingSpeed;
        this.erasingSpeed = erasingSpeed;
        this.pauseDuration = pauseDuration;
        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isStopped = false;
        this.originalTitle = document.title;
    }

    start() {
        this.type();
    }

    stop() {
        this.isStopped = true;
        // Восстанавливаем оригинальный заголовок при остановке
        document.title = this.originalTitle;
    }

    type() {
        if (this.isStopped) return;

        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isDeleting) {
            this.currentCharIndex--;
        } else {
            this.currentCharIndex++;
        }

        // Обновляем заголовок вкладки (без мигающей палки)
        document.title = currentPhrase.substring(0, this.currentCharIndex);

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