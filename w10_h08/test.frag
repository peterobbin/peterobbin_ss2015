// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
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

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse/u_resolution.xy;
    st+= 0.5;
    

    float mouseToCenter = distance(mouse, vec2(0.5));

    st *= 100.0 * mouseToCenter; // Scale the coordinate system by 10
    st -= mouseToCenter* 100.;

    // Assign a random value based on the integer coord
    vec3 color = vec3( noise( st + u_time  ) ) ;


    // Uncomment to see the subdivided grid
    // color = vec3(fpos,0.0);

    gl_FragColor = vec4(color,1.0);
}