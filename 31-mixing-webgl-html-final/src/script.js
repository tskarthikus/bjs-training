import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import "@babylonjs/loaders/glTF";
import './style.css'
  


// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
/**
 * Loaders
 */
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    if (document.getElementById("customLoadingScreenDiv")) {
        // Do not add a loading screen if there is already one
        document.getElementById("customLoadingScreenDiv").style.display = "initial";
        return;
    }
    this._loadingDiv = document.createElement("div");
    this._loadingDiv.id = "customLoadingScreenDiv";
    this._loadingDiv.innerHTML = "scene is currently loading";
    var customLoadingScreenCss = document.createElement('style');
    customLoadingScreenCss.type = 'text/css';
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        background-color: #222222cc;
        color: white;
        font-size:50px;
        text-align:center;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
    this._resizeLoadingUI();
    window.addEventListener("resize", this._resizeLoadingUI);
    document.body.appendChild(this._loadingDiv);
}
BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
    window.setTimeout(() =>
    {
        document.getElementById("customLoadingScreenDiv").style.display = "none";
        document.getElementById("loader").style.display = "none";
        console.log("scene is now loaded");
    }, 2000)
}

const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
let sceneReady = false

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Points of interest
 */

const points = [
    {
        position: new BABYLON.Vector3(-0.15, 0.3, - 0.6),
        element: document.querySelector('.point-0')
    },
    {
        position: new BABYLON.Vector3(0.1, -0.1, - 1.6),
        element: document.querySelector('.point-1')
    },
    {
        position: new BABYLON.Vector3(0.2, 0.1, - 0.7),
        element: document.querySelector('.point-2')
    }
]

const createScene = function () {
    // Scene
    const scene = new BABYLON.Scene(engine);
    engine.displayLoadingUI();
    //TODO::


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

    BABYLON.SceneLoader.ImportMesh(
        "",
        "/gltf/",
        "DamagedHelmet.gltf",
        scene,
        function (meshes) {          
            // camera.setTarget(meshes[0], true, true);
            console.log("loaded successfully!")
            window.setTimeout(() =>
            {
                engine.hideLoadingUI();
                sceneReady = true
            }, 2000)
    });

    // // Create a default skybox with an environment.
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("environment.env", scene);
    var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

    return {scene};
}
const {scene} = createScene(); //Call the createScene function


// Register a render loop to repeatedly render the scene

engine.runRenderLoop(function () {
    // Update points only when the scene is ready
    if(sceneReady)
    {
        // Go through each point
        for(const point of points)
        {
            // Get 2D screen position
            const screenPosition = point.position.clone()            

            // Show
            point.element.classList.add('visible')
            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }

    scene.render();
});

const onResize = () => {
    engine.resize();
}

// Watch for browser/canvas resize events
window.addEventListener("resize", onResize);