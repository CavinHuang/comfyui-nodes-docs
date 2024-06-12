# Create QR Code
## Documentation
- Class name: `Create QR Code`
- Category: `Masquerade Nodes`
- Output node: `False`

This node generates a QR code from provided text, allowing customization of size, version, error correction level, box size, and border. It outputs the QR code as an image tensor, suitable for further processing or visualization.
## Input types
### Required
- **`text`**
    - The text to be encoded into the QR code. This is the primary data the QR code will represent.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`size`**
    - Specifies the size of the generated QR code image in pixels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`qr_version`**
    - Determines the version of the QR code, which affects the amount of data that can be stored.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`error_correction`**
    - Sets the error correction level of the QR code, influencing its resilience to damage.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`box_size`**
    - Defines the size of each box in the QR code grid.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border`**
    - Specifies the width of the border around the QR code.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated QR code as an image tensor, ready for use or display.
    - Python dtype: `Image`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CreateQRCodeNode:
    def __init__(self):
        pass

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

    CATEGORY = "Masquerade Nodes"

    def create_qr_code(self, text, size, qr_version, error_correction, box_size, border):
        ensure_package("qrcode")
        import qrcode
        if error_correction =="L":
            error_level = qrcode.constants.ERROR_CORRECT_L
        elif error_correction =="M":
            error_level = qrcode.constants.ERROR_CORRECT_M
        elif error_correction =="Q":
            error_level = qrcode.constants.ERROR_CORRECT_Q
        else:
            error_level = qrcode.constants.ERROR_CORRECT_H

        qr = qrcode.QRCode(
                version=qr_version,
                error_correction=error_level,
                box_size=box_size,
                border=border)
        qr.add_data(text)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        img = img.resize((size,size))
        # Convert img (a PIL Image) into a torch tensor
        tensor = torch.from_numpy(np.array(img))
        return (tensor2rgb(tensor.unsqueeze(0)),)

```
