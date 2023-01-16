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
    // TODO::<<
    // gsap.to(mesh.rotation, {y:12, x:5, duration:4, repeat:-1, yoyo:true})
    // gsap.to(mesh.position, {x:5, duration:4, repeat:-1, yoyo:true})
    // gsap.to(mesh.scaling, {y:0.5, duration:2, repeat:-1, yoyo:true})
    // TODO::>>

    return {scene, mesh};
}
const {scene, mesh} = createScene(); //Call the createScene function




// Register a render loop to repeatedly render the scene
/**
 * Animate
 */
var t = 0;
engine.runRenderLoop(function () {
    // TODO::<<
    t -= 0.00007;

    // // Update objects
    mesh.rotation.x += t;

    // t -= 0.01;
    // mesh.position.x = Math.sin(t * 3);
    // mesh.position.y = Math.cos(t * 3);
    // TODO::>>

    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});