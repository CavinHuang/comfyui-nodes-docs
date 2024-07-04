
# Documentation
- Class name: ImageFilterEdgeEnhance
- Category: image/filter
- Output node: False

ImageFilterEdgeEnhance节点对图像应用边缘增强滤镜，突出图像边缘，使图像细节更加明显。这种处理可以提高图像的清晰度和视觉冲击力，适用于需要强调轮廓和结构的场景。

# Input types
## Required
- images
    - 需要进行边缘增强处理的图像。这是节点的核心输入，决定了最终增强效果的基础内容。图像的质量和特征将直接影响边缘增强的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 经过边缘增强处理后的图像。这些图像会呈现出更加锐利的边缘和更突出的细节，整体视觉效果更加清晰和突出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterEdgeEnhance:
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
        return applyImageFilter(images, ImageFilter.EDGE_ENHANCE)

```
