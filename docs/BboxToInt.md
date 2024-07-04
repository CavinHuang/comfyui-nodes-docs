
# Documentation
- Class name: `BboxToInt`
- Category: `KJNodes/masking`
- Output node: `False`

BboxToInt节点旨在将边界框坐标从列表转换为整数值，包括计算边界框的中心点。该节点通过提供精确的整数坐标，便于对边界框数据进行操作和分析。

# Input types
## Required
- **`bboxes`**
    - 'bboxes'参数表示要处理的边界框列表。每个边界框应为坐标的元组或列表。此参数对于确定哪些边界框将被转换为整数值至关重要。
    - Comfy dtype: BBOX
    - Python dtype: List[Tuple[int, int, int, int]]
- **`index`**
    - 'index'参数指定要处理的'bboxes'列表中边界框的位置。它允许选择性地转换边界框，增强了处理边界框数据的灵活性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- **`x_min`**
    - 所选边界框的最小x坐标。
    - Comfy dtype: INT
    - Python dtype: int
- **`y_min`**
    - 所选边界框的最小y坐标。
    - Comfy dtype: INT
    - Python dtype: int
- **`width`**
    - 所选边界框的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- **`height`**
    - 所选边界框的高度。
    - Comfy dtype: INT
    - Python dtype: int
- **`center_x`**
    - 所选边界框中心点的x坐标。
    - Comfy dtype: INT
    - Python dtype: int
- **`center_y`**
    - 所选边界框中心点的y坐标。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BboxToInt:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "bboxes": ("BBOX",),
                "index": ("INT", {"default": 0,"min": 0, "max": 99999999, "step": 1}),
            },
        }

    RETURN_TYPES = ("INT","INT","INT","INT","INT","INT",)
    RETURN_NAMES = ("x_min","y_min","width","height", "center_x","center_y",)
    FUNCTION = "bboxtoint"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Returns selected index from bounding box list as integers.
"""
    def bboxtoint(self, bboxes, index):
        x_min, y_min, width, height = bboxes[index]
        center_x = int(x_min + width / 2)
        center_y = int(y_min + height / 2)
        
        return (x_min, y_min, width, height, center_x, center_y,)

```
