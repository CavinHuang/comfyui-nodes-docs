
# Documentation
- Class name: SaltMasksToImages
- Category: SALT/Masking
- Output node: False

该节点旨在将一组掩码图像转换为张量表示形式，为后续的计算任务实现从图像处理到张量运算的过渡。

# Input types
## Required
- masks
    - masks输入代表一组将被转换为张量格式的掩码图像。这种转换对于后续基于张量的操作和分析至关重要。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

# Output types
- images
    - 输出是一个由输入掩码转换而来的图像张量，可用于进一步的处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMasksToImages:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",)
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    CATEGORY = f"{NAME}/Masking"
    FUNCTION = "convert"

    def convert(self, masks):
        images = []
        for mask in masks:
            images.append(pil2tensor(mask2pil(mask)))
        images = torch.cat(images, dim=0)
        return (images, )

```
