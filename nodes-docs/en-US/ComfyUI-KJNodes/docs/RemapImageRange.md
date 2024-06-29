---
tags:
- ImageTransformation
---

# RemapImageRange
## Documentation
- Class name: `RemapImageRange`
- Category: `KJNodes/image`
- Output node: `False`

The RemapImageRange node is designed to adjust the pixel value range of an image to a specified new range, optionally clamping the resulting values to ensure they remain within a certain limit. This functionality is crucial for image preprocessing, normalization, and ensuring compatibility with various image processing pipelines.
## Input types
### Required
- **`image`**
    - The input image to be remapped. This parameter is crucial as it provides the source image whose pixel values are to be adjusted.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`min`**
    - The minimum value of the new range for the image pixel values. It affects the lower bound of the remapping process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`max`**
    - The maximum value of the new range for the image pixel values. It sets the upper limit of the remapping scale.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`clamp`**
    - A boolean flag indicating whether to clamp the remapped image values to a [0.0, 1.0] range, ensuring they stay within standard image value limits.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the image with its pixel values remapped to the specified new range, potentially clamped to fit within a [0.0, 1.0] range.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RemapImageRange:
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
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Remaps the image values to the specified range. 
"""
        
    def remap(self, image, min, max, clamp):
        if image.dtype == torch.float16:
            image = image.to(torch.float32)
        image = min + image * (max - min)
        if clamp:
            image = torch.clamp(image, min=0.0, max=1.0)
        return (image, )

```
