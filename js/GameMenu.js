class GameMenu {
    constructor(languageManager, audioPlayer, dialogueManager) {
        this.languageManager = languageManager;
        this.audioPlayer = audioPlayer;
        this.dialogueManager = dialogueManager;
        this.menuItems = document.querySelectorAll('.game-menu .menu-item');
        this.settingsScreen = document.getElementById('settings-screen');
        this.content = document.getElementById('content');
        this.languageOptions = document.querySelectorAll('.language-option');
        this.volumeSlider = document.getElementById('volume-slider');
        this.volumePercent = document.getElementById('volume-percent');
        this.exitModal = document.getElementById('exit-modal');
        this.exitConfirm = document.getElementById('exit-confirm');
        this.exitCancel = document.getElementById('exit-cancel');
        this.feedbackModal = document.getElementById('feedback-modal');
        this.feedbackText = document.getElementById('feedback-text');
        this.feedbackSubmit = document.getElementById('feedback-submit');
        this.feedbackCancel = document.getElementById('feedback-cancel');
        this.charCount = document.getElementById('char-count');
        this.messageModal = document.getElementById('message-modal');
        this.messageModalText = document.getElementById('message-modal-text');
        this.messageModalTitle = document.getElementById('message-modal-title');
        this.messageModalOk = document.getElementById('message-modal-ok');
        this.init();
    }

    init() {
        this.menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleMenuItemClick(e.target);
            });
        });
        
        this.languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.currentTarget.getAttribute('data-lang');
                this.languageManager.setLanguage(lang);
            });
        });
        
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                const volume = parseFloat(e.target.value);
                this.audioPlayer.setVolume(volume);
                this.updateVolumeDisplay(volume);
            });
        }
        
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                this.hideSettings();
            });
        }
        
        this.exitConfirm.addEventListener('click', () => this.confirmExit());
        this.exitCancel.addEventListener('click', () => this.hideExitModal());
        this.feedbackSubmit.addEventListener('click', () => this.submitFeedback());
        this.feedbackCancel.addEventListener('click', () => this.hideFeedbackModal());
        this.feedbackText.addEventListener('input', () => this.updateCharCount());
        this.messageModalOk.addEventListener('click', () => this.hideMessageModal());
    }

    handleMenuItemClick(item) {
        const action = item.getAttribute('data-action');
        
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);

        switch(action) {
            case 'start':
                this.startIntroduction();
                break;
            case 'continue':
                this.continueCommunication();
                break;
            case 'settings':
                this.showSettings();
                break;
            case 'feedback':
                this.showFeedbackModal();
                break;
            case 'exit':
                this.showExitModal();
                break;
        }
    }

    startIntroduction() {
        this.hideMainMenu();
        this.dialogueManager.start();
    }

    continueCommunication() {
        window.open('https://t.me/bloodiedknife', '_blank');
    }

    showSettings() {
        this.hideMainMenu();
        this.settingsScreen.classList.remove('hidden');
        this.languageManager.updateLanguageSelection();
        
        const currentVolume = this.audioPlayer.getVolume();
        this.updateVolumeDisplay(currentVolume);
        this.volumeSlider.value = currentVolume;
    }

    hideSettings() {
        this.settingsScreen.classList.add('hidden');
        this.showMainMenu();
    }

    showMainMenu() {
        this.content.classList.remove('hidden');
        this.content.style.display = 'block';
        this.content.style.opacity = '1';
        this.content.style.transform = 'translateY(0)';
    }

    hideMainMenu() {
        this.content.style.opacity = '0';
        this.content.style.transform = 'translateY(20px)';
        setTimeout(() => {
            this.content.classList.add('hidden');
        }, 300);
    }

    showExitModal() {
        this.exitModal.classList.remove('hidden');
    }

    hideExitModal() {
        this.exitModal.classList.add('hidden');
        this.showMainMenu();
    }

    confirmExit() {
        this.hideExitModal();
        this.audioPlayer.stop();
        this.hideAllUIElements();
        this.forceCloseTab();
    }

    showFeedbackModal() {
        this.feedbackModal.classList.remove('hidden');
        this.feedbackText.value = '';
        this.updateCharCount();
        this.feedbackText.focus();
    }

    hideFeedbackModal() {
        this.feedbackModal.classList.add('hidden');
        this.showMainMenu();
    }

    updateCharCount() {
        const count = this.feedbackText.value.length;
        this.charCount.textContent = count;
        
        if (count > 500) {
            this.charCount.style.color = '#ff4444';
        } else {
            this.charCount.style.color = 'rgba(255, 255, 255, 0.7)';
        }
    }

    submitFeedback() {
        const feedback = this.feedbackText.value.trim();
        
        if (!feedback) {
            this.showMessage(
                this.languageManager.getTranslation('feedbackEmpty'),
                this.languageManager.getTranslation('feedbackTitle')
            );
            return;
        }
        
        if (feedback.length < 5) {
            this.showMessage(
                'Please write at least 5 characters for your feedback.',
                this.languageManager.getTranslation('feedbackTitle')
            );
            return;
        }
        
        const originalText = this.feedbackSubmit.textContent;
        this.feedbackSubmit.textContent = 'Sending...';
        this.feedbackSubmit.disabled = true;
        
        setTimeout(() => {
            this.feedbackSubmit.textContent = originalText;
            this.feedbackSubmit.disabled = false;
            this.showMessage(
                this.languageManager.getTranslation('feedbackSuccess'),
                this.languageManager.getTranslation('feedbackTitle')
            );
            
            this.hideFeedbackModal();
            console.log('Feedback submitted:', feedback);
            
            const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
            feedbacks.push({
                text: feedback,
                timestamp: new Date().toISOString(),
                language: this.languageManager.currentLanguage
            });
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        }, 1500);
    }

    updateVolumeDisplay(volume) {
        const percent = Math.round(volume * 100);
        this.volumePercent.textContent = `${percent}%`;
        this.volumeSlider.style.background = `linear-gradient(to right, #fff 0%, #fff ${percent}%, #444 ${percent}%, #444 100%)`;
    }

    hideAllUIElements() {
        const elementsToHide = [
            '.container',
            '#content',
            '#settings-screen',
            '#introduction-screen',
            '#exit-modal',
            '#feedback-modal',
            '#message-modal'
        ];
        
        elementsToHide.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.add('hidden');
                element.style.display = 'none';
            }
        });
    
        document.body.style.background = '#000';
        document.body.style.overflow = 'hidden';
    }

    forceCloseTab() {
        try {
            window.close();
        } catch (e) {
        }
        
        setTimeout(() => {
            try {
                window.open('', '_self').close();
            } catch (e) {
            }
        }, 50);
        
        setTimeout(() => {
            try {
                window.top.close();
            } catch (e) {
            }
        }, 100);
    }

    showMessage(message, title = 'Message') {
        this.messageModalText.textContent = message;
        this.messageModalTitle.textContent = title;
        
        const okText = this.languageManager.currentLanguage === 'ru' ? 'OK' : 
                      this.languageManager.currentLanguage === 'es' ? 'Aceptar' : 'OK';
        this.messageModalOk.textContent = okText;
        
        this.messageModal.classList.remove('hidden');
    }

    hideMessageModal() {
        this.messageModal.classList.add('hidden');
    }
}
