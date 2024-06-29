---
tags:
- Noise
---

# DisableNoise
## Documentation
- Class name: `DisableNoise`
- Category: `sampling/custom_sampling/noise`
- Output node: `False`

The DisableNoise node is designed to provide a mechanism for disabling noise generation within a sampling process. It serves as a utility to override default noise behaviors, facilitating scenarios where noise introduction is undesirable for the generation or manipulation of images or data.
## Input types
### Required
## Output types
- **`noise`**
    - Comfy dtype: `NOISE`
    - Represents a noise object that effectively generates no noise, ensuring that the output remains unaltered by noise addition.
    - Python dtype: `Noise_EmptyNoise`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DisableNoise:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                     }
                }

    RETURN_TYPES = ("NOISE",)
    FUNCTION = "get_noise"
    CATEGORY = "sampling/custom_sampling/noise"

    def get_noise(self):
        return (Noise_EmptyNoise(),)

```
