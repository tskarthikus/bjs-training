import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import './style.css'
import testVertexShader from './shaders/vertex.glsl'
import testFragmentShader from './shaders/fragment.glsl'


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
    


    BABYLON.Effect.ShadersStore["customVertexShader"] = testVertexShader;
    BABYLON.Effect.ShadersStore["customFragmentShader"] = testFragmentShader;

    const shaderMaterial = new BABYLON.ShaderMaterial(
        "shader",
        scene,
        {
          vertex: "custom",
          fragment: "custom",
        },
        {
          attributes: ["position", "normal", "uv"],
          uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
        },
    );
    
    const mainTexture = new BABYLON.Texture("amiga.jpg", scene);
    shaderMaterial.setTexture("textureSampler", mainTexture);

    plane.material = shaderMaterial;
    plane.material.backFaceCulling = false;
    


    // var colors = plane.getVerticesData(BABYLON.VertexBuffer.ColorKind);
    // if(!colors) {
    //     colors = [];

    //     var positions = plane.getVerticesData(BABYLON.VertexBuffer.PositionKind);

    //     for(var p = 0; p < positions.length / 3; p++) {
    //         colors.push(Math.random(), Math.random(), Math.random(), 1);
    //     }
    // }
    // plane.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors);
    
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(-1, 0, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;

    /**
     * Camera
     */
    const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, -Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);        
    
    // Targets the camera to scene origin
    camera.setTarget(plane);
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    let time = 0.;
    scene.registerBeforeRender(function() {
        // console.log(Math.random());
        plane.material.setFloat("aRandom", Math.random());
        plane.material.setFloat("time", time);
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




    // BABYLON.Effect.ShadersStore[customVertexShader]=    
	// 	precision highp float;

    // 	// Attributes
    // 	attribute vec3 position;
    //     attribute vec3 normal;
    // 	attribute vec2 uv;

    // 	// Uniforms
    // 	uniform mat4 worldViewProjection;
    //     uniform float box_spacing;
    //     uniform float time;

    // 	// Varying
    // 	varying vec2 vUV;

    // 	void main(void) {
    //         vec3 p = position;
    //         float bn = floor(position.x / box_spacing);
    //         p.y = p.y + sin(time + bn/4.0);
    // 	    gl_Position = worldViewProjection * vec4(p, 1.0);

    // 	    vUV = uv;
    // 	};




    //  precision highp float;

// 	varying vec2 vUV;

// 	uniform sampler2D textureSampler;

// 	void main(void) {
// 	    gl_FragColor = texture2D(textureSampler, vUV);
// 	};




// var mainTexture = new BABYLON.Texture("amiga.jpg", scene);

// shaderMaterial.setTexture("textureSampler", mainTexture);

// shaderMaterial.backFaceCulling = false;

// //Create SPS of Boxes
// var boxes = 101; //odd number
// var box_size = 0.25; // must be float
// var box_gap = box_size/2;
// var box_spacing = box_size + box_gap;
// var box = BABYLON.MeshBuilder.CreateBox("box", {size:box_size}, scene);

// var boxes_SPS = new BABYLON.SolidParticleSystem("boxesSPS", scene, {updatable: false});

// //function to position boxes
// var set_boxes = function(particle, i, s) {   
//     var mid_point = Math.floor(boxes/2);
//     particle.position.x = (i - mid_point) * box_spacing + box_size/2;
// }

// boxes_SPS.addShape(box, boxes, {positionFunction:set_boxes});  
// var boxes = boxes_SPS.buildMesh(); // mesh of leaves
// box.dispose(); 

// boxes.material = shaderMaterial;
// boxes.material.setFloat("box_spacing", box_spacing)
            

// var time = 0.;
// scene.registerBeforeRender(function() {
//     boxes.material.setFloat("time", time);
//     time +=0.1;        
// });