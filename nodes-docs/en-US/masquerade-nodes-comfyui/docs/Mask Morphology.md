---
tags:
- Mask
- MaskMorphology
---

# Mask Morphology
## Documentation
- Class name: `Mask Morphology`
- Category: `Masquerade Nodes`
- Output node: `False`

The Mask Morphology node specializes in altering the shape of masks through morphological operations such as dilation, erosion, opening, and closing. These operations enable the refinement or modification of mask boundaries, facilitating more precise control over mask shapes for various image processing tasks.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the mask to be processed. It is the primary input for morphological transformations, determining the initial shape and structure that will undergo modification.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`distance`**
    - The 'distance' parameter specifies the extent of the morphological operation. It affects the size of the transformation applied, influencing how much the mask expands or contracts during processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`op`**
    - The 'op' parameter selects the specific morphological operation to apply to the mask. Options include 'dilate', 'erode', 'open', and 'close', each altering the mask in distinct ways to achieve desired shape modifications.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a modified mask, resulting from the applied morphological operation. It reflects changes in the mask's shape and boundaries, tailored by the specified operation and parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskMorphologyNode:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "distance": ("INT", {"default": 5, "min": 0, "max": 128, "step": 1}),
                "op": (["dilate", "erode", "open", "close"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "morph"

    CATEGORY = "Masquerade Nodes"

    def morph(self, image, distance, op):
        image = tensor2mask(image)
        if op == "dilate":
            image = self.dilate(image, distance)
        elif op == "erode":
            image = self.erode(image, distance)
        elif op == "open":
            image = self.erode(image, distance)
            image = self.dilate(image, distance)
        elif op == "close":
            image = self.dilate(image, distance)
            image = self.erode(image, distance)
        return (image,)

    def erode(self, image, distance):
        return 1. - self.dilate(1. - image, distance)

    def dilate(self, image, distance):
        kernel_size = 1 + distance * 2
        # Add the channels dimension
        image = image.unsqueeze(1)
        out = torchfn.max_pool2d(image, kernel_size=kernel_size, stride=1, padding=kernel_size // 2).squeeze(1)
        return out

```
