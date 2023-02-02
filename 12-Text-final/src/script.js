import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'
import * as GUI from "@babylonjs/gui";
// import { MeshWriter } from "meshwriter";


// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);
    //TODO::

   
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;

    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);        
    camera.position.z = 3
    camera.panningSensibility = 0;

    camera.allowUpsideDown = false;
    camera.lowerRadiusLimit = 3.95;
    camera.upperRadiusLimit = 50;
    camera.wheelPrecision = 80;



    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    const mesh = BABYLON.MeshBuilder.CreateBox("mesh", {height: 1, width: 1, depth: 0.1});    
    let material = new BABYLON.StandardMaterial("Box Material", scene);
    mesh.material = material;
    mesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y ;

    var textureGround = new BABYLON.DynamicTexture("dynamictexture", {width:800, height:800}, scene);   
	material.diffuseTexture = textureGround;

    var torus = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.5, diameter: 0.8}, scene);
    torus.position.x = -4;

	var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 8, height: 4}, scene);	   
    ground.position.y = -2;

    // TODO:: <<
    //Add text to dynamic texture
    var font = "bold 200px monospace";
    let text = "texttt";
    textureGround.drawText(text, 75, 135, font, "green", "white", true, true);



    return {scene};
}
const {scene} = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene
/**
 * Animate
 */
let time = Date.now()
engine.runRenderLoop(function () {
    scene.render();
});

const onResize = () => {
    canvas.width = getWidth();
    engine.resize();
}

// Watch for browser/canvas resize events
window.addEventListener("resize", onResize);