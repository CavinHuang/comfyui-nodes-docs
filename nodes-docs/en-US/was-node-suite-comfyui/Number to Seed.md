---
tags:
- RandomGeneration
- Seed
---

# Number to Seed
## Documentation
- Class name: `Number to Seed`
- Category: `WAS Suite/Number/Operations`
- Output node: `False`

This node converts a given number into a seed value, facilitating operations that require a seed for randomization or procedural generation.
## Input types
### Required
- **`number`**
    - The number to be converted into a seed. This input is crucial as it directly determines the output seed value.
    - Comfy dtype: `NUMBER`
    - Python dtype: `int`
## Output types
- **`seed`**
    - Comfy dtype: `SEED`
    - The seed value derived from the input number. This output is significant for operations requiring a seed for randomization or procedural generation.
    - Python dtype: `Dict[str, int]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Number_To_Seed:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number": ("NUMBER",),
            }
        }

    RETURN_TYPES = ("SEED",)
    FUNCTION = "number_to_seed"

    CATEGORY = "WAS Suite/Number/Operations"

    def number_to_seed(self, number):
        return ({"seed": number, }, )

```
