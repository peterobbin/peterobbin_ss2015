// Author @patriciogv - 2015, modified by @peterobbin
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float sinT = sin(u_time ) * 0.5 + 0.5;
    float cosT = cos(u_time ) * 0.5 + 0.5;

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*3.0;
    float a = atan(pos.y,pos.x);

    float f = cos(a * 6.);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    f = abs(cos(a*12.0 + sinT)*sin(a*3.0 + cosT))*0.8+0.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    color = vec3( 1.0 - smoothstep(f,f+0.2,r) );

    gl_FragColor = vec4(color, 1.0);
}