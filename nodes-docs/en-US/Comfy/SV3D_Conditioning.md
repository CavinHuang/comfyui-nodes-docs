---
tags:
- Conditioning
---

# SV3D_Conditioning
## Documentation
- Class name: `SV3D_Conditioning`
- Category: `conditioning/3d_models`
- Output node: `False`

The SV3D_Conditioning node is designed to apply specific 3D conditioning transformations to input data, facilitating the generation or manipulation of 3D content. It focuses on enhancing or modifying the 3D aspects of the data, such as spatial dimensions, depth perception, or other 3D-related attributes, to achieve desired outcomes in 3D model generation or adjustment.
## Input types
### Required
- **`clip_vision`**
    - Represents the visual understanding component, crucial for interpreting and processing the visual aspects of the input data.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `str`
- **`init_image`**
    - Serves as the initial image input, providing a visual basis for subsequent 3D conditioning transformations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`vae`**
    - Involves a variational autoencoder, essential for encoding and decoding images in the process of generating or modifying 3D content.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`width`**
    - Specifies the width of the output image, influencing the spatial dimensions of the 3D content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the output image, affecting the spatial dimensions of the 3D content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`video_frames`**
    - Defines the number of frames for video content, relevant in scenarios involving 3D video generation or manipulation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`elevation`**
    - Controls the elevation angle, impacting the perception of depth and spatial orientation in the 3D content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - Represents the positive conditioning aspect, enhancing specific desired features or attributes in the 3D content.
    - Python dtype: `Conditioning`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - Denotes the negative conditioning aspect, suppressing undesired features or attributes in the 3D content.
    - Python dtype: `Conditioning`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Encapsulates the latent representation of the 3D content, crucial for various generative or transformative processes.
    - Python dtype: `Latent`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SV3D_Conditioning:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip_vision": ("CLIP_VISION",),
                              "init_image": ("IMAGE",),
                              "vae": ("VAE",),
                              "width": ("INT", {"default": 576, "min": 16, "max": nodes.MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 576, "min": 16, "max": nodes.MAX_RESOLUTION, "step": 8}),
                              "video_frames": ("INT", {"default": 21, "min": 1, "max": 4096}),
                              "elevation": ("FLOAT", {"default": 0.0, "min": -90.0, "max": 90.0, "step": 0.1, "round": False}),
                             }}
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT")
    RETURN_NAMES = ("positive", "negative", "latent")

    FUNCTION = "encode"

    CATEGORY = "conditioning/3d_models"

    def encode(self, clip_vision, init_image, vae, width, height, video_frames, elevation):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1,1), width, height, "bilinear", "center").movedim(1,-1)
        encode_pixels = pixels[:,:,:,:3]
        t = vae.encode(encode_pixels)

        azimuth = 0
        azimuth_increment = 360 / (max(video_frames, 2) - 1)

        elevations = []
        azimuths = []
        for i in range(video_frames):
            elevations.append(elevation)
            azimuths.append(azimuth)
            azimuth += azimuth_increment

        positive = [[pooled, {"concat_latent_image": t, "elevation": elevations, "azimuth": azimuths}]]
        negative = [[torch.zeros_like(pooled), {"concat_latent_image": torch.zeros_like(t), "elevation": elevations, "azimuth": azimuths}]]
        latent = torch.zeros([video_frames, 4, height // 8, width // 8])
        return (positive, negative, {"samples":latent})

```
