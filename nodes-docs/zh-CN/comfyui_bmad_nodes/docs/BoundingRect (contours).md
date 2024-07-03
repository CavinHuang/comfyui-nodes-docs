
# Documentation
- Class name: BoundingRect (contours)
- Category: Bmad/CV/Contour
- Output node: False

BoundingRect节点用于计算轮廓的边界矩形。它抽象了确定完全包围轮廓的最小矩形的过程，提供了一种简单的方法来理解轮廓的空间范围。

# Input types
## Required
- contour
    - 需要计算边界矩形的轮廓。这个输入至关重要，因为它通过确定给定轮廓的空间范围直接影响输出结果。
    - Comfy dtype: CV_CONTOUR
    - Python dtype: CV_CONTOUR
- return_mode
    - 指定要使用的矩形计算模式。这会影响边界矩形的尺寸计算和返回方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: rect_modes

# Output types
- int
    - 输出是指定轮廓的边界矩形，表示为四个整数的元组(x, y, width, height)，其中(x, y)是矩形的左上角坐标。
    - Comfy dtype: INT
    - Python dtype: Tuple[int, int, int, int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ContourGetBoundingRect:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "contour": ("CV_CONTOUR",),
                "return_mode": (rect_modes, {"default": rect_modes[1]})
            },
        }

    RETURN_TYPES = tuple(["INT" for x in range(4)])
    FUNCTION = "compute"
    CATEGORY = "Bmad/CV/Contour"

    def compute(self, contour, return_mode):
        if contour is None:
            print("Contour = None !")
            return (0, 0, 0, 0,)

        # convert opencv boundingRect format to bounds
        bounds = rect_modes_map[rect_modes[0]]["toBounds"](*cv.boundingRect(contour))

        # convert from bounds to desired output format on return
        return rect_modes_map[return_mode]["fromBounds"](*bounds)

```
