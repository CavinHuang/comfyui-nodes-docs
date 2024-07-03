
# Documentation
- Class name: RemapImageRange
- Category: KJNodes/image
- Output node: False

RemapImageRange节点旨在将输入图像的像素值范围调整到指定的新范围内，并可选择性地对结果值进行裁剪，以确保它们保持在特定限制内。这一功能对于图像预处理、归一化以及确保与各种图像处理流程的兼容性至关重要。

# Input types
## Required
- image
    - 需要进行重新映射的输入图像。这个参数至关重要，因为它提供了源图像，其像素值将被调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- min
    - 图像像素值新范围的最小值。它影响重新映射过程的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max
    - 图像像素值新范围的最大值。它设定了重新映射比例的上限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clamp
    - 一个布尔标志，表示是否将重新映射后的图像值限制在[0.0, 1.0]范围内，确保它们保持在标准图像值限制内。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 输出是像素值被重新映射到指定新范围的图像，可能会被限制在[0.0, 1.0]范围内。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
