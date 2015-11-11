

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;


    st *= 50.0 ; // Scale the coordinate system by 10


    float sinT = sin(u_time * 0.2) ;
    float cosT = cos(u_time * 0.2) ;

    if (mod(floor(st.x), 2.0) == 0.0){

        st.y += u_time * sinT;
    }

    if (mod(floor(st.x), 2.0) != 0.0){

        st.y -= u_time * cosT;
    }

    if (mod(floor(st.y), 2.0) == 0.0){

        st.x -= u_time * cosT;
    }

    if (mod(floor(st.y), 2.0) != 0.0){

        st.x += u_time * sinT;
    }


    vec2 i_st = floor(st); 
    vec2 f_st = fract(st);  

   

        
    

     vec3 color = vec3(random( i_st )); 

     color = step(0.7, color);

    gl_FragColor = vec4(color,1.0);
}