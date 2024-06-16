# Documentation
- Class name: DecodeBlindWaterMark
- Category: 😺dzNodes/LayerUtility/SystemIO
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

对AddBlindWaterMark 和 SaveImagePlus 节点添加的隐形水印解码。


# Input types

## Required

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class DecodeBlindWaterMark:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE",),  #
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE", )
    RETURN_NAMES = ("watermark_image",)
    FUNCTION = 'watermark_decode'
    CATEGORY = '😺dzNodes/LayerUtility/SystemIO'

    def watermark_decode(self, image):

        NODE_NAME = 'Decode BlindWaterMark'

        ret_images = []

        for i in image:
            _image = torch.unsqueeze(i,0)
            _image = tensor2pil(_image)
            wm_size = watermark_image_size(_image)
            y, u, v, _ = image_channel_split(_image, mode='YCbCr')
            ret_image = decode_watermark(u, wm_size)
            ret_image = ret_image.resize((512, 512), Image.LANCZOS)
            ret_image = normalize_gray(ret_image)
            ret_images.append(pil2tensor(ret_image.convert('RGB')))

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')
        return (torch.cat(ret_images, dim=0), )
```