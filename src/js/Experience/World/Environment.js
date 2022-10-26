import Experience from "../Experience";

export default class Environment {
    constructor(three) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.three = three

        this.setSunLight()
    }

    setSunLight() {
        //let light = new this.three.AmbientLight(0xffffff, .35);
        //this.scene.add(light)

        let directionalLightBack = new this.three.DirectionalLight(new this.three.Color('hsl(0, 0%, 100%)'), 0.75);
        directionalLightBack.position.set(30, 100, 100);
        this.scene.add(directionalLightBack);

        let directionalLightFront = new this.three.DirectionalLight(new this.three.Color('hsl(0, 0%, 100%)'), 1);
        directionalLightFront.position.set(-30, 100, -100);
        directionalLightFront.castShadow = true;
        directionalLightFront.shadow.camera.far = 15
        directionalLightFront.shadow.mapSize.set(1024, 1024)
        directionalLightFront.shadow.normalBias = 0.05
        directionalLightFront.position.set(3.5, 2, -1.25)
        this.scene.add(directionalLightFront);
    }
}