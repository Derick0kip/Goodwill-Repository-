const memeImage = document.getElementById('memeImage');
const memeTitle = document.getElementById('memeTitle');
const nextBtn = document.getElementById('nextBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loading = document.getElementById('loading');

const API_URL = 'https://api.api-ninjas.com/v1/meme';

// Fetch and display a random meme
async function loadMeme() {
    try {
        showLoading(true);
        nextBtn.disabled = true;
        downloadBtn.disabled = true;

        const response = await fetch(API_URL);
        const data = await response.json();

        if (data && data.image) {
            memeImage.src = data.image;
            memeTitle.textContent = data.text || 'Random Meme';
            memeImage.style.opacity = '0';
            memeImage.onload = () => {
                memeImage.style.transition = 'opacity 0.5s ease';
                memeImage.style.opacity = '1';
            };
        } else {
            memeTitle.textContent = 'Error loading meme. Try again!';
        }
    } catch (error) {
        console.error('Error fetching meme:', error);
        memeTitle.textContent = 'Failed to load meme. Please try again!';
    } finally {
        showLoading(false);
        nextBtn.disabled = false;
        downloadBtn.disabled = false;
    }
}

// Show/hide loading state
function showLoading(isLoading) {
    if (isLoading) {
        loading.classList.add('active');
    } else {
        loading.classList.remove('active');
    }
}

// Download meme
function downloadMeme() {
    if (!memeImage.src) return;

    const link = document.createElement('a');
    link.href = memeImage.src;
    link.download = 'meme.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listeners
nextBtn.addEventListener('click', loadMeme);
downloadBtn.addEventListener('click', downloadMeme);

// Load initial meme
window.addEventListener('load', loadMeme);