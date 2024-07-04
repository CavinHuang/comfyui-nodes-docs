
# Documentation
- Class name: ImageFilterSharpen
- Category: image/filter
- Output node: False

ImageFilterSharpen节点对图像应用锐化滤镜，增强图像细节，使其看起来更加清晰和清晰。

# Input types
## Required
- images
    - 需要进行锐化处理的图像。这个输入对于定义将要进行增强以变得更加清晰和锐利的视觉内容至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 应用锐化滤镜后处理的图像，结果是增强了锐度和细节。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [SaveImageExtended](../../save-image-extended-comfyui/Nodes/SaveImageExtended.md)
    - [PlaySound|pysssss](../../ComfyUI-Custom-Scripts/Nodes/PlaySound|pysssss.md)



## Source code
```python
class ImageFilterSharpen:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images):
        return applyImageFilter(images, ImageFilter.SHARPEN)

```
