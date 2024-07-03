
# Documentation
- Class name: ImageEffectsSepia
- Category: image/effects
- Output node: False

ImageEffectsSepia节点用于给图像应用复古棕褐色调效果，将图像的色彩方案转换为模仿19世纪末20世纪初老照片的外观。这种效果通过调整输入图像的RGB值来实现，创造出一种温暖的褐色调，唤起怀旧和永恒的感觉。

# Input types
## Required
- images
    - images参数代表将要应用复古棕褐色调效果的输入图像。它对于定义将要进行转换的视觉内容至关重要，直接影响节点的执行过程和输出图像的外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是经过复古棕褐色调处理的输入图像的修改版本，呈现出怀旧和永恒的外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsSepia:
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
    CATEGORY = "image/effects"

    def node(self, images):
        tensor = images.clone().detach()

        sepia_mask = torch.tensor([[0.393, 0.349, 0.272],
                                   [0.769, 0.686, 0.534],
                                   [0.189, 0.168, 0.131]])

        tensor[:, :, :, 0:3] = torch.stack([
            torch.matmul(tensor[i, :, :, 0:3], sepia_mask) for i in range(len(tensor))
        ])

        return (tensor,)

```
