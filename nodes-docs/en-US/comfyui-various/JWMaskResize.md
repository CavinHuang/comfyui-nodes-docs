---
tags:
- Mask
- MaskGeneration
---

# Mask Resize
## Documentation
- Class name: `JWMaskResize`
- Category: `jamesWalker55`
- Output node: `False`

The JWMaskResize node is designed for resizing masks to specified dimensions, offering various interpolation modes to best suit the resizing needs.
## Input types
### Required
- **`mask`**
    - The input mask to be resized. This parameter is crucial as it determines the content that will be resized.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`height`**
    - The desired height for the resized mask. This parameter directly influences the dimensions of the output mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - The desired width for the resized mask. This parameter directly influences the dimensions of the output mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation_mode`**
    - Specifies the method of interpolation to be used during resizing, allowing for flexibility in how the resizing is performed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The resized mask, adjusted to the specified dimensions and using the chosen interpolation method.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageLoadRGB", "Image Load RGB")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str):
        assert isinstance(path, str)

        img = load_image(path)
        return (img,)

```
