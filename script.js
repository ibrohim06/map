const controller = document.querySelectorAll('.controller')

const ulLinks = document.querySelectorAll('.map__content-list .map__content-link')

const mapLinks = document.querySelectorAll('.uzbekistan-svg .map__content-link')

const li = document.querySelectorAll('.map__content-list .map__content-item')

const modal = document.querySelector('.modal')

const modalClose = document.querySelector('.modal__close')

const modalBox = document.querySelector('.modal__box')

function fetchModal (id) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => console.log(data))
}



ulLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        let self  = e.currentTarget
        let selfHref = self.getAttribute('href')
        let currentElement = document.querySelector(`.uzbekistan-svg .map__content-link[href="${selfHref}"]`)
        let currentPath = currentElement.querySelectorAll('.controller')

        for (let item of li) {
            item.addEventListener('mouseenter', () => {
                removeActiveLi()
                item.classList.add('active-link')
            })
        }
        
        if(currentElement) {
            currentPath.forEach(item => {
                removeActivePath()
                item.classList.add('active')
            })
        }
        
    }) 
});

mapLinks.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        let self = e.currentTarget
        let selfHref = self.getAttribute('href')
        let currentElement = document.querySelector(`.map__content-list .map__content-link[href="${selfHref}"]`)
        let currentPath = self.querySelectorAll('.controller')

        if (currentPath) {
            currentPath.forEach(item => {
                removeActivePath()
                item.classList.add('active')
            })
        }

        removeActiveLi()

        currentElement.parentElement.classList.add('active-link')
    })

    el.addEventListener('click', (e) => {
        e.preventDefault()
        let self = e.currentTarget
        let selfHref = self.getAttribute('href')
        let currentElement = document.querySelector(`.map__content-list a[href="${selfHref}"]`)
        let id = parseInt(currentElement.dataset.id)

        fetchModal(id) 

        modal.classList.add('active__modal')
    })
})


function removeActiveLi () {
    li.forEach(item => {
        item.classList.remove('active-link')
        
    })
    
}
function removeActivePath () {
    controller.forEach(item => {
        item.classList.remove('active')
        
    })
    
}
