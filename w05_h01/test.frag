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
    return  box(st, vec2(size,size/4.)) + 
            box(st, vec2(size/4.,size));
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



void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.0);
    vec3 pos2 = vec3(st, 1.0);
    vec3 pos3 = vec3(st, 1.0);
    mat3 matrix2 = matrix;
    mat3 matrix3 = matrix;
    
    translate(vec2(-0.5, - 0.3) - vec2(0.0, abs(sin(u_time * 2.0)) * 0.5), matrix);
    scale(vec2(2.5 + sin(u_time* 4.0 + PI/2.0)), matrix);
    rotate(-u_time, matrix);

    translate(vec2(-0.4, - 0.3) - vec2(abs(sin(u_time * 2.0)) * -0.3, abs(sin(u_time * 2.0)) * 0.3), matrix2);
    rotate(u_time + 0.2, matrix2);
    scale(vec2(4.0 + sin(u_time* 4.0 + PI/2.0)), matrix2);

    translate(vec2(-0.6, - 0.3) - vec2(abs(sin(u_time * 2.0)) * 0.3, abs(sin(u_time * 2.0)) * 0.4), matrix3);
    rotate(u_time + 0.8, matrix3);
    scale(vec2(3.0 + sin(u_time* 4.0 + PI/2.0)), matrix3);
    
    pos = matrix * pos;
    pos2 = matrix2 * pos2;
    pos3 = matrix3 * pos3;
    
    color += cross(pos.xy,0.4);
    color += cross(pos2.xy,0.4);
    color += cross(pos3.xy,0.4);

    
    gl_FragColor = vec4( color ,1.0);
}