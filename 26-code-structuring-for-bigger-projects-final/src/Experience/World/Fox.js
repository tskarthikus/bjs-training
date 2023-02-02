import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import "@babylonjs/loaders/glTF";
import Experience from '../Experience.js'

export default class Fox
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
        }

        // Resource
        this.resource = this.resources.items.foxModel

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        console.log(this.resources)
        BABYLON.SceneLoader.ImportMesh(
            "",
            this.resource[0],
            this.resource[1],
            this.scene,
            (meshes) => {                
                console.log("loaded success");
            }
        );        
    }

    setAnimation()
    {
    }

    update()
    {
    }
}