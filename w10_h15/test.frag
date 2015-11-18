#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233))) 
                * 43758.5453123);
}

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Value noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ), 
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ), 
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}


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
  st.xy = vec2(st.x * 4.2 /scale+ sin(u_time + offset) * 0.2, st.y * 4.2 / scale);
  float d2 = 1. - cos(floor(.5+a/r)*r-a )*length(st) * 4.0 ;

  return  d/d2;

}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;

  
  vec2 f_st = fract(st * 0.3);
  

  d += triShapeDistance(st , 9,   13.0, noise(f_st*u_time));
  d = 1.0-smoothstep(.4,.41,d);



  color = vec3(d);


  // color = vec3(d);

  gl_FragColor = vec4(color,1.0);
}