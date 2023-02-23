// Attributes
attribute vec3 position;
attribute vec2 uv;

// Uniforms
// uniform mat4 worldViewProjection;
uniform mat4 projection;
uniform mat4 world;
uniform mat4 view;

// Varying
varying vec2 vUv;


void main(void) {
    gl_Position = projection * view * vec4(position, 1.0);
    vUv = uv;
}


