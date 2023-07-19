const cphLoadingScreenComponent = {
  init() {
    console.log('splashed')
    const scene = this.el.sceneEl
    const gradient = document.getElementById('gradient')
    const poweredby = document.getElementById('poweredby')
    const dismissLoadScreen = () => {
      setTimeout(() => {
        setTimeout(() => {
         // poweredby.classList.add('fade-out')
          gradient.classList.add('fade-out')
        }, 2500)
        setTimeout(() => {
      //    poweredby.style.display = 'none'
          gradient.style.display = 'none'
        }, 3000)
      }, 3000)
    }
    scene.hasLoaded ? dismissLoadScreen() : scene.addEventListener('loaded', dismissLoadScreen)
  },
}
export {cphLoadingScreenComponent}
