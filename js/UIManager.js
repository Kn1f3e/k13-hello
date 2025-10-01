// js/UIManager.js
class UIManager {
    constructor() {
        this.isStarted = false;
    }

    initialize() {
        this.typingElement = document.getElementById('typing-text');
        this.contentElement = document.getElementById('content');
        
        // Устанавливаем начальные стили для плавного появления
        this.contentElement.style.opacity = '0';
        this.contentElement.style.transform = 'translateY(20px)';
        this.contentElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }

    showContent() {
        this.isStarted = true;
        
        // Плавное исчезновение текста "Начнем?"
        this.typingElement.style.opacity = '0';
        this.typingElement.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            this.typingElement.classList.add('hidden');
            
            // Показ игрового меню с анимацией
            this.contentElement.classList.remove('hidden');
            
            // Запуск анимации появления
            setTimeout(() => {
                this.contentElement.style.opacity = '1';
                this.contentElement.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    }
}