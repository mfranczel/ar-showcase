
// import target from './nfts/multitarget-erste.mind'
import target from './nfts/multitarget-erste-4.mind'
import mjolnirModel from './models/mjolnir.glb'
import notebookModel from './models/notebook.glb'
import edModel from './models/ed_logo.glb'
import tshirtModel from './models/tshirt.glb'
import { GLTFLoader, TextureLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

import iconWeb from './images/icon-web.svg'
import iconLinkedin from './images/icon-linkedin.svg'

const THREE = window.MINDAR.IMAGE.THREE;
const gltfLoader = new GLTFLoader();

const webTexture = new THREE.TextureLoader().load( iconWeb );
const linkedinTexture = new THREE.TextureLoader().load( iconLinkedin );

let mixer, raycaster, mouse, mjolnir = null;
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

let anchor, anchor1, anchor1_b, anchor2, anchor2_b, anchor2_c, anchor2_a2, anchor2_b2, anchor2_c2,  anchor2_a3, anchor2_b3, anchor2_c3, anchor3, anchor4, anchor5;

renderer.gammaOutput = true;

anchor = mindarThree.addAnchor(0);  // Button

anchor1 = mindarThree.addAnchor(1); // notebook TODO: GIF
anchor1_b = mindarThree.addAnchor(2); // notebook TODO: GIF

anchor2 = mindarThree.addAnchor(3); // Colored Text: TODO: obrazky pre nalepky, ikonky pre linky
anchor2_b = mindarThree.addAnchor(4);
anchor2_c = mindarThree.addAnchor(5);

anchor2_a2 = mindarThree.addAnchor(6);
anchor2_b2 = mindarThree.addAnchor(7);
anchor2_c2 = mindarThree.addAnchor(8);

anchor2_a3 = mindarThree.addAnchor(9);
anchor2_b3 = mindarThree.addAnchor(10);
anchor2_c3 = mindarThree.addAnchor(11);

// anchor3 = mindarThree.addAnchor(6); // airtag
anchor4 = mindarThree.addAnchor(12); // battery
anchor5 = mindarThree.addAnchor(13); // puzzle TODO: animacie, rozbijanie

raycaster = new THREE.Raycaster()
mouse = new THREE.Vector2()
document.getElementById('container').addEventListener('click', onClick, false);

const material = new THREE.MeshBasicMaterial( {color: 0xdb3039, transparent: true, opacity: 1} );
const material_r = new THREE.MeshBasicMaterial( {color: 0xA11274, transparent: true, opacity:1} );
const material_g = new THREE.MeshBasicMaterial( {color: 0x4CBE4A, transparent: true, opacity: 1} );
const material_b = new THREE.MeshBasicMaterial( {color: 0x0F51EC, transparent: true, opacity: 1} );

const material_icon_web = new THREE.MeshBasicMaterial( {
    color: 0xA11274, transparent: true, opacity:1, map: webTexture, side: THREE.DoubleSide
} );
const material_icon_linkedin = new THREE.MeshBasicMaterial( {
    color: 0xA11274, transparent: true, opacity:1, map: linkedinTexture, side: THREE.DoubleSide
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
    const buttonText = new THREE.Mesh( buttonTextGeometry, material)
    const noteText = new THREE.Mesh(notesTextGeometry, material)
    const coloredText = new THREE.Mesh(coloredTextGeometry, material)
    const airTagText = new THREE.Mesh(airTagTextGeometry, material)
    const powerbankText = new THREE.Mesh(powerbankTextGeometry, material)
    const puzzleText = new THREE.Mesh(puzzleTextGeometry, material_b)
    const puzzleText2 = new THREE.Mesh(puzzleTextGeometry2, material_b)
    const puzzleText3 = new THREE.Mesh(puzzleTextGeometry3, material_r)
    const puzzleText4 = new THREE.Mesh(puzzleTextGeometry4, material_g)

    const decGeometry = new THREE.PlaneGeometry( .2, .2 );
    const decMaterial = new THREE.MeshBasicMaterial( {color: 0x0F51EC, side: THREE.DoubleSide} );
    const dec = new THREE.Mesh( decGeometry, decMaterial );
    dec.rotation.set( Math.PI * .5, 0, Math.PI * .25)
    dec.position.set(.3, 0, .5)

    buttonText.position.set(-.4, 0, .5)
    buttonText.scale.set(.001, .001, .001)
    buttonText.rotation.set(.5 * Math.PI, 0, 0)

    noteText.position.set(-.4, 0, .3)
    noteText.scale.set(.001, .001, .001)
    noteText.rotation.set(.5 * Math.PI, 0, 0)

    coloredText.position.set(-.4, 0, .5)
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

    puzzleText2.position.set(.55, 0, .5)
    puzzleText2.scale.set(.001, .001, .001)
    puzzleText2.rotation.set(.5 * Math.PI, 0, 0)

    puzzleText3.position.set(-.7, 0, .1)
    puzzleText3.scale.set(.001, .001, .001)
    puzzleText3.rotation.set(.5 * Math.PI, 0, 0)

    puzzleText4.position.set(.6, 0, .1)
    puzzleText4.scale.set(.001, .001, .001)
    puzzleText4.rotation.set(.5 * Math.PI, 0, 0)

    const arrowHelper = new THREE.ArrowHelper( new THREE.Vector3( 0, 0, -0.6 ), new THREE.Vector3( .3, 0, 0.85 ), .15, 0x0F51EC, .05, .1 );
    const arrowHelperSuccess = new THREE.ArrowHelper( new THREE.Vector3( -.6, 0, -0.6 ), new THREE.Vector3( .2, 0, .4 ), .25, 0xA11274, .05, .1 );
    const arrowHelperFail = new THREE.ArrowHelper( new THREE.Vector3( 0.6, 0, -0.6 ), new THREE.Vector3( .4, 0, 0.4 ), .25, 0x4CBE4A, .05, .1 );
    
    anchor.group.add(buttonText)

    anchor1.group.add(noteText)
    anchor1_b.group.add(noteText)

    anchor2.group.add(coloredText)
    anchor2_b.group.add(coloredText)
    anchor2_c.group.add(coloredText) 
    anchor2_a2.group.add(coloredText) 
    anchor2_b2.group.add(coloredText) 
    anchor2_c2.group.add(coloredText) 
    anchor2_a3.group.add(coloredText) 
    anchor2_b3.group.add(coloredText) 
    anchor2_c3.group.add(coloredText) 

    // anchor3.group.add(airTagText)
    anchor4.group.add(powerbankText)


    anchor5.group.rotation.set(Math.PI * 1,0,0)
    anchor5.group.add(puzzleText)
    anchor5.group.add(puzzleText2)
    anchor5.group.add(puzzleText3)
    anchor5.group.add(puzzleText4)
    anchor5.group.add( dec )
    anchor5.group.add(arrowHelper)
    anchor5.group.add(arrowHelperSuccess)
    anchor5.group.add(arrowHelperFail)
    }
)

gltfLoader.load(
    mjolnirModel,
    (gltf) => {
        gltf.scene.scale.set(.05, .05, .05)
        gltf.scene.rotation.set(.5 * Math.PI, 0, 0)
        gltf.scene.castShadow = true
        gltf.scene.receiveShadow = true
        gltf.scene.position.set(-0.25, 0, 1.25)
        mjolnir = gltf.scene
        // anchor1.group.add(gltf.scene)
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
        anchor1.group.add(gltf.scene)
        anchor1_b.group.add(gltf.scene)
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
        console.log(gltf.scene.children)
        anchor.group.add(gltf.scene)
        mixer = new THREE.AnimationMixer(gltf.scene)
        playingModel = 1
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
    }
)

gltfLoader.load(
    tshirtModel,
    (gltf) => {
        gltf.scene.scale.set(.0006, .0006, .0006)
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
                child.material = stickerMaterialR
            }
        })

        g.traverse(child => {
            if (child.isMesh) {
                child.material = stickerMaterialG
            }
        })

        b.traverse(child => {
            if (child.isMesh) {
                child.material = stickerMaterialB
            }
        })

        anchor2.group.add(r)
        anchor2_b.group.add(r)
        anchor2_c.group.add(r) 
        anchor2_a2.group.add(r) 
        anchor2_b2.group.add(r) 
        anchor2_c2.group.add(r) 
        anchor2_a3.group.add(r) 
        anchor2_b3.group.add(r) 
        anchor2_c3.group.add(r) 

        anchor2.group.add(g)
        anchor2_b.group.add(g)
        anchor2_c.group.add(g) 
        anchor2_a2.group.add(g) 
        anchor2_b2.group.add(g) 
        anchor2_c2.group.add(g) 
        anchor2_a3.group.add(g) 
        anchor2_b3.group.add(g) 
        anchor2_c3.group.add(g) 

        anchor2.group.add(b)
        anchor2_b.group.add(b)
        anchor2_c.group.add(b) 
        anchor2_a2.group.add(b) 
        anchor2_b2.group.add(b) 
        anchor2_c2.group.add(b) 
        anchor2_a3.group.add(b) 
        anchor2_b3.group.add(b) 
        anchor2_c3.group.add(b) 
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

const stickerGeometryR = new THREE.CircleGeometry( .15, 32 );
const stickerGeometryG = new THREE.CircleGeometry( .15, 32 );
const stickerGeometryB = new THREE.CircleGeometry( .15, 32 );

const linkedInGeometry = new THREE.CircleGeometry( .075, 32 );
const webGeometry = new THREE.CircleGeometry( .075, 32 );

const circleR = new THREE.Mesh( stickerGeometryR, stickerMaterialR );
const circleG = new THREE.Mesh( stickerGeometryG, stickerMaterialG );
const circleB = new THREE.Mesh( stickerGeometryB, stickerMaterialB );

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
    anchor2.group.add(el)
    anchor2_b.group.add(el)
    anchor2_c.group.add(el) 
    anchor2_a2.group.add(el) 
    anchor2_b2.group.add(el) 
    anchor2_c2.group.add(el) 
    anchor2_a3.group.add(el) 
    anchor2_b3.group.add(el) 
    anchor2_c3.group.add(el) 
})


//Add light
let light = new THREE.AmbientLight(0xffffff);
anchor.group.add(light);
anchor1.group.add(light);
anchor1_b.group.add(light);
anchor2.group.add(light)
anchor2_b.group.add(light)
anchor2_c.group.add(light) 
anchor2_a2.group.add(light) 
anchor2_b2.group.add(light) 
anchor2_c2.group.add(light) 
anchor2_a3.group.add(light) 
anchor2_b3.group.add(light) 
anchor2_c3.group.add(light) 
// anchor3.group.add(light);
anchor4.group.add(light);
anchor5.group.add(light);

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

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}

tick()
mindarThree.start()
