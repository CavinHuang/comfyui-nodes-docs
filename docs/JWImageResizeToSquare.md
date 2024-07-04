
# Documentation
- Class name: JWImageResizeToSquare
- Category: jamesWalker55
- Output node: False

该节点将输入图像调整为指定的正方形尺寸。它采用选定的插值方法来调整图像的尺寸，同时保持其宽高比。这一过程对于需要统一图像尺寸或准备用于特定模型输入的图像数据特别有用。

# Input types
## Required
- image
    - 需要调整大小的输入图像。它是定义将进行调整的视觉内容的关键。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size
    - 指定图像的目标宽度和高度，确保输出图像为正方形。这个参数决定了最终图像的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation_mode
    - 决定用于调整图像大小的方法，影响调整后图像的质量和特征。不同的插值模式可能会产生略有不同的视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 调整大小后的图像，现已转换为指定的正方形尺寸。输出的图像保持了原始内容，但尺寸已经改变。
    - Comfy dtype: IMAGE
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
