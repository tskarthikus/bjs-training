import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'
import * as GUI from "@babylonjs/gui"

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
    camera.wheelPrecision = 40;



    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    const mesh = BABYLON.MeshBuilder.CreateBox("mesh", {height: 1, width: 1, depth: 1});    
    let material = new BABYLON.StandardMaterial("Box Material", scene);
    mesh.material = material;

    var textureGround = new BABYLON.DynamicTexture("dynamictexture",
    {
        width:800,
        height: 800
    }, scene);
    material.diffuseTexture = textureGround;

    var font = "bold 200px monospace";
    const text = "textttt";
    textureGround.drawText(text, 75, 135, font, "green", "white", true, true);

    var manager = new GUI.GUI3DManager(scene);

    var bioSlate = new GUI.HolographicSlate("bioSlate");
    manager.addControl(bioSlate);

    var bioGrid = new GUI.Grid("bioGrid");
    var bioText = new GUI.TextBlock("bioText");

    bioText.width = 0.75;
    bioText.height = 0.55;
    bioText.color = "white";
    bioText.textWrapping = GUI.TextWrapping.WordWrap;
    bioText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    bioText.setPadding("0%", "5%", "0%", "0%");
    bioText.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    bioText.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    bioText.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    bioGrid.addControl(bioText);
    bioGrid.background = "#FF0080";
    bioSlate.content = bioGrid;

// TODO:: >>

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