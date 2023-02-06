precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
varying float vRandom;
varying float vTime;
void main(void) {
    // gl_FragColor = texture2D(textureSampler, vUV) * vec4(0.5, vRandom, 1.0, 1.0);
    gl_FragColor = vec4(0.5, 0.4, 1.0, 1.0);
}

