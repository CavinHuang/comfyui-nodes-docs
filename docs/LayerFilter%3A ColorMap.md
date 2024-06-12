# Documentation
- Class name: ColorMap
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

伪彩色热力图效果。

# Input types

## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- color_map
    - 伪彩色热力图的颜色。
    - Comfy dtype: STRING
    - Python dtype: str
    
- opacity
    - 透明度。
    - Comfy dtype: INT
    - Python dtype: int
    - Options: {"default": 100, "min": 0, "max": 100, "step": 1}

# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ColorMap:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),
                "color_map": (colormap_list,),
                "opacity": ("INT", {"default": 100, "min": 0, "max": 100, "step": 1}),  # 透明度
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'color_map'
    CATEGORY = '😺dzNodes/LayerFilter'

    def color_map(self, image, color_map, opacity
                  ):

        ret_images = []

        for i in image:
            i = torch.unsqueeze(i, 0)
            _canvas = tensor2pil(i)
            _image = image_to_colormap(_canvas, colormap_list.index(color_map))
            ret_image = chop_image(_canvas, _image, 'normal', opacity)

            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```