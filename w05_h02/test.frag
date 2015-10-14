// Author @patriciogv - 2015 modified by @peterobbin
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));


float box(vec2 st, vec2 size){
    st += .5;
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

float cross(vec2 st, float size){
    return  box(st, vec2(size,size/40.0));
}

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0),
                vec3(0.0,f.y,0.0),
                vec3(0.0,0.0,1.0));
}

void scale(in vec2 f, inout mat3 mtx) {
    mtx = scaleMatrix(f) * mtx;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0),
                vec3(0.0,1.0,0.0),
                vec3(f.x,f.y,1.0));
}

void translate(vec2 f, inout mat3 mtx) {
    mtx = translationMatrix(f) * mtx;
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0));
}

void rotate(float a, inout mat3 mtx) {
    mtx = rotationMatrix(a) * mtx;
}

vec3 rectMask(float x, float y, float w, float h, float a){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float horizonal = step(x ,st.x) - step(x + w, st.x); 
    float vertical = step( y ,st.y) - step(y + h , st.y);
    vec3 color = vec3(a) * horizonal * vertical;

    return color; 
}


float scope(float scale, float blurriness){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = 1.0 - distance(st,vec2(0.5)) * 2.0 * scale;

    pct = smoothstep(0.2, 0.2 + blurriness , pct);
    return pct;
}

float scope(float scale, float blurriness, vec2 offset){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    pct = 1.0 - distance(st,vec2(0.5) + offset) * 2.0 * scale;

    pct = smoothstep(0.2, 0.2 + blurriness , pct);
    return pct;
}

void main(){
	float sinT = sin(u_time) * 0.5 + 0.5;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.0);
   	
    translate(vec2(-0.5), matrix);
    scale(vec2(1.0), matrix);
    rotate(u_time, matrix);

    
    pos = matrix * pos;

    //vec3 rect = box(pos.xy, 0.4);
    vec3 circleMask = vec3(scope(1.0, 0.0));
    color = mix(color, vec3(0.2, 0.0, 0.0), circleMask);

    vec3 target = vec3(scope(20.0, 0.0, vec2(0.1, 0.2)));
    color = mix(color, vec3(0.2 + mod(-u_time * 0.08 + 0.35,0.5), 0.0, 0.0), target);
    color += cross(vec2(pos.x + 0.2, pos.y),0.4);


    
    //color += rect;


    
    gl_FragColor = vec4( color ,1.0);
}