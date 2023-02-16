import Experience from "../Experience";
import texts from "../texts"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Environment from "./Environment";

export default class World {
    constructor(flat=false) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.anchors = this.experience.anchors
        this.three = window.MINDAR.IMAGE.THREE;
        this.flat = flat;


        this.resources.on("ready", () => {
            // this.setupTextures()
            this.setupMaterials()
            this.setupTexts()
            this.setupOther()
            this.setupModels()
        })

        this.environment = new Environment(this.three)
    }

    setupTexts() {
        texts.forEach(text => {
            if (text.anchor) {
                const font = this.resources.items['font']
                const textGeometry = new TextGeometry( 
                    text['content'], 
                    {
                        font: font,
                        size: text['size'],
                        height: 5,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: 10,
                        bevelSize: 8,
                        bevelOffset: 0,
                        bevelSegments: 5
                    } 
                );
                const material = this.materials[text['material']]
                const textMesh = new this.three.Mesh( textGeometry, material)
                
                if (!this.flat) {
                    textMesh.position.set(text['position'][0], text['position'][1], text['position'][2])
                } else {
                    textMesh.position.set(text['position'][0], text['position'][2], text['position'][1])
                }
                textMesh.scale.set(text['scale'][0], text['scale'][1], text['scale'][2])
                if (!this.flat) {
                    textMesh.rotation.set(text['rotation'][0], text['rotation'][1], text['rotation'][2])
                } else {
                    textMesh.rotation.set(text['rotation'][0] - Math.PI/2, text['rotation'][1], text['rotation'][2])
                }
                
                if (this.anchors[text.anchor]) {
                    this.anchors[text.anchor].group.add(textMesh)
                } 
            }
        })
    }

    setupOther() {
        let arrowHelper, arrowHelperSuccess, arrowHelperFail, decGeometry, dec;
        const stickerGeometry = new this.three.CircleGeometry( .1, 32 );
        const linkedInGeometry = new this.three.CircleGeometry( .15, 32 );
        const webGeometry = new this.three.CircleGeometry( .13, 32 );

        const circleR = new this.three.Mesh( stickerGeometry, this.materials.materialStickerRed );
        const circleG = new this.three.Mesh( stickerGeometry, this.materials.materialStickerGreen );
        const circleB = new this.three.Mesh( stickerGeometry, this.materials.materialStickerBlue );
        const linkedIn = new this.three.Mesh( linkedInGeometry, this.materials.materialIconLinkedin)
        const web = new this.three.Mesh( webGeometry, this.materials.materialIconWeb )

        if (!this.flat) {
            arrowHelper = new this.three.ArrowHelper( new this.three.Vector3( 0, 0, -0.7 ), new this.three.Vector3( -.05, 0, 0.88 ), .15, 0x393975, .05, .1 );
            arrowHelperSuccess = new this.three.ArrowHelper( new this.three.Vector3( -.6, 0, -0.6 ), new this.three.Vector3( -.10, 0, .4 ), .25, 0x550100, .05, .1 );
            arrowHelperFail = new this.three.ArrowHelper( new this.three.Vector3( 0.6, 0, -0.6 ), new this.three.Vector3( -.02, 0, 0.4 ), .25, 0x2A8301, .05, .1 );
            decGeometry = new this.three.PlaneGeometry( .15, .15 );
            dec = new this.three.Mesh( decGeometry, this.materials["matcapMaterialBlue"] );
            dec.rotation.set( Math.PI * .5, 0, Math.PI * .25)
            dec.position.set(-.06, 0, .5)
            circleR.rotation.set(Math.PI * .5, 0, 0)
            circleG.rotation.set(Math.PI * .5, 0, 0)
            circleB.rotation.set(Math.PI * .5, 0, 0)

            circleR.position.set(-.4, 0, .8)
            circleG.position.set( 0, 0, .8)
            circleB.position.set( .4, 0, .8)

            linkedIn.position.set(-.2, 0, .1)
            linkedIn.rotation.set(Math.PI * .5, 0, 0)
            web.position.set( 0.2, 0, .1)
            web.rotation.set(Math.PI * .5, 0, 0)
        } else {
            arrowHelper = new this.three.ArrowHelper( new this.three.Vector3( 0, -1, 0 ), new this.three.Vector3( -.05, 0.88, 0 ), .15, 0x393975, .05, .1 );
            arrowHelperSuccess = new this.three.ArrowHelper( new this.three.Vector3( -.6, -0.6, 0 ), new this.three.Vector3( -.10, .4, 0 ), .25, 0x550100, .05, .1 );
            arrowHelperFail = new this.three.ArrowHelper( new this.three.Vector3( 0.6, -0.6 , 0), new this.three.Vector3( -.02, 0.4, 0 ), .25, 0x2A8301, .05, .1 );
            decGeometry = new this.three.PlaneGeometry( .15, .15 );
            dec = new this.three.Mesh( decGeometry, this.materials["matcapMaterialBlue"] );
            dec.rotation.set( 0, 0, Math.PI * .25)
            dec.position.set(-.06, .5, 0)
            circleR.rotation.set(0, 0, 0)
            circleG.rotation.set(0, 0, 0)
            circleB.rotation.set(0, 0, 0)

            circleR.position.set(-.4, .8, 0)
            circleG.position.set( 0, .8, 0)
            circleB.position.set( .4, .8, 0)

            linkedIn.position.set(-.2, .1, 0)
            linkedIn.rotation.set(0, 0, 0)
            web.position.set( 0.2, .1, 0)
            web.rotation.set(0, 0, 0)
        }

        linkedIn.name = "linkedin"
        web.name = "web"
        let els = [circleR, circleG, circleB, linkedIn, web]

        els.forEach((el) => {
            this.anchors["stickers_a"].group.add(el)
            this.anchors["stickers_b"].group.add(el.clone())
            this.anchors["stickers_c"].group.add(el.clone())
        })

        this.anchors["puzzle"].group.add(arrowHelper)
        this.anchors["puzzle"].group.add(arrowHelperSuccess)
        this.anchors["puzzle"].group.add(arrowHelperFail)
        this.anchors["puzzle"].group.add(dec)
    }

    setupMaterials() {
        this.materials = {}
        this.materials.matcapMaterialRed = new this.three.MeshMatcapMaterial( {matcap: this.resources.items['matcap']} );
        this.materials.matcapMaterialGreen = new this.three.MeshMatcapMaterial( {matcap: this.resources.items['matcap-green']} );
        this.materials.matcapMaterialBlue = new this.three.MeshMatcapMaterial( {matcap: this.resources.items['matcap-blue']} );
        this.materials.materialIconWeb = new this.three.MeshBasicMaterial( {
            color: 0xffffff, transparent: false, opacity:1, map: this.resources.items['icon-web'], side: this.three.DoubleSide
        } );
        this.materials.materialIconLinkedin = new this.three.MeshBasicMaterial( {
            color: 0xffffff, transparent: false, opacity:1, map: this.resources.items['icon-linkedin'], side: this.three.DoubleSide
        } );
        this.materials.materialStickerBlue = new this.three.MeshBasicMaterial( {
            color: 0xffffff, transparent: false, opacity:1, map: this.resources.items['sticker-blue'], side: this.three.DoubleSide
        } );
        this.materials.materialStickerGreen = new this.three.MeshBasicMaterial( {
            color: 0xffffff, transparent: false, opacity:1, map: this.resources.items['sticker-green'], side: this.three.DoubleSide
        } );
        this.materials.materialStickerRed = new this.three.MeshBasicMaterial( {
            color: 0xffffff, transparent: false, opacity:1, map: this.resources.items['sticker-red'], side: this.three.DoubleSide
        } );
    }

    setupModels() {
        const mjolnirModel = this.resources.items['mjolnir']
        const notebookModel = this.resources.items["notebook"]
        const edLogoModel = this.resources.items["ed-logo"]
        const tshirtModel = this.resources.items["tshirt"]
        const balloonsModel = this.resources.items["balloons"]

        mjolnirModel.scene.scale.set(0.03, .03, .03)
        mjolnirModel.scene.castShadow = true
        mjolnirModel.scene.receiveShadow = true
        this.anchors['puzzle'].group.add(mjolnirModel.scene)

        edLogoModel.scene.scale.set(.06, .06, .06)
        edLogoModel.scene.castShadow = true
        edLogoModel.scene.receiveShadow = true
        this.anchors['button'].group.add(edLogoModel.scene)

        balloonsModel.scene.scale.set(.1, .1, .1)
        balloonsModel.scene.castShadow = true
        balloonsModel.scene.receiveShadow = true
        this.anchors['puzzle'].group.add(balloonsModel.scene)

        tshirtModel.scene.scale.set(.05, .05, .05)
        tshirtModel.scene.castShadow = true
        tshirtModel.scene.receiveShadow = true


        let r, g, b;

        if (!this.flat) {
            mjolnirModel.scene.rotation.set(.5 * Math.PI, 0, 0)
            mjolnirModel.scene.position.set(-0.55, 0, .6)
            edLogoModel.scene.rotation.set(Math.PI * 1, 0, 0)
            edLogoModel.scene.position.set(-.3, 0, .65)
            balloonsModel.scene.rotation.set(Math.PI * 1, 0, 0)
            balloonsModel.scene.position.set(.5, 0, .35)
            tshirtModel.scene.rotation.set(Math.PI * 0.5, 0, 0)
            r = tshirtModel.scene.clone()
            g = tshirtModel.scene.clone()
            b = tshirtModel.scene.clone()

            r.position.set(-.4, 0, .5)
            g.position.set(0, 0, .5)
            b.position.set(.4, 0, .5)
        } else {
            mjolnirModel.scene.rotation.set(0, 0, 0)
            mjolnirModel.scene.position.set(-0.55, .6, 0)
            edLogoModel.scene.rotation.set(Math.PI * 1, 0, 0)
            edLogoModel.scene.position.set(-.3, .65, 0)
            balloonsModel.scene.rotation.set(Math.PI * 0, 0, 0)
            balloonsModel.scene.position.set(.5, .35, 0)
            tshirtModel.scene.rotation.set(0, 0, 0)
            r = tshirtModel.scene.clone()
            g = tshirtModel.scene.clone()
            b = tshirtModel.scene.clone()

            r.position.set(-.4, .5, 0)
            g.position.set(0, .5, 0)
            b.position.set(.4, .5, 0)
        }

        r.traverse(child => {
            if (child.isMesh) {
                child.material = this.materials.matcapMaterialRed
            }
        })

        g.traverse(child => {
            if (child.isMesh) {
                child.material =  this.materials.matcapMaterialGreen
            }
        })

        b.traverse(child => {
            if (child.isMesh) {
                child.material = this.materials.matcapMaterialBlue
            }
        })

        this.anchors['stickers_a'].group.add(r)
        this.anchors['stickers_a'].group.add(g) 
        this.anchors['stickers_a'].group.add(b) 

        this.anchors['stickers_b'].group.add(r.clone())
        this.anchors['stickers_b'].group.add(g.clone()) 
        this.anchors['stickers_b'].group.add(b.clone()) 

        this.anchors['stickers_c'].group.add(r.clone())
        this.anchors['stickers_c'].group.add(g.clone()) 
        this.anchors['stickers_c'].group.add(b.clone()) 
    }
}