precision highp float;

varying float vRandom;
varying vec2 vUV;
uniform sampler2D textureSampler;

void main(void) {
    gl_FragColor = texture2D(textureSampler, vUV) * vec4(0.5, vRandom, 1.0, 1.0);
    // gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
}