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
float count = 0.0;

float easeInOutQuint(float t, float b, float c, float d) {
    t /= d/2.0;
    if (t < 1.0) return c/2.0*t*t*t*t*t + b;
    t -= 2.0;
    return c/2.0*(t*t*t*t*t + 2.0) + b;
}

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
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
    vec3 colorFlag = vec3(0.0);
    vec3 colorNight = vec3(0.0);
    vec3 pct = vec3(st.y);
    colorA = rgbNormalizer(vec3(141.0, 122.0, 79.0));
    colorE = rgbNormalizer(vec3(200.0, 100.0, 100.0));
    float sinT = sin(u_time * 0.5 );

    colorFlag = color;


    float fogpct = smoothstep(0.7, 1.0, sin(st.y*PI));
	colorFlag = mix(colorFlag,vec3(1.0), fogpct);
    float skypct = smoothstep(0.0, 1.0, sin(st.y*PI - 1.2));
	colorFlag = mix(colorFlag,rgbNormalizer(vec3(60.0,125.0,193.0)), skypct);
	float seapct = smoothstep(0.0, 1.0, sin(st.y*PI + 1.2));
	colorFlag = mix(colorFlag,rgbNormalizer(vec3(2.0,46.0,91.0)), seapct);

    color = step(0.3,mix(color, colorFlag, 1.0));

    gl_FragColor = vec4(color,1.0);
}