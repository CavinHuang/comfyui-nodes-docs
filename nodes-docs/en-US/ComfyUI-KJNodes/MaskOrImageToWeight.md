---
tags:
- Mask
---

# Mask Or Image To Weight
## Documentation
- Class name: `MaskOrImageToWeight`
- Category: `KJNodes`
- Output node: `False`

This node is designed to calculate the mean value of either masks or images provided as input, but not both simultaneously. It supports converting the calculated mean values into different output types, including a list, pandas series, or a tensor, based on the specified output type.
## Input types
### Required
- **`output_type`**
    - Specifies the format of the output, which can be a list, pandas series, or tensor, dictating how the mean values calculated from the input masks or images are returned.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`images`**
    - An optional list of images to calculate mean values from. If provided, masks should not be used.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`masks`**
    - An optional list of masks to calculate mean values from. If provided, images should not be used.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The calculated mean values of the input masks or images, returned in the format specified by the output_type parameter.
    - Python dtype: `Union[List[float], pandas.Series, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskOrImageToWeight:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "output_type": (
                [   
                    'list',
                    'pandas series',
                    'tensor',
                ],
                {
                "default": 'list'
                    }),
             },
            "optional": {
                "images": ("IMAGE",),
                "masks": ("MASK",),                
            },

        }
    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "execute"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Gets the mean values from mask or image batch  
and returns that as the selected output type.   
"""

    def execute(self, output_type, images=None, masks=None):
        mean_values = []
        if masks is not None and images is None:
            for mask in masks:
                mean_values.append(mask.mean().item())
        elif masks is None and images is not None:
            for image in images:
                mean_values.append(image.mean().item())
        elif masks is not None and images is not None:
            raise Exception("MaskOrImageToWeight: Use either mask or image input only.")
                  
        # Convert mean_values to the specified output_type
        if output_type == 'list':
            return mean_values,
        elif output_type == 'pandas series':
            try:
                import pandas as pd
            except:
                raise Exception("MaskOrImageToWeight: pandas is not installed. Please install pandas to use this output_type")
            return pd.Series(mean_values),
        elif output_type == 'tensor':
            return torch.tensor(mean_values, dtype=torch.float32),
        else:
            raise ValueError(f"Unsupported output_type: {output_type}")

```
