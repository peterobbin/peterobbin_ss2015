#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


//Double-Circle Sigmoid
float F(float x, float a, float s){
  float min_param_a = 0.0;
  float max_param_a = 1.0;
  a = max(min_param_a, min(max_param_a, a)); 

  float y = 0.0;
  if (x<=a){
    y = (a - sqrt(a*a - x*x)) * s;
  } else {
    y = a + sqrt(pow((1.0 - a), 2.0) - pow((x - 1.0), 2.0));
  }
  return y;
}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mousePos = u_mouse/u_resolution;
    float  tsin = sin(u_time);
    float  tcos = cos(u_time);
    //float pct = F1(st.x - mousePos.x);
    //pct *= F2(st.y - mousePos.y);
    float pct = F((st.x)  - mousePos.x, 1.0, tsin) * 10.0;
    pct += F(st.y - mousePos.y, 1.0, tcos) * 10.0;

    vec3 color = vec3(pct* 1.0);
    
    gl_FragColor = vec4(color,1.0);
}