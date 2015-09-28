#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359

vec3 colorA = vec3(0.0);
vec3 colorB = vec3(0.0);
vec3 colorC = vec3(0.0);
vec3 colorD = vec3(0.0);
vec3 colorE = vec3(0.0);

float easeInOutQuint(float t, float b, float c, float d) {
    t /= d/2.0;
    if (t < 1.0) return c/2.0*t*t*t*t*t + b;
    t -= 2.0;
    return c/2.0*(t*t*t*t*t + 2.0) + b;
}
        
vec3 rgbNormalizer(vec3 color){
    float r = color.r;
    float g = color.g;
    float b = color.b;
    return vec3((r + 1.0)/256.0 , (g + 1.0)/256.0 , (b + 1.0)/256.0 );

}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec3 pct = vec3(st.y);
    colorA = rgbNormalizer(vec3(141.0, 122.0, 79.0));
    // colorB = rgbNormalizer(vec3(142.0, 73.0, 46.0));
    // colorC = rgbNormalizer(vec3(115.0, 97.0, 97.0));
    // colorD = rgbNormalizer(vec3(149.0, 98.0, 94.0));
    // colorE = rgbNormalizer(vec3(152.0, 153.0, 149.0));
    colorE = rgbNormalizer(vec3(200.0, 100.0, 100.0));

    pct.r = sin(st.y*PI* 2.0 + 1.0);
    // if (st.y < 1.0 && st.y > 0.){
    //     pct.r = sin(st.y*PI * 5.0);
    //     pct.r = sin(st.y*PI* 0.5 + 1.2) * sin(st.y*PI * 6.0 - 1.9);
    // }
    
    pct.g = smoothstep(0.4, 1.1,sin(st.y *PI+ PI )+ 1.0);
    //pct.b = smoothstep(0.0, 0.4, cos(st.y * PI * 2.0 + PI - 1.0) * 1.0);
    pct.b =  cos(st.y * PI * 2.0 + PI - 1.0);
    //color = mix(colorE, colorD, stD.y); 
     color = mix(colorE, colorA, pct);
     

    // color = mix(color, colorB, stB.y);
    // color = mix(color, colorA, stA.y);
    gl_FragColor = vec4(color,1.0);
}