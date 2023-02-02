import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'



// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);
    //TODO::
    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);

    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;


    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 4,
        Math.PI / 4,
        56,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );
      camera.attachControl(canvas, true);
  
      // Set some basic camera settings
      camera.minZ = -10; // clip at 1 meter
      camera.maxZ = 100;
  
      camera.panningSensibility = 0; // how fast do you pan, set to 0 if you don't want to allow panning
      camera.allowUpsideDown = false; // don't allow zooming inverted
      camera.lowerRadiusLimit = 1.55; // how close can you zoom
      camera.checkCollisions = true; // make the camera collide with meshes
      camera.collisionRadius = new BABYLON.Vector3(2, 2, 2); // how close can the camera go to other meshes
  
      camera.wheelPrecision = 80;
      camera.pinchPrecision = 80;    

// TODO:: <<
    // Material
    var matPlan = new BABYLON.StandardMaterial("matPlan1", scene);
    matPlan.backFaceCulling = false;
    matPlan.emissiveColor = new BABYLON.Color3(0.3, 0.7, 0.3);

    var matBB = new BABYLON.StandardMaterial("matBB", scene);
    matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
    matBB.wireframe = true;

    // Intersection point
    var pointToIntersect = new BABYLON.Vector3(-30, 0, 0);
    var origin = BABYLON.MeshBuilder.CreateSphere("origin", {segments: 4, diameter: 0.3} , scene);
    origin.position = pointToIntersect;
    origin.material = matPlan;

    // Create two planes
    var plan1 = BABYLON.MeshBuilder.CreatePlane("plane1", {size: 20}, scene);
    plan1.position = new BABYLON.Vector3(13, 0, 0);
    plan1.rotation.x = -Math.PI / 4;
    plan1.material = matPlan;

    var plan2 = BABYLON.MeshBuilder.CreatePlane("plane2", {size: 20}, scene);
    plan2.position = new BABYLON.Vector3(-13, 0, 0);
    plan2.rotation.x = -Math.PI / 4;
    plan2.material = matPlan;

    // OBB - Object boundind box
    var planOBB = BABYLON.MeshBuilder.CreateBox("OBB", {size: 20}, scene);
    planOBB.scaling = new BABYLON.Vector3(1, 1, 0.05);
    planOBB.parent = plan2;
    planOBB.material = matBB;

    var planAABB = BABYLON.MeshBuilder.CreateBox("AABB", {size: 20}, scene);
    planAABB.material = matBB;
    planAABB.position = new BABYLON.Vector3(13, 0, 0);
    planAABB.scaling = new BABYLON.Vector3(1, Math.cos(Math.PI / 4), Math.cos(Math.PI / 4));


    // Balloons
    var balloon1 = BABYLON.MeshBuilder.CreateSphere("balloon1", {segments:10, diameter: 2.0}, scene);
    var balloon2 = BABYLON.MeshBuilder.CreateSphere("balloon2", {segments:10, diameter:2.0}, scene);
    var balloon3 = BABYLON.MeshBuilder.CreateSphere("balloon3", {segments:10, diameter: 2.0}, scene);
    balloon1.material = new BABYLON.StandardMaterial("matBallon", scene);
    balloon2.material = new BABYLON.StandardMaterial("matBallon", scene);
    balloon3.material = new BABYLON.StandardMaterial("matBallon", scene);

    balloon1.position = new BABYLON.Vector3(6, 5, 0);
    balloon2.position = new BABYLON.Vector3(-6, 5, 0);
    balloon3.position = new BABYLON.Vector3(-30, 5, 0);

    //Animation
    let alpha = Math.PI;
    scene.registerBeforeRender(function () {
        if (balloon1.intersectsMesh(plan1, false)){
            balloon1.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
        } else {
            balloon1.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
        }

        if (balloon2.intersectsMesh(plan2, true)){
            balloon2.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
        } else {
            balloon2.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
        }

        if (balloon3.intersectsPoint(pointToIntersect)) {
            balloon3.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
        } else {
            balloon3.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        }

        alpha += 0.01;
        balloon1.position.y += Math.cos(alpha) / 10;
        balloon2.position.y = balloon1.position.y;
        balloon3.position.y = balloon1.position.y;
        
    });

    return {scene};
}
const {scene} = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene
/**
 * Animate
 */
engine.runRenderLoop(function () {
    scene.render();
});

const onResize = () => {
    canvas.width = getWidth();
    engine.resize();
}

// Watch for browser/canvas resize events
window.addEventListener("resize", onResize);