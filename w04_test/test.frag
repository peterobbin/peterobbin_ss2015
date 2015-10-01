#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = (step(0.2, st.x) - step(0.8, st.x)) * (step(0.2, st.y) - step(0.8, st.y));
    gl_FragColor = vec4(vec3(pct), 1.0);
}