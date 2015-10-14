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
    return  box(st, vec2(size / 5.0,size/10.0));
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
    vec3 pos2 = vec3(st,1.0);
    vec3 pos3 = vec3(st,1.0);
    vec3 pos4 = vec3(st,1.0);
    vec3 pos5 = vec3(st,1.0);
    vec3 pos6 = vec3(st,1.0);
    vec3 pos7 = vec3(st,1.0);
    vec3 pos8 = vec3(st,1.0);
    vec3 pos9 = vec3(st,1.0);
    vec3 pos0 = vec3(st,1.0);

    vec3 posa = vec3(st,1.0);
    vec3 pos2a = vec3(st,1.0);
    vec3 pos3a = vec3(st,1.0);
    vec3 pos4a = vec3(st,1.0);
    vec3 pos5a = vec3(st,1.0);
    vec3 pos6a = vec3(st,1.0);
    vec3 pos7a = vec3(st,1.0);
    vec3 pos8a = vec3(st,1.0);
    vec3 pos9a = vec3(st,1.0);
    vec3 pos0a = vec3(st,1.0);
 
 	vec3 posb = vec3(st,1.0);
    vec3 pos2b = vec3(st,1.0);
    vec3 pos3b = vec3(st,1.0);
    vec3 pos4b = vec3(st,1.0);
    vec3 pos5b = vec3(st,1.0);
    vec3 pos6b = vec3(st,1.0);
    vec3 pos7b = vec3(st,1.0);
    vec3 pos8b = vec3(st,1.0);
    vec3 pos9b = vec3(st,1.0);
    vec3 pos0b = vec3(st,1.0);

    mat3 matrix2 = matrix;
    mat3 matrix3 = matrix;
    mat3 matrix4 = matrix;
    mat3 matrix5 = matrix;
    mat3 matrix6 = matrix;
    mat3 matrix7 = matrix;
    mat3 matrix8 = matrix;
    mat3 matrix9 = matrix;
    mat3 matrix0 = matrix;

    mat3 matrixa = matrix;
    mat3 matrix2a = matrix;
    mat3 matrix3a = matrix;
    mat3 matrix4a = matrix;
    mat3 matrix5a = matrix;
    mat3 matrix6a = matrix;
    mat3 matrix7a = matrix;
    mat3 matrix8a = matrix;
    mat3 matrix9a = matrix;
    mat3 matrix0a = matrix;

    mat3 matrixb = matrix;
    mat3 matrix2b = matrix;
    mat3 matrix3b = matrix;
    mat3 matrix4b = matrix;
    mat3 matrix5b = matrix;
    mat3 matrix6b = matrix;
    mat3 matrix7b = matrix;
    mat3 matrix8b = matrix;
    mat3 matrix9b = matrix;
    mat3 matrix0b = matrix;


   	
    translate(vec2(-0.5), matrix);
    translate(vec2(-0.5), matrix2);
    translate(vec2(-0.5), matrix3);
    translate(vec2(-0.5), matrix4);
    translate(vec2(-0.5), matrix5);
    translate(vec2(-0.5), matrix6);
    translate(vec2(-0.5), matrix7);
    translate(vec2(-0.5), matrix8);
    translate(vec2(-0.5), matrix9);
    translate(vec2(-0.5), matrix0);

    translate(vec2(-0.5), matrixa);
    translate(vec2(-0.5), matrix2a);
    translate(vec2(-0.5), matrix3a);
    translate(vec2(-0.5), matrix4a);
    translate(vec2(-0.5), matrix5a);
    translate(vec2(-0.5), matrix6a);
    translate(vec2(-0.5), matrix7a);
    translate(vec2(-0.5), matrix8a);
    translate(vec2(-0.5), matrix9a);
    translate(vec2(-0.5), matrix0a);

    translate(vec2(-0.5), matrixb);
    translate(vec2(-0.5), matrix2b);
    translate(vec2(-0.5), matrix3b);
    translate(vec2(-0.5), matrix4b);
    translate(vec2(-0.5), matrix5b);
    translate(vec2(-0.5), matrix6b);
    translate(vec2(-0.5), matrix7b);
    translate(vec2(-0.5), matrix8b);
    translate(vec2(-0.5), matrix9b);
    translate(vec2(-0.5), matrix0b);

    // rotate(sin(u_time * 0.7) * 3.2 + 1.0, matrix);
    // rotate(sin(u_time * 0.7 - 0.2) * 3.2 + 1.0, matrix2);
    // rotate(sin(u_time * 0.7 - 0.4) * 3.2 + 1.0, matrix3);
    // rotate(sin(u_time * 0.7 - 0.6) * 3.2 + 1.0, matrix4);
    // rotate(sin(u_time * 0.7 - 0.8) * 3.2 + 1.0, matrix5);
    // rotate(sin(u_time * 0.7 - 1.0) * 3.2 + 1.0, matrix6);
    // rotate(sin(u_time * 0.7 - 1.2) * 3.2 + 1.0, matrix7);
    // rotate(sin(u_time * 0.7 - 1.4) * 3.2 + 1.0, matrix8);
    // rotate(sin(u_time * 0.7 - 1.6) * 3.2 + 1.0, matrix9);
    // rotate(sin(u_time * 0.7 - 1.8) * 3.2 + 1.0, matrix0);

    // rotate(sin(u_time * 0.8) * 3.2, matrixa);
    // rotate(sin(u_time * 0.8 - 0.2) * 3.2, matrix2a);
    // rotate(sin(u_time * 0.8 - 0.4) * 3.2, matrix3a);
    // rotate(sin(u_time * 0.8 - 0.6) * 3.2, matrix4a);
    // rotate(sin(u_time * 0.8 - 0.8) * 3.2, matrix5a);
    // rotate(sin(u_time * 0.8 - 1.0) * 3.2, matrix6a);
    // rotate(sin(u_time * 0.8 - 1.2) * 3.2, matrix7a);
    // rotate(sin(u_time * 0.8 - 1.4) * 3.2, matrix8a);
    // rotate(sin(u_time * 0.8 - 1.6) * 3.2, matrix9a);
    // rotate(sin(u_time * 0.8 - 1.8) * 3.2, matrix0a);

    // rotate(sin(u_time * 0.9) * 3.2 + 4.0, matrixb);
    // rotate(sin(u_time * 0.9 - 0.2) * 3.2 + 4.0, matrix2b);
    // rotate(sin(u_time * 0.9 - 0.4) * 3.2 + 4.0, matrix3b);
    // rotate(sin(u_time * 0.9 - 0.6) * 3.2 + 4.0, matrix4b);
    // rotate(sin(u_time * 0.9 - 0.8) * 3.2 + 4.0, matrix5b);
    // rotate(sin(u_time * 0.9 - 1.0) * 3.2 + 4.0, matrix6b);
    // rotate(sin(u_time * 0.9 - 1.2) * 3.2 + 4.0, matrix7b);
    // rotate(sin(u_time * 0.9 - 1.4) * 3.2 + 4.0, matrix8b);
    // rotate(sin(u_time * 0.9 - 1.6) * 3.2 + 4.0, matrix9b);
    // rotate(sin(u_time * 0.9 - 1.8) * 3.2 + 4.0, matrix0b);

    rotate(u_time * 1.7, matrix);
    rotate(u_time * 1.7 - 0.7, matrix2);
    rotate(u_time * 1.7 - 1.4, matrix3);
    rotate(u_time * 1.7 - 2.1, matrix4);
    rotate(u_time * 1.7 - 2.8, matrix5);
    rotate(u_time * 1.7 - 3.5, matrix6);
    rotate(u_time * 1.7 - 4.2, matrix7);
    rotate(u_time * 1.7 - 4.9, matrix8);
    rotate(u_time * 1.7 - 5.6, matrix9);
    rotate(u_time * 1.7 - 6.3, matrix0);

    rotate(u_time * 1.8, matrixa);
    rotate(u_time * 1.8 - 0.7, matrix2a);
    rotate(u_time * 1.8 - 1.4, matrix3a);
    rotate(u_time * 1.8 - 2.1, matrix4a);
    rotate(u_time * 1.8 - 2.8, matrix5a);
    rotate(u_time * 1.8 - 3.5, matrix6a);
    rotate(u_time * 1.8 - 4.2, matrix7a);
    rotate(u_time * 1.8 - 4.9, matrix8a);
    rotate(u_time * 1.8 - 5.6, matrix9a);
    rotate(u_time * 1.8 - 6.3, matrix0a);

    rotate(u_time * 1.75, matrixb);
    rotate(u_time * 1.75 - 0.7, matrix2b);
    rotate(u_time * 1.75 - 1.4, matrix3b);
    rotate(u_time * 1.75 - 2.1, matrix4b);
    rotate(u_time * 1.75 - 2.8, matrix5b);
    rotate(u_time * 1.75 - 3.5, matrix6b);
    rotate(u_time * 1.75 - 4.2, matrix7b);
    rotate(u_time * 1.75 - 4.9, matrix8b);
    rotate(u_time * 1.75 - 5.6, matrix9b);
    rotate(u_time * 1.75 - 6.3, matrix0b);

    // rotate(sin(u_time * 0.8) * 3.2, matrixa);
    // rotate(sin(u_time * 0.8 - 0.2) * 3.2, matrix2a);
    // rotate(sin(u_time * 0.8 - 0.4) * 3.2, matrix3a);
    // rotate(sin(u_time * 0.8 - 0.6) * 3.2, matrix4a);
    // rotate(sin(u_time * 0.8 - 0.8) * 3.2, matrix5a);
    // rotate(sin(u_time * 0.8 - 1.0) * 3.2, matrix6a);
    // rotate(sin(u_time * 0.8 - 1.2) * 3.2, matrix7a);
    // rotate(sin(u_time * 0.8 - 1.4) * 3.2, matrix8a);
    // rotate(sin(u_time * 0.8 - 1.6) * 3.2, matrix9a);
    // rotate(sin(u_time * 0.8 - 1.8) * 3.2, matrix0a);

    // rotate(sin(u_time * 0.9) * 3.2 + 4.0, matrixb);
    // rotate(sin(u_time * 0.9 - 0.2) * 3.2 + 4.0, matrix2b);
    // rotate(sin(u_time * 0.9 - 0.4) * 3.2 + 4.0, matrix3b);
    // rotate(sin(u_time * 0.9 - 0.6) * 3.2 + 4.0, matrix4b);
    // rotate(sin(u_time * 0.9 - 0.8) * 3.2 + 4.0, matrix5b);
    // rotate(sin(u_time * 0.9 - 1.0) * 3.2 + 4.0, matrix6b);
    // rotate(sin(u_time * 0.9 - 1.2) * 3.2 + 4.0, matrix7b);
    // rotate(sin(u_time * 0.9 - 1.4) * 3.2 + 4.0, matrix8b);
    // rotate(sin(u_time * 0.9 - 1.6) * 3.2 + 4.0, matrix9b);
    // rotate(sin(u_time * 0.9 - 1.8) * 3.2 + 4.0, matrix0b);



    
    pos = matrix * pos;
    pos2 = matrix2 * pos2;
    pos3 = matrix3 * pos3;
    pos4 = matrix4 * pos4;
    pos5 = matrix5 * pos5;
    pos6 = matrix6 * pos6;
    pos7 = matrix7 * pos7;
    pos8 = matrix8 * pos8;
    pos9 = matrix9 * pos9;
    pos0 = matrix0 * pos0;

    posa = matrixa * posa;
    pos2a = matrix2a * pos2a;
    pos3a = matrix3a * pos3a;
    pos4a = matrix4a * pos4a;
    pos5a = matrix5a * pos5a;
    pos6a = matrix6a * pos6a;
    pos7a = matrix7a * pos7a;
    pos8a = matrix8a * pos8a;
    pos9a = matrix9a * pos9a;
    pos0a = matrix0a * pos0a;
 
  	posb = matrixb * posb;
    pos2b = matrix2b * pos2b;
    pos3b = matrix3b * pos3b;
    pos4b = matrix4b * pos4b;
    pos5b = matrix5b * pos5b;
    pos6b = matrix6b * pos6b;
    pos7b = matrix7b * pos7b;
    pos8b = matrix8b * pos8b;
    pos9b = matrix9b * pos9b;
    pos0b = matrix0b * pos0b;
 


    // //vec3 rect = box(pos.xy, 0.4);
    // vec3 circleMask = vec3(scope(1.0, 0.0));
    // color = mix(color, vec3(0.2, 0.0, 0.0), circleMask);

    // vec3 target = vec3(scope(20.0, 0.0, vec2(0.1, 0.2)));
    // color = mix(color, vec3(0.2 + mod(-u_time * 0.08 + 0.35,0.5), 0.0, 0.0), target);
    color += cross(vec2(pos.x + 0.4, pos.y),0.2);
    color += cross(vec2(pos2.x + 0.4, pos2.y),0.2);
    color += cross(vec2(pos3.x + 0.4, pos3.y),0.2);
    color += cross(vec2(pos4.x + 0.4, pos4.y),0.2);
    color += cross(vec2(pos5.x + 0.4, pos5.y),0.2);
    color += cross(vec2(pos6.x + 0.4, pos6.y),0.2);
    color += cross(vec2(pos7.x + 0.4, pos7.y),0.2);
    color += cross(vec2(pos8.x + 0.4, pos8.y),0.2);
    color += cross(vec2(pos9.x + 0.4, pos9.y),0.2);
    color += cross(vec2(pos0.x + 0.4, pos0.y),0.2);

    color += cross(vec2(posa.x + 0.2, posa.y),0.2);
    color += cross(vec2(pos2a.x + 0.2, pos2a.y),0.2);
    color += cross(vec2(pos3a.x + 0.2, pos3a.y),0.2);
    color += cross(vec2(pos4a.x + 0.2, pos4a.y),0.2);
    color += cross(vec2(pos5a.x + 0.2, pos5a.y),0.2);
    color += cross(vec2(pos6a.x + 0.2, pos6a.y),0.2);
    color += cross(vec2(pos7a.x + 0.2, pos7a.y),0.2);
    color += cross(vec2(pos8a.x + 0.2, pos8a.y),0.2);
    color += cross(vec2(pos9a.x + 0.2, pos9a.y),0.2);
    color += cross(vec2(pos0a.x + 0.2, pos0a.y),0.2);

    color += cross(vec2(posb.x + 0.3, posb.y),0.2);
    color += cross(vec2(pos2b.x + 0.3, pos2b.y),0.2);
    color += cross(vec2(pos3b.x + 0.3, pos3b.y),0.2);
    color += cross(vec2(pos4b.x + 0.3, pos4b.y),0.2);
    color += cross(vec2(pos5b.x + 0.3, pos5b.y),0.2);
    color += cross(vec2(pos6b.x + 0.3, pos6b.y),0.2);
    color += cross(vec2(pos7b.x + 0.3, pos7b.y),0.2);
    color += cross(vec2(pos8b.x + 0.3, pos8b.y),0.2);
    color += cross(vec2(pos9b.x + 0.3, pos9b.y),0.2);
    color += cross(vec2(pos0b.x + 0.3, pos0b.y),0.2);





    
    //color += rect;


    
    gl_FragColor = vec4( color ,1.0);
}