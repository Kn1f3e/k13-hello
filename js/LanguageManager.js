class LanguageManager {
    constructor() {
        this.currentLanguage = 'en'; // По умолчанию английский
        this.translations = {
            en: {
                start: 'Start Introduction',
                continue: 'Continue Communication',
                settings: 'Settings',
                feedback: 'Leave Feedback',
                exit: 'Exit',
                
                // Настройки
                settingsTitle: 'Settings',
                languageLabel: 'Language',
                volumeLabel: 'Volume',
                backButton: 'Back to Menu',
                
                // Языки
                english: 'English',
                russian: 'Русский',
                spanish: 'Español',

                // Диалог знакомства
                hello: 'Hello, who are you?',
                namePlaceholder: 'Enter your name...',
                welcome: 'Nice to meet you {name}. My name is Kn1f3 or Nojik or in Russian kitchenware, but anyway. What brings you here?',
                option1: 'I became interested to see what is happening here.',
                option2: 'I am already leaving.',
                response1: 'I don\'t know what this is myself, but I hope you liked it.',
                response2: 'Not saying goodbye?',
                chatCompleted: 'Chat completed.',
                backToMenu: 'Back to Menu',

                // Модальное окно выхода
                exitTitle: 'Exit Confirmation',
                exitMessage: 'Are you sure you want to exit?',
                exitConfirm: 'Yes',
                exitCancel: 'No',

                // Модальное окно отзыва
                feedbackTitle: 'Leave Feedback',
                feedbackPlaceholder: 'Enter your feedback...',
                feedbackSubmit: 'Submit',
                feedbackCancel: 'Cancel',
                feedbackSuccess: 'Thank you for your feedback!',
                feedbackEmpty: 'Please enter your feedback before submitting.'
            },
            ru: {
                // Меню
                start: 'Начать знакомство',
                continue: 'Продолжить общение',
                settings: 'Настройки',
                feedback: 'Оставить отзыв',
                exit: 'Выйти',
                
                // Настройки
                settingsTitle: 'Настройки',
                languageLabel: 'Язык',
                volumeLabel: 'Громкость',
                backButton: 'Назад в меню',
                
                // Языки
                english: 'English',
                russian: 'Русский',
                spanish: 'Español',

                // Диалог знакомства
                hello: 'Привет, ты кто?',
                namePlaceholder: 'Введите ваше имя...',
                welcome: 'Рад познакомиться {name}. Меня зовут Kn1f3 или же Nojik или же по-русски кухонная утварь, но не суть. Какими судьбами?',
                option1: 'Стало интересно посмотреть, что тут происходит.',
                option2: 'Я уже ухожу.',
                response1: 'Я сам не знаю что это, но надеюсь тебе понравилось.',
                response2: 'Не прощаемся?',
                chatCompleted: 'Чат завершен.',
                backToMenu: 'Назад в меню',

                // Модальное окно выхода
                exitTitle: 'Подтверждение выхода',
                exitMessage: 'Вы уверены, что хотите выйти?',
                exitConfirm: 'Да',
                exitCancel: 'Нет',

                // Модальное окно отзыва
                feedbackTitle: 'Оставить отзыв',
                feedbackPlaceholder: 'Введите ваш отзыв...',
                feedbackSubmit: 'Отправить',
                feedbackCancel: 'Отмена',
                feedbackSuccess: 'Спасибо за ваш отзыв!',
                feedbackEmpty: 'Пожалуйста, введите ваш отзыв перед отправкой.'
            },
            es: {
                // Меню
                start: 'Comenzar presentación',
                continue: 'Continuar comunicación',
                settings: 'Configuración',
                feedback: 'Dejar comentarios',
                exit: 'Salir',
                
                // Настройки
                settingsTitle: 'Configuración',
                languageLabel: 'Idioma',
                volumeLabel: 'Volumen',
                backButton: 'Volver al menú',
                
                // Языки
                english: 'English',
                russian: 'Русский',
                spanish: 'Español',

                // Диалог знакомства
                hello: 'Hola, ¿quién eres?',
                namePlaceholder: 'Ingresa tu nombre...',
                welcome: 'Encantado de conocerte {name}. Me llamo Kn1f3 o Nojik o en ruso utensilio de cocina, pero no importa. ¿Qué te trae por aquí?',
                option1: 'Me interesó ver qué está pasando aquí.',
                option2: 'Ya me voy.',
                response1: 'Yo mismo no sé qué es esto, pero espero que te haya gustado.',
                response2: '¿No nos despedimos?',
                chatCompleted: 'Chat completado.',
                backToMenu: 'Volver al menú',

                // Модальное окно выхода
                exitTitle: 'Confirmación de salida',
                exitMessage: '¿Estás seguro de que quieres salir?',
                exitConfirm: 'Sí',
                exitCancel: 'No',

                // Модальное окно отзыва
                feedbackTitle: 'Dejar comentarios',
                feedbackPlaceholder: 'Ingresa tus comentarios...',
                feedbackSubmit: 'Enviar',
                feedbackCancel: 'Cancelar',
                feedbackSuccess: '¡Gracias por tus comentarios!',
                feedbackEmpty: 'Por favor, ingresa tus comentarios antes de enviar.'
            }
        };
        
        // сохраненный язык из localStorage
        this.loadLanguage();
    }
    
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            this.saveLanguage();
            this.updateUI();
            return true;
        }
        return false;
    }
    
    getTranslation(key, params = {}) {
        let translation = this.translations[this.currentLanguage][key] || key;
        
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
        
        return translation;
    }
    
    updateUI() {
        // основное меню
        const menuItems = document.querySelectorAll('.game-menu .menu-item');
        if (menuItems.length >= 5) {
            menuItems[0].textContent = this.getTranslation('start');
            menuItems[1].textContent = this.getTranslation('continue');
            menuItems[2].textContent = this.getTranslation('settings');
            menuItems[3].textContent = this.getTranslation('feedback');
            menuItems[4].textContent = this.getTranslation('exit');
        }
        
        // настройки
        const settingsTitle = document.querySelector('.settings-title');
        if (settingsTitle) {
            settingsTitle.textContent = this.getTranslation('settingsTitle');
        }
        
        const settingLabels = document.querySelectorAll('.setting-label');
        if (settingLabels.length >= 2) {
            settingLabels[0].textContent = this.getTranslation('languageLabel');
            settingLabels[1].textContent = this.getTranslation('volumeLabel');
        }
        
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.textContent = this.getTranslation('backButton');
        }
        
        // выбранный язык в настройках
        this.updateLanguageSelection();
        
        // кнопка "Назад в меню" в диалоге
        const backToMenuButton = document.getElementById('back-to-menu');
        if (backToMenuButton) {
            backToMenuButton.textContent = this.getTranslation('backToMenu');
        }
        
        // модальное окно выхода
        this.updateExitModal();
        
        // модальное окно отзыва
        this.updateFeedbackModal();

        // модальное окно сообщений
        this.updateMessageModal();
    }
    
    updateMessageModal() {
        const messageModalOk = document.getElementById('message-modal-ok');
        if (messageModalOk) {
            const okText = this.currentLanguage === 'ru' ? 'OK' : 
                        this.currentLanguage === 'es' ? 'Aceptar' : 'OK';
            messageModalOk.textContent = okText;
    }
}

    updateExitModal() {
        const exitModalTitle = document.getElementById('exit-modal-title');
        const exitModalMessage = document.getElementById('exit-modal-message');
        const exitConfirm = document.getElementById('exit-confirm');
        const exitCancel = document.getElementById('exit-cancel');
        
        if (exitModalTitle) {
            exitModalTitle.textContent = this.getTranslation('exitTitle');
        }
        if (exitModalMessage) {
            exitModalMessage.textContent = this.getTranslation('exitMessage');
        }
        if (exitConfirm) {
            exitConfirm.textContent = this.getTranslation('exitConfirm');
        }
        if (exitCancel) {
            exitCancel.textContent = this.getTranslation('exitCancel');
        }
    }
    
    updateFeedbackModal() {
        const feedbackModalTitle = document.getElementById('feedback-modal-title');
        const feedbackText = document.getElementById('feedback-text');
        const feedbackSubmit = document.getElementById('feedback-submit');
        const feedbackCancel = document.getElementById('feedback-cancel');
        
        if (feedbackModalTitle) {
            feedbackModalTitle.textContent = this.getTranslation('feedbackTitle');
        }
        if (feedbackText) {
            feedbackText.placeholder = this.getTranslation('feedbackPlaceholder');
        }
        if (feedbackSubmit) {
            feedbackSubmit.textContent = this.getTranslation('feedbackSubmit');
        }
        if (feedbackCancel) {
            feedbackCancel.textContent = this.getTranslation('feedbackCancel');
        }
    }
    
    updateLanguageSelection() {
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.classList.remove('selected');
            if (option.getAttribute('data-lang') === this.currentLanguage) {
            option.classList.add('selected');
        }
    });
}
    
    saveLanguage() {
        localStorage.setItem('siteLanguage', this.currentLanguage);
    }
    
    loadLanguage() {
        const savedLanguage = localStorage.getItem('siteLanguage');
        if (savedLanguage && this.translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
        }
    }
}
