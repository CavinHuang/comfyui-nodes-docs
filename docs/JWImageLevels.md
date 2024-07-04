
# Documentation
- Class name: JWImageLevels
- Category: jamesWalker55
- Output node: False

JWImageLevels节点通过在指定范围内调整图像的强度级别来增强视觉对比度或校正曝光。它在给定的最小值和最大值之间线性重新缩放图像的颜色，并裁剪任何超出范围的值。

# Input types
## Required
- image
    - 需要调整的输入图像张量。该张量基于指定的最小值和最大值进行线性变换，从而影响其整体亮度和对比度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- min
    - 强度范围的下限。强度低于此值的像素将被设置为最小值（黑色），有效地使图像变暗。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max
    - 强度范围的上限。强度高于此值的像素将被设置为最大值（白色），有效地使图像变亮。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 具有调整后强度级别的输出图像张量，其中像素值被重新缩放以适应新指定的范围。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageMix", "Image Mix")
class _:
    CATEGORY = "jamesWalker55"
    BLEND_TYPES = ("mix", "multiply")

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "blend_type": (cls.BLEND_TYPES, {"default": "mix"}),
                "factor": ("FLOAT", {"min": 0, "max": 1, "step": 0.01, "default": 0.5}),
                "image_a": ("IMAGE",),
                "image_b": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(
        self,
        blend_type: str,
        factor: float,
        image_a: torch.Tensor,
        image_b: torch.Tensor,
    ):
        assert blend_type in self.BLEND_TYPES
        assert isinstance(factor, float)
        assert isinstance(image_a, torch.Tensor)
        assert isinstance(image_b, torch.Tensor)

        assert image_a.shape == image_b.shape

        if blend_type == "mix":
            mixed = image_a * (1 - factor) + image_b * factor
        elif blend_type == "multiply":
            mixed = image_a * (1 - factor + image_b * factor)
        else:
            raise NotImplementedError(f"Blend type not yet implemented: {blend_type}")

        return (mixed,)

```
