// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        'Начнем?',
        'Shall we start?',
        '¿Empezamos?'
    ];

    // Инициализация менеджера языка
    const languageManager = new LanguageManager();

    // Инициализация менеджера UI
    const uiManager = new UIManager();
    uiManager.initialize();

    // Инициализация эффекта печати для основного текста
    const typingElement = document.getElementById('typing-text');
    const typingEffect = new TypingEffect(typingElement, phrases);
    typingEffect.start();

    // Сохраняем ссылку на typingEffect в глобальной области для доступа из других модулей
    window.typingEffect = typingEffect;

    // Инициализация эффекта печати для заголовка вкладки с фиксированными фразами
    const titleTypingEffect = new TitleTypingEffect();
    titleTypingEffect.start();

    // Инициализация аудиоплеера
    const audioPlayer = new AudioPlayer('assets/audio/Platina - Santa Claus (Intro).mp3');

    // Инициализация менеджера диалогов
    const dialogueManager = new DialogueManager(languageManager);

    // Инициализация игрового меню
    const gameMenu = new GameMenu(languageManager, audioPlayer, dialogueManager);

    // Обработчик клика по тексту
    typingElement.addEventListener('click', () => {
        if (!uiManager.isStarted) {
            // Остановка анимации печати основного текста
            typingEffect.stop();
            
            // Запуск музыки
            audioPlayer.play();
            
            // Показ контента
            uiManager.showContent();
            
            // Обновляем UI на выбранном языке
            languageManager.updateUI();
        }
    });
});