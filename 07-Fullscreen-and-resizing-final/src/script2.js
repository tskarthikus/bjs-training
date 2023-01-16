// import * as BABYLON from "@babylonjs/core/Legacy/legacy";
// import './style.css'



// // Canvas
// const canvas = document.getElementById("webgl"); // Get the canvas element
// const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// const createScene = function () {
//     // Scene
//     const scene = new BABYLON.Scene(engine);


//     /**
//      * Object
//      */
//     let material = new BABYLON.StandardMaterial("Box Material", scene);
//     material.diffuseColor = BABYLON.Color3.Red();
//     /************Start Pilot*********************************/
//     var body = BABYLON.MeshBuilder.CreateCylinder("body", { height: 0.75, diameterTop: 0.2, diameterBottom: 0.5, tessellation: 6, subdivisions: 1 }, scene);
//     var arm = BABYLON.MeshBuilder.CreateBox("arm", { height: 0.75, width: 0.3, depth: 0.1875 }, scene);
//     arm.position.x = 0.125;
//     var pilot = BABYLON.Mesh.MergeMeshes([body, arm], true);
//     /*************End Pilot****************************************/

//     /************Set Center of Rotation (CoR) Position, Axis and Pilot Start Position********/
//     var CoR_At = new BABYLON.Vector3(1, 3, 2);
//     var axis = new BABYLON.Vector3(2, 6, 4);
//     var pilotStart = new BABYLON.Vector3(3, 6, 6);
//     pilot.position = pilotStart; 
//     pilot.material = material;
//     /****************Draw Axis and Sphere to show Pivot Position*****************/
//     var axisLine = BABYLON.MeshBuilder.CreateLines("axisLine", { points: [CoR_At.add(axis.scale(-50)), CoR_At.add(axis.scale(50))] }, scene);

//     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.25 }, scene);
//     /****************************************************************/
    
//     /**********Pilot Pivot*********/
//     //pivot translation to mesh starting position
//     var pivotTranslate = pilotStart.subtract(CoR_At);
//     pilot.setPivotMatrix(BABYLON.Matrix.Translation(pivotTranslate.x, pivotTranslate.y, pivotTranslate.z));
//     /***************************************************************/
    
//     /**********Pilot Position*********/
//     sphere.position = CoR_At;
//     /***************************************************************/
    
    
//     /**************Animation of Rotation**********/

//     /*-------------------Animation--------------------*/
//     var angle = 0.025;
//     scene.registerAfterRender(function () {
//         pilot.rotate(axis, angle, BABYLON.Space.LOCAL);
//     });
    
//     // Creates a light, aiming 0,1,0 - to the sky
//     const light = new BABYLON.HemisphericLight("light", 
//         new BABYLON.Vector3(0, 1, 0), scene);
//     // Dim the light a small amount - 0 to 1
//     light.intensity = 0.7;

//     /**
//      * Camera
//      */
//     const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);        
//     camera.position.z = 3
//     // Targets the camera to scene origin
//     camera.setTarget(BABYLON.Vector3.Zero());
//     // This attaches the camera to the canvas
//     camera.attachControl(canvas, true);
//     return {scene, pilot};
// }
// const {scene} = createScene(); //Call the createScene function


// // Register a render loop to repeatedly render the scene
// /**
//  * Animate
//  */

// engine.runRenderLoop(function () {
//     scene.render();
// });
// // Watch for browser/canvas resize events
// window.addEventListener("resize", function () {
//     engine.resize();
// });