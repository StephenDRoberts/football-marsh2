import * as THREE from 'three'
import Experience from '../Experience.js'
import Pitch from './Pitch';
import Environment from './Environment';
import Hoardings from './Hoardings';

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.group = new THREE.Object3D()

        this.objectsToIntersect = []
        console.log('base')



        this.resources.on('groupEnd', (_group) =>
        {
            const basePitch = new Pitch(this.generateCoordinates(0,0))
            for(let i = 0; i < 100; i++) {
                const column = i % 5
                const row = Math.trunc(i / 5)
                const coordinates = this.generateCoordinates(row, column)
                // const pitch = basePitch.clone()
                // this.objectsToIntersect.push(pitch)
                // this.group.add(pitch.mesh)
                // this.scene.add(this.objectsToIntersect)

                // if(column === 0) {
                //     new Hoardings(coordinates)
                // }
                //
                // if(column === 4) {
                //     new Hoardings(this.generateCoordinates(row, 5))
                // }
            }
            this.scene.add(this.group)
            this.setupBaseFloor()

            // apply environment afterwards so effects like shadows can be applied.
            this.environment = new Environment()
        })
    }

    resize()
    {
    }

    update()
    {
    }

    destroy()
    {
    }

    generateCoordinates(row, column){
        const coordinates = {pitch: { row, column }, hoardings: {}}
        coordinates.pitch.pitchX = this.sizes.pitchWidth * (column - 2)
        coordinates.pitch.pitchY = this.sizes.pitchDepth / 2
        coordinates.pitch.pitchZ = this.sizes.pitchLength * (- row)

        coordinates.hoardings.x = this.sizes.pitchWidth * (column - 2)  - this.sizes.pitchWidth / 2
        coordinates.hoardings.y = this.sizes.pitchDepth + this.sizes.hoardingsSize / 2
        coordinates.hoardings.z = this.sizes.pitchLength * (- row)
        // + this.sizes.pitchLength / 2

        // coordinates.goalpost.goalpostLeftX = this.sizes.goalpostWidth / 2 + (this.sizes.pitchWidth * (column -1))
        // coordinates.goalpost.goalpostLeftY = (this.sizes.pitchDepth) + (this.sizes.goalpostHeight / 2)
        // coordinates.goalpost.goalpostLeftZ =
        //   ((this.sizes.pitchLength / 2) - (this.sizes.goalpostThickness) - this.sizes.pitchTextureGoalLineOffset) - (row * this.sizes.pitchLength)
        //
        // coordinates.goalpost.goalpostRightX = - (this.sizes.goalpostWidth / 2) + (this.sizes.pitchWidth * (column -1))
        // coordinates.goalpost.goalpostRightY = (this.sizes.pitchDepth) + (this.sizes.goalpostHeight / 2)
        // coordinates.goalpost.goalpostRightZ =
        //   ((this.sizes.pitchLength / 2) - (this.sizes.goalpostThickness) - this.sizes.pitchTextureGoalLineOffset) - (row * this.sizes.pitchLength)
        //
        // coordinates.goalpost.crossbarX = (this.sizes.pitchWidth * (column - 1))
        // coordinates.goalpost.crossbarY = this.sizes.pitchDepth + this.sizes.goalpostHeight
        // coordinates.goalpost.crossbarZ =
        //   ((this.sizes.pitchLength / 2) - (this.sizes.goalpostThickness) - this.sizes.pitchTextureGoalLineOffset) - (row * this.sizes.pitchLength)

        // coordinates.goalpost.crossbarAway =
        //   - ((this.sizes.pitchLength / 2) - (this.sizes.goalpostThickness) - this.sizes.pitchTextureGoalLineOffset - this.sizes)  - (row * this.sizes.pitchLength)

        return coordinates
    }

    setupBaseFloor(){
        const floorGeometry = new THREE.BoxGeometry(10000, 10000, 2)
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: '#193800'
        })
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = - Math.PI * 0.5
        this.scene.add(floor)
    }

    calculateIntersectionObject(){
        console.log(this.objectsToIntersect)
    }
}