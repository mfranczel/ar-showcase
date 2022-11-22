
// import target from './nfts/multitarget-erste.mind'
// import target from './nfts/multitarget-erste-min-min.mind'
import target from './nfts/targets-16.mind'
import Experience from './js/Experience/Experience'


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

const THREE = window.MINDAR.IMAGE.THREE

const anchorNames = ["button", "stickers_a", "stickers_b", "stickers_c", "puzzle"]

const experience = new Experience(mindarThree, THREE, anchorNames)

const {renderer, scene, camera} = mindarThree;


mindarThree.start()
