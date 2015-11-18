#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


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

float noise(vec2 xy){
    vec2 ipos = floor(xy);  // get the integer coords
    vec2 fpos = fract(xy);  // get the fractional coords


    float A = random(ipos);
    float B = random(ipos + vec2(1.0, .0));
    float C = random(ipos + vec2(0.0, 1.0));
    float D = random(ipos + vec2(1.0, 1.0));
    fpos = smoothstep(vec2(0.0), vec2(1.0), fpos);
    return mix(A,B,fpos.x) + (C-A)*fpos.y*(1.0- fpos.x) + (D - B) * fpos.x * fpos.y;

}


mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float lines(in vec2 pos, float b){
    float scale = 10.0;
    pos *= scale;
    return smoothstep(0.0,
                    .5+b*.5,
                    abs((sin(pos.x*3.1415)+b*2.0))*.5);
}

//Double-Circle Sigmoid
float F(float x, float a, float s){
  float min_param_a = 0.0;
  float max_param_a = 1.0;
  a = max(min_param_a, min(max_param_a, a)); 

  float y = 0.0;
  if (x<=a){
    y = (a - sqrt(a*a - x*x)) * s * noise(u_time + 99.);
  } else {
    y = a + sqrt(pow((1.0 - a), 2.0) - pow((x - 1.0), 3.0));
  }
  return y;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(st*30.0 + u_time * 0.2);
    vec2 pos2 = vec2(st*10.0 - u_time * 0.2);


    color = vec3( noise(pos) );
    color *= vec3( noise(pos2) );
    vec3 color2 = color;
    color = smoothstep(0.4, 0.6,color);
    color = step(0.5, color);

    st = rotate2d( noise(st * 10. + u_time * 0.2) ) * st;


    color = step(0.2, vec3(lines(st * 5.,.5)));
    color *= step(0.3, vec3(lines(st * 20.,.5)) * color2);


    color += step(0.9, vec3( noise(pos2 * 5.) ));

    color = 1. - color;



    gl_FragColor = vec4(color.x, color.y, color.z,1.0);
}