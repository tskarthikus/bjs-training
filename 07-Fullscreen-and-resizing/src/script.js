import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'



// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);


    /**
     * Object
     */
    const mesh = BABYLON.MeshBuilder.CreateBox("mesh", {height: 1, width: 1, depth: 1});    
    let material = new BABYLON.StandardMaterial("Box Material", scene);
    material.diffuseColor = BABYLON.Color3.Red();
    mesh.material = material;
    
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;

    /**
     * Camera
     */
    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);        
    camera.position.z = 3
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    return {scene, mesh};
}
const {scene, mesh} = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene
/**
 * Animate
 */
let time = Date.now()
engine.runRenderLoop(function () {
    // Time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // Update objects
    mesh.rotation.x += 0.001 * deltaTime;

    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});