
# Documentation
- Class name: Kep_VariableImageBuilder
- Category: List Stuff
- Output node: False

VariableImageBuilder节点用于生成一批具有指定RGBA颜色值和尺寸的图像。它允许创建统一颜色的图像，这些图像可用于各种目的，如占位符、背景或测试。

# Input types
## Required
- r
    - 指定图像RGBA颜色的红色分量。它影响生成图像的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- g
    - 指定图像RGBA颜色的绿色分量。它影响生成图像的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 指定图像RGBA颜色的蓝色分量。它影响生成图像的整体颜色。
    - Comfy dtype: INT
    - Python dtype: int
- a
    - 指定图像RGBA颜色的透明度分量。它决定生成图像的不透明度。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 确定生成图像的宽度。它定义了图像的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 确定生成图像的高度。它定义了图像的垂直尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 指定在一批中要生成的图像数量。它控制图像的总输出量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- Image
    - 输出是一批具有指定RGBA颜色值和尺寸的图像。
    - Comfy dtype: IMAGE
    - Python dtype: Tuple[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VariableImageBuilder:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(s) -> Dict[str, Dict[str, Any]]:
        return {
            "required": {
                "r": ("INT", {"defaultInput": True, "min": 0, "max": 255}),
                "g": ("INT", {"defaultInput": True, "min": 0, "max": 255}),
                "b": ("INT", {"defaultInput": True, "min": 0, "max": 255}),
                "a": ("INT", {"defaultInput": True, "min": 0, "max": 255}),
                "width": ("INT", {"defaultInput": False, "default": 512}),
                "height": ("INT", {"defaultInput": False, "default": 512}),
                "batch_size": ("INT", {"default": 1, "min": 1}),
            },
        }

    RELOAD_INST = True
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("Image",)
    OUTPUT_IS_LIST = (False,)
    FUNCTION = "generate_images"

    CATEGORY = "List Stuff"

    def generate_images(
            self,
            r: int,
            g: int,
            b: int,
            a: int,
            width: int,
            height: int,
            batch_size: int,
    ) -> Tuple[Tensor]:
        batch_tensors: List[Tensor] = []
        for _ in range(batch_size):
            image = Image.new("RGB", (width, height), color=(r, g, b, a))
            batch_tensors.append(pil2tensor(image))
        return (torch.cat(batch_tensors),)

```
