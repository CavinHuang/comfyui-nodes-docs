
# Documentation
- Class name: AspectRatioSelector
- Category: Art Venture/Utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AspectRatioSelector节点旨在根据预定义的选项来选择和调整图像的宽高比。它简化了将图像调整为特定尺寸的过程，确保输出符合所需的宽高比。这个节点在图像处理和布局设计中特别有用，可以快速实现标准化的图像尺寸调整。

# Input types
## Required
- aspect_ratio
    - 从预定义的常用比例列表中指定所需的图像宽高比。这个选择决定了图像将被调整到的尺寸，直接影响图像的最终外观和布局。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- ratio
    - 返回所选宽高比作为字符串，表示图像宽度和高度之间的比例关系。这个输出可以用于后续的图像处理或布局计算。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 根据所选宽高比调整后的图像计算宽度。这个值反映了图像在保持选定宽高比的情况下的新宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 根据所选宽高比调整后的图像计算高度。这个值反映了图像在保持选定宽高比的情况下的新高度。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilAspectRatioSelector(UtilSDXLAspectRatioSelector):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "aspect_ratio": (
                    [
                        "1:1",
                        "2:3",
                        "3:4",
                        "9:16",
                        "3:2",
                        "4:3",
                        "16:9",
                    ],
                ),
            }
        }

    def get_aspect_ratio(self, aspect_ratio):
        ratio, width, height = super().get_aspect_ratio(aspect_ratio)

        scale_ratio = 768 / max(width, height)

        width = int(scale_ratio * width / 8) * 8
        height = int(scale_ratio * height / 8) * 8

        return (ratio, width, height)

```
