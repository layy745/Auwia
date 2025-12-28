
function toggleMembers(id) {
    const el = document.getElementById(id);
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function toggleSettings() {
    const s = document.getElementById('settings');
    s.style.display = s.style.display === 'block' ? 'none' : 'block';
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('fanMessages')) || [];
    const list = document.getElementById('messageList');
    list.innerHTML = '';

    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'message-item';
        div.innerHTML = `<strong>${msg.name}:</strong> ${msg.text}`;
        list.appendChild(div);
    });
}

document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const messages = JSON.parse(localStorage.getItem('fanMessages')) || [];
    messages.push({ name, text: message });
    localStorage.setItem('fanMessages', JSON.stringify(messages));

    document.getElementById('confirmation').style.display = 'block';
    loadMessages();
    this.reset();

    setTimeout(() => {
        document.getElementById('confirmation').style.display = 'none';
    }, 2000);
});

document.getElementById('darkModeToggle').addEventListener('change', () => {
    document.body.classList.toggle('dark');
});

// JavaScript untuk Lightbox
let currentIndex = 0;
const images = document.querySelectorAll('.photos img');
const modal = document.getElementById('lightboxModal');
const modalImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Fungsi untuk membuka modal dengan gambar tertentu
function openModal(index) {
    currentIndex = index;
    modalImg.src = images[currentIndex].src;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10); // Trigger animasi setelah display
}

// Fungsi untuk menutup modal
function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 500); // Tunggu animasi selesai
}

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    sections.forEach(section => observer.observe(section));
    

// Fungsi untuk navigasi ke gambar sebelumnya
function prevImage() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    modalImg.src = images[currentIndex].src;
}

// Fungsi untuk navigasi ke gambar berikutnya
function nextImage() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    modalImg.src = images[currentIndex].src;
}

// Event listener untuk klik gambar
images.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

// Event listener untuk tombol close
closeBtn.addEventListener('click', closeModal);

// Event listener untuk tombol prev dan next
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Tutup modal jika klik di luar gambar
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Navigasi dengan keyboard (opsional)
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') closeModal();
    }
});

function toggleSettings() {
    const settings = document.getElementById('settings');
    if (settings.style.display === 'block') {
        settings.style.display = 'none';
    } else {
        settings.style.display = 'block';
    }
}

document.getElementById('temaBiru').addEventListener('click', function() {
  document.body.className = 'tema-biru';
});

document.getElementById('temaHijau').addEventListener('click', function() {
  document.body.className = 'tema-hijau';
});

document.querySelectorAll('.share-button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const social = this.dataset.social;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    let shareUrl = '';
    window.open(shareUrl, '_blank');
  });
});

// Untuk tutup dengan klik di luar menu (opsional), bisa ditambahkan event listener document.body


window.onload = loadMessages;
