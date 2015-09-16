#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


//Double-Circle Sigmoid
float pcurve( float x , float offset)
{
    return smoothstep(-0.6, -1.1,sin(x * PI * 2.0 + PI - PI/2.0 - offset));
}

float opacity(float x, float offset){
    return (sin(x* 2.0 + PI * 3.0 / 2.0 + offset) + 1.0) * 0.5;

}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mousePos = u_mouse/u_resolution;
    float wiggle = sin(u_time * 5.0);
 

    float pct = pcurve(st.x, wiggle * 0.2);
    pct += pcurve(st.y, PI / 2.0);
    float colorR = smoothstep(1.0, 1.6, pct);
    vec3 color = vec3(colorR * opacity(u_time, 0.0 ), 0.0, 0.0);

    pct = pcurve(st.x, wiggle * 0.4);
    pct += pcurve(st.y, 0.0);
    float colorY = smoothstep(1.0, 1.6, pct);
    color += vec3(colorY * opacity(u_time, 0.3), colorY * opacity(u_time, 1.0), 0.0);

    pct = pcurve(st.x, wiggle * 0.6);
    pct += pcurve(st.y, - PI/2.0);
    float colorG = smoothstep(1.0, 1.6, pct);
    color += vec3(0.0, colorG* 0.9, colorG* 0.7);
    
    gl_FragColor = vec4(color * opacity(u_time, 0.6),1.0);
}