
# Documentation
- Class name: InstantID Mask Prepare Settings (JPS)
- Category: JPS Nodes/Settings
- Output node: False

InstantID Mask Prepare Settings (JPS)节点用于为InstantID处理过程中的图像遮罩准备设置。它配置了各种参数，如遮罩类型、调整大小选项、裁剪、填充和图像插值等，旨在增强和调整输入图像，以实现最佳的InstantID生成效果。

# Input types
## Required
- mask_type
    - 指定要应用的遮罩类型，如"Mask Editor"或"Red from Image"，影响图像在InstantID中的处理方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: int
- resize_to
    - 确定调整大小的策略，如"Keep Size"或"Resize to Target"，影响处理后图像的尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- resize_type
    - 定义调整大小的方法，可以是"Crop"（裁剪）或"Stretch"（拉伸），以适应指定的尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- offset_width
    - 应用于图像的水平偏移量，调整图像相对于遮罩的位置。
    - Comfy dtype: INT
    - Python dtype: int
- offset_height
    - 应用于图像的垂直偏移量，调整图像相对于遮罩的位置。
    - Comfy dtype: INT
    - Python dtype: int
- crop_left
    - 指定从图像左边缘裁剪的量，用于自定义可见区域。
    - Comfy dtype: INT
    - Python dtype: int
- crop_right
    - 指定从图像右边缘裁剪的量，用于自定义可见区域。
    - Comfy dtype: INT
    - Python dtype: int
- crop_top
    - 指定从图像上边缘裁剪的量，用于自定义可见区域。
    - Comfy dtype: INT
    - Python dtype: int
- crop_bottom
    - 指定从图像下边缘裁剪的量，用于自定义可见区域。
    - Comfy dtype: INT
    - Python dtype: int
- padding_left
    - 在图像左侧添加的填充量，影响最终图像尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- padding_right
    - 在图像右侧添加的填充量，影响最终图像尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- padding_top
    - 在图像顶部添加的填充量，影响最终图像尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- padding_bottom
    - 在图像底部添加的填充量，影响最终图像尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 用于调整图像大小的方法，如"lanczos"或"bilinear"，影响调整大小后图像的质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 应用于图像的锐化程度，用于增强图像的清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- imageprepare_settings
    - Comfy dtype: BASIC_PIPE
    - 一个包含配置好的遮罩类型、调整大小、裁剪、填充和图像处理参数设置的元组，可直接用于InstantID图像准备。
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDMaskPrepare_Settings:

    masktypes = ["No Mask","Mask Editor","Mask Editor (inverted)","Red from Image","Green from Image","Blue from Image"]        

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask_type": (s.masktypes,),
                "resize_to": (["Resize to Target","Resize to Source","Keep Size"],),
                "resize_type": (["Crop","Stretch"],),
                "offset_width": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "offset_height": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "crop_left": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_right": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_top": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_bottom": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "padding_left": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_right": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_top": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_bottom": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", { "default": 0.0, "min": 0, "max": 1, "step": 0.05, "display": "number" }),
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("imageprepare_settings",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Settings"

    def get_imageprepare(self,mask_type,resize_to,resize_type,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening):

        resizeto = int (0)
        if(resize_to == "Keep Size"):
            resizeto = int(1)
        elif(resize_to == "Resize to Target"):
            resizeto = int(2)
        elif(resize_to == "Resize to Source"):
            resizeto = int(3)

        resizetype = "Crop"
        if(resize_type == "Stretch"):
            resizetype = "Stretch"

        masktype = int(0)
        if(mask_type == "Mask Editor"):
            masktype = int(1)
        elif(mask_type == "Mask Editor (inverted)"):
            masktype = int(2)
        elif(mask_type == "Red from Image"):
            masktype = int(3)
        elif(mask_type == "Green from Image"):
            masktype = int(4)
        elif(mask_type == "Blue from Image"):
            masktype = int(5)

        imageprepare_settings = masktype, resizeto, resizetype, offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening

        return(imageprepare_settings,)

```
