---
tags:
- Image
---

# Load 64 Encoded Image
## Documentation
- Class name: `Load 64 Encoded Image`
- Category: `Bmad/api`
- Output node: `False`

The LoadImage64 node is designed to decode and load images from base64-encoded strings, converting them into a tensor format suitable for further image processing tasks. This functionality facilitates the handling of images transmitted over networks where binary data needs to be encoded into a string format.
## Input types
### Required
- **`image_code`**
    - The 'image_code' parameter is a base64-encoded string representing an image. It is crucial for decoding the image back into a tensor format for processing. This parameter enables the node to handle images transmitted in a text-based format, making it versatile for various network-based image handling scenarios.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a tensor representation of the decoded image, ready for further processing in image-related tasks. This tensor encapsulates the image data in a format that is compatible with deep learning models and other image processing operations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadImage64:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
            {
                "image_code": ("STRING", {"default": "insert encoded image here"})
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "get_image"
    CATEGORY = "Bmad/api"

    def get_image(self, image_code):
        image = Image.open(BytesIO(base64.b64decode(image_code)))
        image = image.convert('RGB')
        image = np.array(image).astype(np.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        return (image,)

```
