import Resources from "./Utils/Resources"
import Time from "./Utils/Time"
import sources from "./sources"
import World from "./World/World"
import { RayCaster } from "./World/RayCaster"

let instance = null

export default class Experience {
    constructor(mindar, three, anchorNames, flat=false) {
        window.experience = this

        if (instance) {
            return instance
        }

        instance = this

        this.mindar = mindar
        this.three = three
        this.renderer = mindar.renderer
        this.scene = mindar.scene
        this.resources = new Resources(sources, three)
        this.camera = mindar.camera
        this.time = new Time(mindar)
        this.anchorNames = anchorNames
        this.setupAnchors()
        this.world = new World(flat)
        this.raycaster = new RayCaster(three, this.scene, this.camera)
        this.mixer = undefined

        this.renderer.gammaOutput = true;

        // event
        this.time.on('tick', (deltaTime) => {
            this.update(deltaTime)
        })
    }

    update(deltaTime) {
        if (this.mixer) {
            this.mixer.update(deltaTime)

        }
    }

    setupAnchors() {
        this.anchors = {}
        this.anchorNames.forEach((anchorName, index) => {
            this.anchors[anchorName] = this.mindar.addAnchor(index)
        })
    }
}