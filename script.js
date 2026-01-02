// ============================
// TOGGLE MEMBERS & SETTINGS
// ============================
function toggleMembers(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
  }
}

function toggleSettings() {
  const settings = document.getElementById('settings');
  if (settings) {
    settings.style.display = settings.style.display === 'block' ? 'none' : 'block';
  }
}

// ============================
// PESAN FANS (LOCAL STORAGE)
// ============================
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('fanMessages')) || [];
  const list = document.getElementById('messageList');
  if (!list) return;

  list.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message-item';
    div.innerHTML = `<strong>${msg.name}:</strong> ${msg.text}`;
    list.appendChild(div);
  });
}

const form = document.getElementById('messageForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const messages = JSON.parse(localStorage.getItem('fanMessages')) || [];
    messages.push({ name, text: message });
    localStorage.setItem('fanMessages', JSON.stringify(messages));

    const confirm = document.getElementById('confirmation');
    if (confirm) confirm.style.display = 'block';

    loadMessages();
    this.reset();

    setTimeout(() => {
      if (confirm) confirm.style.display = 'none';
    }, 2000);
  });
}

// ============================
// DARK MODE
// ============================
const darkToggle = document.getElementById('darkModeToggle');
if (darkToggle) {
  darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
  });
}

// ============================
// LIGHTBOX GALERI
// ============================
let currentIndex = 0;
const images = document.querySelectorAll('.photos img');
const modal = document.getElementById('lightboxModal');
const modalImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function openModal(index) {
  if (!modal || !modalImg) return;
  currentIndex = index;
  modalImg.src = images[currentIndex].src;
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

function prevImage() {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  modalImg.src = images[currentIndex].src;
}

function nextImage() {
  currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  modalImg.src = images[currentIndex].src;
}

images.forEach((img, index) => {
  img.addEventListener('click', () => openModal(index));
});

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (prevBtn) prevBtn.addEventListener('click', prevImage);
if (nextBtn) nextBtn.addEventListener('click', nextImage);

if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener('keydown', e => {
  if (modal && modal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeModal();
  }
});

// ============================
// ANIMASI SECTION (SCROLL)
// ============================
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
sections.forEach(sec => observer.observe(sec));

// ============================
// SHARE BUTTON
// ============================
document.querySelectorAll('.share-button').forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    const social = button.dataset.social;
    const url = encodeURIComponent(location.href);
    const text = encodeURIComponent(document.title);

    let shareUrl = '';
    if (social === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    } else if (social === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
    }

    if (shareUrl) window.open(shareUrl, '_blank');
  });
});

// ============================
window.onload = loadMessages;
