import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import './style.css'

// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function() {
    // Scene
    const scene = new BABYLON.Scene(engine);

    const box = BABYLON.MeshBuilder.CreateBox("box", {
        height:1, 
        width: 1,
        depth: 1 
    });

    // Material
    let material = new BABYLON.StandardMaterial("Box material", scene);
    material.diffuseColor = BABYLON.Color3.Red();
    box.material = material;

    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
    new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;

    // Camera
    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);        
    camera.position.z = 3

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    return scene;
}

const scene = createScene();

engine.runRenderLoop(function() {
    scene.render();
});

window.addEventListener("resize", function(){
    engine.resize();
});


