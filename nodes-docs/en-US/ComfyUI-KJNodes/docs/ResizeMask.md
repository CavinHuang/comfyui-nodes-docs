---
tags:
- Mask
- MaskGeneration
---

# ResizeMask
## Documentation
- Class name: `ResizeMask`
- Category: `KJNodes/masking`
- Output node: `False`

The ResizeMask node is designed to adjust the size of a given mask or a batch of masks to specified dimensions, optionally maintaining the original proportions. It is a key component in image processing workflows where mask dimensions need to be standardized or adjusted for further processing.
## Input types
### Required
- **`mask`**
    - The input mask or batch of masks to be resized. This parameter is central to the node's operation, as it directly influences the output size and proportions of the mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`width`**
    - The target width for the resizing operation. It defines the horizontal dimension of the output mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The target height for the resizing operation. It defines the vertical dimension of the output mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`keep_proportions`**
    - A boolean flag indicating whether to maintain the original proportions of the mask during resizing.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The resized mask or batch of masks.
    - Python dtype: `torch.Tensor`
- **`width`**
    - Comfy dtype: `INT`
    - The actual width of the resized mask, which may differ from the input target width if proportions are kept.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The actual height of the resized mask, which may differ from the input target height if proportions are kept.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ResizeMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "width": ("INT", { "default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 8, "display": "number" }),
                "height": ("INT", { "default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 8, "display": "number" }),
                "keep_proportions": ("BOOLEAN", { "default": False }),
            }
        }

    RETURN_TYPES = ("MASK", "INT", "INT",)
    RETURN_NAMES = ("mask", "width", "height",)
    FUNCTION = "resize"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Resizes the mask or batch of masks to the specified width and height.
"""

    def resize(self, mask, width, height, keep_proportions):
        if keep_proportions:
            _, oh, ow, _ = mask.shape
            width = ow if width == 0 else width
            height = oh if height == 0 else height
            ratio = min(width / ow, height / oh)
            width = round(ow*ratio)
            height = round(oh*ratio)
    
        outputs = mask.unsqueeze(0)  # Add an extra dimension for batch size
        outputs = F.interpolate(outputs, size=(height, width), mode="nearest")
        outputs = outputs.squeeze(0)  # Remove the extra dimension after interpolation

        return(outputs, outputs.shape[2], outputs.shape[1],)

```
