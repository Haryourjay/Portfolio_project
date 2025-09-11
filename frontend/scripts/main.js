// Toggle light/dark theme
const themeToggle = document.getElementById('themeToggle')
themeToggle.addEventListener('click', () => {
    const emojis = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';


    for(let i=0; i<emojis.length; i++) {
        setTimeout(()=> {
            themeToggle.innerHTML = emojis[i]
        }, i * 30)
    }

    if (isDark) {
        const halfEmojis = ['🌗', '🌘', '🌑', '🌒', '🌓', '🌔']
        for(let i=0; i<halfEmojis.length; i++) {
            setTimeout(()=> {
                themeToggle.innerHTML = halfEmojis[i]
            }, (emojis.length + i) * 25)
        }

        setTimeout(()=> {
                themeToggle.innerHTML = '🌕'
            }, (emojis.length + halfEmojis.length) * 25)
    } else {

        setTimeout(()=> {
            themeToggle.innerHTML = '🌑'
        }, emojis.length * 30)
    }
    

    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
});