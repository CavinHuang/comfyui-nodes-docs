
# Documentation
- Class name: SALVTON_Apply
- Category: Clothing - SAL-VTON
- Output node: False

SALVTON_Apply节点旨在应用SAL-VTON（虚拟试衣）技术，利用深度学习模型实现服装在人物图像上的虚拟叠加。该节点通过考虑服装相对于人体的形状和贴合度，来实现逼真的试衣效果，从而在人物图像上精准地叠加服装图像。

# Input types
## Required
- garment
    - 需要叠加到人物图像上的服装图像。它在虚拟试衣过程中扮演着关键角色，提供了具体的待试穿服装项目。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- person
    - 服装将被应用其上的人物图像。这张图像作为虚拟试衣的基础，决定了服装将如何定位和贴合。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- garment_mask
    - 服装的遮罩图像，用于通过定义服装的边界来准确地将服装叠加到人物图像上。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 应用虚拟试衣处理后的结果图像，展示了服装逼真贴合在人物身上的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SALVTONApply:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "garment": ("IMAGE", ),
                "person": ("IMAGE",),
                "garment_mask": ("IMAGE",)
            }
        }

    CATEGORY = node_category

    RETURN_TYPES = ("IMAGE", )
    FUNCTION = "apply_salvaton"

    def apply_salvaton(self, garment, person, garment_mask):
        return (inferSAL(folder_paths.get_folder_paths('salvton')[0], person, garment, garment_mask),)

```
