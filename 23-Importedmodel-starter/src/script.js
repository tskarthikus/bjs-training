import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'
import "@babylonjs/loaders/glTF"

// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);
    //TODO::

   
    // // // Creates a light, aiming 0,1,0 - to the sky
    const hemisphericLight = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    hemisphericLight.intensity = 0.1;

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

	var light = new BABYLON.PointLight("light", new BABYLON.Vector3(1.5, 1.5, 0), scene);
    light.intensity = 1.0;
	
	var light = new BABYLON.PointLight("light", new BABYLON.Vector3(-1.5, 1.5, 0), scene);
    light.intensity = 1.0;
        
    BABYLON.SceneLoader.ImportMesh(
        "",
        "/",
        "burger.glb",
        scene,
        function (meshes) {
            console.log("loaded successfully!")
        }
    )
    return {scene};
}
const {scene} = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene

engine.runRenderLoop(function () {

    scene.render();
});

const onResize = () => {
    engine.resize();
}

// Watch for browser/canvas resize events
window.addEventListener("resize", onResize);