---
tags:
- Sampling
---

# Smart Step (mtb)
## Documentation
- Class name: `Smart Step (mtb)`
- Category: `mtb/conditioning`
- Output node: `False`

The MTB_SmartStep node is designed to manage the progression of steps within the KAdvancedSampler by calculating start and end points based on specified percentages. This utility facilitates dynamic step control, allowing for more precise and efficient sampling processes.
## Input types
### Required
- **`step`**
    - The 'step' parameter specifies the current step count, which is used to calculate the starting and ending points of the sampling process based on percentage values.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_percent`**
    - The 'start_percent' parameter determines the percentage at which the sampling process should start, relative to the total number of steps.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_percent`**
    - The 'end_percent' parameter sets the percentage at which the sampling process should end, enabling fine-tuned control over the sampling range.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`step`**
    - Comfy dtype: `INT`
    - Returns the original step count as provided.
    - Python dtype: `int`
- **`start`**
    - Comfy dtype: `INT`
    - Calculates and returns the starting point of the sampling process as an integer value.
    - Python dtype: `int`
- **`end`**
    - Comfy dtype: `INT`
    - Calculates and returns the ending point of the sampling process as an integer value.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_SmartStep:
    """Utils to control the steps start/stop of the KAdvancedSampler in percentage"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "step": (
                    "INT",
                    {"default": 20, "min": 1, "max": 10000, "step": 1},
                ),
                "start_percent": (
                    "INT",
                    {"default": 0, "min": 0, "max": 100, "step": 1},
                ),
                "end_percent": (
                    "INT",
                    {"default": 0, "min": 0, "max": 100, "step": 1},
                ),
            }
        }

    RETURN_TYPES = ("INT", "INT", "INT")
    RETURN_NAMES = ("step", "start", "end")
    FUNCTION = "do_step"
    CATEGORY = "mtb/conditioning"

    def do_step(self, step, start_percent, end_percent):
        start = int(step * start_percent / 100)
        end = int(step * end_percent / 100)

        return (step, start, end)

```
