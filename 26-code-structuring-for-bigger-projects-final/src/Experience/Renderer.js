import Experience from './Experience.js'
import * as BABYLON from "@babylonjs/core/Legacy/legacy";

export default class Renderer
{
    constructor(engine)
    {
        this.engine = engine
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {

    }

    resize()
    {
        this.engine.resize();
    }

    update()
    {
        this.scene.render();
    }
}