# Documentation
- Class name: CreateQRCode
- Category: 😺dzNodes/LayerUtility/SystemIO
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

生成二维码工具。

# Input types

## Required

- size
    - 大小。
    - Comfy dtype: INT
    - Python dtype: int

- border
    - 边框。
    - Comfy dtype: INT
    - Python dtype: int

- text
    - 文本。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional

- 无

# Output types

- image
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class CreateQRCode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):

        return {
            "required": {
                "size": ("INT", {"default": 512, "min": 4, "max": 99999, "step": 1}),
                "border": ("INT", {"default": 1, "min": 1, "max": 10, "step": 1}),
                "text": ("STRING", {"default": "", "multiline": True}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE", )
    RETURN_NAMES = ("image", )
    FUNCTION = 'create_qrcode'
    CATEGORY = '😺dzNodes/LayerUtility/SystemIO'

    def create_qrcode(self, size, border, text):
        import qrcode
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=20,
            border=border,
        )
        qr.add_data(text.encode('utf-8'))
        qr.make(fit=True)
        ret_image = qr.make_image(fill_color="black", back_color="white")
        ret_image = ret_image.resize((size, size), Image.BICUBIC)

        return (pil2tensor(ret_image.convert("RGB")), )
```