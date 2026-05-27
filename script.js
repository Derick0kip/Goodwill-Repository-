const memeImage = document.getElementById('memeImage');
const memeTitle = document.getElementById('memeTitle');
const nextBtn = document.getElementById('nextBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loading = document.getElementById('loading');

let currentMemeUrl = '';

// High-quality meme images that are guaranteed to work
const memeDatabase = [
    { url: 'https://i.imgflip.com/1bij.jpg', name: 'Drake Hotline Bling' },
    { url: 'https://i.imgflip.com/30b1gx.jpg', name: 'Mocking SpongeBob' },
    { url: 'https://i.imgflip.com/1g8my4.jpg', name: 'Girl Interrupting' },
    { url: 'https://i.imgflip.com/gk5w9.jpg', name: 'Success Kid' },
    { url: 'https://i.imgflip.com/1uryjm.jpg', name: 'Distracted Boyfriend' },
    { url: 'https://i.imgflip.com/2r1sai.jpg', name: 'Woman Yelling At Cat' },
    { url: 'https://i.imgflip.com/52a6u0.jpg', name: 'Panik Kalm Panik' },
    { url: 'https://i.imgflip.com/56deui.jpg', name: 'Stonks' },
    { url: 'https://i.imgflip.com/1e7ql7.jpg', name: 'This Is Fine' },
    { url: 'https://i.imgflip.com/261o3j.jpg', name: 'Ancient Aliens' },
    { url: 'https://i.imgflip.com/1zsv7u.jpg', name: 'Two Buttons' },
    { url: 'https://i.imgflip.com/4t0m97.jpg', name: 'Me and the Boys' },
    { url: 'https://i.imgflip.com/53irv.jpg', name: 'Laughing Tom Cruise' },
    { url: 'https://i.imgflip.com/2ep866.jpg', name: 'Blank Nut Button' },
    { url: 'https://i.imgflip.com/m7ytz.jpg', name: 'Futurama Fry' },
    { url: 'https://i.imgflip.com/3pnmg.jpg', name: 'Bad Luck Brian' },
    { url: 'https://i.imgflip.com/inbgo.jpg', name: 'First World Problems' },
    { url: 'https://i.imgflip.com/9ehk.jpg', name: 'Derp Meme' },
    { url: 'https://i.imgflip.com/5rzp.jpg', name: 'Hide the Pain Harold' },
    { url: 'https://i.imgflip.com/362cog.jpg', name: 'Butterfly Meme' }
];

let currentIndex = 0;

// Load and display a random meme
function loadMeme() {
    try {
        showLoading(true);
        nextBtn.disabled = true;
        downloadBtn.disabled = true;

        // Pick a random meme from the database
        currentIndex = Math.floor(Math.random() * memeDatabase.length);
        const selectedMeme = memeDatabase[currentIndex];
        
        // Set the image source
        memeImage.src = selectedMeme.url;
        currentMemeUrl = selectedMeme.url;
        memeTitle.textContent = selectedMeme.name;
        
        // Fade in animation
        memeImage.style.opacity = '0';
        memeImage.onload = () => {
            memeImage.style.transition = 'opacity 0.5s ease';
            memeImage.style.opacity = '1';
            showLoading(false);
            nextBtn.disabled = false;
            downloadBtn.disabled = false;
        };
        
        // Error handling
        memeImage.onerror = () => {
            console.error('Image failed to load');
            memeTitle.textContent = 'Could not load image. Try another!';
            showLoading(false);
            nextBtn.disabled = false;
            downloadBtn.disabled = false;
        };
        
        // Timeout in case image doesn't load
        setTimeout(() => {
            if (memeImage.style.opacity === '0') {
                showLoading(false);
                nextBtn.disabled = false;
                downloadBtn.disabled = false;
            }
        }, 3000);
        
    } catch (error) {
        console.error('Error loading meme:', error);
        memeTitle.textContent = 'Error loading meme. Try again!';
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
    if (!currentMemeUrl) {
        alert('No meme loaded yet!');
        return;
    }

    const link = document.createElement('a');
    link.href = currentMemeUrl;
    link.download = `meme-${currentIndex}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listeners
nextBtn.addEventListener('click', loadMeme);
downloadBtn.addEventListener('click', downloadMeme);

// Load initial meme when page loads
window.addEventListener('load', () => {
    setTimeout(loadMeme, 300);
});