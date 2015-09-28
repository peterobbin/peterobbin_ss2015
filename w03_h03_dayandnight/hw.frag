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
    vec3 colorDay = vec3(0.0);
    vec3 colorNight = vec3(0.0);
    vec3 pct = vec3(st.y);
    colorA = rgbNormalizer(vec3(141.0, 122.0, 79.0));
    colorE = rgbNormalizer(vec3(200.0, 100.0, 100.0));
    float sinT = sin(u_time * 0.5 );

    pct.r = sin(st.y*PI* 2.0 + 1.0);

    
    pct.g = smoothstep(0.4, 1.1,sin(st.y *PI+ PI )+ 1.0);

    pct.b =  cos(st.y * PI * 2.0 + PI - 1.0);

    color = mix(colorE, colorA, pct);
    colorDay = color;
    colorNight = color;

    float fogpct = smoothstep(0.7, 1.0, sin(st.y*PI));
	colorDay = mix(colorDay,vec3(1.0), fogpct);
    float skypct = smoothstep(0.0, 1.0, sin(st.y*PI - 1.2));
	colorDay = mix(colorDay,rgbNormalizer(vec3(60.0,125.0,193.0)), skypct);
	float seapct = smoothstep(0.0, 1.0, sin(st.y*PI + 1.2));
	colorDay = mix(colorDay,rgbNormalizer(vec3(2.0,46.0,91.0)), seapct);

	float fogNpct = smoothstep(0.7, 1.0, sin(st.y*PI));
	colorNight = mix(colorNight,rgbNormalizer(vec3(24.0,37.0,72.0)), fogNpct);
    float skyNpct = smoothstep(0.0, 1.0, sin(st.y*PI - 1.2));
	colorNight = mix(colorNight,rgbNormalizer(vec3(18.0,25.0,54.0)), skyNpct);
	float seaNpct = smoothstep(0.0, 1.0, sin(st.y*PI + 1.2));
	colorNight = mix(colorNight,rgbNormalizer(vec3(6.0,10.0,21.0)), seaNpct);
	
    if (sinT >= 0.0){
    	color = mix(color, colorNight, sinT);
    }else{

    	color = mix(color, colorDay, -sinT);
    }


  //   if ( mod(count, 2.0) != 0.0){
		// color = mix(color, colorNight, sinT);

  //   }else{
  //   	color = vec3(0.);
  //   }
    

    // color = mix(color, colorB, stB.y);
    // color = mix(color, colorA, stA.y);
    gl_FragColor = vec4(color,1.0);
}