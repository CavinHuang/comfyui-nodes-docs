---
tags:
- Image
- Metadata
---

# AddMetaData (Mikey)
## Documentation
- Class name: `AddMetaData`
- Category: `Mikey/Meta`
- Output node: `True`

The AddMetaData node is designed to embed metadata into images by associating specific labels and text values with them. This process enriches the image data with additional, descriptive information that can be utilized for various purposes, such as categorization, identification, or further processing.
## Input types
### Required
- **`image`**
    - The image to which metadata will be added. It serves as the primary input for the metadata embedding process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`label`**
    - A label that categorizes or identifies the metadata being added. It acts as a key in the metadata dictionary.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_value`**
    - The actual text to be added as metadata under the specified label. This value enriches the image with descriptive or identifying information.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image with the newly added metadata, allowing for enriched data representation and usage.
    - Python dtype: `PIL.Image.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AddMetaData:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image": ("IMAGE",),
                             "label": ("STRING", {"multiline": False, "placeholder": "Label for metadata"}),
                             "text_value": ("STRING", {"multiline": True, "placeholder": "Text to add to metadata"})},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
        }

    RETURN_TYPES = ('IMAGE',)
    FUNCTION = "add_metadata"
    CATEGORY = "Mikey/Meta"
    OUTPUT_NODE = True

    def add_metadata(self, image, label, text_value, prompt=None, extra_pnginfo=None):
        label = search_and_replace(label, extra_pnginfo, prompt)
        text_value = search_and_replace(text_value, extra_pnginfo, prompt)
        if extra_pnginfo is None:
            extra_pnginfo = {}
        if label in extra_pnginfo:
            extra_pnginfo[label] += ', ' + text_value
        else:
            extra_pnginfo[label] = text_value
        return (image,)

```
