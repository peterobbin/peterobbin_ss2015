#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
#define PI 3.14159265359


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
    vec3 pct = vec3(st.y);
    vec3 colorWhite = rgbNormalizer(vec3(141.0, 122.0, 79.0));
    vec3 colorBlue = rgbNormalizer(vec3(200.0, 100.0, 100.0));
    float cosT = abs(cos(u_time * 0.05 ));
    float sinT = abs(sin(u_time * 0.05 ));

	float bg =  (sin(st.y*PI)* 0.05 + 0.95) * 0.1;
	vec3 colorBg = mix(color,rgbNormalizer(vec3(245.0,61.0,76.0)), bg);
    color += colorBg;

	float glich = smoothstep(0.8, 1.1, sin((st.y + cosT)*PI*2.0)) * 0.3;
	vec3 colorGlich = mix(color,rgbNormalizer(vec3(228.0,225.0,111.0)), glich);
    color += colorGlich;

	float frame = smoothstep(0.3, 1.0, sin((st.y + sinT * 2.0)*PI*1.0 - 0.8)) * 0.2;
	vec3 colorFrame = mix(color,rgbNormalizer(vec3(212.0,4.0,217.0)), frame);
    color += colorFrame;


	float frameH = smoothstep(0.7 + sinT* 0.2, 1.0, sin((st.y + sinT* 0.5)*PI*1.0 - 0.8)) * cosT * 0.5;
	vec3 colorH = mix(color,rgbNormalizer(vec3(239.0,249.0,249.0)), frameH);
    color += colorH;



    

    gl_FragColor = vec4(color,1.0);
}