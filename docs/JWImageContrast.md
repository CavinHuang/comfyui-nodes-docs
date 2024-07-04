
# Documentation
- Class name: JWImageContrast
- Category: jamesWalker55
- Output node: False

JWImageContrast节点用于调整图像的对比度。通过指定的factor参数，可以增强或减弱图像中明暗区域之间的差异，从而实现对比度的调整。

# Input types
## Required
- image
    - 需要调整对比度的输入图像。对比度的调整是通过改变像素的强度来实现的。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- factor
    - 用于调整对比度的乘数。当factor大于1时会增加对比度，小于1时会降低对比度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 经过对比度调整后的输出图像。
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
