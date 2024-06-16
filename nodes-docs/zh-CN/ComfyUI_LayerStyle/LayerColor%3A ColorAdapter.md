# Documentation
- Class name: ColorAdapter
- Category: 😺dzNodes/LayerColor
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

自动调整图片色调，使之与参考图片相似。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- color_ref_image
    - 参考图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- opacity
    -  图像调整色调之后的不透明度。
    - Comfy dtype: INT
    - Python dtype: int
    - 取值范围: 0-100

# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ColorAdapter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "color_ref_image": ("IMAGE", ),  #
                "opacity": ("INT", {"default": 75, "min": 0, "max": 100, "step": 1}),  # 透明度
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'color_adapter'
    CATEGORY = '😺dzNodes/LayerColor'

    def color_adapter(self, image, color_ref_image, opacity):
        ret_images = []

        l_images = []
        r_images = []
        for l in image:
            l_images.append(torch.unsqueeze(l, 0))
        for r in color_ref_image:
            r_images.append(torch.unsqueeze(r, 0))
        for i in range(len(l_images)):
            _image = l_images[i]
            _ref = r_images[i] if len(ret_images) > i else r_images[-1]

            __image = tensor2pil(_image)
            _canvas = __image.convert('RGB')
            ret_image = color_adapter(_canvas, tensor2pil(_ref).convert('RGB'))
            ret_image = chop_image(_canvas, ret_image, blend_mode='normal', opacity=opacity)
            if __image.mode == 'RGBA':
                ret_image = RGB2RGBA(ret_image, __image.split()[-1])
            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```