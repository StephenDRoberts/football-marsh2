import * as THREE from 'three'
import Experience from '../Experience';

export default class Hoardings {
  constructor(coordinates) {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.resources = this.experience.resources

    this.coordinates = coordinates.hoardings

    this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setMesh(this.coordinates)
  }

  setGeometry(){
    this.geometry = new THREE.CylinderGeometry(
      this.sizes.hoardingsSize,
      this.sizes.hoardingsSize,
      this.sizes.pitchLength - 10,
      3,
      4
    )
  }

  setTextures(){
    this.textures = {}
    this.textures.hoarding = this.resources.items.sbgTexture
    this.textures.hoarding.encoding = THREE.sRGBEncoding
    this.textures.hoarding.repeat.set(3,4)
    this.textures.hoarding.wrapS = THREE.RepeatWrapping
    this.textures.hoarding.wrapT = THREE.RepeatWrapping
  }

  setMaterial(){
    const hoardingMaterial = new THREE.MeshStandardMaterial({
      map: this.textures.hoarding,
    })

    this.material = [
      hoardingMaterial,
    ]
  }

  setMesh(){
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = - Math.PI * 0.5
    this.mesh.position.x = this.coordinates.x
    this.mesh.position.y = this.coordinates.y
    this.mesh.position.z = this.coordinates.z

    this.scene.add(this.mesh)
  }
}