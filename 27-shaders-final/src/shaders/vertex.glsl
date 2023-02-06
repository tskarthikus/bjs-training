precision highp float;
// Attributes
attribute vec3 position;
attribute vec2 uv;

// Uniforms
// uniform mat4 worldViewProjection;
uniform mat4 projection;
uniform mat4 world;
uniform mat4 view;
uniform float time;
uniform float aRandom;

// Varying
varying vec2 vUV;
varying float vRandom;
varying float vTime;


void main(void) {
    // vec4 modelPosition = worldViewProjection * vec4(position, 1.0);
    // // modelPosition.z -= 2.5;
    // modelPosition.z += sin(modelPosition.y * 10.0) * 0.1;
    // gl_Position = modelPosition;
    vUV = uv;

    vRandom = aRandom;
    vTime = time;

    vec4 modelPosition = world * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * time) ;
    vec4 viewPosition = view * modelPosition;
    vec4 projectedPosition = projection * viewPosition;
    
    gl_Position = projectedPosition;    
}


