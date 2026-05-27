const memeImage = document.getElementById('memeImage');
const memeTitle = document.getElementById('memeTitle');
const nextBtn = document.getElementById('nextBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loading = document.getElementById('loading');

// Multiple meme APIs to try
const MEME_APIS = [
    'https://api.imgflip.com/get_memes',
    'https://meme-api.com/gimme'
];

let currentMemeUrl = '';

// Fetch and display a random meme
async function loadMeme() {
    try {
        showLoading(true);
        nextBtn.disabled = true;
        downloadBtn.disabled = true;

        // Try imgflip API first
        try {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            
            if (data.success && data.data.memes.length > 0) {
                const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
                memeImage.src = randomMeme.url;
                currentMemeUrl = randomMeme.url;
                memeTitle.textContent = randomMeme.name || 'Random Meme';
                memeImage.style.opacity = '0';
                memeImage.onload = () => {
                    memeImage.style.transition = 'opacity 0.5s ease';
                    memeImage.style.opacity = '1';
                };
                return;
            }
        } catch (e) {
            console.log('imgflip API failed, trying fallback...');
        }

        // Fallback: Use meme-api.com
        try {
            const response = await fetch('https://meme-api.com/gimme');
            const data = await response.json();
            
            if (data.url) {
                memeImage.src = data.url;
                currentMemeUrl = data.url;
                memeTitle.textContent = data.title || 'Random Meme';
                memeImage.style.opacity = '0';
                memeImage.onload = () => {
                    memeImage.style.transition = 'opacity 0.5s ease';
                    memeImage.style.opacity = '1';
                };
                return;
            }
        } catch (e) {
            console.log('meme-api.com failed');
        }

        memeTitle.textContent = 'Error loading meme. Please try again!';
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
    if (!currentMemeUrl) return;

    const link = document.createElement('a');
    link.href = currentMemeUrl;
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