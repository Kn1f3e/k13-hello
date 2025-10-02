document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        'Начнем?',
        'Shall we start?',
        '¿Empezamos?'
    ];

    const languageManager = new LanguageManager();
    const uiManager = new UIManager();
    uiManager.initialize();
    const typingElement = document.getElementById('typing-text');
    const typingEffect = new TypingEffect(typingElement, phrases);
    typingEffect.start();
    
    window.typingEffect = typingEffect;

    const titleTypingEffect = new TitleTypingEffect();
    titleTypingEffect.start();
    const audioPlayer = new AudioPlayer('assets/audio/Platina - Santa Claus (Intro).mp3');
    const dialogueManager = new DialogueManager(languageManager);
    const gameMenu = new GameMenu(languageManager, audioPlayer, dialogueManager);

    typingElement.addEventListener('click', () => {
        if (!uiManager.isStarted) {
            typingEffect.stop();
            audioPlayer.play();
            uiManager.showContent();
            languageManager.updateUI();
        }
    });
});
