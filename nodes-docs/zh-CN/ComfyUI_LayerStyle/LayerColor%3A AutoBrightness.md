# Documentation
- Class name: AutoBrightness
- Category: 😺dzNodes/LayerColor
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

将过暗或过亮的图片自动调整到适中的亮度，支持遮罩输入。有遮罩输入时仅以遮罩部分的内容作为自动亮度的数据来源。输出仍然是整个调整后的图像。

# Input types
## Required

- image
    - 输入的图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- strength
    - 自动调整亮度的强度。数值越大，越偏向中间值，与原图的差别越大。
    - Comfy dtype: INT
    - Python dtype: int

- saturation
    - 色彩饱和度。亮度改变通常会导致色彩饱和度发生变化，可在此适当调整补偿。
    - Comfy dtype: INT
    - Python dtype: int

## Optional

- mask
    - 遮罩。仅对遮罩部分的内容进行自动亮度调整。
    - Comfy dtype: MASK
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
class AutoBrightness:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE", ),  #
                "strength": ("INT", {"default": 75, "min": 0, "max": 100, "step": 1}),
                "saturation": ("INT", {"default": 8, "min": -255, "max": 255, "step": 1}),
            },
            "optional": {
                "mask": ("MASK", ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = 'auto_brightness'
    CATEGORY = '😺dzNodes/LayerColor'

    def auto_brightness(self, image, strength, saturation, mask=None):

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
        if mask is not None:
            if mask.dim() == 2:
                mask = torch.unsqueeze(mask, 0)
            l_masks = []
            for m in mask:
                l_masks.append(tensor2pil(torch.unsqueeze(m, 0)).convert('L'))
        max_batch = max(len(l_images), len(l_masks))
        for i in range(max_batch):
            _image = l_images[i] if i < len(l_images) else l_images[-1]
            _mask = l_masks[i] if i < len(l_masks) else l_masks[-1]
            orig_image = tensor2pil(_image)

            _l, _a, _b = orig_image.convert('LAB').split()
            _histogram = histogram_equalization(_l, _mask, gamma_strength=strength/100)
            _l = chop_image(_l, _histogram, 'normal', strength)
            ret_image = image_channel_merge((_l, _a, _b), 'LAB')
            if saturation != 0 :
                _h, _s, _v = ret_image.convert('HSV').split()
                _s = image_gray_offset(_s, saturation)
                ret_image = image_channel_merge((_h, _s, _v), 'HSV')

            if orig_image.mode == 'RGBA':
                ret_image = RGB2RGBA(ret_image, orig_image.split()[-1])

            ret_images.append(pil2tensor(ret_image))
        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```