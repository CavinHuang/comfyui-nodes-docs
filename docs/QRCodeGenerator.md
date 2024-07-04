
# Documentation
- Class name: QRCodeGenerator
- Category: Art Venture/Utils
- Output node: False

QRCodeGenerator节点用于生成基于指定文本输入的二维码，并提供多种自定义选项，如尺寸、版本、错误纠正级别、方块大小和边框大小。它封装了二维码创建的过程，使其可以轻松应用于需要将信息嵌入二维码格式的各种场景。

# Input types
## Required
- text
    - 'text'参数是要编码成二维码的输入字符串。这个参数至关重要，因为它决定了二维码所代表的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- size
    - 指定生成的二维码图像的最终尺寸（以像素为单位）。它影响二维码的可见性和可扫描性。
    - Comfy dtype: INT
    - Python dtype: int
- qr_version
    - 决定二维码的版本，间接控制二维码的大小和可编码的数据量。
    - Comfy dtype: INT
    - Python dtype: int
- error_correction
    - 设置二维码的错误纠正级别，影响其抗损坏能力和可恢复的数据量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- box_size
    - 定义二维码中每个方块（或像素）的大小，影响二维码的整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- border
    - 指定二维码周围边框的宽度。较大的边框可以提高可扫描性，但会增加二维码的整体尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是生成的二维码图像，可直接用于各种应用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtillQRCodeGenerator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": True}),
                "size": ("INT", {"default": 512, "min": 64, "max": 4096, "step": 64}),
                "qr_version": ("INT", {"default": 1, "min": 1, "max": 40, "step": 1}),
                "error_correction": (["L", "M", "Q", "H"], {"default": "H"}),
                "box_size": ("INT", {"default": 10, "min": 1, "max": 100, "step": 1}),
                "border": ("INT", {"default": 4, "min": 0, "max": 100, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "create_qr_code"
    CATEGORY = "Art Venture/Utils"

    def create_qr_code(self, text, size, qr_version, error_correction, box_size, border):
        ensure_package("qrcode", "qrcode[pil]")
        import qrcode

        if error_correction == "L":
            error_level = qrcode.constants.ERROR_CORRECT_L
        elif error_correction == "M":
            error_level = qrcode.constants.ERROR_CORRECT_M
        elif error_correction == "Q":
            error_level = qrcode.constants.ERROR_CORRECT_Q
        else:
            error_level = qrcode.constants.ERROR_CORRECT_H

        qr = qrcode.QRCode(version=qr_version, error_correction=error_level, box_size=box_size, border=border)
        qr.add_data(text)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        img = img.resize((size, size)).convert("RGB")

        return (pil2tensor(img),)

```
