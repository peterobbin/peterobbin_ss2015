// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// photo credit http://www.nationalmediamuseum.org.uk/globalmedia/nmem/29994_2.JPG

// Phenakistoscope

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}


void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution.xy;
    vec2 originST = st;

    //mouse matching position
    mouse -= vec2(0.5);
    //st -= mouse;
    // move space from the center to the vec2(0.0)
    st -= vec2(0.5);

   
    // rotate the space
    st = rotate2d( u_time * 37.6  + (mouse.x - 0.5) * 10.) * st;
    // move it back to the original place
    st += vec2(0.5);

    
    
    st *= 1.;
    vec4 color = vec4(st.x,st.y,0.0,1.0);



    // Each result will return 1.0 (white) or 0.0 (black).
    float h = step(0.45,originST.x) - step(0.55, originST.x);   // Similar to ( X greater than 0.1 )
    float v = step(0.6,originST.y) - step(0.95, originST.y); // Similar to ( Y greater than 0.1 )

    // The multiplication of left*bottom will be similar to the logical AND.
   // color = vec3( h * v ); 

    color = texture2D(u_tex0,st);
    color.a = h*v;

    gl_FragColor = color;
}