const canvas = document.getElementById("webgl");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    // Camera
    const camera = new BABYLON.ArcRotateCamera("Camera", 
        3 * Math.PI / 4,
        Math.PI / 4,
        4,
        BABYLON.Vector3.Zero(), 
        scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Lights
    const light = new BABYLON.HemisphericLight("light",
        new BABYLON.Vector3(0, 1, 0),
        scene);
    light.intensity = 0.7;
    
    // Model
    const box = BABYLON.MeshBuilder.CreateBox("ground", 
        {width: 6, height: 6},
        scene
    );
    return scene;
}

const scene = createScene();

engine.runRenderLoop(function() {
    scene.render();
});

