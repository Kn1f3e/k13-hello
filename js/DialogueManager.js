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
        this.hideAllInputElements();
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
        this.updateNamePlaceholder();
        this.elements.screen.classList.remove('hidden');
        this.showCharacterMessage(this.languageManager.getTranslation('hello'))
            .then(() => {
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
        this.elements.dialogueBox.innerHTML = '';
        
        const completionElement = document.createElement('div');
        completionElement.className = 'completion-message';
        completionElement.textContent = this.languageManager.getTranslation('chatCompleted');
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
        this.elements.choicesSection.innerHTML = '';
        
        const choice1 = document.createElement('div');
        choice1.className = 'choice';
        choice1.setAttribute('data-choice', '1');
        choice1.textContent = this.languageManager.getTranslation('option1');
        this.elements.choicesSection.appendChild(choice1);
        
        this.elements.choicesSection.classList.remove('hidden');
    }
    
    showSecondChoice() {
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
    
            setTimeout(() => {
                const welcomeMessage = this.languageManager.getTranslation('welcome', { name: name });
                this.showCharacterMessage(welcomeMessage)
                    .then(() => {
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
        this.hideChoicesSection();
        this.showUserMessage(userResponse);
        
        setTimeout(() => {
            this.showCharacterMessage(characterResponse)
                .then(() => {
                    if (choice === '1') {
                        setTimeout(() => {
                            this.showSecondChoice();
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            this.showCompletionMessage();
                        }, 1500);
                    }
                });
        }, 1500);
    }
    
    backToMenu() {
        this.elements.screen.classList.add('hidden');
        
        const contentElement = document.getElementById('content');
        const container = document.querySelector('.container');
        
        contentElement.classList.remove('hidden');
        contentElement.style.opacity = '1';
        contentElement.style.transform = 'translateY(0)';

        container.classList.add('hidden');
        
        setTimeout(() => {
            contentElement.style.display = 'block';
        }, 50);
    }
}
