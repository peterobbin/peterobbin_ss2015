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


float random2(vec2 st){
     return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123 );
}

float noise(float x){

    float i = floor(x);
    float f = fract(x);
    return mix(random(i), random(i+1.0), smoothstep(0.0, 1.0,f));
}


//Double-Circle Sigmoid
float F(float x, float a, float s){
  float min_param_a = 0.0;
  float max_param_a = 1.0;
  a = max(min_param_a, min(max_param_a, a)); 

  float y = 0.0;
  if (x<=a){
    y = (a - sqrt(a*a - x*x)) * s * noise(u_time);
  } else {
    y = a + sqrt(pow((1.0 - a), 2.0) - pow((x - 1.0), 3.0));
  }
  return y;
}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;

       st *= 5.;
    st = fract(st);


    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

 

  

    vec2 mousePos = u_mouse/u_resolution;
    float  tsin = sin(u_time);
    float  tcos = cos(u_time);
    //float pct = F1(st.x - mousePos.x);
    //pct *= F2(st.y - mousePos.y);
    float pct = F((st.x) - 0.5, 1.0, tsin) * 10.0;
    pct += F(st.y - 0.5, 1.0, tcos) * 10.0;


    vec3 color = vec3(pct* 1.0);
    
    gl_FragColor = vec4(color,1.0);
}