class AudioPlayer {
    constructor(trackPath, volume = 0.5) {
        this.audio = new Audio(trackPath);
        this.audio.loop = true;
        this.audio.volume = volume;
        this.isPlaying = false;
    }

    play() {
        this.audio.play().catch(e => {
            console.log('Автовоспроизведение заблокировано:', e);
        });
        this.isPlaying = true;
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
    }

    setVolume(volume) {
        this.audio.volume = volume;
    }

    getVolume() {
        return this.audio.volume;
    }
}
