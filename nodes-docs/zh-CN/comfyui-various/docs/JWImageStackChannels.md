
# Documentation
- Class name: JWImageStackChannels
- Category: jamesWalker55
- Output node: False

这个节点的设计目的是将两个图像张量沿着它们的通道维度进行堆叠，有效地将它们组合成一个单一的张量，该张量保留了两个输入图像的信息。

# Input types
## Required
- image_a
    - 要堆叠的第一个图像张量。它在堆叠操作中起着至关重要的作用，因为它与第二个图像张量结合形成单一的输出张量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_b
    - 要与第一个图像张量一起堆叠的第二个图像张量。它与第一个图像张量的组合产生了一个包含两个图像数据的新张量。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是一个单一的图像张量，它是通过沿着通道维度堆叠两个输入图像张量而产生的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageStackChannels", "Image Stack Channels")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "image_a": ("IMAGE",),
            "image_b": ("IMAGE",),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, image_a: torch.Tensor, image_b: torch.Tensor):
        assert isinstance(image_a, torch.Tensor)
        assert isinstance(image_b, torch.Tensor)

        stacked = torch.cat((image_a, image_b), dim=3)

        return (stacked,)

```
