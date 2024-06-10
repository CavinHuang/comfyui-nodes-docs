---
tags:
- Image
---

# ConvertImg
## Documentation
- Class name: `ConvertImg`
- Category: `Bmad/CV`
- Output node: `False`

The ConvertImg node is designed for explicit image format conversion, facilitating the use of specific image formats required by certain custom nodes without resorting to workarounds.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be converted. Its format is crucial for the conversion process, impacting the node's execution and the resulting image format.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`to`**
    - The 'to' parameter specifies the target image format for the conversion, influencing the output image's format and potentially its usability in subsequent processing steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image that has been converted to the specified format, ready for further processing or use within the application.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ConvertImg:
    """ An explicit conversion, instead of using workarounds when using certain custom nodes. """
    options_map = {
        "RGBA": 4,
        "RGB": 3,
        "GRAY": 1,
    }
    options = list(options_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image": ("IMAGE",),
            "to": (s.options, {"default": s.options[1]})
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "convert"
    CATEGORY = "Bmad/CV"

    def convert(self, image, to):
        image = tensor2opencv(image, self.options_map[to])
        return (opencv2tensor(image),)

```
