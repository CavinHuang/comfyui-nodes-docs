---
tags:
- Image
---

# Image From URL
## Documentation
- Class name: `ImageFromURL`
- Category: `jitcoder`
- Output node: `True`

The ImageFromURL node is designed to fetch and process an image from a given URL, converting it into a tensor format suitable for further image processing or machine learning tasks.
## Input types
### Required
- **`url`**
    - The URL of the image to be fetched. This parameter is crucial for the node's operation as it specifies the source of the image to be processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image in tensor format, ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFromURL:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "url": ("STRING", {"multiline": False})
            },
        }

    RETURN_NAMES = ("image",)
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "fetch_image"
    OUTPUT_NODE = True
    CATEGORY = "jitcoder"

    def fetch_image(self, url):
        image = Image.open(requests.get(url, stream=True).raw)
        image = ImageOps.exif_transpose(image)
        image = image.convert("RGB")
        image = numpy.array(image).astype(numpy.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        return (image,)

```
