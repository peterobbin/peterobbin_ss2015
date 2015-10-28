#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float circleDF(vec2 st, float radius){
    st -= .5;
    return 1.0 - step(radius * 0.5, dot(st, st)*2.);

}


float stripes(vec2 st){
    return step(st.y, st.x);

}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution; 
    vec3 color = vec3(0.0);



    float d = distance(st, vec2(0.5));
    d = smoothstep(-0.5, 1.0, sin(d * PI * 2.0 - u_time * 2.));


    st*= 10.;
    vec2 st_i = floor(st);
    //vec2 st_i = fract(st);

    if(mod(st_i.y, 2.) == 2. ){
        st.x += .5;
    }

    if(mod(st_i.x, 2.) == 1. ){
        st.x -= .5;
    }

  
    // if(mod(st_i.y, 2. ) == 1.){
    //     st.x -= 1. - st.x;
    // }
    vec2 st_f = fract(st);
    

    //color.rg = st_f;
    float pct = circleDF(st_f, d * 0.5);
    pct = stripes(vec2(st_f.x * d* 0.5, st_f.y *(1. - d * 0.5) ));
    //color += pct;
    
    color += pct;
    gl_FragColor = vec4(color, 1.0);
   
}