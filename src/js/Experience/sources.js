import mjolnirModel from '../../models/mjolnir-3.glb'
import notebookModel from '../../models/notebook.glb'
import edModel from '../../models/ed_logo.glb'
import tshirtModel from '../../models/tshirt-2.glb'
import balloonsModel from '../../models/balloons.glb'

import iconWeb from '../../images/icon-web.svg'
import iconLinkedin from '../../images/icon-linkedin.svg'
import stickerBlueImage from '../../images/sticker-b.svg'
import stickerGreenImage from '../../images/sticker-g.svg'
import stickerRedImage from '../../images/sticker-r.svg'

import matcapImage from '../../textures/text_matcap_04.png'
import matcapImageBlue from '../../textures/text_matcap_01b.png'
import matcapImageGreen from '../../textures/text_matcap_01g.png'

export default [
    {
        name: "mjolnir",
        type: "gltf",
        path: mjolnirModel
    },
    {
        name: "notebook",
        type: "gltf",
        path: notebookModel
    },
    {
        name: "ed-logo",
        type: "gltf",
        path: edModel
    },
    {
        name: "tshirt",
        type: "gltf",
        path: tshirtModel
    },
    {
        name: "balloons",
        type: "gltf",
        path: balloonsModel
    },
    {
        name: "icon-linkedin",
        type: "texture",
        path: iconLinkedin
    },
    {
        name: "icon-web",
        type: "texture",
        path: iconWeb
    },
    {
        name: "sticker-blue",
        type: "texture",
        path: stickerBlueImage
    },
    {
        name: "sticker-green",
        type: "texture",
        path: stickerGreenImage
    },
    {
        name: "sticker-red",
        type: "texture",
        path: stickerRedImage
    },
    {
        name: "matcap",
        type: "texture",
        path: matcapImage
    },
    {
        name: "matcap-blue",
        type: "texture",
        path: matcapImageBlue
    },
    {
        name: "matcap-green",
        type: "texture",
        path: matcapImageGreen
    },
    {
        name: "font",
        type: "font",
        path: "/ar/assets/fonts/droid_sans_regular.typeface.json" //"/fonts/droid_sans_regular.typeface.json"// 
    }


]