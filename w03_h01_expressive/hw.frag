#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.2,0.1,0.02);
vec3 colorB = vec3(1.0,0.0,0.0);
float pct = 0.0;
bool done = false;
float tempTime = 0.0;



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
    vec3 color = vec3(0.0);
    float t = sin(u_time);
    pct = easeInOutQuint(t, 0.0, 0.1, 0.5);
    color = mix(colorA, colorB, pct); 

    gl_FragColor = vec4(color,1.0);
}