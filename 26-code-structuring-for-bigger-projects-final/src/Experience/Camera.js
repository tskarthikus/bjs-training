// import * as THREE from 'three'
import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import Experience from './Experience.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), this.scene);
        this.instance.lowerBetaLimit = 0.1;
        this.instance.upperBetaLimit = (Math.PI / 2) * 0.9;
        this.instance.lowerRadiusLimit = 250;
        this.instance.upperRadiusLimit = 350;
        this.instance.attachControl(this.canvas, true);    
    }

    update()
    {
    }
}