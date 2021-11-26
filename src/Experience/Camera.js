import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import EventEmitter from './Utils/EventEmitter';

export default class Camera extends EventEmitter
{
    constructor(_options)
    {
        super()
        // Options
        this.experience = new Experience()
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.targetElement = this.experience.targetElement
        this.scene = this.experience.scene

        // Set up
        // this.mode = 'debug' // defaultCamera \ debugCamera
        this.zOffset = 0
        this.speed = 0

        this.setInstance()
        this.setControls()
        // this.setModes()

        // Scroll event
        window.addEventListener('wheel', (event) => {
            if(!event.shiftKey) {
                event.preventDefault()
                this.speed += event.deltaY * 0.05
            }

            this.trigger('wheel')
        }, {passive: false})
    }

    setInstance()
    {
        // Set up
        this.instance = new THREE.PerspectiveCamera(40, this.config.width / this.config.height, 0.1, 2000)
        // this.instance.rotation.reorder('YXZ')
        this.instance.position.set(-130, 130, 215)

        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.targetElement)
        this.controls.enabled = true
        this.controls.screenSpacePanning = true
        this.controls.enableKeys = false
        // this.modes.debug.orbitControls.zoomSpeed = 0.25
        this.controls.enableZoom = false
        this.controls.autoRotate = false
        this.controls.enableDamping = true
        this.controls.update()
    }

    // setModes()
    // {
    //     this.modes = {}
    //
    //     // Default
    //     this.modes.default = {}
    //     this.modes.default.instance = this.instance.clone()
    //     // this.modes.default.instance.rotation.reorder('YXZ')
    //
    //     // Debug
    //     this.modes.debug = {}
    //     this.modes.debug.instance = this.instance.clone()
    //     this.modes.debug.instance.rotation.reorder('YXZ')
    //     // this.modes.debug.instance.position.set(5, 5, 5)
    //
    //     this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
    //     this.modes.debug.orbitControls.enabled = this.modes.debug.active
    //     this.modes.debug.orbitControls.screenSpacePanning = true
    //     this.modes.debug.orbitControls.enableKeys = false
    //     // this.modes.debug.orbitControls.zoomSpeed = 0.25
    //     this.modes.debug.orbitControls.enableZoom = false
    //     this.modes.debug.orbitControls.autoRotate = false
    //     this.modes.debug.orbitControls.enableDamping = true
    //     this.modes.debug.orbitControls.update()
    // }


    resize()
    {
        this.instance.aspect = this.config.width / this.config.height
        this.instance.updateProjectionMatrix()

        this.modes.default.instance.aspect = this.config.width / this.config.height
        this.modes.default.instance.updateProjectionMatrix()

        this.modes.debug.instance.aspect = this.config.width / this.config.height
        this.modes.debug.instance.updateProjectionMatrix()
    }

    update()
    {
        // Update debug orbit controls
        this.controls.update()

        // Apply coordinates
        // this.instance.position.copy(this.modes[this.mode].instance.position)
        // this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
        this.instance.updateMatrixWorld() // To be used in projection

        this.zOffset += this.speed
        this.speed *= 0.9
        const newPosition = new THREE.Vector3(0,0, this.controls.target.z - this.speed)
        this.controls.target = newPosition
        this.instance.position.z -= this.speed
        this.instance.lookAt(newPosition)

        this.controls.update()
    }

    destroy()
    {
        this.controls.destroy()
    }
}
