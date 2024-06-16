# Documentation
- Class name: ColorCorrectHSV
- Category: 😺dzNodes/LayerColor
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

对图像的LAB各通道进行调整。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- L
    - 图像的L通道。
    - Comfy dtype: INT
    - Python dtype: int

- A
    - 图像的A通道。
    - Comfy dtype: INT
    - Python dtype: int

- B
    - 图像的B通道。
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
class ColorCorrectLAB:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "L": ("INT", {"default": 0, "min": -255, "max": 255, "step": 1}),
                "A": ("INT", {"default": 0, "min": -255, "max": 255, "step": 1}),
                "B": ("INT", {"default": 0, "min": -255, "max": 255, "step": 1}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'color_correct_LAB'
    CATEGORY = '😺dzNodes/LayerColor'

    def color_correct_LAB(self, image, L, A, B):

        ret_images = []

        for i in image:
            i = torch.unsqueeze(i, 0)
            __image = tensor2pil(i)
            _l, _a, _b = tensor2pil(i).convert('LAB').split()
            if L != 0 :
                _l = image_gray_offset(_l, L)
            if A != 0 :
                _a = image_gray_offset(_a, A)
            if B != 0 :
                _b = image_gray_offset(_b, B)
            ret_image = image_channel_merge((_l, _a, _b), 'LAB')

            if __image.mode == 'RGBA':
                ret_image = RGB2RGBA(ret_image, __image.split()[-1])

            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)

```