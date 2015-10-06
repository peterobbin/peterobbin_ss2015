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
    //st -= 0.5;
    //st *= st* 2.0 - 2.0;

    
    st = st* 2. - 1.;
    //pct = (step(0.2, st.x) - step(0.8, st.x)) * (step(0.2, st.y) - step(0.8, st.y));
    //pct = 1.0 - length(abs(st) - 0.5);
    pct = 1.0-length(max(abs(st)- 0.3, 0.0));
   // pct = step(0.9, pct);
    float final = step(.9, pct) - step(0.92, pct);
    //pct = fract(pct * 10.0 + u_time);

    //pct = fract(length(st) * 22.0 + u_time);
    //pct = step(.5, pct);
    


    gl_FragColor = vec4(vec3(final), 1.0);
}