const memeImage = document.getElementById('memeImage');
const memeTitle = document.getElementById('memeTitle');
const nextBtn = document.getElementById('nextBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loading = document.getElementById('loading');

let currentMemeUrl = '';

// Array of meme templates with image URLs
const memeTemplates = [
    { url: 'https://i.imgflip.com/1bij.jpg', name: 'Drake Hotline Bling' },
    { url: 'https://i.imgflip.com/30b1gx.jpg', name: 'Mocking SpongeBob' },
    { url: 'https://i.imgflip.com/1g8my4.jpg', name: 'Girl Interrupting' },
    { url: 'https://i.imgflip.com/gk5w9.jpg', name: 'Success Kid' },
    { url: 'https://i.imgflip.com/1uryjm.jpg', name: 'Distracted Boyfriend' },
    { url: 'https://i.imgflip.com/2r1sai.jpg', name: 'Woman Yelling At Cat' },
    { url: 'https://i.imgflip.com/52a6u0.jpg', name: 'Panik Kalm Panik' },
    { url: 'https://i.imgflip.com/56deui.jpg', name: 'Stonks' },
    { url: 'https://i.imgflip.com/1e7ql7.jpg', name: 'This Is Fine' },
    { url: 'https://i.imgflip.com/7awy6o.jpg', name: 'Monday Motivation' },
    { url: 'https://i.imgflip.com/6jlc5j.jpg', name: 'Elden Ring' },
    { url: 'https://i.imgflip.com/6q7f37.jpg', name: 'Minecraft' },
    { url: 'https://i.imgflip.com/4t0m97.jpg', name: 'Blank Template' },
    { url: 'https://i.imgflip.com/261o3j.jpg', name: 'Ancient Aliens' },
    { url: 'https://i.imgflip.com/1zsv7u.jpg', name: 'Two Buttons' }
];

// Fetch and display a random meme
async function loadMeme() {
    try {
        showLoading(true);
        nextBtn.disabled = true;
        downloadBtn.disabled = true;

        // Try Live Meme API first
        try {
            const response = await fetch('https://api.livememe.com/generate');
            const data = await response.json();
            
            if (data && data.direct_url) {
                memeImage.src = data.direct_url;
                currentMemeUrl = data.direct_url;
                memeTitle.textContent = data.name || 'Random Meme';
                displayMeme();
                return;
            }
        } catch (e) {
            console.log('Live Meme API failed, trying fallback...');
        }

        // Fallback: Use local meme templates
        const randomMeme = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
        memeImage.src = randomMeme.url;
        currentMemeUrl = randomMeme.url;
        memeTitle.textContent = randomMeme.name;
        displayMeme();
        
    } catch (error) {
        console.error('Error fetching meme:', error);
        memeTitle.textContent = 'Error loading meme. Please try again!';
        showLoading(false);
        nextBtn.disabled = false;
        downloadBtn.disabled = false;
    }
}

// Display meme with animation
function displayMeme() {
    memeImage.style.opacity = '0';
    memeImage.onload = () => {
        memeImage.style.transition = 'opacity 0.5s ease';
        memeImage.style.opacity = '1';
        showLoading(false);
        nextBtn.disabled = false;
        downloadBtn.disabled = false;
    };
    
    memeImage.onerror = () => {
        console.error('Failed to load image');
        memeTitle.textContent = 'Could not load meme image. Try another!';
        showLoading(false);
        nextBtn.disabled = false;
        downloadBtn.disabled = false;
    };
    
    // Timeout fallback if image takes too long
    setTimeout(() => {
        if (memeImage.style.opacity === '0') {
            showLoading(false);
            nextBtn.disabled = false;
            downloadBtn.disabled = false;
        }
    }, 5000);
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
    if (!currentMemeUrl) {
        alert('No meme loaded yet!');
        return;
    }

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

// Load initial meme when page loads
window.addEventListener('load', () => {
    setTimeout(loadMeme, 500);
});