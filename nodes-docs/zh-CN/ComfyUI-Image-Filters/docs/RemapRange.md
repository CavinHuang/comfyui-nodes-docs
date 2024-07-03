
# Documentation
- Class name: RemapRange
- Category: image/filters
- Output node: False

RemapRange节点旨在通过重新映射图像的黑点和白点来调整图像的亮度范围。这一过程可以增强图像的视觉对比度，或调整图像整体的明暗水平。

# Input types
## Required
- image
    - 待处理的输入图像。该图像的亮度级别将根据指定的黑点和白点进行调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- blackpoint
    - 重新映射为黑色的亮度范围下限。低于此点的值将被调整为黑色，从而影响图像的对比度和亮度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- whitepoint
    - 重新映射为白色的亮度范围上限。高于此点的值将被调整为白色，从而影响图像的对比度和亮度水平。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 经过黑点和白点重新映射后的输出图像，其亮度级别已被调整。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RemapRange:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "blackpoint": ("FLOAT", {
                    "default": 0.0,
                    "min": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "whitepoint": ("FLOAT", {
                    "default": 1.0,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "remap"

    CATEGORY = "image/filters"

    def remap(self, image: torch.Tensor, blackpoint: float, whitepoint: float):
        
        bp = min(blackpoint, whitepoint - 0.001)
        scale = 1 / (whitepoint - bp)
        
        i_dup = copy.deepcopy(image.cpu().numpy())
        i_dup = np.clip((i_dup - bp) * scale, 0.0, 1.0)
        
        return (torch.from_numpy(i_dup),)

```
