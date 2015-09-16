#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


//Double-Circle Sigmoid
float pcurve( float x, float b )
{
    float y = sin((x + PI + b)* PI * 1.0);
    float c = smoothstep(0.7, 1.0, y);
    return c;
}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mousePos = u_mouse/u_resolution;

    float sinA = 0.0;
   
    if (mod(u_time , PI) < PI/8.0){
        sinA = abs(sin(u_time * 4.0));
    }
 

    float pct = pcurve(st.x, sinA * 2.0);
    pct -= smoothstep(-1.0, -0.8,sin(st.y * PI * 2.0 + PI - PI/2.0));



    vec3 color = vec3(pct);
    
    gl_FragColor = vec4(color,1.0);
}