const media = [
    {   
        id: 1, 
        name: "TOUCHDOWN", 
        artist: "Messiah x Myke Towers", 
        img: "MessiahMikeTouchDownPic.jpg", 
        file: "Messiah, Myke Towers - TOUCHDOWN (Video Oficial).mp4",
        type: "video"
    },
    {   
        id: 2, 
        name: "Officer Ricky", 
        artist: "50 Cent ", 
        img: "50centPic.jpg", 
        file: "50 Cent - Officer Ricky.mp3", 
        type: "audio"
    },
    {   
        id: 3, 
        name: "Amantes & Amigos", 
        artist: "Arcángel x Sech", 
        img: "arcangelsechpicc.jpg", 
        file: "Arcángel, Sech - Amantes & Amigos (Video Oficial).mp4", 
        type: "video"
    },
    {   
        id: 4, 
        name: "Shampoo de Coco", 
        artist: "Anuel AA", 
        img: "anuelshampooPic11.jpg", 
        file: "Anuel AA - Shampoo de Coco (Video Oficial).mp4", 
        type: "video"
    },
    {   
        id: 5, 
        name: "Curiana", 
        artist: "El Poeta x Carlos Coins", 
        img: "PoetaCarlosCurianaPic.jpg", 
        file: "El Poeta, @CarlosCoins - Curiana.mp3", 
        type: "audio"
    },
    {   
        id: 6, 
        name: "Curiana", 
        artist: "El Poeta x Carlos Coins", 
        img: "PoetaCarlosCurianaPic.jpg", 
        file: "El Poeta, @CarlosCoins - Curiana.mp3", 
        type: "audio"
    },
    {   
        id: 7, 
        name: "Na Conmigo", 
        artist: "Lapiz Conciente", 
        img: "LapizNaConmigoPic.jpg", 
        file: "Lapiz Conciente - Na Conmigo.mp3", 
        type: "audio"
    },
    {   
        id: 8, 
        name: "Cielo Eterno", 
        artist: "Jasiel Nuñez", 
        img: "JASIELNUPICCC.jpg", 
        file: "cielo-eterno-jasiel-nunez-dannyluxMP33.mp3", 
        type: "audio"
    },
    {   
        id: 9, 
        name: "Lost The Love", 
        artist: "BigXthaPlug", 
        img: "BigXLawOrderPic.jpg", 
        file: "BigXthaPlug - Lost The Love.mp3", 
        type: "audio"
    },
    {   
        id: 10, 
        name: "Law & Order", 
        artist: "BigXthaPlug", 
        img: "BigxLastPic.jpg", 
        file: "BigXthaPlug - Law & Order.mp3", 
        type: "audio"
    },
];

const searchInput = document.getElementById("search-input");
const mediaList = document.getElementById("media-list");
const mediaPlayer = document.getElementById("media-player");
const mediaSource = document.getElementById("media-source");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const randomButton = document.getElementById("random-button");
const playPauseButton = document.getElementById("play-pause-button");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
const muteButton = document.getElementById("mute-button");

let isPlaying = false;
let currentMediaId = null;
let isMuted = false;

function renderMedia(filteredMedia = media) {
    mediaList.innerHTML = "";

    filteredMedia.forEach(item => {
        const mediaItem = document.createElement("div");
        mediaItem.classList.add("media-item");
        mediaItem.dataset.mediaId = item.id;
        mediaItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <span>${item.name} - ${item.artist}</span>
            <button class="play-button"><i class="fas fa-play"></i></button>
        `;
        const playButton = mediaItem.querySelector(".play-button");
        playButton.addEventListener("click", () => {
            playOrPauseMedia(item, playButton);
        });

        mediaList.appendChild(mediaItem);
    });
}

function playOrPauseMedia(item, button) {
    if (isPlaying && currentMediaId === item.id) {
        mediaPlayer.pause();
        button.querySelector("i").classList.replace("fa-pause", "fa-play");
        playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
        isPlaying = false;
    } else {
        mediaSource.src = item.file;
        mediaSource.dataset.mediaId = item.id;

        if (item.type === "audio") {
            mediaPlayer.load();
            mediaPlayer.play();
        } else if (item.type === "video") {
            mediaPlayer.load();
            mediaPlayer.play();
        }

        button.querySelector("i").classList.replace("fa-play", "fa-pause");
        playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
        isPlaying = true;
        currentMediaId = item.id;
    }
}

mediaPlayer.addEventListener("ended", function() {
    const currentMediaIndex = media.findIndex(item => item.id === parseInt(mediaSource.dataset.mediaId));
    const nextMediaIndex = (currentMediaIndex + 1) % media.length;
    playOrPauseMedia(media[nextMediaIndex], document.querySelector(`[data-media-id="${media[nextMediaIndex].id}"] .play-button`));
});

function playNextMedia() {
    const currentMediaIndex = media.findIndex(item => item.id === parseInt(mediaSource.dataset.mediaId));
    const nextMediaIndex = (currentMediaIndex + 1) % media.length;
    playOrPauseMedia(media[nextMediaIndex], document.querySelector(`[data-media-id="${media[nextMediaIndex].id}"] .play-button`));
}

function playPrevMedia() {
    const currentMediaIndex = media.findIndex(item => item.id === parseInt(mediaSource.dataset.mediaId));
    const prevMediaIndex = (currentMediaIndex - 1 + media.length) % media.length;
    playOrPauseMedia(media[prevMediaIndex], document.querySelector(`[data-media-id="${media[prevMediaIndex].id}"] .play-button`));
}

function playRandomMedia() {
    const randomIndex = Math.floor(Math.random() * media.length);
    playOrPauseMedia(media[randomIndex], document.querySelector(`[data-media-id="${media[randomIndex].id}"] .play-button`));
}

prevButton.addEventListener("click", playPrevMedia);
nextButton.addEventListener("click", playNextMedia);
randomButton.addEventListener("click", playRandomMedia);

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        mediaPlayer.pause();
        playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
        isPlaying = false;
    } else {
        if (currentMediaId === null) {
            playOrPauseMedia(media[0], document.querySelector(`[data-media-id="${media[0].id}"] .play-button`));
        } else {
            mediaPlayer.play();
            playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
            isPlaying = true;
        }
    }
});

mediaPlayer.addEventListener("timeupdate", () => {
    if (mediaPlayer.duration) {
        const progress = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
        progressBar.value = progress;
    }
});

progressBar.addEventListener("click", (event) => {
    const seekTime = (event.offsetX / progressBar.offsetWidth) * mediaPlayer.duration;
    mediaPlayer.currentTime = seekTime;
});

volumeSlider.addEventListener("input", (event) => {
    mediaPlayer.volume = event.target.value;
});

muteButton.addEventListener("click", () => {
    if (isMuted) {
        mediaPlayer.muted = false;
        volumeSlider.value = mediaPlayer.volume;
        muteButton.querySelector("i").classList.replace("fa-volume-mute", "fa-volume-up");
    } else {
        mediaPlayer.muted = true;
        muteButton.querySelector("i").classList.replace("fa-volume-up", "fa-volume-mute");
    }
    isMuted = !isMuted;
});

mediaPlayer.addEventListener("play", () => {
    playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
    isPlaying = true;
});

mediaPlayer.addEventListener("pause", () => {
    playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
    isPlaying = false;
});

renderMedia();

// Search functionality
searchInput.addEventListener("input", function() {
    const searchQuery = searchInput.value.toLowerCase();

    const filteredMedia = media.filter(item =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.artist.toLowerCase().includes(searchQuery)
    );

    renderMedia(filteredMedia);
});

// Voice Search Functionality (same as original)

const voiceSearchButton = document.getElementById("voice-search-button");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;

    voiceSearchButton.addEventListener("click", () => {
        recognition.start();
    });

    recognition.addEventListener("result", (event) => {
        let transcript = event.results[0][0].transcript.toLowerCase();
        transcript = transcript.replace(/\.$/, "");
       
        searchInput.value = transcript;

        const filteredMedia = media.filter(item =>
            item.name.toLowerCase().includes(transcript) ||
            item.artist.toLowerCase().includes(transcript)
        );

        renderMedia(filteredMedia);
    });

    recognition.addEventListener("error", (event) => {
        console.error("Speech recognition error:", event.error);
    });

    recognition.addEventListener("end", () => {
        console.log("Voice search ended");
    });
} else {
    console.error("Sorry, your browser does not support voice recognition");
}

function toggleClassPlayer() {
    const body = document.querySelector('body');
    body.classList.toggle('lightPlayer');
}

const myButton = document.getElementById("HideShow-Btn");
const myImg = document.getElementById("media-player");

myButton.addEventListener("click", event => {
   if (myImg.style.display === "none"){
    myImg.style.display = "block";
    myButton.textContent ="Hide Screen";
   }
   else{
        myImg.style.display = "none";
        myButton.textContent = "Show Screen";
   }   
});
