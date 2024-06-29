---
tags:
- Conditioning
---

# StableZero123_Conditioning
## Documentation
- Class name: `StableZero123_Conditioning`
- Category: `conditioning/3d_models`
- Output node: `False`

This node is designed to apply specific conditioning transformations tailored for the StableZero123 model, enhancing its ability to generate or process 3D content. It focuses on adjusting and optimizing the input data to better suit the model's requirements for 3D generation tasks.
## Input types
### Required
- **`clip_vision`**
    - The 'clip_vision' input is used to provide visual context or cues that the model can use to guide the generation process, enhancing the relevance and accuracy of the 3D content produced.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `torch.Tensor`
- **`init_image`**
    - The 'init_image' input serves as an initial image or starting point for the generation process, allowing the model to modify or build upon this base to create the final 3D content.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The 'vae' input refers to a Variational Autoencoder used for encoding and decoding images, playing a crucial role in the model's ability to understand and manipulate visual data.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`width`**
    - The 'width' input specifies the desired width of the output image, allowing for customization of the generated content's dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The 'height' input determines the desired height of the output image, enabling control over the size of the generated 3D content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - The 'batch_size' input indicates the number of images to be processed or generated in a single batch, affecting the model's performance and efficiency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`elevation`**
    - The 'elevation' input allows for specifying the elevation angle for 3D model viewing, enabling different perspectives of the generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`azimuth`**
    - The 'azimuth' input enables setting the azimuth angle for 3D model viewing, offering various viewpoints of the generated 3D content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - This output delivers conditioning data that positively influences the generation process, enhancing the desired aspects of the generated content.
    - Python dtype: `list`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - This output provides conditioning data intended to negate or avoid certain elements, refining the generation process by excluding undesired aspects.
    - Python dtype: `list`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The 'latent' output represents the encoded latent space representation of the input data, crucial for the model's understanding and manipulation of the content.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)



## Source code
```python
class StableZero123_Conditioning:
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
                             }}
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT")
    RETURN_NAMES = ("positive", "negative", "latent")

    FUNCTION = "encode"

    CATEGORY = "conditioning/3d_models"

    def encode(self, clip_vision, init_image, vae, width, height, batch_size, elevation, azimuth):
        output = clip_vision.encode_image(init_image)
        pooled = output.image_embeds.unsqueeze(0)
        pixels = comfy.utils.common_upscale(init_image.movedim(-1,1), width, height, "bilinear", "center").movedim(1,-1)
        encode_pixels = pixels[:,:,:,:3]
        t = vae.encode(encode_pixels)
        cam_embeds = camera_embeddings(elevation, azimuth)
        cond = torch.cat([pooled, cam_embeds.to(pooled.device).repeat((pooled.shape[0], 1, 1))], dim=-1)

        positive = [[cond, {"concat_latent_image": t}]]
        negative = [[torch.zeros_like(pooled), {"concat_latent_image": torch.zeros_like(t)}]]
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return (positive, negative, {"samples":latent})

```
