import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'


// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
	var scene = new BABYLON.Scene(engine);
	
	//TODO::
    scene.clearColor = new BABYLON.Color4(0.2, 0.3, 0.2, 1);

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
	var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "heightMap.png", 
		{
			width: 100, 
			height: 100, 
			subdivisions: 50, 
			minHeight: 0, 
			maxHeight: 10
		}, 
		scene, false);
		
	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
	groundMaterial.diffuseTexture.uScale = 6;
	groundMaterial.diffuseTexture.vScale = 6;
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.position.y = -2.05;
	ground.material = groundMaterial;

	//TODO:: 
	
	const lightSphere = BABYLON.MeshBuilder.CreateSphere("sphere", 
		{
			segments: 10, 
			diameter: 2
		});
	lightSphere.position = light.position;
	const emissiveMaterial = new BABYLON.StandardMaterial("light", scene);
	emissiveMaterial.emissiveColor = new BABYLON.Color3(1, 1, 0);
	lightSphere.material = emissiveMaterial;
	
	var light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(30, 40, 20),
												new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
	light2.intensity = 0.5;

	var lightSphere2 = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 10, diameter: 2}, scene);
	lightSphere2.position = light2.position;
	lightSphere2.material = emissiveMaterial;
	
	const torus = BABYLON.MeshBuilder.CreateTorus("torus", {
		thickness: 2,
		diameter: 5
	}, scene);
	torus.position = new BABYLON.Vector3(0, 15, 0);

	const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	shadowGenerator.addShadowCaster(torus);
	// shadowGenerator.useExponentialShadowMap = true;

	shadowGenerator.useBlurExponentialShadowMap = true;
	shadowGenerator.useKernelBlur = true;
	shadowGenerator.blurKernel = 64;

	const shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light2);
	shadowGenerator2.addShadowCaster(torus);
	shadowGenerator2.usePoissonSampling = true;


	ground.receiveShadows = true;

	// Animations
	let alpha = 0;
	scene.registerBeforeRender(function () {
		torus.rotation.x += 0.01;
		torus.rotation.z += 0.02;

		torus.position = new BABYLON.Vector3(Math.cos(alpha) * 30, 10,
		Math.sin(alpha) * 30);
		alpha += 0.01;
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