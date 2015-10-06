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
    float horizonal = step(x ,st.x) - step(x + w, st.x); 
    float vertical = step( y ,st.y) - step(y + h , st.y);
    vec3 color = rgbNormalizer(vec3(r,g,b)) * horizonal * vertical;

    return color; 
}

vec3 tunnelMask(float x, float y, float w, float h, float a){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    x += w * 0.5;
    y += h * 0.5;
    float horizonal = step(x ,st.x) - step(x + w, st.x); 
    float vertical = step( y ,st.y) - step(y + h , st.y);
    vec3 color = vec3(a) * horizonal * vertical;

    return color; 
}

vec3 rectOutline(float x, float y, float w, float h, float a, float weight){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    x += w * 0.5;
    y += h * 0.5;
    vec3 color = vec3(0.0);
    float xhorizonal = step(x - weight* 0.5 ,st.x ) - step(x + weight* 0.5, st.x) + step(x+w - weight * 0.5, st.x) - step(x+w + weight * 0.5, st.x); 
    float xvertical = step(y - weight * 0.5,st.y) - step(y + h + weight * 0.5, st.y);

    float yhorizonal = step(y - weight* 0.5 ,st.y) - step(y + weight* 0.5, st.y) + step(y+h - weight * 0.5, st.y) - step(y+h + weight * 0.5, st.y); 
    float yvertical = step(x - weight * 0.5,st.x) - step(x + w + weight* 0.5, st.x);

    vec3 colorx = vec3(a) * xhorizonal * xvertical;
    vec3 colory = vec3(a) * yhorizonal * yvertical;
    color = colory + colorx;

    return color; 
}

void main(){

    float sinT2 = sin(u_time+ PI) * 0.1 ;
    float cosT2 = cos(u_time+ PI) * 0.1 ;
    vec3 color = vec3(0.0);

    //bg
    color = mix(color, vec3(1.0), rectOutline(0.0 , 0.0 , 0.5 +sinT, 0.5 + cosT, 1.0, 0.1));



    gl_FragColor = vec4(color,1.0);
}