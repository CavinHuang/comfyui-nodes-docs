
# Documentation
- Class name: Color (RGB)
- Category: Bmad/image
- Output node: False

Color (RGB)节点旨在通过单独的红、绿、蓝（RGB）分量创建颜色表示。它允许用户指定每个颜色分量以形成复合颜色，可用于各种图像处理和颜色操作任务。

# Input types
## Required
- r
    - 颜色的红色分量，一个整数值，用于定义最终颜色中红色的强度。
    - Comfy dtype: INT
    - Python dtype: int
- g
    - 颜色的绿色分量，一个整数值，用于定义最终颜色中绿色的强度。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 颜色的蓝色分量，一个整数值，用于定义最终颜色中蓝色的强度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- color
    - 由指定的红、绿、蓝分量组成的复合颜色。这个输出对后续的图像处理或颜色操作任务至关重要，提供了一个标准化的颜色格式。
    - Comfy dtype: COLOR
    - Python dtype: Tuple[int, int, int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorRGB:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"r": color255_INPUT, "g": color255_INPUT, "b": color255_INPUT}}

    RETURN_TYPES = ("COLOR",)
    FUNCTION = "ret"
    CATEGORY = "Bmad/image"

    def ret(self, r, g, b):
        return ([r, g, b],)

```
