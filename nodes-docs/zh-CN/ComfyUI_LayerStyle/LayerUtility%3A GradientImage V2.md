# Documentation
- Class name: GradientImage
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

生成一张指定大小和指定颜色渐变的图片。GradientImage的V2升级版。

*仅限输入image和mask, 如果强制接入其他类型输入，将导致节点错误。
*预设尺寸在custom_size.ini中定义，这个文件位于插件根目录下, 默认名字是custom_size.ini.example, 初次使用这个文件需将文件后缀改为.ini。用文本编辑软件打开，编辑自定义尺寸。每行表示一个尺寸，第一个数值是宽度，第二个是高度，中间用小写的"x"分隔。为避免错误请不要输入多余的字符。

# Input types
## Required

- size
    - 图片的尺寸。
    - Comfy dtype: STRING
    - Python dtype: str
    - 可选值: 'custom',

- custom_width
    - 图像宽度。当size设置为"custom"时有效。如果有size_as输入，此处选项将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- custom_height
    - 图像高度。当size设置为"custom"时有效。如果有size_as输入，此处选项将被忽略。
    - Comfy dtype: INT
    - Python dtype: int

- angle
    - 渐变的角度。
    - Comfy dtype: INT
    - Python dtype: int

- start_color
    - 渐变的起始颜色。
    - Comfy dtype: STRING
    - Python dtype: str

- end_color
    - 渐变的结束颜色。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional

- size_as
    - 输入图像或遮罩，将按照其尺寸生成输出图像。注意，此输入优先级高于其他的尺寸设置。
    - Comfy dtype: IMAGE, MASK
    - Python dtype: torch.Tensor

# Output types

- image
    - 生成的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class GradientImageV2:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        size_list = ['custom']
        size_list.extend(load_custom_size())
        return {
            "required": {
                "size": (size_list,),
                "custom_width": ("INT", {"default": 512, "min": 4, "max": 99999, "step": 1}),
                "custom_height": ("INT", {"default": 512, "min": 4, "max": 99999, "step": 1}),
                "angle": ("INT", {"default": 0, "min": -360, "max": 360, "step": 1}),
                "start_color": ("STRING", {"default": "#FFFFFF"},),
                "end_color": ("STRING", {"default": "#000000"},),
            },
            "optional": {
                "size_as": (any, {}),
            }
        }

    RETURN_TYPES = ("IMAGE", )
    RETURN_NAMES = ("image", )
    FUNCTION = 'gradient_image_v2'
    CATEGORY = '😺dzNodes/LayerUtility'

    def gradient_image_v2(self, size, custom_width, custom_height, angle, start_color, end_color, size_as=None):

        if size_as is not None:
            if size_as.shape[0] > 0:
                _asimage = tensor2pil(size_as[0])
            else:
                _asimage = tensor2pil(size_as)
            width, height = _asimage.size
        else:
            if size == 'custom':
                width = custom_width
                height = custom_height
            else:
                try:
                    _s = size.split('x')
                    width = int(_s[0].strip())
                    height = int(_s[1].strip())
                except Exception as e:
                    log(f"Warning: {NODE_NAME} invalid size, check {custom_size_file}", message_type='warning')
                    width = custom_width
                    height = custom_height


        ret_image = gradient(start_color, end_color, width, height, angle)

        return (pil2tensor(ret_image), )
```