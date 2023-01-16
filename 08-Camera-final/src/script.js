import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'



// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);

    //TODO::
    scene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

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

    // Add a rotatable camera with a radius of 3 units and point it to the center of the scene.
    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 3, new BABYLON.Vector3(0, 0, 0), scene);
    // TODO:: <<
    let ortho = false;

    if(ortho) {
        // In BabylonJS the orthographic projection is available for all camera types.
        camera.mode = camera.ORTHOGRAPHIC_CAMERA;
        // For the orthographic camera mode we need to set the left, right, bottom and
        // top boundaries. Usually you'll want to maintain the aspect ratio of the
        // renderer canvas.
        const rect   = engine.getRenderingCanvasClientRect();
        const aspect = rect.height / rect.width; 
        // In this example we'll set the distance based on the camera's radius.
        camera.orthoLeft   = -camera.radius;
        camera.orthoRight  =  camera.radius;
        camera.orthoBottom = -camera.radius * aspect;
        camera.orthoTop    =  camera.radius * aspect;    
    }

    // Prevent zooming by setting the lower and upper radius boundaries to the current radius.
    camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
    // Attach the camera to the canvas and prevent default events.
    camera.attachControl(canvas, true);  
    // TODO:: >>

    return {scene, mesh};
}
const {scene, mesh} = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene
/**
 * Animate
 */
let time = Date.now()
engine.runRenderLoop(function () {
    // // Time
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    // // Update objects
    // mesh.rotation.x += 0.001 * deltaTime;

    scene.render();
});

const onResize = () => {
    canvas.width = getWidth();
    engine.resize();
}

// Watch for browser/canvas resize events
window.addEventListener("resize", onResize);