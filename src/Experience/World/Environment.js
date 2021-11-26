import * as THREE from 'three';
import Experience from '../Experience';

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setSunlight()
    this.setHorizonFog()
    // this.setEnvironmentMap()
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight('#fdfbd3', 3)
    this.sunlight.castShadow = true
    this.sunlight.shadow.camera.far = 15
    this.sunlight.shadow.mapSize.set(1024, 1024)
    this.sunlight.shadow.normalBias = 0.05
    this.sunlight.position.set(3, 3, -2.25)
    this.scene.add(this.sunlight)
  }

  setHorizonFog() {
    // this.fog = new THREE.Fog('#161616', 100, 1000)
    this.fog = new THREE.Fog('#ffffff', 100, 1500)
    this.scene.fog = this.fog
  }

  // setEnvironmentMap(){
  //   this.environmentMap = {}
  //   this.environmentMap.intensity = 0.4
  //   this.environmentMap.texture = this.resources.items.environmentMapTexture
  //   this.environmentMap.texture.encoding = THREE.sRGBEncoding
  //
  //   this.scene.environment = this.environmentMap.texture
  //
  //   this.environmentMap.updateMaterial = () => {
  //     this.scene.traverse((child) => {
  //       if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
  //         child.material.envMap = this.environmentMap.texture
  //         child.material.envMapIntensity = this.environmentMap.intensity
  //         child.material.needsUpdate = true
  //       }
  //     })
  //   }
  //
  //   this.environmentMap.updateMaterial()
  // }
}