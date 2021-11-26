import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    /**
     * Constructor
     */
    constructor()
    {
        super()

        // Viewport size
        this.viewport = {}
        this.$sizeViewport = document.createElement('div')
        this.$sizeViewport.style.width = '100vw'
        this.$sizeViewport.style.height = '100vh'
        this.$sizeViewport.style.position = 'absolute'
        this.$sizeViewport.style.top = 0
        this.$sizeViewport.style.left = 0
        this.$sizeViewport.style.pointerEvents = 'none'

        // Resize event
        this.resize = this.resize.bind(this)
        window.addEventListener('resize', this.resize)

        this.resize()

        // PITCH SIZE CONSTANTS

        // pitch2.jpg texture - pitch size = 735 x 1100 px, total size = 851 x 1304px
        // convert to rough metres = 73.5 x 110, 85.1 x 130.4
        this.pitchLength = 130.4
        this.pitchWidth = 85.1
        this.pitchDepth = 2
        this.goalpostHeight = 2.44
        this.goalpostThickness = 0.1
        this.goalpostWidth = 7.32
        this.pitchTextureGoalLineOffset = (130.4 - 110) / 2 - 0.5
        this.awayGoalBump = 0.5
        this.logoSize = 10
        this.hoardingsSize = 3
    }

    /**
     * Resize
     */
    resize()
    {
        document.body.appendChild(this.$sizeViewport)
        this.viewport.width = this.$sizeViewport.offsetWidth
        this.viewport.height = this.$sizeViewport.offsetHeight
        document.body.removeChild(this.$sizeViewport)

        this.width = window.innerWidth
        this.height = window.innerHeight

        this.trigger('resize')
    }
}
