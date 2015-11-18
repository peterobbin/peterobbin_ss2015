#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265


float scope(float scale, float blurriness){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = 1.0 - distance(st,vec2(0.5)) * 2.0 * scale;

    pct = smoothstep(0.5, 0.5 + blurriness , pct);
    return pct;
}

vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

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
    st*= 5.0;
    st = fract(st);


    float sinT = sin(u_time * PI) * 0.5 + 0.5;
    float sinBeat = smoothstep(0.7, 0.9, sin(u_time * PI) * 0.5 + 0.9);
    float cosBeat = smoothstep(0.7, 0.9, cos(u_time * PI) * 0.5 + 0.9);
    vec3 color = vec3(0.0);



    
    vec3 circleMask = vec3(scope(1.0 * noise(u_time) + sinBeat, 0.5 * sinT ));

    color = mix(color, vec3(0.5 + 0.5 * cosBeat, 0.0, 0.0), circleMask);

    gl_FragColor = vec4( color, 1.0 );
}