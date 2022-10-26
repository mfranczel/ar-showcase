export class RayCaster {
    constructor(three, scene, camera) {

        this.three = three
        this.scene = scene
        this.camera = camera

        this.raycaster = new three.Raycaster()
        this.mouse = new three.Vector2()
        document.getElementById('container').addEventListener('click', this.onClick, false);
    }

    onClick( event ) {

        event.preventDefault();
    
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
        this.raycaster.setFromCamera( this.mouse, this.camera );
    
        let intersects = this.raycaster.intersectObjects( this.scene.children, true );
    
        if ( intersects.length > 0 ) {
    
            if (intersects.length > 2 && intersects[2].object.name === "web") {
                window.open("https://www.erstedigital.com/en/home", "_blank")
            }
    
            if (intersects.length > 2 && intersects[2].object.name === "linkedin") {
                window.open("https://sk.linkedin.com/company/erstedigital", "_blank")
            }

            if (intersects[0].object.name === "Curve") {
                window.open("https://www.erstedigital.com/en/home", "_blank")
            }
    
        }
    
    }
}