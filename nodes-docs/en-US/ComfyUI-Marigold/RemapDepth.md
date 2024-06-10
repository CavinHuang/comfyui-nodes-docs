---
tags:
- ImageTransformation
---

# RemapDepth
## Documentation
- Class name: `RemapDepth`
- Category: `Marigold`
- Output node: `False`

The RemapDepth node is designed to adjust the depth values of an image within a specified range and optionally clamp these values for normalization. It plays a crucial role in depth image processing by enabling the fine-tuning of depth perception and enhancing the visual quality of depth maps.
## Input types
### Required
- **`image`**
    - The input image whose depth values are to be remapped. This parameter is essential for defining the source depth map to be adjusted.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`min`**
    - Specifies the minimum value in the remapped depth range, allowing for the adjustment of depth perception by setting a new lower bound.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max`**
    - Defines the maximum value in the remapped depth range, enabling the customization of depth perception by establishing a new upper bound.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clamp`**
    - A boolean flag that determines whether the remapped depth values should be clamped within the 0.0 to 1.0 range, ensuring the normalization of depth maps.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with remapped depth values, adjusted according to the specified min, max, and optionally clamped to normalize the depth map.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RemapDepth:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { 
            "image": ("IMAGE",),
            "min": ("FLOAT", {"default": 0.0,"min": -10.0, "max": 1.0, "step": 0.01}),
            "max": ("FLOAT", {"default": 1.0,"min": 0.0, "max": 10.0, "step": 0.01}),
            "clamp": ("BOOLEAN", {"default": True}),
            },
            }
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "remap"

    CATEGORY = "Marigold"
        
    def remap(self, image, min, max, clamp):
        if image.dtype == torch.float16:
            image = image.to(torch.float32)
        image = min + image * (max - min)
        if clamp:
            image = torch.clamp(image, min=0.0, max=1.0)
        return (image, )

```
