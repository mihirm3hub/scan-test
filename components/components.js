let start = false
const handleUI = {
    init() {
        console.log('compo')
        const inst = document.getElementById('instImg')
        const mail = document.querySelector('#instUI span a')

        const subBtn = document.getElementById('subBtn')
        const getCode = document.getElementById('getCodeBtn')
        const copyBtn = document.getElementById('copyBtn')
        const redeemBtn = document.getElementById('redeemBtn')

        function isNumeric(str) {
            if (typeof str !== 'string') return false  // we only process strings!
            return !isNaN(str) &&  // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str))  // ...and ensure strings of whitespace fail
        }

        inst.addEventListener('click', () => {
            start = true
            document.getElementById('instUI').classList.remove('fade-in')
            document.getElementById('instUI').classList.add('fade-out')
            setTimeout(() => {
                document.getElementById('scnUI').classList.add('fade-in')
                // document.getElementById('detScreen').style.display = 'block'
                // document.getElementById('detScreen').classList.add('fade-in')
            }, 300)
        })
        mail.addEventListener('click', () => {
            console.log('mail clicked')
        })

        const codeChecker = () => {
            getCode.removeEventListener('click', codeChecker)
            const code = document.getElementById('authCode').value
            // console.log(code, code.length)
            const randomNumber = Math.random()
            const checkCode = isNumeric(code)
            if (checkCode && code.toString().length === 4) {
                console.log('proceed to end screen')
                document.getElementById('detScreen').classList.remove('fade-in')
                document.getElementById('detScreen').classList.add('fade-out')
                setTimeout(() => {
                    document.getElementById('detScreen').style.display = 'none'
                    document.getElementById('endScreen').style.display = 'block'
                    document.getElementById('endScreen').classList.add('fade-in')
                }, 800)
            } else {
                console.log('stay on same screen')
            }
        }

        subBtn.addEventListener('click', () => {
            const randomNumber = Math.random()
            if (randomNumber < 0.5) {
                document.getElementById('stats').innerText = 'Entry successful, here is your code'
                getCode.addEventListener('click', codeChecker)
            } else {
                // 50% chance of showing a 'you lose' message
                document.getElementById('stats').innerText = 'Sorry, that mobile number has already been entered!'
            }
        })

        copyBtn.addEventListener('click', () => {
            const code = document.querySelector('#codeHolder span')
            const codeTxt = code.innerText
            console.log(codeTxt)
            navigator.clipboard.writeText(codeTxt).then(() => {
                // Alert the user that the action took place.
                // Nobody likes hidden stuff being done under the hood!
                code.innerHTML = 'CODE COPIED'
                setTimeout(() => {
                    code.innerHTML = codeTxt
                }, 500)
            })
        })

        redeemBtn.addEventListener('click', () => {
            console.log('redeem clicked')
        })
    },
}

const imageTargetComponent = () => ({
    schema: {
        name: {type: 'string'},
    },
    init() {
        const {object3D} = this.el
        const {name} = this.data
        object3D.visible = false

        const instruction = document.getElementById('instruction')
        const scanning = document.getElementById('scanning')
        const verified = document.getElementById('verified')
        const logo = document.getElementById('scnUI')
        const claimPrize = document.getElementById('claimPrize')

        let scan = false
        let verifiedStatus = false
        let timeScan

        const showImage = ({detail}) => {
            if (name !== detail.name) {
                return
            }
            console.log('img vis')
            object3D.position.copy(detail.position)
            object3D.quaternion.copy(detail.rotation)
            object3D.scale.set(detail.scale, detail.scale, detail.scale)
            object3D.visible = true

            if (!start) return

            if (detail.name === 'gsDraughtStout' || detail.name === 'gsDraught') {
                if (!scan) {
                    scan = true
                    logo.style.display = 'none'
                    scanning.style.display = 'flex'
                    timeScan = setTimeout(() => {
                        verifiedStatus = true
                        scanning.style.display = 'none'
                        verified.style.display = 'flex'
                        setTimeout(() => {
                            document.getElementById('detScreen').style.display = 'block'
                            document.getElementById('detScreen').classList.add('fade-in')
                            document.getElementById('overlay').style.display = 'block'
                            document.getElementById('overlay').classList.add('fade-in')
                        }, 1200)
                    }, 2000)
                }
            }
        }
        const imageFound = (e) => {
            showImage(e)
        }
        const imageLost = ({detail}) => {
            if (!start) return
            if (detail.name === 'gsDraughtStout' || detail.name === 'gsDraught') {
                if (!verifiedStatus) {
                    scan = false
                    clearTimeout(timeScan)
                    logo.style.display = 'flex'
                    scanning.style.display = 'none'
                } else {
                    object3D.visible = false
                }
            }
        }
        this.el.sceneEl.addEventListener('xrimagefound', imageFound)
        this.el.sceneEl.addEventListener('xrimageupdated', showImage)
        this.el.sceneEl.addEventListener('xrimagelost', imageLost)
    },
})
export {imageTargetComponent, handleUI}
