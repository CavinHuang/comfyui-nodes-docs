# Documentation
- Class name: ColorCorrectLevels
- Category: 😺dzNodes/LayerColor
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

将LUT应用到图像。仅支持.cube格式的LUT文件。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- LUT
    - 这里列出了LUT文件夹中可用的.cube文件列表，选中的LUT文件将被应用到图像。*LUT文件夹在resource_dir.ini中定义，这个文件位于插件根目录下, 默认名字是resource_dir.ini.example, 初次使用这个文件需将文件后缀改为.ini。用文本编辑软件打开，找到“LUT_dir=”开头的这一行，编辑“=”之后为自定义文件夹路径名。这个文件夹里面所有的.cube文件将在ComfyUI初始化时被收集并显示在节点的列表中。如果ini中设定的文件夹无效，将启用插件自带的LUT文件夹。
    - Comfy dtype: LUT_LIST
    - Python dtype: str

- color_space
    - 普通图片请选择linear, log色彩空间的图片请选择log。
    - Comfy dtype: str
    - Python dtype: str
    - Options: ['linear', 'log']

# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ColorCorrectLUTapply:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        color_space_list = ['linear', 'log']
        return {
            "required": {
                "image": ("IMAGE", ),  #
                "LUT": (LUT_LIST,),  # LUT文件
                "color_space":  (color_space_list,),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'color_correct_LUTapply'
    CATEGORY = '😺dzNodes/LayerColor'

    def color_correct_LUTapply(self, image, LUT, color_space):
        ret_images = []
        for i in image:
            i = torch.unsqueeze(i, 0)
            _image = tensor2pil(i)

            lut_file = LUT_DICT[LUT]
            ret_image = apply_lut(_image, lut_file, log=(color_space == 'log'))

            if _image.mode == 'RGBA':
                ret_image = RGB2RGBA(ret_image, _image.split()[-1])
            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)

```