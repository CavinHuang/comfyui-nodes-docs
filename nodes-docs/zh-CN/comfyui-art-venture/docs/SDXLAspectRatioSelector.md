
# Documentation
- Class name: SDXLAspectRatioSelector
- Category: Art Venture/Utils
- Output node: False

SDXLAspectRatioSelector节点的设计目的是选择和调整图像的宽高比，确保图像符合特定尺寸的同时保持原始比例。它提供了一种机制，可以将图像缩放到一系列预定义的宽高比，适用于各种显示或处理需求。

# Input types
## Required
- aspect_ratio
    - 从预定义的比例列表中指定图像所需的宽高比。这个选择决定了图像将被缩放到的尺寸，从而影响其最终外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- ratio
    - 选定的宽高比，以字符串形式表示，指示图像的宽度与高度之间的比例。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 根据所选宽高比缩放后计算得出的图像宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 根据所选宽高比缩放后计算得出的图像高度。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilSDXLAspectRatioSelector:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "aspect_ratio": (
                    [
                        "1:1",
                        "2:3",
                        "3:4",
                        "5:8",
                        "9:16",
                        "9:19",
                        "9:21",
                        "3:2",
                        "4:3",
                        "8:5",
                        "16:9",
                        "19:9",
                        "21:9",
                    ],
                ),
            }
        }

    RETURN_TYPES = ("STRING", "INT", "INT")
    RETURN_NAMES = ("ratio", "width", "height")
    FUNCTION = "get_aspect_ratio"
    CATEGORY = "Art Venture/Utils"

    def get_aspect_ratio(self, aspect_ratio):
        width, height = 1024, 1024

        if aspect_ratio == "1:1":
            width, height = 1024, 1024
        elif aspect_ratio == "2:3":
            width, height = 832, 1216
        elif aspect_ratio == "3:4":
            width, height = 896, 1152
        elif aspect_ratio == "5:8":
            width, height = 768, 1216
        elif aspect_ratio == "9:16":
            width, height = 768, 1344
        elif aspect_ratio == "9:19":
            width, height = 704, 1472
        elif aspect_ratio == "9:21":
            width, height = 640, 1536
        elif aspect_ratio == "3:2":
            width, height = 1216, 832
        elif aspect_ratio == "4:3":
            width, height = 1152, 896
        elif aspect_ratio == "8:5":
            width, height = 1216, 768
        elif aspect_ratio == "16:9":
            width, height = 1344, 768
        elif aspect_ratio == "19:9":
            width, height = 1472, 704
        elif aspect_ratio == "21:9":
            width, height = 1536, 640

        return (aspect_ratio, width, height)

```
