# Documentation
- Class name: ColorBalance
- Category: 😺dzNodes/LayerColor
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

改变图像的色彩平衡。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- cyan_red
    - : 青-红平衡。负值为偏青，正值为偏红。
    - Comfy dtype: FLOAT
    - Python dtype: float

- magenta_green
    - : 品红-绿平衡。负值为偏品红，正值为偏绿。
    - Comfy dtype: FLOAT
    - Python dtype: float

- yellow_blue
    - : 黄-蓝平衡。负值为偏黄，正值为偏蓝。
    - Comfy dtype: FLOAT
    - Python dtype: float


# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ColorBalance:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "cyan_red": ("FLOAT", {"default": 0, "min": -1.0, "max": 1.0, "step": 0.001}),
                "magenta_green": ("FLOAT", {"default": 0, "min": -1.0, "max": 1.0, "step": 0.001}),
                "yellow_blue": ("FLOAT", {"default": 0, "min": -1.0, "max": 1.0, "step": 0.001})
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'color_balance'
    CATEGORY = '😺dzNodes/LayerColor'

    def color_balance(self, image, cyan_red, magenta_green, yellow_blue):

        l_images = []
        l_masks = []
        ret_images = []

        for l in image:
            l_images.append(torch.unsqueeze(l, 0))
            m = tensor2pil(l)
            if m.mode == 'RGBA':
                l_masks.append(m.split()[-1])
            else:
                l_masks.append(Image.new('L', m.size, 'white'))


        for i in range(len(l_images)):
            _image = l_images[i]
            _mask = l_masks[i]
            orig_image = tensor2pil(_image)

            ret_image = color_balance(orig_image,
                              [cyan_red, magenta_green, yellow_blue],
                              [cyan_red, magenta_green, yellow_blue],
                              [cyan_red, magenta_green, yellow_blue],
                                      shadow_center=0.15,
                                      midtone_center=0.5,
                                      midtone_max=1,
                                      preserve_luminosity=True)

            if orig_image.mode == 'RGBA':
                ret_image = RGB2RGBA(ret_image, orig_image.split()[-1])

            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```