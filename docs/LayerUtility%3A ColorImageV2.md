# Documentation
- Class name: ColorImage
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

生成一张指定颜色和大小的图片。ColorImage的V2升级版。

# Input types

## Required

- size
    - 尺寸预设。预设可以用户自定义。如果有size_as输入，此处选项将被忽略。
    - Comfy dtype: STRING
    - Python dtype: str
    - Options: {"default": "custom", "options": ["custom", "512x512", "1024x1024", "2048x2048", "4096x4096", "8192x8192", "16384x16384", "32768x32768"]}

- custom_width
    -  图像宽度。当size设置为"custom"时有效。如果有size_as输入，此处选项将被忽略。
    - Comfy dtype: INT
    - Python dtype: int
    - Options: {"default": 512, "min": 4, "max": 99999, "step": 1}

- custom_height
    - 图像高度。当size设置为"custom"时有效。如果有size_as输入，此处选项将被忽略。
    - Comfy dtype: INT
    - Python dtype: int
    - Options: {"default": 512, "min": 4, "max": 99999, "step": 1}

- color
    - 图片的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
    - Options: {"default": "#000000"}

## Optional

- size_as
    - 作为参考的图片。如果设置了此项，将会忽略size选项。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ColorImageV2:

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
                "color": ("STRING", {"default": "#000000"},),
            },
            "optional": {
                "size_as": (any, {}),
            }
        }

    RETURN_TYPES = ("IMAGE", )
    RETURN_NAMES = ("image", )
    FUNCTION = 'color_image_v2'
    CATEGORY = '😺dzNodes/LayerUtility'

    def color_image_v2(self, size, custom_width, custom_height, color, size_as=None ):

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

        ret_image = Image.new('RGB', (width, height), color=color)
        return (pil2tensor(ret_image), )
```