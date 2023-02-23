// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;
uniform float box_spacing;
uniform float time;

// Normal
varying vec2 vUV;

void main(void) {
    vec3 p = position;
    float bn = floor(position.x / box_spacing);
    p.y = p.y + sin(time + bn/4.0);
    gl_Position = worldViewProjection * vec4(p, 1.0);

    vUV = uv;
}