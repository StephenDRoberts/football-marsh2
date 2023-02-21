import * as THREE from 'three';
import Experience from '../Experience';
import EventEmitter from '../Utils/EventEmitter';

export default class Pitch extends EventEmitter {
  constructor(pitchCoordinates) {
    super()
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.sizes = this.experience.sizes

    this.debug = this.experience.debug

    this.pitchCoordinates = pitchCoordinates.pitch
    this.group = new THREE.Object3D()

    this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setMesh(this.pitchCoordinates)

    // this.scene.add(this.group)
  }

  setGeometry(){
    this.geometry = new THREE.BoxGeometry(
      this.sizes.pitchWidth,
      this.sizes.pitchLength,
      this.sizes.pitchDepth
    )
  }
  setTextures(){
    this.textures = {}
    this.textures.pitch = this.resources.items.pitchTexture
    console.log(this.textures.pitch)
    this.textures.pitch.encoding = THREE.sRGBEncoding

    this.textures.dirtColor = this.resources.items.dirtColorTexture
    this.textures.dirtColor.encoding = THREE.sRGBEncoding
    this.textures.dirtColor.repeat.set(1.5,1.5)
    this.textures.dirtColor.wrapS = THREE.RepeatWrapping
    this.textures.dirtColor.wrapT = THREE.RepeatWrapping

    this.textures.dirtNormal = this.resources.items.dirtNormalTexture
    this.textures.dirtNormal.repeat.set(1.5,1.5)
    this.textures.dirtNormal.wrapS = THREE.RepeatWrapping
    this.textures.dirtNormal.wrapT = THREE.RepeatWrapping
  }

  setMaterial(){
    const pitchMaterial = new THREE.MeshStandardMaterial({ map: this.textures.pitch })
    const dirtMaterial = new THREE.MeshStandardMaterial({ map: this.textures.dirtColor, normalMap: this.textures.dirtNormal })

    this.material = [
      dirtMaterial,
      dirtMaterial,
      dirtMaterial,
      dirtMaterial,
      pitchMaterial,
      dirtMaterial
    ]
    // this.material = new THREE.MeshBasicMaterial({wireframe: true})
  }

  setMesh(){
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = - Math.PI * 0.5
    this.mesh.position.x = this.pitchCoordinates.pitchX
    this.mesh.position.y = this.pitchCoordinates.pitchY
    this.mesh.position.z = this.pitchCoordinates.pitchZ
    this.mesh.receiveShadow = true
    // this.scene.add(this.mesh)
    // this.group.add(this.mesh)
  }
}