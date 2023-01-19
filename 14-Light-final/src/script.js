import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'


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
    hemisphericLight.intensity = 0.2;

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

    const box = BABYLON.MeshBuilder.CreateBox("mesh", {height: 1, width: 1, depth: 1});    
    let material = new BABYLON.StandardMaterial("Box Material", scene);
    box.material = material;

	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
	sphere.position.x = 2;		
    sphere.material = material;

    //Creation of a torus from torus shape
	var torus = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.5, diameter: 0.7}, scene);
    torus.position.x = -2;
    // The color can be introduced using light

	// var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 5, 0), scene);
	// light.diffuse = new BABYLON.Color3(1, 0, 0);
	// light.specular = new BABYLON.Color3(0, 1, 0);

	//Light direction is directly down
	// var directionalLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
	// directionalLight.diffuse = new BABYLON.Color3(1, 0, 0);
	// directionalLight.specular = new BABYLON.Color3(0, 1, 0);
    
	// // // //Light direction is directly down from a position one unit up, slow decay
	// var light = new BABYLON.SpotLight("spotLight", 
    //     new BABYLON.Vector3(-1, 1, -1), 
    //     new BABYLON.Vector3(0, -1, 0), 
    //     Math.PI / 2, 
    //     10, 
    //     scene);
	// light.diffuse = new BABYLON.Color3(1, 0, 0);
	// light.specular = new BABYLON.Color3(0, 1, 0);
	
	// // //Light direction is directly down from a position one unit up, fast decay
	// var light1 = new BABYLON.SpotLight("spotLight1", 
    //     new BABYLON.Vector3(1, 1, 1), 
    //     new BABYLON.Vector3(0, -1, 0), 
    //     Math.PI / 2, 
    //     50, 
    //     scene);
	// light1.diffuse = new BABYLON.Color3(0, 1, 0);
	// light1.specular = new BABYLON.Color3(0, 1, 0);
    // light1.intensity = 0.2

	// //red light
	// var light0 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-Math.cos(Math.PI/6), 1 , -Math.sin(Math.PI/6)), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	// light0.diffuse = new BABYLON.Color3(1, 0, 0);
	
	// //green light
	// var light1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(0, 1, 1 - Math.sin(Math.PI / 6)), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	// light1.diffuse = new BABYLON.Color3(0, 1, 0);
	
	// //blue light
	// var light2 = new BABYLON.SpotLight("spotLight2", new BABYLON.Vector3(Math.cos(Math.PI/6), 1, -Math.sin(Math.PI/6)), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	// light2.diffuse = new BABYLON.Color3(0, 0, 1);

	// var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4}, scene);	   
    // ground.position.y = 0;
    
    // For point and spot lights you can set how far the light reaches using the range property
    // light.range = 100;
    // light.setEnabled(false);
    // light0.excludedMeshes.push(sphere, box, torus);
    // light1.excludedMeshes.push(sphere, box, torus);	
    // light2.excludedMeshes.push(sphere, box, torus);	


    // Performance 
        // Lights are great and can be realistic if well used. The problem is that lights can cost a lot when it comes to performance. The GPU will have to do many calculations like the distance from the face to the light, how much that face is facing the light, if the face is in the spot light cone, etc.
        // Try to add as few lights as possible and try to use the lights that cost less.
    
    // Minimal cost:
        // AmbientLight
        // HemisphereLight

    // Moderate cost:
        // DirectionalLight
        // PointLight

    // High cost:
        // SpotLight
        // RectAreaLight

        // var g = new BABYLON.LightGizmo();
        // g.light = light0;
    

    //     var groundTerrain = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "heightMap.png", {width: 100, height: 100, subdivisions: 50, minHeight: 0, maxHeight: 10}, scene, false);
    //     var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    //     groundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
    //     groundMaterial.diffuseTexture.uScale = 6;
    //     groundMaterial.diffuseTexture.vScale = 6;
    //     groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    //     groundTerrain.position.y = -20.05;
    //     groundTerrain.material = groundMaterial;        
    
	// // spot
	// var spotLight = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(30, 40, 30),
	// 	new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
	// spotLight.projectionTexture = new BABYLON.Texture("co.png", scene);
	// spotLight.setDirectionToTarget(BABYLON.Vector3.Zero());
	// spotLight.intensity = 1.5;

    //     /**
    //  * Animate
    //  */

    // var alpha = 0;
    // scene.registerBeforeRender(function () {
    //     spotLight.position = new BABYLON.Vector3(Math.cos(alpha) * 60, 40, Math.sin(alpha) * 60);
    //     spotLight.setDirectionToTarget(BABYLON.Vector3.Zero());
    //     alpha += 0.01;
    // });

    return {scene};
}
const {scene} = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene

engine.runRenderLoop(function () {

    scene.render();
});

const onResize = () => {
    canvas.width = getWidth();
    engine.resize();
}

// Watch for browser/canvas resize events
window.addEventListener("resize", onResize);