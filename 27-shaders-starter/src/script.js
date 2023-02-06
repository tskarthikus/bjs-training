import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


// console.log(testFragmentShader);

// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);


    /**
     * Object
     */
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:1, width: 1}); 
    
    
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    let material = new BABYLON.StandardMaterial("Box Material", scene);
    material.diffuseColor = BABYLON.Color3.Red();
    plane.material = material;
    plane.material.backFaceCulling = false;
    

    // Shaders
    BABYLON.Effect.ShadersStore["customVertexShader"] = vertexShader;
    BABYLON.Effect.ShadersStore["customFragmentShader"] = fragmentShader;

    const shaderMaterial = new BABYLON.ShaderMaterial(
        "shader",
        scene,
        {
            vertex: "custom",
            fragment: "custom"
        },
        {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", 
                "view", "projection"],
        },
    );

    const mainTexture = new BABYLON.Texture("amiga.jpg", scene);
    shaderMaterial.setTexture("textureSampler", mainTexture);

    plane.material = shaderMaterial;
    plane.material.backFaceCulling = false;

    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(1, 0, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.9;

    var time = 0.;
    scene.registerBeforeRender(function() {
        plane.material.setFloat("time", time);
        plane.material.setFloat("aRandom", Math.random());
        time +=0.1;
    })
    /**
     * Camera
     */
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, -Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);        
    
    // Targets the camera to scene origin
    camera.setTarget(plane);
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


