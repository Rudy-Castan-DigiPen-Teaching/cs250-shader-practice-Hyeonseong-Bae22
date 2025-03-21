#version 300 es
precision mediump float;

/**
 * \file
 * \author Hyeonseong Bae
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

 out vec4 FragColor;

 uniform vec2 u_resolution;
 uniform float u_time;

 float plot(vec2 st, float pct){
    return  smoothstep( pct-0.02, pct, st.y) -
            smoothstep( pct, pct+0.02, st.y);
 }

 void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    float y = tan(st.x+u_time);
    //float t_time = u_time / 10.;
    //float y = 3.*(t_time+cos(49.2*t_time)+sin(2.*t_time)+1./t_time);
    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    FragColor = vec4(color, 1.0);
 }