---
tags:
- Conditioning
---

# StableZero123_BatchSchedule
## Documentation
- Class name: `StableZero123_BatchSchedule`
- Category: `KJNodes/experimental`
- Output node: `False`

The StableZero123_BatchSchedule node is designed to manage and schedule batch processing tasks for Stable Diffusion models, optimizing the workflow for generating images in batches. It focuses on efficiently organizing the rendering process to accommodate various frame counts and scheduling requirements, ensuring a streamlined operation for large-scale image generation projects.
## Input types
### Required
- **`clip_vision`**
    - Specifies the CLIP vision model to be used for conditioning the generation process, impacting the visual style and content of the generated images.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
- **`init_image`**
    - Defines the initial image to start the batch processing from, setting the visual basis for subsequent image generations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`vae`**
    - Determines the variational autoencoder used for encoding and decoding images, crucial for the quality and characteristics of the output.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`width`**
    - Sets the width of the images to be generated, directly affecting the resolution and aspect ratio of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the images to be generated, directly affecting the resolution and aspect ratio of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Defines the number of images to be processed in a single batch, influencing the efficiency and speed of the batch processing task.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - Determines the interpolation method used for processing images, affecting the smoothness and quality of transitions between frames.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`azimuth_points_string`**
    - Specifies the azimuth conditions for 3D model rendering, influencing the orientation and angle of the generated images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`elevation_points_string`**
    - Defines the elevation conditions for 3D model rendering, affecting the vertical angle and perspective of the generated images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Represents the positive conditioning output, influencing the generation towards desired attributes.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Represents the negative conditioning output, used to steer the generation away from undesired attributes.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Outputs the latent representation of the generated images, crucial for further processing or manipulation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StableZero123_BatchSchedule:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip_vision": ("CLIP_VISION",),
                              "init_image": ("IMAGE",),
                              "vae": ("VAE",),
                              "width": ("INT", {"default": 256, "min": 16, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 256, "min": 16, "max": MAX_RESOLUTION, "step": 8}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
                              "interpolation": (["linear", "ease_in", "ease_out", "ease_in_out"],),
                              "azimuth_points_string": ("STRING", {"default": "0:(0.0),\n7:(1.0),\n15:(0.0)\n", "multiline": True}),
                              "elevation_points_string": ("STRING", {"default": "0:(0.0),\n7:(0.0),\n15:(0.0)\n", "multiline": True}),
                             }}
    
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT")
    RETURN_NAMES = ("positive", "negative", "latent")
    FUNCTION = "encode"
    CATEGORY = "KJNodes/experimental"

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

        positive_cond_out = []
        positive_pooled_out = []
        negative_cond_out = []
        negative_pooled_out = []
        
        #azimuth interpolation
        for i in range(batch_size):
            # Find the interpolated azimuth for the current frame
            while next_point < len(azimuth_points) and i >= azimuth_points[next_point][0]:
                next_point += 1
            # If next_point is equal to the length of points, we've gone past the last point
            if next_point == len(azimuth_points):
                next_point -= 1  # Set next_point to the last index of points
            prev_point = max(next_point - 1, 0)  # Ensure prev_point is not less than 0

            # Calculate fraction
            if azimuth_points[next_point][0] != azimuth_points[prev_point][0]:  # Prevent division by zero
                fraction = (i - azimuth_points[prev_point][0]) / (azimuth_points[next_point][0] - azimuth_points[prev_point][0])
                if interpolation == "ease_in":
                    fraction = ease_in(fraction)
                elif interpolation == "ease_out":
                    fraction = ease_out(fraction)
                elif interpolation == "ease_in_out":
                    fraction = ease_in_out(fraction)
                
                # Use the new interpolate_angle function
                interpolated_azimuth = interpolate_angle(azimuth_points[prev_point][1], azimuth_points[next_point][1], fraction)
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
                if interpolation == "ease_in":
                    fraction = ease_in(fraction)
                elif interpolation == "ease_out":
                    fraction = ease_out(fraction)
                elif interpolation == "ease_in_out":
                    fraction = ease_in_out(fraction)
                
                interpolated_elevation = interpolate_angle(elevation_points[prev_elevation_point][1], elevation_points[next_elevation_point][1], fraction)
            else:
                interpolated_elevation = elevation_points[prev_elevation_point][1]

            cam_embeds = camera_embeddings(interpolated_elevation, interpolated_azimuth)
            cond = torch.cat([pooled, cam_embeds.repeat((pooled.shape[0], 1, 1))], dim=-1)

            positive_pooled_out.append(t)
            positive_cond_out.append(cond)
            negative_pooled_out.append(torch.zeros_like(t))
            negative_cond_out.append(torch.zeros_like(pooled))

        # Concatenate the conditions and pooled outputs
        final_positive_cond = torch.cat(positive_cond_out, dim=0)
        final_positive_pooled = torch.cat(positive_pooled_out, dim=0)
        final_negative_cond = torch.cat(negative_cond_out, dim=0)
        final_negative_pooled = torch.cat(negative_pooled_out, dim=0)

        # Structure the final output
        final_positive = [[final_positive_cond, {"concat_latent_image": final_positive_pooled}]]
        final_negative = [[final_negative_cond, {"concat_latent_image": final_negative_pooled}]]

        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return (final_positive, final_negative, {"samples": latent})

```
