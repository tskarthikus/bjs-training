import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'


// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
	var scene = new BABYLON.Scene(engine);
	
	//TODO::
    scene.clearColor = new BABYLON.Color4(0.4, 0.3, 0.2, 1);

	// Setup environment
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 30;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);

	// light1
	var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);
	light.intensity = 0.5;


	// Ground
	var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "heightMap.png", {width: 100, height: 100, subdivisions: 50, minHeight: 0, maxHeight: 10}, scene, false);
	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
	groundMaterial.diffuseTexture.uScale = 6;
	groundMaterial.diffuseTexture.vScale = 6;
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.position.y = -2.05;
	ground.material = groundMaterial;


	
	
	// Animations
	scene.registerBeforeRender(function () {

	});

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