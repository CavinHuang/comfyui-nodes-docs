---
tags:
- Image
- ImageSave
---

# Save Image If True (Mikey)
## Documentation
- Class name: `Save Image If True`
- Category: `Mikey/Image`
- Output node: `True`

This node conditionally saves an image to disk based on a specified condition. It leverages a separate saving mechanism to store the image with optional metadata and a filename prefix if the condition is met.
## Input types
### Required
- **`image`**
    - The image to potentially save. It is central to the node's operation as it determines what content is subject to conditional saving.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`save_condition`**
    - A binary condition that dictates whether the image should be saved (1) or not (0). This condition is crucial for the node's selective saving functionality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`filename_prefix`**
    - An optional prefix for the saved filename, allowing for organized storage and easy retrieval of saved images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveImageIfTrue:
    # only saves image if save condition input is 1
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image": ("IMAGE",),
                             "save_condition": ("INT", {"default": 0, "min": 0, "max": 1}),
                             "filename_prefix": ("STRING", {"default": ""})},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ()
    FUNCTION = "save_image_if_true"
    OUTPUT_NODE = True
    CATEGORY = "Mikey/Image"

    def save_image_if_true(self, image, save_condition, filename_prefix, prompt=None, extra_pnginfo=None):
        if save_condition == 1:
            # use SaveImagesMikey class
            save_images = SaveImagesMikey()
            result = save_images.save_images(image, filename_prefix, prompt, extra_pnginfo, positive_prompt='', negative_prompt='')
            return result
        else:
            return {'save_image_if_true': {'filename': '', 'subfolder': ''}}

```
