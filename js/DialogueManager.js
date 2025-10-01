class DialogueManager {
    constructor(languageManager) {
        this.languageManager = languageManager;
        this.userName = '';
        this.currentStep = 0;
        this.isTyping = false;
        
        this.elements = {
            screen: document.getElementById('introduction-screen'),
            dialogueBox: document.getElementById('dialogue-box'),
            inputSection: document.getElementById('input-section'),
            nameInput: document.getElementById('name-input'),
            submitName: document.getElementById('submit-name'),
            choicesSection: document.getElementById('choices-section'),
            backToMenu: document.getElementById('back-to-menu')
        };
        
        this.init();
    }
    
    init() {
        // Инициализация событий
        this.elements.submitName.addEventListener('click', () => this.handleNameSubmit());
        this.elements.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleNameSubmit();
        });
        
        this.elements.choicesSection.addEventListener('click', (e) => {
            if (e.target.classList.contains('choice')) {
                this.handleChoice(e.target.getAttribute('data-choice'));
            }
        });
        
        this.elements.backToMenu.addEventListener('click', () => this.backToMenu());
        
        // Гарантированно скрываем все элементы ввода при инициализации
        this.hideAllInputElements();
        
        // Обновляем placeholder поля ввода имени
        this.updateNamePlaceholder();
    }
    
    updateNamePlaceholder() {
        this.elements.nameInput.placeholder = this.languageManager.getTranslation('namePlaceholder');
    }
    
    start() {
        this.userName = '';
        this.currentStep = 0;
        this.elements.dialogueBox.innerHTML = '';
        this.hideAllInputElements();
        
        // Обновляем placeholder поля ввода имени
        this.updateNamePlaceholder();
        
        // Показываем экран знакомства
        this.elements.screen.classList.remove('hidden');
        
        // Начинаем диалог с приветствия
        this.showCharacterMessage(this.languageManager.getTranslation('hello'))
            .then(() => {
                // ПОСЛЕ показа приветствия показываем поле ввода имени
                setTimeout(() => {
                    this.showInputSection();
                }, 1500);
            });
    }
    
    showCharacterMessage(message) {
        return new Promise((resolve) => {
            const messageElement = this.createMessageElement(message, 'character');
            this.elements.dialogueBox.appendChild(messageElement);
            this.elements.dialogueBox.scrollTop = this.elements.dialogueBox.scrollHeight;
            
            // Ждем завершения анимации печати + дополнительное время для чтения
            setTimeout(() => {
                resolve();
            }, message.length * 50 + 1500);
        });
    }
    
    showUserMessage(message) {
        const messageElement = this.createMessageElement(message, 'user');
        this.elements.dialogueBox.appendChild(messageElement);
        this.elements.dialogueBox.scrollTop = this.elements.dialogueBox.scrollHeight;
    }
    
    createMessageElement(text, type) {
        const element = document.createElement('div');
        element.className = `dialogue-message ${type}`;
        
        // Эффект печати
        const fullText = text;
        element.textContent = '';
        let currentIndex = 0;
        
        const typeInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                element.textContent = fullText.substring(0, currentIndex);
                currentIndex++;
                this.elements.dialogueBox.scrollTop = this.elements.dialogueBox.scrollHeight;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
        
        return element;
    }
    
    showCompletionMessage() {
        // Очищаем диалоговое окно
        this.elements.dialogueBox.innerHTML = '';
        
        // Создаем элемент для сообщения о завершении
        const completionElement = document.createElement('div');
        completionElement.className = 'completion-message';
        completionElement.textContent = this.languageManager.getTranslation('chatCompleted');
        
        // Добавляем в диалоговое окно
        this.elements.dialogueBox.appendChild(completionElement);
    }
    
    showInputSection() {
        this.elements.inputSection.classList.remove('hidden');
        this.elements.nameInput.focus();
    }
    
    hideInputSection() {
        this.elements.inputSection.classList.add('hidden');
    }
    
    showFirstChoice() {
        // Очищаем секцию выбора и показываем только первый вариант
        this.elements.choicesSection.innerHTML = '';
        
        const choice1 = document.createElement('div');
        choice1.className = 'choice';
        choice1.setAttribute('data-choice', '1');
        choice1.textContent = this.languageManager.getTranslation('option1');
        this.elements.choicesSection.appendChild(choice1);
        
        this.elements.choicesSection.classList.remove('hidden');
    }
    
    showSecondChoice() {
        // Очищаем секцию выбора и показываем только второй вариант
        this.elements.choicesSection.innerHTML = '';
        
        const choice2 = document.createElement('div');
        choice2.className = 'choice';
        choice2.setAttribute('data-choice', '2');
        choice2.textContent = this.languageManager.getTranslation('option2');
        this.elements.choicesSection.appendChild(choice2);
        
        this.elements.choicesSection.classList.remove('hidden');
    }
    
    hideChoicesSection() {
        this.elements.choicesSection.classList.add('hidden');
    }
    
    hideAllInputElements() {
        this.hideInputSection();
        this.hideChoicesSection();
    }
    
    handleNameSubmit() {
        const name = this.elements.nameInput.value.trim();
        if (name) {
            this.userName = name;
            this.showUserMessage(name);
            this.hideInputSection();
            
            // Увеличена задержка перед показом приветственного сообщения
            setTimeout(() => {
                const welcomeMessage = this.languageManager.getTranslation('welcome', { name: name });
                this.showCharacterMessage(welcomeMessage)
                    .then(() => {
                        // Увеличена задержка перед показом первого варианта ответа
                        setTimeout(() => {
                            this.showFirstChoice();
                        }, 2000);
                    });
            }, 1500);
        }
    }
    
    handleChoice(choice) {
        let userResponse = '';
        let characterResponse = '';
        
        switch(choice) {
            case '1':
                userResponse = this.languageManager.getTranslation('option1');
                characterResponse = this.languageManager.getTranslation('response1');
                break;
            case '2':
                userResponse = this.languageManager.getTranslation('option2');
                characterResponse = this.languageManager.getTranslation('response2');
                break;
        }
        
        // Скрываем варианты ответа перед показом ответа пользователя
        this.hideChoicesSection();
        
        // Показываем ответ пользователя
        this.showUserMessage(userResponse);
        
        // Увеличена задержка перед показам ответа персонажа
        setTimeout(() => {
            this.showCharacterMessage(characterResponse)
                .then(() => {
                    // Если это был первый выбор, показываем второй вариант
                    if (choice === '1') {
                        // Увеличена задержка перед показом второго варианта
                        setTimeout(() => {
                            this.showSecondChoice();
                        }, 2000);
                    } else {
                        // Если это был второй выбор, показываем завершающее сообщение
                        setTimeout(() => {
                            this.showCompletionMessage();
                        }, 1500);
                    }
                });
        }, 1500);
    }
    
    backToMenu() {
        // Скрываем экран знакомства
        this.elements.screen.classList.add('hidden');
        
        // Получаем элементы главного меню
        const contentElement = document.getElementById('content');
        const container = document.querySelector('.container');
        
        // Восстанавливаем видимость главного меню
        contentElement.classList.remove('hidden');
        
        // Сбрасываем стили для правильного отображения
        contentElement.style.opacity = '1';
        contentElement.style.transform = 'translateY(0)';
        
        // Скрываем начальный текст, если он был виден
        container.classList.add('hidden');
        
        // Убеждаемся, что меню действительно видимо
        setTimeout(() => {
            contentElement.style.display = 'block';
        }, 50);
    }
}