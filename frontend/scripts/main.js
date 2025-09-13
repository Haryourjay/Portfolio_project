// Toggle light/dark theme
const themeToggle = document.getElementById('themeToggle')
const jobTitle = document.getElementById('jobTitle')

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

if (jobTitle) {
    const jobList = 'EDITOR'

    setInterval(() => {
        jobTitle.innerHTML = ''
        for(let i = 0; i < jobList.length; i++) {
            setTimeout(() => {
                jobTitle.innerHTML += jobList[i]
            }, i * 200)
        
        }

        // jobTitle.innerHTML = jobList

        // setTimeout(() => {
        //     jobTitle.innerHTML = jobList
        // }, jobList.length * 500)


            
    }, jobList.length * 500)
    
    
}