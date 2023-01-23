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
        Math.PI / 4,
        Math.PI / 4,
        6,
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
    /**
     * Object
     */

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.y = 0.5;
    box.position.x = 2.5;
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    roof.position.x = 2.5;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});    

    let material = new BABYLON.StandardMaterial("Box Material", scene);
    material.diffuseColor = BABYLON.Color3.Green();
    // material.wireframe = true;
    box.material = material;

    var sphere0 = BABYLON.MeshBuilder.CreateSphere("sphere0", {}, scene);
	sphere0.position.x = -2.5;	
    sphere0.position.y = 1.22;
    sphere0.material = material;



    // Ray
    var rayBox = BABYLON.MeshBuilder.CreateBox("box", {size: 0.4}, scene);
    rayBox.position.y = 1.22;
    // rayBox.position.x = 2.5;
    rayBox.scaling.z = 2;
    var matBox = new BABYLON.StandardMaterial("matBox", scene);
    matBox.diffuseColor = new BABYLON.Color3(1.0, 0.1, 0.1);
    rayBox.material = matBox;
    rayBox.isPickable = false; 



    function mousemovef(){
	    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

	    if (pickResult.hit) {
		    var diffX = pickResult.pickedPoint.x - rayBox.position.x;
		    var diffY = pickResult.pickedPoint.z - rayBox.position.z;
		    rayBox.rotation.y = Math.atan2(diffX,diffY);			          
    	}	
    }
    function vecToLocal(vector, mesh){
        var m = mesh.getWorldMatrix();
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
		return v;		 
    }

    function castRay(){       
        var origin = rayBox.position;
        
	
	    var forward = new BABYLON.Vector3(0,0,1);		
	    forward = vecToLocal(forward, rayBox);
	
	    var direction = forward.subtract(origin);
	    direction = BABYLON.Vector3.Normalize(direction);
	
        // console.log("box origin ", origin);
        // console.log("forward: ", forward);
        // console.log("direction: ", direction);

	    var length = 20;
	
	    var ray = new BABYLON.Ray(origin, direction, length);

		let rayHelper = new BABYLON.RayHelper(ray);		
		rayHelper.show(scene);	

        var hit = scene.pickWithRay(ray);

        if (hit.pickedMesh){
		   hit.pickedMesh.scaling.y += 0.01;
	    }
    }

    scene.onPointerMove = function () {
        mousemovef();
    };
    
    scene.registerBeforeRender(function () {
        castRay();
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