// Shared data
const notes = {
  sad: "Hey love, I'm here. Even on the heavy days. Breathe. You’re stronger than this moment, and I’m a text away.",
  attention: "Look at me: I adore you. You have my full attention now and always.",
  sleep: "When sleep feels far away, remember you have me, always.",
  miss: "Missing you is proof I’m lucky. Lucky to have someone this hard to be away from."
};

const compliments = [
  "Your cheeks were handcrafted by angels.",
  "Your smile? My peace.",
  "The world slows down when you talk.",
  "You make ordinary days feel like fireworks.",
  "You’re my favorite coincidence.",
  "If softness had a face, it would look like you."
];

// Messages page
const noteButtons = document.querySelectorAll('.card');
if (noteButtons.length) {
  const modal = document.getElementById('note-modal');
  const content = document.getElementById('note-content');
  const closeBtn = document.getElementById('close-modal');
  const backdrop = document.querySelector('.modal-backdrop');
  
  noteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.note;
      content.textContent = notes[key] || '';
      modal.hidden = false;
      setTimeout(() => modal.classList.add('show'), 10);
    });
  });
  
  const closeModal = () => {
    modal.classList.remove('show');
    setTimeout(() => modal.hidden = true, 300);
  };
  
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
}

// Story page (timeline modal)
const storyItems = document.querySelectorAll('.timeline .tl-item');
if (storyItems.length) {
  const storyModal = document.getElementById('story-modal');
  const storyContent = document.getElementById('story-content');
  const storyCloseBtn = document.getElementById('close-story-modal');
  const storyBackdrop = document.querySelector('#story-modal .modal-backdrop');

  const openStoryModal = (text) => {
    if (!storyModal || !storyContent) return;
    storyContent.textContent = text || '';
    storyModal.hidden = false;
    setTimeout(() => storyModal.classList.add('show'), 10);
  };

  const closeStoryModal = () => {
    if (!storyModal) return;
    storyModal.classList.remove('show');
    setTimeout(() => storyModal.hidden = true, 300);
  };

  storyItems.forEach(item => {
    // Ensure basic accessibility even if attributes missing in HTML
    if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');
    if (!item.hasAttribute('role')) item.setAttribute('role', 'button');

    const getItemContent = () => item.dataset.content || item.querySelector('p')?.innerText || '';

    item.addEventListener('click', () => openStoryModal(getItemContent()));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openStoryModal(getItemContent());
      }
    });
  });

  storyCloseBtn?.addEventListener('click', closeStoryModal);
  storyBackdrop?.addEventListener('click', closeStoryModal);
}

// Compliments page
const compBtn = document.getElementById('compliment-btn');
if (compBtn) {
  const compText = document.querySelector('#compliments .compliment');
  compBtn.addEventListener('click', () => {
    const pick = compliments[Math.floor(Math.random() * compliments.length)];
    if (compText) compText.textContent = pick;
  });
}

// Personalized page
const unlockBtn = document.getElementById('unlock');
if (unlockBtn) {
  unlockBtn.addEventListener('click', () => {
    const pass = document.getElementById('pass');
    const secret = document.querySelector('.secret');
    const nickname = (pass?.value || '').trim().toLowerCase();
    const allowed = ['radha']; // replace with your nickname(s)
    if (!nickname) { alert('Please enter your nickname'); return; }
    if (!allowed.includes(nickname)) { alert('Not quite. Try the nickname you gave me.'); return; }
    if (secret) secret.hidden = false;
  });
}

// Easter egg page
const heart = document.querySelector('.heart');
if (heart) {
  const noteModal = document.getElementById('note-modal');
  const noteContent = document.getElementById('note-content');
  const noteCloseBtn = document.getElementById('close-note-modal');
  const noteBackdrop = document.querySelector('#note-modal .modal-backdrop');

  const openNoteModal = () => {
    if (!noteModal || !noteContent) return;
    noteContent.textContent = "Hidden letter: I love you in ways that are quiet and constant, like sunrise.";
    noteModal.hidden = false;
    setTimeout(() => noteModal.classList.add('show'), 10);
  };

  const closeNoteModal = () => {
    if (!noteModal) return;
    noteModal.classList.remove('show');
    setTimeout(() => noteModal.hidden = true, 300);
  };

  heart.addEventListener('click', openNoteModal);
  noteCloseBtn?.addEventListener('click', closeNoteModal);
  noteBackdrop?.addEventListener('click', closeNoteModal);
}

// Final page
const kissBtn = document.getElementById('kiss');
if (kissBtn) {
  const kissAnim = document.querySelector('.kiss-anim');
  kissBtn.addEventListener('click', () => {
    if (!kissAnim) return;
    kissAnim.hidden = false;
    kissAnim.classList.remove('pop');
    void kissAnim.offsetWidth; // restart animation
    kissAnim.classList.add('pop');
    setTimeout(() => kissAnim.hidden = true, 1200);
  });
}

// Carousel - infinite loop with auto-swipe and drag
const initCarousel = () => {
const carousel = document.querySelector('.carousel');
if (carousel) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let lastX = 0;
  let lastTime = 0;
  let autoSwipeInterval;
  let isLooping = false;
  const autoSwipeDelay = 5000; // 5 seconds
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  let numSlides = slides.length; // detect dynamically
  const computeSlideWidth = () => {
    const gap = parseFloat(getComputedStyle(track).gap || '0');
    const width = (slides[0]?.clientWidth || 600) + gap;
    return width;
  };
  let slideWidth = computeSlideWidth();
  window.addEventListener('resize', () => { slideWidth = computeSlideWidth(); });
  
  const startAutoSwipe = () => {
    clearInterval(autoSwipeInterval);
    autoSwipeInterval = setInterval(() => {
      if (!isDown && !isLooping) {
        carousel.scrollBy({
          left: slideWidth,
          behavior: 'smooth'
        });
      }
    }, autoSwipeDelay);
  };
  
  const stopAutoSwipe = () => {
    clearInterval(autoSwipeInterval);
  };
  
  const handleInfiniteScroll = () => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const slideWidthPx = slideWidth;
    
    // Loop forward (right) - when reaching the duplicate first slide
    if (carousel.scrollLeft >= maxScroll - 100) {
      isLooping = true;
      carousel.scrollLeft = 0;
      setTimeout(() => {
        isLooping = false;
      }, 100);
    }
    
    // Loop backward (left) - when going before the start
    if (carousel.scrollLeft <= 0 && !isLooping) {
      isLooping = true;
      carousel.scrollLeft = slideWidthPx * (numSlides - 1);
      setTimeout(() => {
        isLooping = false;
      }, 100);
    }
  };
  
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    lastX = e.pageX;
    lastTime = Date.now();
    velocity = 0;
    stopAutoSwipe();
  });
  
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.style.cursor = 'grab';
    applyMomentum();
    setTimeout(startAutoSwipe, 300);
  });
  
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.style.cursor = 'grab';
    applyMomentum();
    setTimeout(startAutoSwipe, 300);
  });
  
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
    
    const now = Date.now();
    const dx = e.pageX - lastX;
    const dt = now - lastTime;
    if (dt > 0) {
      velocity = dx / dt;
    }
    lastX = e.pageX;
    lastTime = now;
  });
  
  const applyMomentum = () => {
    if (Math.abs(velocity) > 0.05) {
      let momentum = velocity * 80;
      carousel.scrollLeft -= momentum;
    }
    handleInfiniteScroll();
  };
  
  carousel.addEventListener('scroll', () => {
    if (!isDown) {
      handleInfiniteScroll();
    }
  });
  
  carousel.style.cursor = 'grab';
  startAutoSwipe();
}
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}

// Audio Player Controls
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressFill = document.getElementById('progressFill');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

if (audio && playPauseBtn) {
  // Format time helper
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Play/Pause toggle
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = '⏸';
      playPauseBtn.classList.add('playing');
    } else {
      audio.pause();
      playPauseBtn.textContent = '▶';
      playPauseBtn.classList.remove('playing');
    }
  });

  // Update progress bar and time
  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = progress + '%';
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  });

  // Load duration
  audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
  });

  // Seek functionality
  const progressBar = document.querySelector('.progress-bar');
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  });

  // Mute/Unmute
  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? '🔇' : '🔊';
    volumeSlider.value = audio.muted ? 0 : audio.volume * 100;
  });

  // Volume control
  volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
    audio.muted = false;
    muteBtn.textContent = audio.volume === 0 ? '🔇' : '🔊';
  });

  // Reset button when audio ends
  audio.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶';
    playPauseBtn.classList.remove('playing');
    progressFill.style.width = '0%';
  });
}

// Cursor confetti + heart trail (lighter to reduce lag)
const trailEmojis = ['💕','💖','✨','💫','🎊','🎉'];
let lastTrailTime = 0;
window.addEventListener('pointermove', (e) => {
  const now = Date.now();
  if (now - lastTrailTime < 140) return; // stronger throttle to cut CPU usage
  if (Math.random() < 0.7) return; // higher skip rate to reduce particle count
  lastTrailTime = now;
  const particle = document.createElement('span');
  particle.className = 'cursor-particle';
  particle.textContent = trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
  particle.style.left = `${e.clientX}px`;
  particle.style.top = `${e.clientY}px`;
  particle.style.fontSize = `${14 + Math.random() * 6}px`;
  particle.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 30 - 15}deg)`;
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 900);
});
