---
tags:
- Searge
---

# Enable / Disable
## Documentation
- Class name: `SeargeEnablerInputs`
- Category: `Searge/_deprecated_/Inputs`
- Output node: `False`

The SeargeEnablerInputs node is designed to process and validate the state of a given parameter, ensuring it aligns with predefined states within the system. It serves as a mechanism to enable or disable certain functionalities based on the state's value.
## Input types
### Required
- **`state`**
    - Specifies the current state of a parameter, which determines the activation status of certain functionalities within the system. The default state is the second item in the predefined states list.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`state`**
    - Comfy dtype: `ENABLE_STATE`
    - Returns the validated state of the parameter, which is used to control the activation of specific functionalities.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeEnablerInputs:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "state": (SeargeParameterProcessor.STATES, {"default": SeargeParameterProcessor.STATES[1]}),
        },
        }

    RETURN_TYPES = ("ENABLE_STATE",)
    RETURN_NAMES = ("state",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Inputs"

    def get_value(self, state):
        return (state,)

```
