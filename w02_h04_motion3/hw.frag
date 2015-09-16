#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



float pcurve( float x , float offset)
{
    return smoothstep(-0.6, -1.1,sin(x * PI * 2.0 + PI - PI/2.0 - offset));
}

float bounce(float x){
    return abs(sin(x * PI)) * pow(x, -0.7);

}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mousePos = u_mouse/u_resolution;
    float wiggle = sin(u_time * 5.0);
 

    float pct = pcurve(st.x, 0.0);
    float decrease = (-u_time/ 10.0 + 1.0);
    if (decrease > 0.0){
            pct += pcurve(st.y, bounce(u_time) * (-st.y/ 6.0 + 1.0));
        }else{
            pct += pcurve(st.y, 0.0);
        }
    
    float colorR = smoothstep(1.0, 1.6, pct);
    vec3 color = vec3(colorR);
    
    gl_FragColor = vec4(color,1.0);
}