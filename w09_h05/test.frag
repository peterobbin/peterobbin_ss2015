

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
    vec2 mouse = u_mouse/u_resolution.xy;


    st.x *= 50.0 ; 
    st.y *= 20.0 ;
    

    if (mod(floor(st.x), 3.0) == 0.0){

        st.y += u_time * 5.0 + random(floor(st));
    }

    st.x *= 2.0 + 1.0 * mouse.x ; 


    if (mod(floor(st.x), 4.0) == 0.0){

        st.y += u_time * 5.0 + random(floor(st));
    }
    st.x /= 10.0 + 5.0 *  mouse.x; 

    if (mod(floor(st.x), 1.0) == 0.0){

        st.y += u_time * 5.0 + random(floor(st));
    }

    st.x *= 3.0 + 1.5 * mouse.x; 

    if (mod(floor(st.x), 7.0) == 0.0){

        st.y += u_time * 5.0 + random(floor(st));
    }
 
 
 
 



    vec2 i_st = floor(st); 
    vec2 f_st = fract(st);  

   
    

        
    

     vec3 color = vec3(random( i_st )); 

     color = step(0.8, color);

    gl_FragColor = vec4(color,1.0);
}