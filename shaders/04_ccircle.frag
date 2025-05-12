#version 300 es

precision mediump float;

out vec4 FragColor;

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

vec2 to_coord(vec2 pixel_point)
{
    vec2 point = pixel_point / u_resolution;
    if(u_resolution.x > u_resolution.y)
    {
        point.x *= u_resolution.x / u_resolution.y;
        point.x += (u_resolution.y - u_resolution.x) / u_resolution.x;
    }
    else
    {
        point.y *= u_resolution.y / u_resolution.x;
        point.y += (u_resolution.x - u_resolution.y) / u_resolution.y;
    }

    return point;
}

float sCircle(vec2 point, vec2 center, float radius)
{
    float d = distance(point, center);
    return d - radius;
}

float circle (vec2 point, vec2 center, float radius)
{
    float sd    = sCircle(point, center, radius);
    float E     = fwidth(sd);
    return 1.0 - smoothstep(-E, E, sd);
}

void main(void)
{
    vec2 position   = to_coord(gl_FragCoord.xy);
    vec3 color      = vec3(0.3294, 0.6667, 0.8588);

    vec2 p      = vec2(cos(u_time*10.), sin(u_time*10.)) * u_time*0.01 + vec2(0.5);
    float t     = circle(position, p, 0.125);
    color       = mix(color,  vec3(1), t);

    FragColor = vec4(color, 1.0);
}