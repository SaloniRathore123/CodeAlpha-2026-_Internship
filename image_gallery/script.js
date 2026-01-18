let currentIndex = 0;
const images = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "block";
    updateLightbox();
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function changeImage(n) {
    currentIndex += n;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    updateLightbox();
}

function updateLightbox() {
    lightboxImg.src = images[currentIndex].src;
}

window.onclick = function(event) {
    if (event.target == lightbox) {
        closeLightbox();
    }
}

function filterSelection(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}