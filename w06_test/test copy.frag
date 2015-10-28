#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float Flare1(float x){
    return smoothstep(0.0, 1.0, (1.- pow(x, 2.0) * 5. + 0.1) * 0.5);
}

float Flare2(float x){
    return  (1.0 - smoothstep(0.0, 1.0, pow(max(0.0, abs(x) * 5.0 - 0.004), 0.5)) * 5.0) * 0.5;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mousePos = u_mouse/u_resolution;
    float pct = Flare1(st.x - mousePos.x);
    pct += Flare2(st.y - mousePos.y);

    vec3 color = vec3(pct* 1.0);
    
    gl_FragColor = vec4(color,1.0);
}