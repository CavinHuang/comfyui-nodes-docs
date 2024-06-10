---
tags:
- Blur
- VisualEffects
---

# ImageBlur
## Documentation
- Class name: `ImageBlur`
- Category: `image/postprocessing`
- Output node: `False`

The ImageBlur node applies a Gaussian blur to an image, utilizing a specified blur radius and sigma value to control the extent and intensity of the blurring effect. This process can help in reducing image noise and detail, creating a smoother appearance.
## Input types
### Required
- **`image`**
    - The input image to be blurred, provided as a torch.Tensor. This image undergoes a Gaussian blur transformation based on the specified blur radius and sigma.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`blur_radius`**
    - Specifies the radius of the blur effect. A larger radius results in a more pronounced blurring effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma`**
    - Determines the spread of the blur effect. A higher sigma value increases the extent of blurring, affecting the smoothness of the output image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the Gaussian blur, returned as a torch.Tensor. This image will have a smoother appearance compared to the input.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - [Cut By Mask](../../masquerade-nodes-comfyui/Nodes/Cut By Mask.md)



## Source code
```python
class Blur:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "blur_radius": ("INT", {
                    "default": 1,
                    "min": 1,
                    "max": 31,
                    "step": 1
                }),
                "sigma": ("FLOAT", {
                    "default": 1.0,
                    "min": 0.1,
                    "max": 10.0,
                    "step": 0.1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "blur"

    CATEGORY = "image/postprocessing"

    def blur(self, image: torch.Tensor, blur_radius: int, sigma: float):
        if blur_radius == 0:
            return (image,)

        image = image.to(comfy.model_management.get_torch_device())
        batch_size, height, width, channels = image.shape

        kernel_size = blur_radius * 2 + 1
        kernel = gaussian_kernel(kernel_size, sigma, device=image.device).repeat(channels, 1, 1).unsqueeze(1)

        image = image.permute(0, 3, 1, 2) # Torch wants (B, C, H, W) we use (B, H, W, C)
        padded_image = F.pad(image, (blur_radius,blur_radius,blur_radius,blur_radius), 'reflect')
        blurred = F.conv2d(padded_image, kernel, padding=kernel_size // 2, groups=channels)[:,:,blur_radius:-blur_radius, blur_radius:-blur_radius]
        blurred = blurred.permute(0, 2, 3, 1)

        return (blurred.to(comfy.model_management.intermediate_device()),)

```
