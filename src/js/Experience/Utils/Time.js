import EventEmitter from "./EventEmitter";
import Stats from 'stats.js'

export default class Time extends EventEmitter {
    constructor (mindar) {
        super()

        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        this.renderer = mindar.renderer
        this.scene = mindar.scene
        this.camera = mindar.camera
        //this.stat = new Stats()
        //this.stat.showPanel(1)
        //document.body.appendChild(this.stat.dom)

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        // this.stat.start()
        const currTime = Date.now()
        this.delta = currTime - this.current
        this.current = currTime
        this.elapsed = this.current - this.start

        this.trigger('tick', this.delta)

        this.renderer.render(this.scene, this.camera);
        // this.stat.end()
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}