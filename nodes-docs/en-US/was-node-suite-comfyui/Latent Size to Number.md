---
tags:
- ImageSize
- ImageTransformation
---

# Latent Size to Number
## Documentation
- Class name: `Latent Size to Number`
- Category: `WAS Suite/Number/Operations`
- Output node: `False`

The Latent Size to Number node is designed to extract the width and height dimensions of tensors within a given set of samples and convert these dimensions into various numerical formats. It serves the purpose of providing a detailed breakdown of tensor sizes, facilitating operations that require specific dimensional data.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter is expected to contain tensors from which the width and height dimensions are to be extracted. This parameter is crucial for the node's operation as it directly influences the output by determining the dimensions to be analyzed and converted.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, List[torch.Tensor]]`
## Output types
- **`tensor_w_num`**
    - Comfy dtype: `NUMBER`
    - Represents the width of the first tensor in the samples, provided in multiple numerical formats.
    - Python dtype: `Tuple[int, int, float, float, int, int]`
- **`tensor_h_num`**
    - Comfy dtype: `NUMBER`
    - Represents the height of the first tensor in the samples, provided in multiple numerical formats.
    - Python dtype: `Tuple[int, int, float, float, int, int]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Latent_Size_To_Number:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "samples": ("LATENT",),
            }
        }

    RETURN_TYPES = ("NUMBER", "NUMBER", "FLOAT", "FLOAT", "INT", "INT")
    RETURN_NAMES = ("tensor_w_num","tensor_h_num")
    FUNCTION = "latent_width_height"

    CATEGORY = "WAS Suite/Number/Operations"

    def latent_width_height(self, samples):
        size_dict = {}
        i = 0
        for tensor in samples['samples'][0]:
            if not isinstance(tensor, torch.Tensor):
                cstr(f'Input should be a torch.Tensor').error.print()
            shape = tensor.shape
            tensor_height = shape[-2]
            tensor_width = shape[-1]
            size_dict.update({i:[tensor_width, tensor_height]})
        return ( size_dict[0][0], size_dict[0][1], float(size_dict[0][0]), float(size_dict[0][1]), size_dict[0][0], size_dict[0][1] )

```
