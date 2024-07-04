
# Documentation
- Class name: JWImageMix
- Category: jamesWalker55
- Output node: False

JWImageMix节点设计用于使用指定的混合模式和混合因子将两个图像混合在一起。它支持混合和乘法等操作，允许灵活的图像处理和组合。

# Input types
## Required
- blend_type
    - 指定用于组合图像的混合模式。它决定了图像在数学上如何组合，影响混合的视觉效果。
    - Comfy dtype: ['mix', 'multiply']
    - Python dtype: str
- factor
    - 决定第二个图像在混合中的权重。较高的因子使第二个图像更突出，而较低的因子则偏向第一个图像。
    - Comfy dtype: FLOAT
    - Python dtype: float
- image_a
    - 要混合的第一个图像。在混合操作中充当基础层。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_b
    - 要与第一个图像混合的第二个图像。其贡献由混合因子控制。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 根据指定的混合类型和因子将两个输入图像混合的结果。
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
