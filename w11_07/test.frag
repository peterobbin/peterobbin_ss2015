
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

//kinda kaleidoscope




mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}


void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // move space from the center to the vec2(0.0)
    st -= vec2(0.5);
    // rotate the space
    st = rotate2d(u_time ) * st;
    // scale
    st = scale( vec2(sin(u_time) * 0.5 + 1.0)  ) * st;
    // move it back to the original place
    st += vec2(0.5);


    st -= .5;
    st *= 5.;

    vec2 stAlias = st;
    
    st.x *= stAlias.y;
    st.y /= stAlias.x;

    st.x += u_time;
    st.y -= u_time;
    vec4 color = vec4(st.x,st.y,0.0,1.0);

    color = texture2D(u_tex0,st);

    gl_FragColor = color;
}