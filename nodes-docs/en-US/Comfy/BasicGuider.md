---
tags:
- ModelGuidance
---

# BasicGuider
## Documentation
- Class name: `BasicGuider`
- Category: `sampling/custom_sampling/guiders`
- Output node: `False`

Provides a mechanism to create a guider object with basic conditioning for custom sampling processes. It encapsulates the functionality to apply simple conditions to guide the sampling process.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for guiding the sampling process, serving as the foundation for the guider's operations.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.samplers.CFGGuider or similar class`
- **`conditioning`**
    - Defines the conditions under which the sampling should occur, directly influencing the behavior and output of the guider.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `dict`
## Output types
- **`guider`**
    - Comfy dtype: `GUIDER`
    - The output is a guider object configured with the specified model and conditioning, ready to guide the sampling process.
    - Python dtype: `Guider_Basic instance`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BasicGuider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "conditioning": ("CONDITIONING", ),
                     }
                }

    RETURN_TYPES = ("GUIDER",)

    FUNCTION = "get_guider"
    CATEGORY = "sampling/custom_sampling/guiders"

    def get_guider(self, model, conditioning):
        guider = Guider_Basic(model)
        guider.set_conds(conditioning)
        return (guider,)

```
