import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
        }

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight()
    {
        this.sunLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), this.scene);
        this.sunLight.position = new BABYLON.Vector3(20, 40, 20);
        this.sunLight.intensity = 0.6;

        // Debug
        if(this.debug.active)
        {
        }
    }

    setEnvironmentMap()
    {
        // Debug
        if(this.debug.active)
        {
        }
    }
}