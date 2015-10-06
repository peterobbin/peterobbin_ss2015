uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float sinT = sin(u_time) * 0.1;


    // Each result will return 1.0 (white) or 0.0 (black).
    float h = step(0.1 + sinT,st.x) - step(0.9 - sinT, st.x);   // Similar to ( X greater than 0.1 )
    float v = step(0.1 + sinT,st.y) - step(0.9 - sinT, st.y); // Similar to ( Y greater than 0.1 )

    // The multiplication of left*bottom will be similar to the logical AND.
    color = vec3( h * v ); 

    gl_FragColor = vec4(color,1.0);
}