---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# EasyLoader (SV3D)
## Documentation
- Class name: `easy sv3dLoader`
- Category: `EasyUse/Loaders`
- Output node: `False`

The `easy sv3dLoader` node is designed to facilitate the loading of 3D models specifically formatted for Stable Diffusion 3D (SV3D) applications. It streamlines the process of identifying and preparing SV3D model files for use within the ComfyUI framework, ensuring compatibility and ease of integration.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the 3D model to be loaded. This parameter is crucial for identifying the correct model file among potentially many, based on naming conventions that include 'sv3d' to denote compatibility with Stable Diffusion 3D applications.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Specifies the VAE model name to be used in conjunction with the 3D model, ensuring the correct visual autoencoder is applied for image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`init_image`**
    - Defines the initial image to start the generation process, serving as a base or reference for the 3D model loading and manipulation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`empty_latent_width`**
    - Sets the width of the empty latent space to accommodate the 3D model, adjusting the spatial dimensions for generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`empty_latent_height`**
    - Sets the height of the empty latent space to accommodate the 3D model, adjusting the spatial dimensions for generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Determines the number of instances to process in parallel, optimizing the loading and manipulation of 3D models for efficiency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interp_easing`**
    - Specifies the easing function to apply during the interpolation of frames, affecting the smoothness and dynamics of the 3D model's animation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`easing_mode`**
    - Defines the mode of easing to be applied, such as azimuth or elevation, directing the interpolation's focus during 3D model manipulation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`scheduler`**
    - Optional scheduler settings for advanced control over the loading and processing sequence of the 3D model, allowing for customized generation workflows.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The pipeline configuration for processing the 3D model, encapsulating the sequence of operations and transformations applied.
    - Python dtype: `Dict[str, Any]`
- **`model`**
    - Comfy dtype: `MODEL`
    - The loaded 3D model ready for manipulation and integration within the ComfyUI framework, presented in a compatible format.
    - Python dtype: `Any`
- **`interp_log`**
    - Comfy dtype: `STRING`
    - A log of the interpolation and easing operations applied to the 3D model, providing insights into the manipulation process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class sv3DLoader(EasingBase):

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        def get_file_list(filenames):
            return [file for file in filenames if file != "put_models_here.txt" and "sv3d" in file]

        return {"required": {
            "ckpt_name": (get_file_list(folder_paths.get_filename_list("checkpoints")),),
            "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),

            "init_image": ("IMAGE",),
            "empty_latent_width": ("INT", {"default": 576, "min": 16, "max": MAX_RESOLUTION, "step": 8}),
            "empty_latent_height": ("INT", {"default": 576, "min": 16, "max": MAX_RESOLUTION, "step": 8}),

            "batch_size": ("INT", {"default": 21, "min": 1, "max": 4096}),
            "interp_easing": (["linear", "ease_in", "ease_out", "ease_in_out"], {"default": "linear"}),
            "easing_mode": (["azimuth", "elevation", "custom"], {"default": "azimuth"}),
        },
            "optional": {"scheduler": ("STRING", {"default": "",  "multiline": True})},
            "hidden": {"prompt": "PROMPT", "my_unique_id": "UNIQUE_ID"}
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "STRING")
    RETURN_NAMES = ("pipe", "model", "interp_log")

    FUNCTION = "adv_pipeloader"
    CATEGORY = "EasyUse/Loaders"

    def adv_pipeloader(self, ckpt_name, vae_name, init_image, empty_latent_width, empty_latent_height, batch_size, interp_easing, easing_mode, scheduler='',prompt=None, my_unique_id=None):
        model: ModelPatcher | None = None
        vae: VAE | None = None
        clip: CLIP | None = None

        # Clean models from loaded_objects
        easyCache.update_loaded_objects(prompt)

        model, clip, vae, clip_vision = easyCache.load_checkpoint(ckpt_name, "Default", True)

        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1, 1), empty_latent_width, empty_latent_height, "bilinear", "center").movedim(1,
                                                                                                                    -1)
        encode_pixels = pixels[:, :, :, :3]
        t = vae.encode(encode_pixels)

        azimuth_points = []
        elevation_points = []
        if easing_mode == 'azimuth':
            azimuth_points = [(0, 0), (batch_size-1, 360)]
            elevation_points = [(0, 0)] * batch_size
        elif easing_mode == 'elevation':
            azimuth_points = [(0, 0)] * batch_size
            elevation_points = [(0, -90), (batch_size-1, 90)]
        else:
            schedulers = scheduler.rstrip('\n')
            for line in schedulers.split('\n'):
                frame_str, point_str = line.split(':')
                point_str = point_str.strip()[1:-1]
                point = point_str.split(',')
                azimuth_point = point[0]
                elevation_point = point[1] if point[1] else 0.0
                frame = int(frame_str.strip())
                azimuth = float(azimuth_point)
                azimuth_points.append((frame, azimuth))
                elevation_val = float(elevation_point)
                elevation_points.append((frame, elevation_val))
            azimuth_points.sort(key=lambda x: x[0])
            elevation_points.sort(key=lambda x: x[0])

        #interpolation
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
                timing = (i - azimuth_points[prev_point][0]) / (
                            azimuth_points[next_point][0] - azimuth_points[prev_point][0])
                interpolated_azimuth = self.ease(azimuth_points[prev_point][1], azimuth_points[next_point][1], self.easing(timing, interp_easing))
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
                timing = (i - elevation_points[prev_elevation_point][0]) / (
                            elevation_points[next_elevation_point][0] - elevation_points[prev_elevation_point][0])
                interpolated_elevation = self.ease(elevation_points[prev_point][1], elevation_points[next_point][1], self.easing(timing, interp_easing))
            else:
                interpolated_elevation = elevation_points[prev_elevation_point][1]

            azimuths.append(interpolated_azimuth)
            elevations.append(interpolated_elevation)

        log_node_info("easy sv3dLoader", "azimuths:" + str(azimuths))
        log_node_info("easy sv3dLoader", "elevations:" + str(elevations))

        log = 'azimuths:' + str(azimuths) + '\n\n' + "elevations:" + str(elevations)
        # Structure the final output
        positive = [[pooled, {"concat_latent_image": t, "elevation": elevations, "azimuth": azimuths}]]
        negative = [[torch.zeros_like(pooled),
                           {"concat_latent_image": torch.zeros_like(t), "elevation": elevations, "azimuth": azimuths}]]

        latent = torch.zeros([batch_size, 4, empty_latent_height // 8, empty_latent_width // 8])
        samples = {"samples": latent}

        image = easySampler.pil2tensor(Image.new('RGB', (1, 1), (0, 0, 0)))


        pipe = {"model": model,
                "positive": positive,
                "negative": negative,
                "vae": vae,
                "clip": clip,

                "samples": samples,
                "images": image,
                "seed": 0,

                "loader_settings": {"ckpt_name": ckpt_name,
                                    "vae_name": vae_name,

                                    "positive": positive,
                                    "positive_l": None,
                                    "positive_g": None,
                                    "positive_balance": None,
                                    "negative": negative,
                                    "negative_l": None,
                                    "negative_g": None,
                                    "negative_balance": None,
                                    "empty_latent_width": empty_latent_width,
                                    "empty_latent_height": empty_latent_height,
                                    "batch_size": batch_size,
                                    "seed": 0,
                                    "empty_samples": samples, }
                }

        return (pipe, model, log)

```
