---
tags:
- Time
---

# 🛌 Sleep 🛌
## Documentation
- Class name: `Sleep`
- Category: `KJNodes/misc`
- Output node: `False`

Delays the execution for the input amount of time, allowing for a pause in operations based on specified minutes and seconds.
## Input types
### Required
- **`input`**
    - A placeholder input that is returned after the delay, ensuring the flow of data is maintained throughout the node's operation.
    - Comfy dtype: `*`
    - Python dtype: `any`
- **`minutes`**
    - Specifies the duration of the delay in whole minutes, contributing to the total delay time alongside seconds.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seconds`**
    - Specifies the duration of the delay in fractional minutes (seconds), fine-tuning the total delay time in conjunction with minutes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`*`**
    - Comfy dtype: `*`
    - Returns the input data unchanged after the specified delay, serving as a pass-through with a time delay.
    - Python dtype: `any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Sleep:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "input": (any, {}),
                "minutes": ("INT", {"default": 0, "min": 0, "max": 1439}),
                "seconds": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 59.99, "step": 0.01}),
            },
        }
    RETURN_TYPES = (any,)
    FUNCTION = "sleepdelay"
    CATEGORY = "KJNodes/misc"
    DESCRIPTION = """
Delays the execution for the input amount of time.
"""

    def sleepdelay(self, input, minutes, seconds):
        total_seconds = minutes * 60 + seconds
        time.sleep(total_seconds)
        return input,

```
