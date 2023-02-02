import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setMesh()
        this.setMaterial()
        
    }

    setMaterial()
    {
        this.material = new BABYLON.StandardMaterial("ground", this.scene);
        this.material.diffuseTexture = new BABYLON.Texture(this.resources.items["ground"], this.scene);
        this.material.diffuseTexture.uScale = 6;
        this.material.diffuseTexture.vScale = 6;
        this.material.specularColor = new BABYLON.Color3(0, 0, 0);
        this.ground.material = this.material;        
    }

    setMesh()
    {
        console.log("############### resouce: ", this.resources.items)
        this.ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", 
            this.resources.items["groundHeightMap"],            
            {width: 300, height: 300, subdivisions: 50, minHeight: 0, maxHeight: 10}, 
            this.scene, 
            false);
    }
}