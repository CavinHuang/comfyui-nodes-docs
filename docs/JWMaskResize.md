
# Documentation
- Class name: JWMaskResize
- Category: jamesWalker55
- Output node: False

JWMaskResize节点专门用于将蒙版调整至指定尺寸，提供多种插值模式以满足不同的调整需求。

# Input types
## Required
- mask
    - 需要调整大小的输入蒙版。这个参数至关重要，因为它决定了将要被调整大小的内容。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- height
    - 调整后蒙版的目标高度。这个参数直接影响输出蒙版的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 调整后蒙版的目标宽度。这个参数直接影响输出蒙版的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation_mode
    - 指定在调整大小过程中使用的插值方法，为调整过程提供灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- mask
    - 调整大小后的蒙版，已按照指定尺寸和所选插值方法进行调整。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageLoadRGB", "Image Load RGB")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str):
        assert isinstance(path, str)

        img = load_image(path)
        return (img,)

```
