import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'
import CANNON from "cannon";
import { bayerDitherFunctions } from "@babylonjs/core/Shaders/ShadersInclude/bayerDitherFunctions";


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
        46,
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

    camera.wheelPrecision = 40;
    camera.pinchPrecision = 80;    

    //TODO:: 


    // // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", 
    //     {diameter: 2, segments: 4}, scene);

    // // Move the sphere upward 1/2 its height
    // sphere.position.y = 10;
    // sphere.material = new BABYLON.StandardMaterial("s-mat", scene);
    // sphere.material.diffuseColor = new BABYLON.Color3(0.9, 0.1, 0.3);

    // // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    // var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: 66, height: 66}, scene);
    
    window.CANNON = CANNON;
    // scene.enablePhysics(
    //     new BABYLON.Vector3(0, -9.8, 0),
    //     new BABYLON.CannonJSPlugin()
    // );
    // const phyEngine = scene.getPhysicsEngine();
    // phyEngine.setSubTimeStep(1000 / 60);

    // sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
    //     sphere, 
    //     BABYLON.PhysicsImpostor.SphereImpostor,
    //     { mass: 1, restitution: 0.9}
    // );

    // ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    //     ground,
    //     BABYLON.PhysicsImpostor.BoxImpostor,
    //     { mass: 0, restitution: 0.9}
    // );

    // scene.registerBeforeRender(() => {
    //     sphere.rotate(BABYLON.Axis.Z, 0.1);
    //     sphere.position.z -= 0.1;
    // })
    
    // sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(3, 0, 3));
    // sphere.physicsImpostor.applyImpulse(
    //     new BABYLON.Vector3(1, 3, -1), 
    //     new BABYLON.Vector3(1, 2, 0));
    
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", 
    {diameter: 2, segments: 8}, scene);
    sphere.position.y = 8;

    var box = BABYLON.MeshBuilder.CreateBox("ground1", { size: 5}, scene)
    scene.enablePhysics();

    sphere.physicsImpostor = new 
        BABYLON.PhysicsImpostor(sphere, 
            BABYLON.PhysicsImpostor.SphereImpostor, 
            { mass: 0, restitution: 0.9 }, scene);
    box.physicsImpostor = new BABYLON.PhysicsImpostor(
        box, 
        BABYLON.PhysicsImpostor.BoxImpostor, 
        { mass: 1, restitution: 0.9 }, scene);

    var springJoint = new BABYLON.PhysicsJoint(
        BABYLON.PhysicsJoint.SpringJoint, {
            length: 8,
            stiffness: 1,
            damping: 0.1
        }
    )
    sphere.physicsImpostor.addJoint(box.physicsImpostor, springJoint);
    box.physicsImpostor.applyImpulse(
        new BABYLON.Vector3(1, 0, 1),
        box.getAbsolutePosition()
    );

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
    engine.resize();
}

// Watch for browser/canvas resize events
window.addEventListener("resize", onResize);