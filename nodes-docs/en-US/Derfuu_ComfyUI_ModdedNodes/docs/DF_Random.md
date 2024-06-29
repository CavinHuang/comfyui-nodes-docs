---
tags:
- RandomGeneration
- Randomization
---

# Random
## Documentation
- Class name: `DF_Random`
- Category: `Derfuu_Nodes/Functions`
- Output node: `False`

The `DF_Random` node generates a random floating-point number within a specified range. It utilizes a seed for reproducible randomness, allowing for consistent results across multiple executions.
## Input types
### Required
- **`Value_A`**
    - Specifies the lower bound of the random number range. It influences the minimum value that the random number generator can produce.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`Value_B`**
    - Defines the upper bound of the random number range. It sets the maximum value that the random number generator can output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - A seed value for the random number generator to ensure reproducibility of results. It determines the sequence of numbers generated, allowing for consistent randomness across runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output is a random floating-point number within the specified range, determined by the input bounds and seed.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RandomValue:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Value_A": Field.float(default=0),
                "Value_B": Field.float(default=1),
                "seed": Field.int(default=0, min=0, max=2**32-1),
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "get_rand"

    CATEGORY = TREE_FUNCTIONS

    def get_rand(self, Value_A, Value_B, seed):
        random.seed(seed)
        value = random.uniform(Value_A, Value_B)
        return (value,)

```
