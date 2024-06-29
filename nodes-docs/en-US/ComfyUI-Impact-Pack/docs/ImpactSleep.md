---
tags:
- Time
---

# Sleep
## Documentation
- Class name: `ImpactSleep`
- Category: `ImpactPack/Logic/_for_test`
- Output node: `True`

The ImpactSleep node introduces a delay in the execution flow by pausing for a specified number of seconds. This can be useful for timing operations or creating a pause in a sequence of actions.
## Input types
### Required
- **`signal`**
    - The signal input acts as a pass-through, allowing the node to be integrated into a flow without affecting the data being transmitted.
    - Comfy dtype: `*`
    - Python dtype: `object`
- **`seconds`**
    - Specifies the duration of the sleep period in seconds. This determines how long the execution will pause before continuing.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`signal_opt`**
    - Comfy dtype: `*`
    - Outputs the same signal that was input, effectively acting as a pass-through after the specified sleep duration.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactSleep:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "signal": (any_typ,),
                    "seconds": ("FLOAT", {"default": 0.5, "min": 0, "max": 3600}),
                    }
                }

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Logic/_for_test"
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ("signal_opt",)
    OUTPUT_NODE = True

    def doit(self, signal, seconds):
        time.sleep(seconds)
        return (signal,)

```
