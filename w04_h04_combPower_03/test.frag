// Author @patriciogv - 2015, modified by @peterobbin
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.1, pct, st.y) - 
          smoothstep( pct, pct+0.1, st.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float sinT = sin(u_time ) * 0.5 + 0.5;
    float cosT = cos(u_time ) * 0.5 + 0.5;

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*3.0;
    float a = atan(pos.y,pos.x);

    float f = cos(a * 6.);
    float f2 = 0.0;
    float f3 = 0.0;
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    f = pow(cos(sin(a*5.0 + u_time)*cos(a*6.0 - u_time)), 5.0) - smoothstep(0.5, 1.0, cos(a) * sin(a));
    f2 = pow(cos(sin(a*5.0 - u_time)*cos(a*6.0 + u_time)), 5.0) - smoothstep(0.5, 1.0, cos(a) * sin(a));
    f3 = pow(cos(sin(a*5.0 + u_time)*cos(a*6.0 + u_time)), 5.0) - smoothstep(0.5, 1.0, cos(a) * sin(a));
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;
    f = plot(st, f);
    f2 = plot(st, f2);
    f3 = plot(st, f3);

    color = vec3( 1.0 - smoothstep(f,f+0.1,r), 1.0 - smoothstep(f2,f2+0.2,r) , 1.0 - smoothstep(f3,f3+0.5,r)  );



    gl_FragColor = vec4(color, 1.0);
}