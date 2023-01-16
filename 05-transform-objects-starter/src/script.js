import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'



// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);


    // Mesh
    const cube1 = BABYLON.MeshBuilder.CreateBox("cube1", {height: 1, width: 1, depth: 1})


    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    let material = new BABYLON.StandardMaterial("Box Material", scene);
    material.diffuseColor = BABYLON.Color3.Red();
    cube1.material = material;
    
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;

    /**
     * Camera
     */
    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);            
    camera.position.z = 3


    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.radius = 2;

    let ortho = true;
    if (ortho){
        camera.mode = camera.ORTHOGRAPHIC_CAMERA;
        const rect = engine.getRenderingCanvasClientRect();
        const aspect = rect.height / rect.width;
    
        camera.orthoLeft = -camera.radius;
        camera.orthoRight = camera.radius;
        camera.orthoBottom = -camera.radius * aspect;
        camera.orthoTop = camera.radius * aspect;
   
    }

    camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);



    return {scene, cube1};
}
const {scene, cube1} = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
 

    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});