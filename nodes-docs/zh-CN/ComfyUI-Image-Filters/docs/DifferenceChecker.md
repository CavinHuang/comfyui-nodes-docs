
# Documentation
- Class name: DifferenceChecker
- Category: image/filters
- Output node: False

DifferenceChecker 节点旨在计算两幅图像之间的绝对差异，并按指定的乘数进行缩放。这一功能对于突出显示两幅图像之间的差异或变化非常有用，可应用于各种图像处理和分析任务中。

# Input types
## Required
- images1
    - 要比较的第一组图像。这个输入对于确定比较的基准至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- images2
    - 要与第一组图像进行比较的第二组图像。这个输入对于识别与基准的差异至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- multiplier
    - 应用于计算差异的缩放因子，允许调整差异的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出是一幅图像或一组图像，表示输入图像之间经过缩放的绝对差异。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DifferenceChecker:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images1": ("IMAGE", ),
                "images2": ("IMAGE", ),
                "multiplier": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 1000.0, "step": 0.01,  "round": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "difference_checker"

    CATEGORY = "image/filters"

    def difference_checker(self, images1, images2, multiplier):
        t = copy.deepcopy(images1)
        t = torch.abs(images1 - images2) * multiplier
        return (torch.clamp(t, min=0, max=1),)

```
