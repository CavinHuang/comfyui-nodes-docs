---
tags:
- Image
---

# Image To Base64
## Documentation
- Class name: `easy imageToBase64`
- Category: `EasyUse/Image`
- Output node: `True`

The `easy imageToBase64` node is designed to convert images from a tensor format to a Base64-encoded string. This functionality is essential for web applications and APIs where images need to be transmitted over the internet in a text-based format.
## Input types
### Required
- **`image`**
    - The `image` parameter is the input tensor representing the image to be converted. It plays a crucial role in the conversion process, as it is the source image that will be transformed into a Base64-encoded string.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a Base64-encoded string representation of the input image. This format is widely used for embedding images in HTML or CSS files, or for transmitting images over networks where binary data is not supported.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageToBase64:
    @classmethod
    def INPUT_TYPES(s):
        return {
        "required": {
            "image": ("IMAGE",),
        },
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "to_base64"
    CATEGORY = "EasyUse/Image"
    OUTPUT_NODE = True

    def to_base64(self, image, ):
      import base64
      from io import BytesIO

      # 将张量图像转换为PIL图像
      pil_image = tensor2pil(image)

      buffered = BytesIO()
      pil_image.save(buffered, format="JPEG")
      image_bytes = buffered.getvalue()

      base64_str = base64.b64encode(image_bytes).decode("utf-8")
      return {"result": (base64_str,)}

```
