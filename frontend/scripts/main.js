const swiper = new Swiper('.first.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    //   slidesPerView: 1,
    autoplay: {
        delay: 5000,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.first.swiper .swiper-button-next',
        prevEl: '.first.swiper .swiper-button-prev',
    },

});

const swiper2 = new Swiper('.second.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // slidesPerView: 1,
    // slidesPerGroup: 1,
    // spaceBetween: 10,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination2',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.second.swiper .swiper-button-next',
        prevEl: '.second.swiper .swiper-button-prev',
    },

    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 30
        }
    }

});

// CV Download
document.addEventListener("DOMContentLoaded", () => {
    const CVBtn = document.getElementById('cvBtn')
    const CVBtn2 = document.getElementById('cvBtn2')
    const contactForm = document.getElementById('contactForm');

    if (CVBtn) {
        CVBtn.addEventListener('click', downloadCV)
    }
    
    if (CVBtn2) {
        CVBtn2.addEventListener('click', downloadCV)
    }

    if (contactForm) {
        contactForm.addEventListener('submit', processContact)
    }

})

function downloadCV(e) {
    e.preventDefault()
    const cvURL = "https://drive.google.com/uc?export=download&id=1R5gLqHjiHzskSiyfiTO4X5-Eg4CuvGGs";

    const linkElem = document.createElement('a')
    linkElem.href = cvURL
    linkElem.download = 'ogbaro_ayotunde.pdf'
    document.body.appendChild(linkElem);
    linkElem.click()
    document.body.removeChild(linkElem);
}


// contact
function processContact() {
    const [isValid, data] = validateContactFormData()

    if (isValid) {
        sendContactToServer(data)
    }
}

function validateContactFormData() {
    const nameInput = document.getElementById('nameInput')
    const emailInput = document.getElementById('emailInput')
    const subjectInput = document.getElementById('subjectInput')
    const messageInput = document.getElementById('messageInput')

    const errors = []
    let nameIsValid = true
    let emailIsValid = true
    let subjectIsValid = true
    let messageIsValid = true

    // validate name
    if (nameInput.value === '' || nameInput.value === null || nameInput.value === undefined) {
        errors.push('Name is required')
        nameIsValid = false
    } else if (nameInput.value.length <= 2) {
        errors.push('Name need to be greater than 2 character')
        nameIsValid = false
    }

    if(!isNaN(nameInput.value)) {
        errors.push('Name cannot be number')
        nameIsValid = false
    }

    // validate email
    const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailInput.value === '' || emailInput.value === null || emailInput.value === undefined) {
        errors.push('Email is required')
        emailIsValid = false
    } else if (!REGEX.test(emailInput.value)) {
        errors.push('Email is not a valid email')
        emailIsValid = false
    }

    // validate subject
    if (subjectInput.value === '' || subjectInput.value === null || subjectInput.value === undefined) {
        errors.push('Subject is required')
        subjectIsValid = false
    } else if (subjectInput.value.length <= 2) {
        errors.push('Subject need to be greater than 2 character')
        subjectIsValid = false
    }

    // validate subject
    if (messageInput.value === '' || messageInput.value === null || messageInput.value === undefined) {
        errors.push('Message is required')
        messageIsValid = false
    } else if (messageInput.value.length <= 2) {
        errors.push('Message need to be greater than 2 character')
        messageIsValid = false
    }

    if (!nameIsValid || !emailIsValid || !subjectIsValid || !messageIsValid) {
        showMessage('error', errors)
        return [false, {}]
    }

    const data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
    }

    return [true, data]

}

function showMessage(type, data) {
    const errorDiv = document.getElementById('errorDiv')
    const errorList = document.getElementById('errorList')

    let messageList = ''

    data.forEach(d => {
        messageList += `<li>${d}</li>`
    });

    errorList.innerHTML = messageList

    if (type === 'error') {
        errorDiv.style.backgroundColor = '#ffabab'
        errorDiv.style.color = 'red'
        errorDiv.style.border = '2px solid red'
    } else {
        errorDiv.style.backgroundColor = '#c6f8c6'
        errorDiv.style.color = 'green'
        errorDiv.style.border = '2px solid green'
    }

    errorDiv.style.display = 'block'

    setTimeout(() => {
        errorList.innerHTML = ''
        errorDiv.style.display = 'none'

    }, 5000)

}

function clearInput() {
    document.getElementById('nameInput').value = ''
    document.getElementById('emailInput').value = ''
    document.getElementById('subjectInput').value = ''
    document.getElementById('messageInput').value = ''
}

async function sendContactToServer(data) {
    try {
        const resp = await fetch('/contact/me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (resp.ok) {
            showMessage('success', ['Message sent successfully'])
        } else {
            let messages = ''
            const respData = await resp.json()
            showMessage('error', [respData.message ? respData.message : 'Message not sent'])
        }
    } catch (error) {
        showMessage('error', ['An error occured'])
        console.error(error)
    }
}


