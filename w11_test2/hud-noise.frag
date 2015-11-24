// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform sampler2D u_tex1;
uniform vec2 u_tex1Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (in float x) {
    return fract(sin(x)*1e4);
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution.xy;
    vec2 m_st = st * 50. * mouse.x;
    vec2 i_st = floor(m_st);
    vec2 f_st = fract(m_st);


    vec2 offset = vec2(0.0);
    offset.y = texture2D(u_tex1,f_st).x;
    offset.x = 1. - texture2D(u_tex1,f_st).y;

    vec4 color = texture2D(u_tex0,st + offset + offset * (u_time));
    color.g = texture2D(u_tex0,st + offset + offset * (u_time * 0.1)).g;
    color.b = texture2D(u_tex0,st + offset + offset * (u_time * 2.0)).g;;






    gl_FragColor = color;
}