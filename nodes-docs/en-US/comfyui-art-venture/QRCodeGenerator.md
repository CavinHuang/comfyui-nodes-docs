# QR Code Generator
## Documentation
- Class name: `QRCodeGenerator`
- Category: `Art Venture/Utils`
- Output node: `False`

The QRCodeGenerator node is designed to generate QR codes based on specified text inputs, offering customization options such as size, version, error correction level, box size, and border size. It encapsulates the process of QR code creation, making it accessible for various applications that require embedding information within a QR code format.
## Input types
### Required
- **`text`**
    - The 'text' parameter is the input string to be encoded into the QR code. It is crucial as it determines the content that the QR code will represent.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`size`**
    - Specifies the final size of the generated QR code image in pixels. It affects the visibility and scannability of the QR code.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`qr_version`**
    - Determines the version of the QR code, which indirectly controls the size and the amount of data that can be encoded.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`error_correction`**
    - Sets the error correction level of the QR code, affecting its resilience to damage and the amount of data that can be restored.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`box_size`**
    - Defines the size of each box (or pixel) in the QR code, influencing the overall size of the QR code.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border`**
    - Specifies the width of the border around the QR code. A larger border can improve scannability but increases the overall size of the QR code.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image of the generated QR code, ready for use in various applications.
    - Python dtype: `torch.Tensor`
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
