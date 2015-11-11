#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random(float x){
	return fract(sin(x)*8e4);
}


float random2(vec2 st){
	 return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123 );
}

float circleDF(vec2 st, float radius){
    st -= .5;
    return 1.0 - step(radius * 0.5, dot(st, st)*2.);

}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float d = distance( st, vec2(0.5));
    d = smoothstep(-1.5, 1.5, sin(d * 3.0 - u_time * 2.));

    float circle = circleDF(fract((st)  * 10.0), 1. * d);

    st *= vec2(20., 20.0); 
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);


    float sinT = sin(u_time * PI * 2.);

    vec2 time = vec2(0.0, 0.0);
    // if (sinT >= 0.0){
    //   time = vec2 (floor(10.0 * sin(u_time) ), 0.0);

    // }else{
    //   time = vec2 (0.0, floor(10.0 * cos(u_time)));

    // }

    time = vec2 (floor(sin(u_time) * 5.), floor(cos(u_time) * 5.0));



    

    if (mod(i_st.x, 1.0) == 0.){
      i_st.x += time.x;
    }

    if (mod(i_st.y, 1.0) == 0.){
      i_st.y += time.y;
    }


    float pct = random2(i_st) * circle ;


    vec3 color = vec3(step(0.6, pct) );

    gl_FragColor = vec4(color, 1.0);
}