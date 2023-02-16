import * as THREE from 'three';

export class RayCaster {
    constructor(three, scene, camera) {

        this.three = three
        this.scene = scene
        this.camera = camera

        this.raycaster = new three.Raycaster()
        this.mouse = new three.Vector2()

        let el = document.getElementById('container')

        document.addEventListener('touchend', event => this.onClickTouch(event), false);
        document.addEventListener('pointerdown', event => this.onClick(event), false);
        document.addEventListener('touchmove', event => {
            if (event.changedTouches[0].pageY < 0) {
                event.preventDefault();
                document.dispatchEvent(new Event('touchend'));
            }
        }, false);
    }

    onClick( event ) {

        event.stopPropagation();
        event.preventDefault();
        
    
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
        this.raycaster.setFromCamera( this.mouse, this.camera );
    
        let intersects = this.raycaster.intersectObjects( this.scene.children, true );
    
        if ( intersects.length > 0 ) {
            for (let i = 0; i < intersects.length; i++) {
                if (intersects[i].object.name === "web") {
                    window.open("https://www.erstedigital.com/en/home")
                } else if (intersects[i].object.name === "linkedin") {
                    window.open("https://sk.linkedin.com/company/erstedigital")
                } else if (intersects[i].object.name === "Curve") {
                    window.open("https://www.erstedigital.com/en/home")
                }
            }
    
        }
    
    }

    onClickTouch( event ) {

       //event.stopPropagation();
        event.preventDefault();
    
        this.mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
    
        this.raycaster.setFromCamera( this.mouse, this.camera );
    
        let intersects = this.raycaster.intersectObjects( this.scene.children, true );
    
        if ( intersects.length > 0 ) {

            for (let i = 0; i < intersects.length; i++) {
                if (intersects[i].object.name === "web") {
                    setTimeout(() => {
                        document.getElementById("btnClickWeb").click()
                    })
                } else if (intersects[i].object.name === "linkedin") {
                    setTimeout(() => {
                        document.getElementById("btnClickLin").click()
                    })
                } else if (intersects[i].object.name === "Curve") {
                    setTimeout(() => {
                        window.open("https://www.erstedigital.com/en/home", '_blank');
                    })
                }
            }
    
        }
    
    }
}