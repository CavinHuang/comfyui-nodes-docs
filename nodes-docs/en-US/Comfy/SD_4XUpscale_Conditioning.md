---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# SD_4XUpscale_Conditioning
## Documentation
- Class name: `SD_4XUpscale_Conditioning`
- Category: `conditioning/upscale_diffusion`
- Output node: `False`

This node specializes in enhancing the resolution of images through a 4x upscale process, incorporating conditioning elements to refine the output. It leverages diffusion techniques to upscale images while allowing for the adjustment of scale ratio and noise augmentation to fine-tune the enhancement process.
## Input types
### Required
- **`images`**
    - The input images to be upscaled. This parameter is crucial as it directly influences the quality and resolution of the output images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`positive`**
    - Positive conditioning elements that guide the upscale process towards desired attributes or features in the output images.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, Any]`
- **`negative`**
    - Negative conditioning elements that the upscale process should avoid, helping to steer the output away from undesired attributes or features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, Any]`
- **`scale_ratio`**
    - Determines the factor by which the image resolution is increased. A higher scale ratio results in a larger output image, allowing for greater detail and clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_augmentation`**
    - Controls the level of noise augmentation applied during the upscale process. This can be used to introduce variability and improve the robustness of the output images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The refined positive conditioning elements resulting from the upscale process.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The refined negative conditioning elements resulting from the upscale process.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
- **`latent`**
    - Comfy dtype: `LATENT`
    - A latent representation generated during the upscale process, which can be utilized in further processing or model training.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)



## Source code
```python
class SD_4XUpscale_Conditioning:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "images": ("IMAGE",),
                              "positive": ("CONDITIONING",),
                              "negative": ("CONDITIONING",),
                              "scale_ratio": ("FLOAT", {"default": 4.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                              "noise_augmentation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                             }}
    RETURN_TYPES = ("CONDITIONING", "CONDITIONING", "LATENT")
    RETURN_NAMES = ("positive", "negative", "latent")

    FUNCTION = "encode"

    CATEGORY = "conditioning/upscale_diffusion"

    def encode(self, images, positive, negative, scale_ratio, noise_augmentation):
        width = max(1, round(images.shape[-2] * scale_ratio))
        height = max(1, round(images.shape[-3] * scale_ratio))

        pixels = comfy.utils.common_upscale((images.movedim(-1,1) * 2.0) - 1.0, width // 4, height // 4, "bilinear", "center")

        out_cp = []
        out_cn = []

        for t in positive:
            n = [t[0], t[1].copy()]
            n[1]['concat_image'] = pixels
            n[1]['noise_augmentation'] = noise_augmentation
            out_cp.append(n)

        for t in negative:
            n = [t[0], t[1].copy()]
            n[1]['concat_image'] = pixels
            n[1]['noise_augmentation'] = noise_augmentation
            out_cn.append(n)

        latent = torch.zeros([images.shape[0], 4, height // 4, width // 4])
        return (out_cp, out_cn, {"samples":latent})

```
