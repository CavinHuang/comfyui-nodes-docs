---
tags:
- SigmaScheduling
---

# Float To Sigmas
## Documentation
- Class name: `FloatToSigmas`
- Category: `KJNodes/noise`
- Output node: `False`

Transforms a list of float values into a tensor of sigmas, facilitating the conversion of numerical data into a format suitable for noise generation and manipulation within neural networks.
## Input types
### Required
- **`float_list`**
    - A list of float values to be converted into a sigmas tensor. This input is crucial for defining the specific noise levels to be applied in the neural network's processing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `List[float]`
## Output types
- **`SIGMAS`**
    - Comfy dtype: `SIGMAS`
    - A tensor of sigmas derived from the input list of float values, used for noise generation and manipulation in neural network operations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FloatToSigmas:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {
                     "float_list": ("FLOAT", {"default": 0.0, "forceInput": True}),
                     }
                }
    RETURN_TYPES = ("SIGMAS",)
    RETURN_NAMES = ("SIGMAS",)
    CATEGORY = "KJNodes/noise"
    FUNCTION = "customsigmas"
    DESCRIPTION = """
Creates a sigmas tensor from list of float values.  

"""
    def customsigmas(self, float_list):
        return torch.tensor(float_list, dtype=torch.float32),

```
