---
tags:
- Conditioning
---

# StableZero123_Conditioning_Batched
## Documentation
- Class name: `StableZero123_Conditioning_Batched`
- Category: `conditioning/3d_models`
- Output node: `False`

This node is designed to process conditioning data in batches for the StableZero123 model, optimizing the conditioning process for efficiency and scalability. It focuses on handling multiple conditioning inputs simultaneously, applying model-specific adjustments to prepare them for the StableZero123 model's requirements.
## Input types
### Required
- **`clip_vision`**
    - Specifies the CLIP vision model to be used for conditioning, affecting how input images are interpreted and processed.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `torch.Tensor`
- **`init_image`**
    - The initial image to start the generation process, serving as a base for further modifications.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The variational autoencoder used for encoding and decoding images, integral to the image transformation process.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`width`**
    - The desired width of the output image, influencing the dimensionality of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The desired height of the output image, influencing the dimensionality of the generated image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - The number of images to process in a single batch, affecting the efficiency and speed of the conditioning process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`elevation`**
    - The elevation angle for 3D model viewing, affecting the perspective from which the model is rendered.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`azimuth`**
    - The azimuth angle for 3D model viewing, affecting the orientation of the model in the rendered image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`elevation_batch_increment`**
    - The incremental change in elevation angle across the batch, allowing for varied perspectives in a single batch.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`azimuth_batch_increment`**
    - The incremental change in azimuth angle across the batch, allowing for varied orientations in a single batch.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning output, tailored for promoting certain features or aspects in the generated image.
    - Python dtype: `List[torch.Tensor]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning output, tailored for suppressing certain features or aspects in the generated image.
    - Python dtype: `List[torch.Tensor]`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent representation of the image, used for further processing or generation steps.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class StableZero123_Conditioning_Batched:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip_vision": ("CLIP_VISION",),
                              "init_image": ("IMAGE",),
                              "vae": ("VAE",),
                              "width": ("INT", {"default": 256, "min": 16, "max": nodes.MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 256, "min": 16, "max": nodes.MAX_RESOLUTION, "step": 8}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
                              "elevation": ("FLOAT", {"default": 0.0, "min": -180.0, "max": 180.0, "step": 0.1, "round": False}),
                              "azimuth": ("FLOAT", {"default": 0.0, "min": -180.0, "max": 180.0, "step": 0.1, "round": False}),
                              "elevation_batch_increment": ("FLOAT", {"default": 0.0, "min": -180.0, "max": 180.0, "step": 0.1, "round": False}),
                              "azimuth_batch_increment": ("FLOAT", {"default": 0.0, "min": -180.0, "max": 180.0, "step": 0.1, "round": False}),
                             }}
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT")
    RETURN_NAMES = ("positive", "negative", "latent")

    FUNCTION = "encode"

    CATEGORY = "conditioning/3d_models"

    def encode(self, clip_vision, init_image, vae, width, height, batch_size, elevation, azimuth, elevation_batch_increment, azimuth_batch_increment):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1,1), width, height, "bilinear", "center").movedim(1,-1)
        encode_pixels = pixels[:,:,:,:3]
        t = vae.encode(encode_pixels)

        cam_embeds = []
        for i in range(batch_size):
            cam_embeds.append(camera_embeddings(elevation, azimuth))
            elevation += elevation_batch_increment
            azimuth += azimuth_batch_increment

        cam_embeds = torch.cat(cam_embeds, dim=0)
        cond = torch.cat([comfy.utils.repeat_to_batch_size(pooled, batch_size), cam_embeds], dim=-1)

        positive = [[cond, {"concat_latent_image": t}]]
        negative = [[torch.zeros_like(pooled), {"concat_latent_image": torch.zeros_like(t)}]]
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return (positive, negative, {"samples":latent, "batch_index": [0] * batch_size})

```
