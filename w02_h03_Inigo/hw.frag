#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


//Double-Circle Sigmoid
float pcurve( float x, float a, float b )
{
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0 - x, b );
}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mousePos = u_mouse/u_resolution;
    float tsin = (sin(u_time * 2.0) + 1.0) / 2.0;
    float tcos = (cos(u_time * 2.0) + 1.0) / 2.0;

    float pct = pcurve(st.x, tsin + 3.0, tsin - 1.0);
    pct += pcurve(st.x, tsin - 1.0, tsin + 3.0);
    pct += pcurve(st.y, tcos - 1.0, 3.0 + tcos);
    pct += pcurve(st.y, tcos + 3.0, tcos - 1.0);



    vec3 color = vec3(pct);
    
    gl_FragColor = vec4(color,1.0);
}