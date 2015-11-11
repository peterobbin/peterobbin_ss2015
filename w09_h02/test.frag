#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 newNoise = vec3 (0.0);
float tempTime;


//Double-Circle Sigmoid
float pcurve( float x, float a, float b )
{
    float k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0 - x, b );
}

float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

float easeInOut (float t, float b, float c, float d) {
  t /= d/2.;
  if (t < 1.) return c/2. * pow( 2., 10. * (t - 1.) ) + b;
  t--;
  return c/2. * ( -pow( 2., -10. * t) + 2. ) + b;
}


vec2 moveRowCol(vec2 _st){
  float time = sin(u_time * 0.5) * 0.5 + 0.5;

    if( fract(time)>0.5 ){
        if (fract( _st.y * 0.5) > 0.2){
            _st.x -= fract(time)*2.0 + _st.x;
        } else {
            _st.x += fract(time)*2.0 - _st.x;
        } 
    } else {
        if (fract( _st.x * 0.5) > 0.2){
            _st.y -= fract(time)*2.0 + _st.y;
        } else {
            _st.y += fract(time)*2.0 - _st.y;
        } 
    }
    return fract(_st);
}





void main() {


    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    st *= 10.;

    if (mod(floor(st.x), 2.0) == 0.0){

        st.y += u_time ;
    }

    if (mod(floor(st.x), 2.0) != 0.0){

        st.y -= u_time ;
    }

    vec2 i_st = floor(st);




    st = moveRowCol(st);
    st = fract(st );
    
    vec2 mousePos = u_mouse/u_resolution;
    float tsin = (sin(u_time * 2.0) + 1.0) / 2.0;
    float tcos = (cos(u_time * 2.0) + 1.0) / 2.0;


    float pct = pcurve(st.x, tsin + 3.0, tsin - 1.0);
    pct += pcurve(st.x, tsin - 1.0, tsin + 3.0);
    pct += pcurve(st.y, tcos - 1.0, 3.0 + tcos);
    pct += pcurve(st.y, tcos + 3.0, tcos - 1.0);

    float time = floor(u_time);
    vec3 noiseColor = vec3(random(i_st));


    // if ((u_time - tempTime) > 5.0){
    //   tempTime = u_time;
    //   newNoise = noiseColor; 
    // }else{

    //   newNoise *= 0.1;
    // }


    vec3 color = vec3(pct) + noiseColor;
    color = step(mouse.x, color);
    
    gl_FragColor = vec4(color,1.0);
}