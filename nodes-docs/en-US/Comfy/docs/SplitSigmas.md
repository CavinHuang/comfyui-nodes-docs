---
tags:
- SigmaScheduling
---

# SplitSigmas
## Documentation
- Class name: `SplitSigmas`
- Category: `sampling/custom_sampling/sigmas`
- Output node: `False`

The SplitSigmas node is designed for dividing a sequence of sigma values into two parts based on a specified step. This functionality is crucial for operations that require different handling or processing of the initial and subsequent parts of the sigma sequence, enabling more flexible and targeted manipulation of these values.
## Input types
### Required
- **`sigmas`**
    - The 'sigmas' parameter represents the sequence of sigma values to be split. It is essential for determining the division point and the resulting two sequences of sigma values, impacting the node's execution and results.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `torch.Tensor`
- **`step`**
    - The 'step' parameter specifies the index at which the sigma sequence should be split. It plays a critical role in defining the boundary between the two resulting sigma sequences, influencing the node's functionality and the characteristics of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - The node outputs two sequences of sigma values, each representing a part of the original sequence divided at the specified step. These outputs are crucial for subsequent operations that require differentiated handling of sigma values.
    - Python dtype: `Tuple[torch.Tensor, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)



## Source code
```python
class SplitSigmas:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"sigmas": ("SIGMAS", ),
                    "step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     }
                }
    RETURN_TYPES = ("SIGMAS","SIGMAS")
    CATEGORY = "sampling/custom_sampling/sigmas"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, sigmas, step):
        sigmas1 = sigmas[:step + 1]
        sigmas2 = sigmas[step:]
        return (sigmas1, sigmas2)

```
