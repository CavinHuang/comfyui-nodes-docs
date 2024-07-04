# Documentation
- Class name: GetColorTone
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

从图片中获取主颜色或平均色。

# Input types
## Required

- image
    - 输入的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mode
    - 模式，有两种可选择，主颜色main_color和平均色average。
    - Comfy dtype: STRING
    - Python dtype: str
    - 可选值: 'average', 'main'


# Output types

- RGB color in HEX
    - 使用16进制RGB字符串格式描述，例如 '#FA3D86'。
    - Comfy dtype: STRING
    - Python dtype: str

- HSV color in list
    - 使用HSV格式描述的颜色。
    - Comfy dtype: LIST
    - Python dtype: list

# Usage tips
- Infra type: GPU

# Source code
```
class GetColorTone:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        mode_list = ['main_color', 'average']
        return {
            "required": {
                "image": ("IMAGE", ),  #
                "mode": (mode_list,),  # 主色/平均色
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("STRING", "LIST")
    RETURN_NAMES = ("RGB color in HEX", "HSV color in list")
    FUNCTION = 'get_color_tone'
    CATEGORY = '😺dzNodes/LayerUtility'

    def get_color_tone(self, image, mode,):
        if image.shape[0] > 0:
            image = torch.unsqueeze(image[0], 0)
        _canvas = tensor2pil(image).convert('RGB')
        _canvas = gaussian_blur(_canvas, int((_canvas.width + _canvas.height) / 200))
        if mode == 'main_color':
            ret_color = get_image_color_tone(_canvas)
        else:
            ret_color = get_image_color_average(_canvas)
        hsv_color = RGB_to_HSV(Hex_to_RGB(ret_color))

        return (ret_color, hsv_color)
```