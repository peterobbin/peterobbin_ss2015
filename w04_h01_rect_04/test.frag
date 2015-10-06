uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265


vec3 tunnel(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //vec3 color = vec3(0.0);
    float sinT = sin(u_time) * 0.1;
    float cosT = cos(u_time) * 0.1;

    float h = smoothstep( 0.3 + sinT, 0.4 ,st.x) - smoothstep(0.6, 0.7  - sinT, st.x);   // Similar to ( X greater than 0.1 )
    float v = smoothstep( 0.3 + sinT, 0.4 ,st.y) - smoothstep(0.6, 0.7  - sinT, st.y); // Similar to ( Y greater than 0.1 )

    return vec3( h * v ); 

}

void main(){
    

    gl_FragColor = vec4(tunnel(),1.0);
}