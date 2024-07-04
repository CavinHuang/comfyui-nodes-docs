
# Documentation
- Class name: INPAINT_DenoiseToCompositingMask
- Category: inpaint
- Output node: False

INPAINT_DenoiseToCompositingMask节点旨在将一个含噪声的蒙版转化为更清晰、更适合合成用途的蒙版。它通过调整提供的偏移量和阈值参数来优化蒙版质量，以便于后续的图像处理任务。

# Input types
## Required
- mask
    - mask输入是去噪过程的关键组成部分，作为节点将要处理以生成更清晰蒙版的主要数据。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- offset
    - offset参数允许调整蒙版强度的起始点，通过设置一个基准来界定什么是噪声，从而辅助去噪过程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- threshold
    - threshold参数定义了在去噪过程中要考虑的蒙版强度上限，有助于将蒙版的重要部分与噪声区分开来。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- mask
    - 输出是一个经过去噪处理的蒙版，通过在指定范围内调整其值，优化了用于合成任务的效果。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DenoiseToCompositingMask:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
                "offset": (
                    "FLOAT",
                    {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.01},
                ),
                "threshold": (
                    "FLOAT",
                    {"default": 0.2, "min": 0.01, "max": 1.0, "step": 0.01},
                ),
            }
        }

    RETURN_TYPES = ("MASK",)
    CATEGORY = "inpaint"
    FUNCTION = "convert"

    def convert(self, mask: Tensor, offset: float, threshold: float):
        assert 0.0 <= offset < threshold <= 1.0, "Threshold must be higher than offset"
        mask = (mask - offset) * (1 / (threshold - offset))
        mask = mask.clamp(0, 1)
        return (mask,)

```
