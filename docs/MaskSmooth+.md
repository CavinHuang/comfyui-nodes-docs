
# Documentation
- Class name: MaskSmooth+
- Category: essentials
- Output node: False

MaskSmooth节点旨在对给定的遮罩应用高斯模糊，用户可以调节模糊的强度。这个过程会平滑遮罩的边缘，创造出更具视觉吸引力、边缘更加平滑的效果。

# Input types
## Required
- mask
    - mask输入代表将要应用高斯模糊的二值或灰度图像。它是实现平滑效果的核心元素。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- amount
    - amount参数控制应用于遮罩的高斯模糊强度。数值越高，平滑效果越明显。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- mask
    - 输出是经过高斯模糊处理的输入遮罩的修改版本，其边缘已被平滑处理。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskSmooth:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "amount": ("INT", { "default": 0, "min": 0, "max": 127, "step": 1, }),
            }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, mask, amount):
        if amount == 0:
            return (mask,)
        
        if amount % 2 == 0:
            amount += 1

        mask = mask > 0.5
        mask = T.functional.gaussian_blur(mask.unsqueeze(1), amount).squeeze(1).float()

        return (mask,)

```
