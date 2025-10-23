async function fetchTime() {
    const resultDiv = document.getElementById('timeResult');
    resultDiv.textContent = 'Loading...';
    
    try {
        const response = await fetch('/api/time');
        const data = await response.json();
        
        // Show cache headers
        const cacheControl = response.headers.get('cache-control');
        const cfCacheStatus = response.headers.get('x-cache');
        
        resultDiv.textContent = JSON.stringify({
            ...data,
            headers: {
                'cache-control': cacheControl,
                'x-cache': cfCacheStatus || 'N/A (direct to origin)'
            }
        }, null, 2);
    } catch (error) {
        resultDiv.textContent = 'Error: ' + error.message;
    }
}

async function fetchUser() {
    const userId = document.getElementById('userId').value;
    const resultDiv = document.getElementById('userResult');
    resultDiv.textContent = 'Loading...';
    
    try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        
        // Show cache headers
        const cacheControl = response.headers.get('cache-control');
        const cfCacheStatus = response.headers.get('x-cache');
        
        resultDiv.textContent = JSON.stringify({
            ...data,
            headers: {
                'cache-control': cacheControl,
                'x-cache': cfCacheStatus || 'N/A (direct to origin)'
            }
        }, null, 2);
    } catch (error) {
        resultDiv.textContent = 'Error: ' + error.message;
    }
}
