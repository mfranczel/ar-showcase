
// import target from './nfts/multitarget-erste.mind'
import target from './nfts/multitarget-erste-min-min.mind'
import mjolnirModel from './models/mjolnir.glb'
import notebookModel from './models/notebook.glb'
import edModel from './models/ed_logo.glb'
import tshirtModel from './models/tshirt.glb'
import balloonsModel from './models/balloons.glb'
import { GLTFLoader, TextureLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

import iconWeb from './images/icon-web.svg'
import iconLinkedin from './images/icon-linkedin.svg'

import stickerBlueImage from './images/sticker-b.svg'
import stickerGreenImage from './images/sticker-g.svg'
import stickerRedImage from './images/sticker-r.svg'

import matcapImage from './textures/text_matcap_04.png'
import matcapImageBlue from './textures/text_matcap_01b.png'
import matcapImageGreen from './textures/text_matcap_01g.png'

const THREE = window.MINDAR.IMAGE.THREE;
const gltfLoader = new GLTFLoader();

const webTexture = new THREE.TextureLoader().load( iconWeb );
const linkedinTexture = new THREE.TextureLoader().load( iconLinkedin );

const stickerBlueTexture = new THREE.TextureLoader().load( stickerBlueImage );
const stickerGreenTexture = new THREE.TextureLoader().load( stickerGreenImage );
const stickerRedTexture = new THREE.TextureLoader().load( stickerRedImage );

const matcapTexture = new THREE.TextureLoader().load( matcapImage )
const matcapTextureGreen = new THREE.TextureLoader().load( matcapImageGreen )
const matcapTextureBlue = new THREE.TextureLoader().load( matcapImageBlue )

let mixer, raycaster, mouse, mjolnir, mixer4 = null;
let mjolnirTime = 0;
let playingModel = -1;

const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#container"),
    imageTargetSrc: target,
    //maxTrack: 1000, 
    uiLoading:"yes",
    uiScanning:"yes",
    uiError:"yes",
    filterMinCF:0.001, 
    filterBeta:0.01, 
    warmupTolerance:null, 
    missTolerance:null
});

const {renderer, scene, camera} = mindarThree;

let anchor, anchor1a, anchor2a, anchor3, anchor4;

renderer.gammaOutput = true;

anchor = mindarThree.addAnchor(0);  // Button - Done

anchor1a = mindarThree.addAnchor(1); // notebook IT Green TODO: GIF

anchor2a = mindarThree.addAnchor(2); // Colored Text Cloud red: - Done

anchor3 = mindarThree.addAnchor(3); // battery

anchor4 = mindarThree.addAnchor(4); // puzzle TODO: animacie, rozbijanie

raycaster = new THREE.Raycaster()
mouse = new THREE.Vector2()
document.getElementById('container').addEventListener('click', onClick, false);


const material = new THREE.MeshMatcapMaterial( {matcap: matcapTexture} );

const material_r = new THREE.MeshMatcapMaterial( {matcap: matcapTexture} );
const material_g = new THREE.MeshMatcapMaterial( {matcap: matcapTextureGreen} );
const material_b = new THREE.MeshMatcapMaterial( {matcap: matcapTextureBlue} );

const material_icon_web = new THREE.MeshBasicMaterial( {
    color: 0xffffff, transparent: false, opacity:1, map: webTexture, side: THREE.DoubleSide
} );
const material_icon_linkedin = new THREE.MeshBasicMaterial( {
    color: 0xffffff, transparent: false, opacity:1, map: linkedinTexture, side: THREE.DoubleSide
} );

const material_sticker_blue = new THREE.MeshBasicMaterial( {
    color: 0xffffff, transparent: false, opacity:1, map: stickerBlueTexture, side: THREE.DoubleSide
} );

const material_sticker_green = new THREE.MeshBasicMaterial( {
    color: 0xffffff, transparent: false, opacity:1, map: stickerGreenTexture, side: THREE.DoubleSide
} );

const material_sticker_red = new THREE.MeshBasicMaterial( {
    color: 0xffffff, transparent: false, opacity:1, map: stickerRedTexture, side: THREE.DoubleSide
} );


const stickerMaterialR = new THREE.MeshBasicMaterial( { color: 0xA11274 } );
const stickerMaterialG = new THREE.MeshBasicMaterial( { color: 0x4CBE4A } );
const stickerMaterialB = new THREE.MeshBasicMaterial( { color: 0x0F51EC } );
const linkMaterial = new THREE.MeshBasicMaterial( { color: 0x828282 } );
/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/droid_sans_regular.typeface.json',
    (font) =>
    {
    const buttonTextGeometry = new TextGeometry( 
        'Just to be sure \nthat you enter \nright company.', 
        {
            font: font,
            size: 70,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    );
    const puzzleTextGeometry = new TextGeometry( 
        'Solve the puzzle!', 
        {
            font: font,
            size: 70,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    );
    const puzzleTextGeometry2 = new TextGeometry( 
        'Success?', 
        {
            font: font,
            size: 50,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    );
    const puzzleTextGeometry3 = new TextGeometry( 
        'Use the hammer!', 
        {
            font: font,
            size: 70,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    );
    const puzzleTextGeometry4 = new TextGeometry( 
        'Congratulations!', 
        {
            font: font,
            size: 70,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    );
    const notesTextGeometry = new TextGeometry( 
        'For all your great ideas.', 
        {
            font: font,
            size: 90,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    );
    const coloredTextGeometry = new TextGeometry( 
        'It\'s time to make \nData, Cloud and Code \nmatter.',
        {
            font: font,
            size: 70,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    )
    const airTagTextGeometry = new TextGeometry( 
        'Your company iPhone \ndoesn\'t have to be used \nonly for work. You may \nuse it to locate your \nkeys as well!',
        {
            font: font,
            size: 70,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    )
    const powerbankTextGeometry = new TextGeometry( 
        'Coffee can help you \nreenergize at work, \nand your brand new \npowerbank can charge \nanything else.', 
        {
            font: font,
            size: 70,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    );

    const noTextGeometry = new TextGeometry( 
        'No', 
        {
            font: font,
            size: 50,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    );
    const yesTextGeometry = new TextGeometry( 
        'Yes', 
        {
            font: font,
            size: 50,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } 
    );


    const buttonText = new THREE.Mesh( buttonTextGeometry, material)
    const noteText = new THREE.Mesh(notesTextGeometry, material)
    const coloredText = new THREE.Mesh(coloredTextGeometry, material)
    const airTagText = new THREE.Mesh(airTagTextGeometry, material)
    const powerbankText = new THREE.Mesh(powerbankTextGeometry, material)
    const puzzleText = new THREE.Mesh(puzzleTextGeometry, material_b)
    const puzzleText2 = new THREE.Mesh(puzzleTextGeometry2, material_b)
    const puzzleText3 = new THREE.Mesh(puzzleTextGeometry3, material_r)
    const puzzleText4 = new THREE.Mesh(puzzleTextGeometry4, material_g)
    const noText = new THREE.Mesh(noTextGeometry, material_r)
    const yesText = new THREE.Mesh(yesTextGeometry, material_g)

    const decGeometry = new THREE.PlaneGeometry( .2, .2 );
    const dec = new THREE.Mesh( decGeometry, material_b );
    dec.rotation.set( Math.PI * .5, 0, Math.PI * .25)
    dec.position.set(.3, 0, .5)

    buttonText.position.set(-.4, 0, .5)
    buttonText.scale.set(.001, .001, .001)
    buttonText.rotation.set(.5 * Math.PI, 0, 0)

    noteText.position.set(-.6, 0, .3)
    noteText.scale.set(.001, .001, .001)
    noteText.rotation.set(.5 * Math.PI, 0, 0)

    coloredText.position.set(-.4, 0, .55)
    coloredText.scale.set(.001, .001, .001)
    coloredText.rotation.set(.5 * Math.PI, 0, 0)

    airTagText.position.set(-.4, 0, .5)
    airTagText.scale.set(.001, .001, .001)
    airTagText.rotation.set(.5 * Math.PI, 0, 0)

    powerbankText.position.set(-.4, 0, .5)
    powerbankText.scale.set(.001, .001, .001)
    powerbankText.rotation.set(.5 * Math.PI, 0, 0)

    puzzleText.position.set(0, 0, .9)
    puzzleText.scale.set(.001, .001, .001)
    puzzleText.rotation.set(.5 * Math.PI, 0, 0)

    puzzleText2.position.set(.17, 0, .67)
    puzzleText2.scale.set(.001, .001, .001)
    puzzleText2.rotation.set(.5 * Math.PI, 0, 0)

    puzzleText3.position.set(-.7, 0, .1)
    puzzleText3.scale.set(.001, .001, .001)
    puzzleText3.rotation.set(.5 * Math.PI, 0, 0)

    puzzleText4.position.set(.6, 0, .1)
    puzzleText4.scale.set(.001, .001, .001)
    puzzleText4.rotation.set(.5 * Math.PI, 0, 0)

    noText.position.set(0.075, 0, .4)
    noText.scale.set(.001, .001, .001)
    noText.rotation.set(.5 * Math.PI, 0, 0)

    yesText.position.set(.45, 0, .4)
    yesText.scale.set(.001, .001, .001)
    yesText.rotation.set(.5 * Math.PI, 0, 0)

    const arrowHelper = new THREE.ArrowHelper( new THREE.Vector3( 0, 0, -0.7 ), new THREE.Vector3( .3, 0, 0.88 ), .15, 0x393975, .05, .1 );
    const arrowHelperSuccess = new THREE.ArrowHelper( new THREE.Vector3( -.6, 0, -0.6 ), new THREE.Vector3( .2, 0, .4 ), .25, 0x550100, .05, .1 );
    const arrowHelperFail = new THREE.ArrowHelper( new THREE.Vector3( 0.6, 0, -0.6 ), new THREE.Vector3( .4, 0, 0.4 ), .25, 0x2A8301, .05, .1 );
    
    anchor.group.add(buttonText)

    anchor1a.group.add(noteText)
    
    anchor2a.group.add(coloredText)

    // anchor3.group.add(airTagText)
    anchor3.group.add(powerbankText)

    anchor4.group.rotation.set(Math.PI * 1,0,0)
    anchor4.group.add(puzzleText)
    anchor4.group.add(puzzleText2)
    anchor4.group.add(puzzleText3)
    anchor4.group.add(puzzleText4)
    anchor4.group.add( dec )
    anchor4.group.add(arrowHelper)
    anchor4.group.add(arrowHelperSuccess)
    anchor4.group.add(arrowHelperFail)
    anchor4.group.add(noText)
    anchor4.group.add(yesText)
    }
)

gltfLoader.load(
    mjolnirModel,
    (gltf) => {
        gltf.scene.scale.set(.03, .03, .03)
        gltf.scene.rotation.set(.5 * Math.PI, 0, 0)
        gltf.scene.castShadow = true
        gltf.scene.receiveShadow = true
        gltf.scene.position.set(-0.25, 0, .6)
        mjolnir = gltf.scene
        anchor4.group.add(gltf.scene)
        mixer = new THREE.AnimationMixer(gltf.scene)
        mixer.timeScale = 0
        const action = mixer.clipAction(gltf.animations[0])
        playingModel = 0
        action.play()
    }
)

gltfLoader.load(
    notebookModel,
    (gltf) => {
        gltf.scene.scale.set(.05, .05, .05)
        gltf.scene.rotation.set(0, .25 * Math.PI, .80 * Math.PI)
        gltf.scene.castShadow = true
        gltf.scene.receiveShadow = true
        gltf.scene.position.set(.15, 0, 1)
        mjolnir = gltf.scene
        anchor1a.group.add(gltf.scene)
        mixer = new THREE.AnimationMixer(gltf.scene)
        playingModel = 1
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
    }
)

gltfLoader.load(
    edModel,
    (gltf) => {
        gltf.scene.scale.set(.06, .06, .06)
        gltf.scene.rotation.set(Math.PI * 1, 0, 0)
        gltf.scene.castShadow = true
        gltf.scene.receiveShadow = true
        gltf.scene.position.set(-.3, 0, .65)
        anchor.group.add(gltf.scene)
        mixer = new THREE.AnimationMixer(gltf.scene)
        playingModel = 1
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
    },
    undefined,
    (e) => console.log(e)
)

gltfLoader.load(
    balloonsModel,
    (gltf) => {
        gltf.scene.scale.set(.1, .1, .1)
        gltf.scene.rotation.set(Math.PI * 1, 0, 0)
        gltf.scene.castShadow = true
        gltf.scene.receiveShadow = true
        gltf.scene.position.set(.9, 0, .35)
        anchor4.group.add(gltf.scene)
        mixer4 = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
    },
    undefined,
    (e) => console.log(e)
)

gltfLoader.load(
    tshirtModel,
    (gltf) => {
        gltf.scene.scale.set(.0005, .0005, .0005)
        gltf.scene.rotation.set(Math.PI * 0.5, 0, 0)
        gltf.scene.castShadow = true
        gltf.scene.receiveShadow = true

        const r = gltf.scene.clone()
        const g = gltf.scene.clone()
        const b = gltf.scene.clone()

        r.position.set(-.4, 0, .5)
        g.position.set(0, 0, .5)
        b.position.set(.4, 0, .5)
        
        r.traverse(child => {
            if (child.isMesh) {
                child.material = material_r
            }
        })

        g.traverse(child => {
            if (child.isMesh) {
                child.material = material_g
            }
        })

        b.traverse(child => {
            if (child.isMesh) {
                child.material = material_b
            }
        })

        anchor2a.group.add(r)
        //anchor3a.group.add(r.clone()) 
        // anchor3b.group.add(r) 
        anchor2a.group.add(g)
        //anchor3a.group.add(g.clone()) 
        // anchor3b.group.add(g) 
        anchor2a.group.add(b) 
        //anchor3a.group.add(b.clone()) 
        // anchor3b.group.add(b) 
    }
)

function onClick( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	let intersects = raycaster.intersectObjects( scene.children, true );

	if ( intersects.length > 0 ) {

        if (intersects.length > 2 && intersects[2].object.name === "web") {
            window.open("https://www.erstedigital.com/en/home", "_blank")
        }

        if (intersects.length > 2 && intersects[2].object.name === "linkedin") {
            window.open("https://sk.linkedin.com/company/erstedigital", "_blank")
        }

        if (intersects[0].object.name === "Mjolnir3_metal_0") {
		   mjolnirTime = 47
           mixer.timeScale = .4
        }
        if (intersects[0].object.name === "Curve") {
            window.open("https://www.erstedigital.com/en/home", "_blank")
         }

	}

}

const stickerGeometryR = new THREE.CircleGeometry( .1, 32 );
const stickerGeometryG = new THREE.CircleGeometry( .1, 32 );
const stickerGeometryB = new THREE.CircleGeometry( .1, 32 );

const linkedInGeometry = new THREE.CircleGeometry( .15, 32 );
const webGeometry = new THREE.CircleGeometry( .13, 32 );

const circleR = new THREE.Mesh( stickerGeometryR, material_sticker_red );
const circleG = new THREE.Mesh( stickerGeometryG, material_sticker_green );
const circleB = new THREE.Mesh( stickerGeometryB, material_sticker_blue );


const linkedIn = new THREE.Mesh( linkedInGeometry, material_icon_linkedin)
const web = new THREE.Mesh( webGeometry, material_icon_web )

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

linkedIn.name = "linkedin"
web.name = "web"

let els = [circleR, circleG, circleB, linkedIn, web]

els.forEach((el) => {
    anchor2a.group.add(el)
})


//Add light
let light = new THREE.AmbientLight(0xffffff, .35);
scene.add(light);
let directionalLightBack = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 0.75);
directionalLightBack.position.set(30, 100, 100);
scene.add(directionalLightBack);

let directionalLightFront = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 1);
directionalLightFront.position.set(-30, 100, -100);
scene.add(directionalLightFront);
renderer.gammaOutput = true


const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if (mixer) {
        mixer.update(deltaTime)
        if (playingModel == 0) {
            if (mjolnirTime > 0) {
                mjolnirTime--;
                mixer.timeScale += .01;
                mjolnir.position.set(0, 0, mjolnir.position.z - .01)
            } else if (mjolnirTime == 0) {
                mixer.timeScale = 0
            }
        }
    }
    if (mixer4) {
        mixer4.update(deltaTime)
    }
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}

tick()
mindarThree.start()
