// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

//custom function
vec2 fixSt(vec2 st){
    st -= vec2(0.5);
    st = scale( vec2(0.5) ) * st;
    st += vec2(0.5);

    // Fix the proportions by finding the aspect ration
    float aspect = u_tex0Resolution.x/u_tex0Resolution.y;
    float offsetFix = (1.0 - 1.0 / aspect) * 0.5;
    st.y -= offsetFix;
    st.y *= aspect;  // and then applying to it

    return st;

}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(0.0);

            
    st = fixSt(st);
    

    color = texture2D(u_tex0,st);

    gl_FragColor = color;
}