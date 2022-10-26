import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

export default class Resources extends EventEmitter {
    constructor(sources, three) {
        super()

        this.sources = sources
        this.three = three

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new this.three.TextureLoader()
        this.loaders.fontLoader = new FontLoader()
    }

    startLoading() {
        this.sources.forEach(source => {
            if (source.type === "gltf") {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => this.sourceLoaded(source, file)
                )
            } else if (source.type === "texture") {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => this.sourceLoaded(source, file)
                )
            } else if (source.type === "font") {
                this.loaders.fontLoader.load(
                    source.path,
                    (file) => this.sourceLoaded(source, file),
                )
            }
        })
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++
        if (this.loaded == this.toLoad) {
            this.trigger("ready")
        }
    }
}