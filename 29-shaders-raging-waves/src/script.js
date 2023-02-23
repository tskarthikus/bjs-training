import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'
import testVertexShader from './shaders/vertex.glsl'
import testFragmentShader from './shaders/fragment.glsl'


// console.log(testFragmentShader);

// Canvas
const canvas = document.getElementById("webgl"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function() {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);

    camera.attachControl(canvas, true);
	
	var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene);
    var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);   
    light2.intensity =0.5;

    BABYLON.Effect.ShadersStore["customVertexShader"] = testVertexShader;
    BABYLON.Effect.ShadersStore["customFragmentShader"] = testFragmentShader;

    var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertex: "custom",
        fragment: "custom",
	    },
        {
			attributes: ["position", "normal", "uv"],
			uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });


   var mainTexture = new BABYLON.Texture("amiga.jpg", scene);

    shaderMaterial.setTexture("textureSampler", mainTexture);

    shaderMaterial.backFaceCulling = false;

    //Create SPS of Boxes
    var boxes = 101; //odd number
    var box_size = 0.25; // must be float
    var box_gap = box_size/2;
    var box_spacing = box_size + box_gap;
    var box = BABYLON.MeshBuilder.CreateBox("box", {size:box_size}, scene);

    var boxes_SPS = new BABYLON.SolidParticleSystem("boxesSPS", scene, {updatable: false});
    
    //function to position boxes
    var set_boxes = function(particle, i, s) {   
        var mid_point = Math.floor(boxes/2);
        particle.position.x = (i - mid_point) * box_spacing + box_size/2;
    }

    boxes_SPS.addShape(box, boxes, {positionFunction:set_boxes});  
    var boxes = boxes_SPS.buildMesh(); // mesh of leaves
    box.dispose(); 

    boxes.material = shaderMaterial;
    boxes.material.setFloat("box_spacing", box_spacing)
                

    var time = 0.;
    scene.registerBeforeRender(function() {
        boxes.material.setFloat("time", time);
        time +=0.1;        
    });

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



