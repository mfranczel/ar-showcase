
// import target from './nfts/multitarget-erste.mind'
// import target from './nfts/multitarget-erste-min-min.mind'


import Experience from './js/Experience/Experience'
import target from './nfts/targets-16.mind'
import target2 from './nfts/targets-17.mind'

if (window.location.toString().includes("box")) {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.querySelector("#container"),
        imageTargetSrc: target,
        //maxTrack: 1000, 
        uiLoading:"yes",
        uiScanning:"yes",
        uiError:"yes",
        filterMinCF:0.0001, 
        filterBeta:.01, 
        warmupTolerance:5, 
        missTolerance:10
    });
    
    const THREE = window.MINDAR.IMAGE.THREE
    const anchorNames = ["button", "stickers_a", "stickers_b", "stickers_c", "puzzle"]
    const experience = new Experience(mindarThree, THREE, anchorNames, false)
    const {renderer, scene, camera} = mindarThree;
    mindarThree.start()
} else {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.querySelector("#container"),
        imageTargetSrc: target2,
        //maxTrack: 1000, 
        uiLoading:"yes",
        uiScanning:"yes",
        uiError:"yes",
        filterMinCF:0.0001, 
        filterBeta:.01, 
        //warmupTolerance:5, 
        //missTolerance:10
    });
    
    const THREE = window.MINDAR.IMAGE.THREE
    const anchorNames = ["button", "hammer", "puzzle", "lego", "stickers_a", "stickers_b", "stickers_c"]
    const experience = new Experience(mindarThree, THREE, anchorNames, true)
    const {renderer, scene, camera} = mindarThree;
    mindarThree.start()
}
