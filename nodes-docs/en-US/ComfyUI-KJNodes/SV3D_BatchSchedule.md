---
tags:
- Conditioning
---

# SV3D_BatchSchedule
## Documentation
- Class name: `SV3D_BatchSchedule`
- Category: `KJNodes/experimental`
- Output node: `False`

The SV3D_BatchSchedule node is designed for scheduling azimuth and elevation conditions for SV3D, a video model by Stability AI. It allows users to define how the camera's azimuth and elevation should change over time, enhancing the generation of 3D videos.
## Input types
### Required
- **`clip_vision`**
    - Specifies the CLIP vision model to use, affecting how visual features are interpreted and processed.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
- **`init_image`**
    - The initial image to start the video generation from, setting the visual context.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`vae`**
    - Defines the VAE model used for encoding and decoding images, crucial for the video generation process.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`width`**
    - The width of the generated video frames, allowing customization of the video's resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of the generated video frames, enabling control over the video's aspect ratio and resolution.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Determines the number of video frames to generate in a single batch, impacting the generation speed and memory usage.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - The method of interpolation between keyframes, affecting the smoothness of the transition in generated video frames.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`azimuth_points_string`**
    - A string defining key points for azimuth changes over the video timeline, controlling the horizontal rotation of the camera.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`elevation_points_string`**
    - A string specifying key points for elevation changes over the video timeline, managing the vertical angle of the camera.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning output, influencing the generation towards desired features.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning output, guiding the generation away from undesired features.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent representation of the video, serving as a foundational element for video generation.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SV3D_BatchSchedule:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip_vision": ("CLIP_VISION",),
                              "init_image": ("IMAGE",),
                              "vae": ("VAE",),
                              "width": ("INT", {"default": 576, "min": 16, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 576, "min": 16, "max": MAX_RESOLUTION, "step": 8}),
                              "batch_size": ("INT", {"default": 21, "min": 1, "max": 4096}),
                              "interpolation": (["linear", "ease_in", "ease_out", "ease_in_out"],),
                              "azimuth_points_string": ("STRING", {"default": "0:(0.0),\n9:(180.0),\n20:(360.0)\n", "multiline": True}),
                              "elevation_points_string": ("STRING", {"default": "0:(0.0),\n9:(0.0),\n20:(0.0)\n", "multiline": True}),
                             }}
    
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT")
    RETURN_NAMES = ("positive", "negative", "latent")
    FUNCTION = "encode"
    CATEGORY = "KJNodes/experimental"
    DESCRIPTION = """
Allow scheduling of the azimuth and elevation conditions for SV3D.  
Note that SV3D is still a video model and the schedule needs to always go forward  
https://huggingface.co/stabilityai/sv3d
"""

    def encode(self, clip_vision, init_image, vae, width, height, batch_size, azimuth_points_string, elevation_points_string, interpolation):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1,1), width, height, "bilinear", "center").movedim(1,-1)
        encode_pixels = pixels[:,:,:,:3]
        t = vae.encode(encode_pixels)

        def ease_in(t):
            return t * t
        def ease_out(t):
            return 1 - (1 - t) * (1 - t)
        def ease_in_out(t):
            return 3 * t * t - 2 * t * t * t
        
        # Parse the azimuth input string into a list of tuples
        azimuth_points = []
        azimuth_points_string = azimuth_points_string.rstrip(',\n')
        for point_str in azimuth_points_string.split(','):
            frame_str, azimuth_str = point_str.split(':')
            frame = int(frame_str.strip())
            azimuth = float(azimuth_str.strip()[1:-1]) 
            azimuth_points.append((frame, azimuth))
        # Sort the points by frame number
        azimuth_points.sort(key=lambda x: x[0])

        # Parse the elevation input string into a list of tuples
        elevation_points = []
        elevation_points_string = elevation_points_string.rstrip(',\n')
        for point_str in elevation_points_string.split(','):
            frame_str, elevation_str = point_str.split(':')
            frame = int(frame_str.strip())
            elevation_val = float(elevation_str.strip()[1:-1]) 
            elevation_points.append((frame, elevation_val))
        # Sort the points by frame number
        elevation_points.sort(key=lambda x: x[0])

        # Index of the next point to interpolate towards
        next_point = 1
        next_elevation_point = 1
        elevations = []
        azimuths = []
        # For azimuth interpolation
        for i in range(batch_size):
            # Find the interpolated azimuth for the current frame
            while next_point < len(azimuth_points) and i >= azimuth_points[next_point][0]:
                next_point += 1
            if next_point == len(azimuth_points):
                next_point -= 1
            prev_point = max(next_point - 1, 0)

            if azimuth_points[next_point][0] != azimuth_points[prev_point][0]:
                fraction = (i - azimuth_points[prev_point][0]) / (azimuth_points[next_point][0] - azimuth_points[prev_point][0])
                # Apply the ease function to the fraction
                if interpolation == "ease_in":
                    fraction = ease_in(fraction)
                elif interpolation == "ease_out":
                    fraction = ease_out(fraction)
                elif interpolation == "ease_in_out":
                    fraction = ease_in_out(fraction)
                
                interpolated_azimuth = linear_interpolate(azimuth_points[prev_point][1], azimuth_points[next_point][1], fraction)
            else:
                interpolated_azimuth = azimuth_points[prev_point][1]

            # Interpolate the elevation
            next_elevation_point = 1
            while next_elevation_point < len(elevation_points) and i >= elevation_points[next_elevation_point][0]:
                next_elevation_point += 1
            if next_elevation_point == len(elevation_points):
                next_elevation_point -= 1
            prev_elevation_point = max(next_elevation_point - 1, 0)

            if elevation_points[next_elevation_point][0] != elevation_points[prev_elevation_point][0]:
                fraction = (i - elevation_points[prev_elevation_point][0]) / (elevation_points[next_elevation_point][0] - elevation_points[prev_elevation_point][0])
                # Apply the ease function to the fraction
                if interpolation == "ease_in":
                    fraction = ease_in(fraction)
                elif interpolation == "ease_out":
                    fraction = ease_out(fraction)
                elif interpolation == "ease_in_out":
                    fraction = ease_in_out(fraction)
                
                interpolated_elevation = linear_interpolate(elevation_points[prev_elevation_point][1], elevation_points[next_elevation_point][1], fraction)
            else:
                interpolated_elevation = elevation_points[prev_elevation_point][1]

            azimuths.append(interpolated_azimuth)
            elevations.append(interpolated_elevation)

        print("azimuths", azimuths)
        print("elevations", elevations)

        # Structure the final output
        final_positive = [[pooled, {"concat_latent_image": t, "elevation": elevations, "azimuth": azimuths}]]
        final_negative = [[torch.zeros_like(pooled), {"concat_latent_image": torch.zeros_like(t),"elevation": elevations, "azimuth": azimuths}]]

        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return (final_positive, final_negative, {"samples": latent})

```
