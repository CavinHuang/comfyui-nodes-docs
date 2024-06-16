# Documentation
- Class name: CropBoxResolve
- Category: 😺dzNodes/LayerMask
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

将 corp_box 解析为 x , y , width , height 。

# Input types
## Required

- crop_box
    - 裁剪框。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types

- x
    - 裁剪框左上角 x 坐标。
    - Comfy dtype: INT
    - Python dtype: int

- y
    - 裁剪框左上角 y 坐标。
    - Comfy dtype: INT
    - Python dtype: int

- width
    - 裁剪框宽度。
    - Comfy dtype: INT
    - Python dtype: int

- height
    - 裁剪框高度。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: GPU

# Source code
```
class CropBoxResolve:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "crop_box": ("BOX",),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("INT", "INT", "INT", "INT")
    RETURN_NAMES = ("x", "y", "width", "height")
    FUNCTION = 'crop_box_resolve'
    CATEGORY = '😺dzNodes/LayerUtility'

    def crop_box_resolve(self, crop_box
                  ):

        (x1, y1, x2, y2) = crop_box
        x1 = int(x1)
        y1 = int(y1)
        x2 = int(x2)
        y2 = int(y2)

        return (x1, y1, x2 - x1, y2 - y1,)
```