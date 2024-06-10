---
tags:
- Mask
- MaskMorphology
---

# Dilate Mask
## Documentation
- Class name: `ImpactDilateMask`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactDilateMask node is designed to modify the spatial dimensions of a given mask by applying dilation or erosion. This process adjusts the mask's boundaries, either expanding or contracting them based on the specified dilation factor, thereby impacting the mask's coverage area.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the input mask to be dilated or eroded. It is crucial for defining the area to be modified.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`dilation`**
    - The 'dilation' parameter specifies the degree of dilation or erosion to apply to the mask. Positive values cause dilation (expansion), while negative values lead to erosion (contraction).
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a modified mask with adjusted boundaries, either dilated or eroded based on the input parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [Mask Threshold Region](../../was-node-suite-comfyui/Nodes/Mask Threshold Region.md)



## Source code
```python
class DilateMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "mask": ("MASK", ),
                     "dilation": ("INT", {"default": 10, "min": -512, "max": 512, "step": 1}),
                }}

    RETURN_TYPES = ("MASK", )

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, mask, dilation):
        mask = core.dilate_mask(mask.numpy(), dilation)
        mask = torch.from_numpy(mask)
        mask = utils.make_3d_mask(mask)
        return (mask, )

```
