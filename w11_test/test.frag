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

float noise(float x){

    float i = floor(x);
    float f = fract(x);
    return mix(random(i), random(i+1.0), smoothstep(0.0, 1.0,f));
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    st *= vec2(30., 2.0); 
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float time = floor(u_time * 10.0);
    float pct = noise(random(time+ i_st.x));
    //pct = random2(i_st + vec2(0. , time));

   // vec3 color = vec3(random(time + f_st.x * 10.0));

   if (i_st.y == 1.){
        f_st.y = 1. - f_st.y;

   }

    vec3 color = vec3 (step( pct, f_st.y)) - step(.7, f_st.x);
    //color = vec3(pct);
    //color = mix(color * random(f_st.x * 999.0 + time), vec3(-sin(st.y * 0.5 + 2.0)), 0.5);
    //color = mix(color * sin(i_st.x + u_time * 8.0), vec3(-sin(st.y * 0.5 + 2.0)), 0.5);
    //color = vec3(step(0.5, color.x));
    gl_FragColor = vec4(color, 1.0);
}