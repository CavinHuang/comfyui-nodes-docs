---
tags:
- ImageEnhancement
- VisualEffects
---

# ImageSharpen
## Documentation
- Class name: `ImageSharpen`
- Category: `image/postprocessing`
- Output node: `False`

The ImageSharpen node enhances the clarity of an image by applying a sharpening filter. This process accentuates the edges and details within the image, making it appear more defined and crisp.
## Input types
### Required
- **`image`**
    - The input image to be sharpened. This tensor represents the image data that will undergo the sharpening process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`sharpen_radius`**
    - Defines the radius of the sharpening effect. A larger radius increases the area of influence around edges, enhancing the sharpening effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma`**
    - Determines the spread of the Gaussian kernel used in the sharpening process. A higher sigma value results in a smoother, less localized sharpening effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`alpha`**
    - Controls the intensity of the sharpening. Higher alpha values result in a more pronounced sharpening effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The sharpened image. This output is the result of applying the sharpening filter to the input image, enhancing its edges and details.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - IPAdapterApplyFaceID
    - IPAdapterApply
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)



## Source code
```python
class Sharpen:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "sharpen_radius": ("INT", {
                    "default": 1,
                    "min": 1,
                    "max": 31,
                    "step": 1
                }),
                "sigma": ("FLOAT", {
                    "default": 1.0,
                    "min": 0.1,
                    "max": 10.0,
                    "step": 0.01
                }),
                "alpha": ("FLOAT", {
                    "default": 1.0,
                    "min": 0.0,
                    "max": 5.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "sharpen"

    CATEGORY = "image/postprocessing"

    def sharpen(self, image: torch.Tensor, sharpen_radius: int, sigma:float, alpha: float):
        if sharpen_radius == 0:
            return (image,)

        batch_size, height, width, channels = image.shape
        image = image.to(comfy.model_management.get_torch_device())

        kernel_size = sharpen_radius * 2 + 1
        kernel = gaussian_kernel(kernel_size, sigma, device=image.device) * -(alpha*10)
        center = kernel_size // 2
        kernel[center, center] = kernel[center, center] - kernel.sum() + 1.0
        kernel = kernel.repeat(channels, 1, 1).unsqueeze(1)

        tensor_image = image.permute(0, 3, 1, 2) # Torch wants (B, C, H, W) we use (B, H, W, C)
        tensor_image = F.pad(tensor_image, (sharpen_radius,sharpen_radius,sharpen_radius,sharpen_radius), 'reflect')
        sharpened = F.conv2d(tensor_image, kernel, padding=center, groups=channels)[:,:,sharpen_radius:-sharpen_radius, sharpen_radius:-sharpen_radius]
        sharpened = sharpened.permute(0, 2, 3, 1)

        result = torch.clamp(sharpened, 0, 1)

        return (result.to(comfy.model_management.intermediate_device()),)

```
