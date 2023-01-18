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
    //TODO::
    const box = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 1, depth: 1});    

    let material = new BABYLON.StandardMaterial("Box Material", scene);
    box.material = material;
    material.diffuseTexture = new BABYLON.Texture("/textures/door/color.jpg", scene);
    // material.diffuseTexture.uScale = 2;
    // material.diffuseTexture.vScale = 4;
    // material.diffuseTexture.uOffset = 0.25;
    // material.diffuseTexture.vOffset = 0.5;

    // material.bumpTexture = new BABYLON.Texture("/textures/door/normal.jpg", scene);
    // material.ambientTexture = new BABYLON.Texture("/textures/door/ambientOcclusion.jpg", scene);

    // let matPBR = new BABYLON.PBRMaterial("matpbr", scene);
    // matPBR.metallic = 0.9;
    // matPBR.roughness = 0.2;
    // matPBR.albedoTexture = new BABYLON.Texture("/textures/door/color.jpg", scene);
    // matPBR.bumpTexture = new BABYLON.Texture("/textures/door/normal.jpg", scene);
    // matPBR.bumpTexture.level = 0.34;

    // matPBR.ambientTexture = new BABYLON.Texture("/textures/door/ambientOcclusion.jpg", scene);
    // matPBR.detailMap.roughnessBlendLevel = 0.25;
    // matPBR.metallicTexture = new BABYLON.Texture("/textures/door/metalness.jpg", scene);
    // box.material = matPBR;

    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:10.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/textures/skybox/", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;	

    // TODO:: >>

    // LIGHTS

    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.75;

    /**
     * Camera
     */
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