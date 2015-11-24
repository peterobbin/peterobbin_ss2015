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


float random(vec2 st){
     return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123 );
}

float noise(float x){

    float i = floor(x);
    float f = fract(x);
    return mix(random(i), random(i+1.0), smoothstep(0.0, 1.0,f));
}


float noise(vec2 xy){
    vec2 ipos = floor(xy);  // get the integer coords
    vec2 fpos = fract(xy);  // get the fractional coords


    float A = random(ipos);
    float B = random(ipos + vec2(1.0, .0));
    float C = random(ipos + vec2(0.0, 1.0));
    float D = random(ipos + vec2(1.0, 1.0));
    fpos = smoothstep(vec2(0.0), vec2(1.0), fpos);
    return mix(A,B,fpos.x) + (C-A)*fpos.y*(1.0- fpos.x) + (D - B) * fpos.x * fpos.y;

}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    st -= 0.5;
    float a = atan(st.y, st.x);
    st  += noise(vec2(a, u_time)) * 0.2;
    //pct = 1.0 - distance(st,vec2(0.5, 0.5)) * 5.0 * noise(sin(st.x + u_time)* 10.);
    pct = 1.0 - distance(st,vec2(0.5, 0.5)) ;

    pct = step(0.5, pct);


    vec3 color = vec3(pct);

    gl_FragColor = vec4( color, 1.0 );
}