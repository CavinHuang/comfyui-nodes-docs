---
tags:
- SigmaScheduling
---

# FlipSigmas
## Documentation
- Class name: `FlipSigmas`
- Category: `sampling/custom_sampling/sigmas`
- Output node: `False`

The `FlipSigmas` node is designed to manipulate a sequence of sigma values by reversing their order and ensuring that the first value is non-zero if originally zero, by setting it to a minimal positive value. This operation is crucial for adjusting the sigma sequence in certain sampling processes where the order of sigma values impacts the generation or transformation process.
## Input types
### Required
- **`sigmas`**
    - The `sigmas` parameter represents a sequence of sigma values to be flipped. This sequence is crucial as it determines the scale of noise or variation to be applied in a generative process, and flipping it alters the progression of these scales.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `torch.Tensor`
## Output types
- **`sigmas`**
    - Comfy dtype: `SIGMAS`
    - The output is a flipped sequence of sigma values, with the first value adjusted to avoid being zero. This adjusted sequence is essential for subsequent operations that rely on the order and values of sigma scales.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FlipSigmas:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"sigmas": ("SIGMAS", ),
                     }
                }
    RETURN_TYPES = ("SIGMAS",)
    CATEGORY = "sampling/custom_sampling/sigmas"

    FUNCTION = "get_sigmas"

    def get_sigmas(self, sigmas):
        if len(sigmas) == 0:
            return (sigmas,)

        sigmas = sigmas.flip(0)
        if sigmas[0] == 0:
            sigmas[0] = 0.0001
        return (sigmas,)

```
