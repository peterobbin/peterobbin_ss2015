uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float sinT = sin(u_time) * 0.2;
    float cosT = cos(u_time) * 0.2;



    float h = smoothstep( 0.0 + sinT, 0.3 ,st.x) - smoothstep(0.7, 1.0  - sinT, st.x); 
    float v = smoothstep( 0.0 + sinT, 0.3 ,st.y) - smoothstep(0.7, 1.0  - sinT, st.y); 

   
    color = vec3( floor(h + v )); 


    gl_FragColor = vec4(color,1.0);
}