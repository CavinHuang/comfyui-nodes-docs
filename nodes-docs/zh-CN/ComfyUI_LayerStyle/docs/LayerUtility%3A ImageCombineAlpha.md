# Documentation
- Class name: ImageCombineAlpha
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

将图片与遮罩合并为包含alpha通道的RGBA模式的图片。

# Input types

## Required

- RGB_image
    - RGB 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- mask
    - 蒙版。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types

- RGBA_image
    - RGBA 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class ImageCombineAlpha:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "RGB_image": ("IMAGE", ),  #
                "mask": ("MASK",),  #
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("RGBA_image",)
    FUNCTION = 'image_combine_alpha'
    CATEGORY = '😺dzNodes/LayerUtility'

    def image_combine_alpha(self, RGB_image, mask):

        ret_images = []
        input_images = []
        input_masks = []

        for i in RGB_image:
            input_images.append(torch.unsqueeze(i, 0))
        if mask.dim() == 2:
            mask = torch.unsqueeze(mask, 0)
        for m in mask:
            input_masks.append(torch.unsqueeze(m, 0))

        max_batch = max(len(input_images), len(input_masks))
        for i in range(max_batch):
            _image = input_images[i] if i < len(input_images) else input_images[-1]
            _mask = input_masks[i] if i < len(input_masks) else input_masks[-1]
            r, g, b, _ = image_channel_split(tensor2pil(_image).convert('RGB'), 'RGB')
            ret_image = image_channel_merge((r, g, b, tensor2pil(_mask).convert('L')), 'RGBA')

            ret_images.append(pil2tensor(ret_image))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0),)
```