# Documentation
- Class name: ColorCorrectRGB
- Category: 😺dzNodes/LayerColor
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

对图像的RGB各通道进行调整。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- R
    - 红色通道的调整值。
    - Comfy dtype: INT
    - Python dtype: int

- G 
    - 绿色通道的调整值。
    - Comfy dtype: INT
    - Python dtype: int
   
- B
    - 蓝色通道的调整值。
    - Comfy dtype: INT
    - Python dtype: int
    

# Output types

- image
    - 输出的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ColorCorrectRGB:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "R": ("INT", {"default": 0, "min": -255, "max": 255, "step": 1}),
                "G": ("INT", {"default": 0, "min": -255, "max": 255, "step": 1}),
                "B": ("INT", {"default": 0, "min": -255, "max": 255, "step": 1}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'color_correct_RGB'
    CATEGORY = '😺dzNodes/LayerColor'

    def color_correct_RGB(self, image, R, G, B):

        ret_images = []

        for i in image:
            i = torch.unsqueeze(i,0)
            __image = tensor2pil(i)
            _r, _g, _b = tensor2pil(i).convert('RGB').split()
            if R != 0 :
                _r = image_gray_offset(_r, R)
            if G != 0 :
                _g = image_gray_offset(_g, G)
            if B != 0 :
                _b = image_gray_offset(_b, B)
            ret_image = image_channel_merge((_r, _g, _b), 'RGB')

            if __image.mode == 'RGBA':
                ret_image = RGB2RGBA(ret_image, __image.split()[-1])

            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```