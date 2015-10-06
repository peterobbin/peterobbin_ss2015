#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// Reference to
// http://thndl.com/square-shaped-shaders.html

float triShapeDistance(vec2 st, int sides, float scale, float offset){
    // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Number of sides of your shape
  int N = sides;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);

  // Shaping function that modulate the distance
  float d = cos(floor(.5+a/r)*r-a )*length(st) ;
  st.xy = vec2(st.x * 4.2 /scale+ sin(u_time + offset) * 0.2, st.y * 4.2 / scale+ cos(u_time) * 0.2);
  float d2 = 1. - cos(floor(.5+a/r)*r-a )*length(st) * 4.0 ;

  return  d/d2;

}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;

  
  
  
  d = triShapeDistance(st, 3, 1.0, 1.0);
  d += triShapeDistance(st, 4, 3.0, 2.0);
  d += triShapeDistance(st, 5, 5.0, 3.0);
  d += triShapeDistance(st, 6, 7.0, 4.0);
  d += triShapeDistance(st, 7, 9.0, 5.0);
  d += triShapeDistance(st, 8, 11.0, 6.0);
  d += triShapeDistance(st, 9, 13.0, 7.0);
  d = 1.0-smoothstep(.4,.41,d);



  color = vec3(d);


  // color = vec3(d);

  gl_FragColor = vec4(color,1.0);
}