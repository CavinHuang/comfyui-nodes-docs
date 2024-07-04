
# Documentation
- Class name: JWImageSaturation
- Category: jamesWalker55
- Output node: False

JWImageSaturation节点用于调整输入图像的饱和度水平。通过指定的调整因子，可以增强或减弱图像颜色的强度，从而实现对图像视觉效果的精细控制。

# Input types
## Required
- image
    - 需要调整饱和度的输入图像。饱和度的调整通过改变图像颜色的强度来实现。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- factor
    - 用于调整饱和度水平的乘数。当factor大于1时，会增加饱和度，使颜色更加鲜艳；当factor小于1时，会降低饱和度，使颜色变得更加柔和。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 饱和度调整后的输出图像。
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
