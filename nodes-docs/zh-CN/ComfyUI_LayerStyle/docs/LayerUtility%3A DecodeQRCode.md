# Documentation
- Class name: DecodeQRCode
- Category: 😺dzNodes/LayerUtility/SystemIO
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

解码二维码工具。

# Input types

## Required

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- pre_blur
    - 预模糊。
    - Comfy dtype: INT
    - Python dtype: int

## Optional

- 无

# Output types

- string
    - 文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```python
class DecodeQRCode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "image": ("IMAGE",),
                "pre_blur": ("INT", {"default": 2, "min": 0, "max": 16, "step": 1}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("STRING", )
    RETURN_NAMES = ("string", )
    FUNCTION = 'decode_qrcode'
    CATEGORY = '😺dzNodes/LayerUtility/SystemIO'

    def decode_qrcode(self, image, pre_blur):
        ret_texts = []
        from pyzbar.pyzbar import decode
        for i in image:
            _image = torch.unsqueeze(i, 0)
            _image = tensor2pil(_image)
            if pre_blur:
                _image = gaussian_blur(_image, pre_blur)
            qrmessage = decode(_image)
            if len(qrmessage) > 0:
                ret_texts.append(qrmessage[0][0].decode('utf-8'))
            else:
                ret_texts.append("Cannot recognize QR")

        return (ret_texts, )
```