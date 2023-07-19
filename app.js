console.log('app.js exec')

import {cphLoadingScreenComponent} from '/components/splash-screen.js'
AFRAME.registerComponent('main-load-screen', cphLoadingScreenComponent)

import {imageTargetComponent, handleUI} from '/components/components.js'
AFRAME.registerComponent('image-target-comp', imageTargetComponent())
AFRAME.registerComponent('handle-ui', handleUI)
