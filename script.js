const memeImage = document.getElementById('memeImage');
const memeTitle = document.getElementById('memeTitle');
const nextBtn = document.getElementById('nextBtn');
const downloadBtn = document.getElementById('downloadBtn');
const loading = document.getElementById('loading');

let currentMemeUrl = '';

// Fetch random memes from Reddit
async function loadMeme() {
    try {
        showLoading(true);
        nextBtn.disabled = true;
        downloadBtn.disabled = true;

        // Fetch from Reddit meme subreddits
        const subreddits = ['memes', 'funny', 'wholesomememes'];
        const randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
        
        const response = await fetch(`https://www.reddit.com/r/${randomSubreddit}/random/.json`);
        const data = await response.json();
        
        if (data && data[0] && data[0].data && data[0].data.children.length > 0) {
            const post = data[0].data.children[0].data;
            
            if (post.url && (post.url.includes('.jpg') || post.url.includes('.png') || post.url.includes('.gif'))) {
                memeImage.src = post.url;
                currentMemeUrl = post.url;
                memeTitle.textContent = post.title || 'Random Meme';
                
                memeImage.style.opacity = '0';
                memeImage.onload = () => {
                    memeImage.style.transition = 'opacity 0.5s ease';
                    memeImage.style.opacity = '1';
                };
                memeImage.onerror = () => {
                    memeTitle.textContent = 'Could not load image. Try another meme!';
                    showLoading(false);
                    nextBtn.disabled = false;
                    downloadBtn.disabled = false;
                };
                return;
            }
        }
        
        memeTitle.textContent = 'Could not load meme. Try again!';
        showLoading(false);
        nextBtn.disabled = false;
        downloadBtn.disabled = false;
        
    } catch (error) {
        console.error('Error fetching meme:', error);
        memeTitle.textContent = 'Error loading meme. Please try again!';
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