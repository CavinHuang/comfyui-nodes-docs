---
tags:
- Mask
- MaskGeneration
---

# Float To Mask
## Documentation
- Class name: `FloatToMask`
- Category: `KJNodes`
- Output node: `False`

This node is designed to generate masks based on input floating-point values, where each value determines the intensity or transparency of the mask. It is tailored for creating a batch of masks with specified dimensions, making it suitable for applications that require dynamic mask generation based on varying intensity levels.
## Input types
### Required
- **`input_values`**
    - Represents the floating-point values used to generate the masks. Each value in this list determines the intensity of the corresponding mask in the batch, affecting its transparency or color depth.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[float] or float`
- **`width`**
    - Specifies the width of the generated masks. This dimension determines how wide each mask in the batch will be, directly impacting the mask's size and shape.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the generated masks. This dimension determines the height of each mask in the batch, affecting the overall size and shape of the masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output consists of a batch of masks generated based on the input floating-point values, with each mask having the specified width and height dimensions. These masks can be used for various applications that require custom mask generation.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatToMask:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "input_values": ("FLOAT", {"forceInput": True, "default": 0}),
                "width": ("INT", {"default": 100, "min": 1}),
                "height": ("INT", {"default": 100, "min": 1}),
            },
        }
    RETURN_TYPES = ("MASK",)
    FUNCTION = "execute"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Generates a batch of masks based on the input float values.
The batch size is determined by the length of the input float values.
Each mask is generated with the specified width and height.
"""

    def execute(self, input_values, width, height):
        import pandas as pd
        # Ensure input_values is a list
        if isinstance(input_values, (float, int)):
            input_values = [input_values]
        elif isinstance(input_values, pd.Series):
            input_values = input_values.tolist()
        elif isinstance(input_values, list) and all(isinstance(item, list) for item in input_values):
            input_values = [item for sublist in input_values for item in sublist]

        # Generate a batch of masks based on the input_values
        masks = []
        for value in input_values:
            # Assuming value is a float between 0 and 1 representing the mask's intensity
            mask = torch.ones((height, width), dtype=torch.float32) * value
            masks.append(mask)
        masks_out = torch.stack(masks, dim=0)
    
        return(masks_out,)

```
