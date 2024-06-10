---
tags:
- Image
---

# Load Image From Url (mtb)
## Documentation
- Class name: `Load Image From Url (mtb)`
- Category: `mtb/IO`
- Output node: `False`

This node is designed to load an image from a specified URL, handling the retrieval and processing necessary to convert the image into a format suitable for further manipulation or analysis.
## Input types
### Required
- **`url`**
    - The URL from which the image will be loaded. This parameter is crucial as it determines the source of the image to be processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The loaded image, processed and converted into a tensor format, ready for further image processing tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_LoadImageFromUrl:
    """Load an image from the given URL"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "url": (
                    "STRING",
                    {
                        "default": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Example.jpg/800px-Example.jpg"
                    },
                ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "load"
    CATEGORY = "mtb/IO"

    def load(self, url):
        # get the image from the url
        image = Image.open(requests.get(url, stream=True).raw)
        image = ImageOps.exif_transpose(image)
        return (pil2tensor(image),)

```
