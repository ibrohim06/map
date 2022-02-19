const controller = document.querySelectorAll('.controller')

const ulLinks = document.querySelectorAll('.map__content-list .map__content-link')

const mapLinks = document.querySelectorAll('.uzbekistan-svg .map__content-link')

const li = document.querySelectorAll('.map__content-list .map__content-item')

const modal = document.querySelector('.modal')

const modalClose = document.querySelector('.modal__close')

const modalBox = document.querySelector('.modal__box')

const mapMenu = document.querySelector('.map__menu')
const mapContentInfo = document.querySelector('.map__content-info')

mapMenu.addEventListener('click', () => {
    mapContentInfo.classList.add('active__side')
})

modalClose.addEventListener('click', () => {
    modal.classList.remove('active__modal')
})

function fetchModal (id) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            modalBox.innerHTML = `
                <h2 class="modal__box-title"> Регион: ${data[id - 1 ].region} </h2>
                <div class="slider"> 
                    <div class="slider__line">
                        <img src="${data[id - 1].img}" alt="" class ="modal__box-img">
                        <img src="${data[id - 1].img2}" alt="" class ="modal__box-img"> 
                        <img src="${data[id - 1].img3}" alt="" class ="modal__box-img"> 
                    </div>
                </div>
                <p class="modal__box-text"> ${data[id - 1].info}  </p> 
            `

            const slider = document.querySelector('.slider')
            const sliderLine = document.querySelector('.slider__line')
            const img = document.querySelectorAll('.modal__box-img')

            let count = 0
            let width;
            let autoplay = true

            function init () {
                width = slider.offsetWidth
                sliderLine.style.width = width * img.length + 'px'
                img.forEach(item => {
                    item.style.width = width + 'px'
                    item.style.height = 'auto'
                })
                rollSlider()
            }
            init()

            function rollSlider () {
                sliderLine.style.transform = `translate(-${count * width}px)`
            }

            function autoPlayFunc () {
                if (autoplay) {
                     setTimeout(() => {
                         if (count === img.length - 1) {
                             count = 0
                        } else {
                            count++
                        }
                        rollSlider()
                        autoPlayFunc()
                             
                     },1500)
                }
            }
            autoPlayFunc()
        })
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

function removeActiveClose () {
    modalClose.forEach
}