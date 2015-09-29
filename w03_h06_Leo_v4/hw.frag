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
    float cosT = abs(cos(u_time * 0.3 ));
    float sinT = abs(sin(u_time * 0.3 ));


   
	color = mix(color,rgbNormalizer(vec3(147.0,187.0,252.0)), 1.0);

	float frameV = smoothstep(0.6, 0.0, abs(sin(st.x*PI* 0.2 - sinT * 2.0)));
	color = mix(color,rgbNormalizer(vec3(108.0,83.0,41.0)), frameV);

	float frameV2 = smoothstep(0.6, 0.0, abs(sin(st.x*PI* 0.2 - 2.0 - sinT * 2.0)));
	color = mix(color,rgbNormalizer(vec3(217.0,53.0,192.0)), frameV2);

    
    float frameBlack = step(0.95,sin(st.x*PI*9.0)* 0.2 + 0.8);
	color = mix(color,rgbNormalizer(vec3(141.0,108.0,84.0)), frameBlack);

    gl_FragColor = vec4(color,1.0);
}