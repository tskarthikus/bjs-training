import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'



// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);
    //TODO::
    scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    /**
     * Object
     */
    // TODO:: <<
    // const mesh = BABYLON.MeshBuilder.CreateBox("mesh", {height: 1, width: 1, depth: 1});    
    // let material = new BABYLON.StandardMaterial("Box Material", scene);
    // material.diffuseColor = BABYLON.Color3.Red();
    // mesh.material = material;
    // TODO:: >>
    
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;

    // const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);        
    // camera.position.z = 3
    // // Targets the camera to scene origin
    // camera.setTarget(BABYLON.Vector3.Zero());
    // // This attaches the camera to the canvas
    // camera.attachControl(canvas, true);




    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        -Math.PI / 2,
        3,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );
      camera.attachControl(canvas, true);
  
      // Set some basic camera settings
      camera.minZ = -10; // clip at 1 meter
      camera.maxZ = 100;
  
      // camera.panningAxis = new Vector3(1, 0, 1) // pan along ground
      camera.panningSensibility = 0; // how fast do you pan, set to 0 if you don't want to allow panning
      // camera.panningOriginTarget = Vector3.Zero() // where does the panning distance limit originate from
      // camera.panningDistanceLimit = 100 // how far can you pan from the origin
  
      camera.allowUpsideDown = false; // don't allow zooming inverted
      camera.lowerRadiusLimit = 1.55; // how close can you zoom
    //   camera.upperRadiusLimit = 12.75; // how far out can you zoom
    //   camera.lowerBetaLimit = 0.9; // how high can you move the camera
    //   camera.upperBetaLimit = Math.PI / 2.5; // how low down can you move the camera
  
      camera.checkCollisions = true; // make the camera collide with meshes
      camera.collisionRadius = new BABYLON.Vector3(2, 2, 2); // how close can the camera go to other meshes
  
      camera.wheelPrecision = 80;
      camera.pinchPrecision = 80;    

// TODO:: <<
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.y = 0.5;
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});    

    let material = new BABYLON.StandardMaterial("Box Material", scene);
    material.diffuseColor = BABYLON.Color3.Red();
    material.wireframe = true;
    box.material = material;

    var sphere0 = BABYLON.MeshBuilder.CreateSphere("sphere0", {}, scene);
	sphere0.position.x = -1.5;	
    sphere0.position.y = 1.22;
    sphere0.material = material;

    sphere0.showBoundingBox = true;
    
    const myPoints = [
        new BABYLON.Vector3(-5, 0.5, 0),
        new BABYLON.Vector3(-3, 1.5, 0),
        new BABYLON.Vector3(-4, 0.5, 0)
    ]

    myPoints.push(myPoints[0]);

    const myColors = [
        new BABYLON.Color4(1, 0, 0, 1),
        new BABYLON.Color4(0, 1, 0, 1),
        new BABYLON.Color4(0, 0, 1, 1),
        new BABYLON.Color4(1, 1, 0, 1)
    ]
    
    const lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints, colors: myColors});


    //Array of paths to construct extrusion
    var myShape = [
        new BABYLON.Vector3(0, 5, 0),
    new BABYLON.Vector3(1, 1, 0),
    new BABYLON.Vector3(5, 0, 0),
    new BABYLON.Vector3(1, -1, 0),
    new BABYLON.Vector3(0, -5, 0),
    new BABYLON.Vector3(-1, -1, 0),
    new BABYLON.Vector3(-5, 0, 0),
    new BABYLON.Vector3(-1, 1, 0)
    ];

    myShape.push(myShape[0]);

    var myPath = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, 2),
    new BABYLON.Vector3(0, 0, 4),
    new BABYLON.Vector3(0, 0, 6),
    new BABYLON.Vector3(0, 0, 8),
    new BABYLON.Vector3(0, 0, 10)
    ];

	var scaling = function(i) {
		return 1;
        // return 1/i+1;
	};
	
	//Create custom extrusion with updatable parameter set to true for later changes
	var extrusion = BABYLON.MeshBuilder.ExtrudeShapeCustom("star", {shape: myShape, path: myPath, scaleFunction: scaling, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);

    scene.debugLayer.show({
    });

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