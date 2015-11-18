#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359


float sinT = sin(u_time) * 0.1;
float cosT = cos(u_time) * 0.1;



float easeInOutQuint(float t, float b, float c, float d) {
    t /= d/2.0;
    if (t < 1.0) return c/2.0*t*t*t*t*t + b;
    t -= 2.0;
    return c/2.0*(t*t*t*t*t + 2.0) + b;
}

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
// Value noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ), 
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ), 
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}


mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}


vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

vec3 tunnelNorm(float x, float y, float w, float h, float r, float g, float b){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //vec3 color = vec3(0.0);
    st *= 1.;
    st = fract(st);
    //st = rotate2d(noise(st/0.2 - u_time))*st;
    

    float horizonal = smoothstep( x - 0.1, x - 0.05 ,st.x) - smoothstep(x + w, x + w  + 0.05, st.x);   // Similar to ( X greater than 0.1 )
    float vertical = smoothstep( y - 0.1, y - 0.05 ,st.y) - smoothstep(y + h, y + h + 0.05, st.y); // Similar to ( Y greater than 0.1 )

    vec3 color = rgbNormalizer(vec3(r,g,b)) * horizonal * vertical;

    //vec3 colorGlich = mix(color,), 1.0);
    return color; 
}

vec3 tunnel(float x, float y, float w, float h, float r, float g, float b){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //vec3 color = vec3(0.0);
    st *= 1.;
    st = fract(st);
    st = rotate2d(noise(st/0.2 - u_time))*st;
    

    float horizonal = smoothstep( x - 0.1, x ,st.x) - smoothstep(x + w, x + w + 0.1 , st.x);   // Similar to ( X greater than 0.1 )
    float vertical = smoothstep( y - 0.1, y ,st.y) - smoothstep(y + h, y + h + 0.1, st.y); // Similar to ( Y greater than 0.1 )

    vec3 color = rgbNormalizer(vec3(r,g,b)) * horizonal * vertical;

    //vec3 colorGlich = mix(color,), 1.0);
    return color; 
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);



    float sinT2 = sin(u_time+ PI) * 0.1 ;
    float cosT2 = cos(u_time+ PI) * 0.1 ;
    
    vec3 shape = tunnel(0.5 * noise(u_time), 0.05, 0.6 * sinT * 0.1 + 0.3, 0.89, 255.0, 0.0, 0.0);

    shape+= tunnel(2. * noise(u_time* 0.2 + 999.), -0.5, 0.8 * sinT * 0.1 + 0.3, 1.2, 233.0, 22.0, 78.0);
    shape+= tunnel(2. * noise(u_time* 0.2 + 333.), -0.5, 0.8 * sinT * 0.1 + 0.3, 1.2, 55.0, 66.0, 123.0);
    shape+= tunnel(2. * noise(u_time* 0.2 + 333.), -0.5, 0.8 * sinT * 0.1 + 0.3, 1.2, 55.0, 66.0, 123.0);
    
   
    float  no = random(f_st * 999.);
    shape *= random(fract(shape.xy * 100.));

    shape *= (tunnelNorm(0.15, 0.1, 0.15, 0.8, 255.0, 255.0, 255.0) + tunnelNorm(0.45, 0.1, 0.15, 0.8, 255.0, 255.0, 255.0) + tunnelNorm(0.75, 0.1, 0.15, 0.8, 255.0, 255.0, 255.0));
    shape *= (tunnelNorm(0.15, 0.1, 0.15, 0.8, 255.0, 255.0, 255.0) + tunnelNorm(0.45, 0.1, 0.15, 0.8, 255.0, 255.0, 255.0) + tunnelNorm(0.75, 0.1, 0.15, 0.8, 255.0, 255.0, 255.0));
    

     shape += tunnelNorm(0., 0.0, 1.0, 1.0, 88.0, 33.0, 22.0);
    //shape *= tunnel(1.7 * noise(u_time + 333.), 0.05, 0.6 * sinT * 0.1 + 0.3, 0.9, 55.0, 66.0, 123.0);



    gl_FragColor = vec4(shape,1.0);
}