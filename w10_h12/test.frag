// Author @patriciogv - 2015 modified by @peterobbin
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

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

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    pct = 1.0 - distance(vec2(noise(st.x + sin(noise(u_time + 249.))), st.y),vec2(0.5, 0.5)) * 10.0 * noise(sin(st.x + st.x + sin(noise(u_time*0.1)))* 30.) *  noise(sin(st.y + u_time)* 10.);

    pct = step(0.5, pct - 0.2* noise(u_time ));
    // b. The LENGTH of the vector 
    //    from the pixel to the center 
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector 
    //    from the pixel to the center 
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    vec3 color = vec3(pct);

    gl_FragColor = vec4( color, 1.0 );
}