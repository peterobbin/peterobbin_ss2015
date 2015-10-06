uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265
float sinT = sin(u_time) * 0.1;
float cosT = cos(u_time) * 0.1;

vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

vec3 tunnel(float x, float y, float w, float h, float r, float g, float b){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //vec3 color = vec3(0.0);
    

    float horizonal = smoothstep( x - 0.1 + sinT, x ,st.x) - smoothstep(x + w, x + w + 0.1  - sinT, st.x);   // Similar to ( X greater than 0.1 )
    float vertical = smoothstep( y - 0.1 + sinT, y ,st.y) - smoothstep(y + h, y + h + 0.1  - sinT, st.y); // Similar to ( Y greater than 0.1 )

    vec3 color = rgbNormalizer(vec3(r,g,b)) * horizonal * vertical;

    //vec3 colorGlich = mix(color,), 1.0);
    return color; 


}

void main(){

    float sinT2 = sin(u_time+ PI) * 0.1 ;
    float cosT2 = cos(u_time+ PI) * 0.1 ;
    
    vec3 shape = tunnel(0.5 + cosT * 3.0, 0.1, 0.6 * sinT * 0.1 + 0.2, 0.8, 255.0, 0.0, 0.0);
    shape +=  tunnel(0.5 + cosT2 * 3.0, 0.1, 0.6 * sinT * 0.1, 0.8, 0.0, 0.0, 255.0);
    gl_FragColor = vec4(shape,1.0);
}