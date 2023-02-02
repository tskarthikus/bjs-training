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
    const cube1 = BABYLON.MeshBuilder.CreateBox("cube1", {height: 1, width: 2, depth: 2});    
    cube1.position.x = - 1.5
    const cube2 = BABYLON.MeshBuilder.CreateBox("cube2", {height: 1, width: 1, depth: 1});    
    cube2.position.x = 0
    const cube3 = BABYLON.MeshBuilder.CreateBox("cube3", {height: 1, width: 1, depth: 1});    
    cube3.position.x = 1.5

    //TODO:: <<
    new BABYLON.AxesViewer(scene, 5);

    const localAxes = new BABYLON.AxesViewer(scene, 1);
    localAxes.xAxis.parent = cube1;
    localAxes.yAxis.parent = cube1;
    localAxes.zAxis.parent = cube1;	
    
    cube3.parent = cube1;
    cube2.parent = cube1;

    console.log(cube1.position);
    
    cube1.translate(new BABYLON.Vector3(1, 1, 0).normalize(), 5, BABYLON.Space.WORLD);
    // cube1.position = new BABYLON.Vector3(1, 0, 0).multiply(0.1);
    // var boxes = BABYLON.Mesh.MergeMeshes([cube1, cube2, cube3]);
    cube1.rotation.x = Math.PI * 0.25
    cube1.scaling.x = 0.25
    // boxes.rotation.y = Math.PI * 0.25
    //TODO:: >>
    
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
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    return scene;
}
const scene = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});