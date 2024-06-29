---
tags:
- RandomGeneration
- Seed
---

# Seed
## Documentation
- Class name: `Seed`
- Category: `WAS Suite/Number`
- Output node: `False`

The WAS_Seed node initializes a seed value for random number generation, providing a foundation for deterministic outcomes in processes that involve randomness.
## Input types
### Required
- **`seed`**
    - Specifies the initial seed value for random number generation. It's crucial for ensuring reproducibility of random processes by initializing the random number generator with a known state.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`seed`**
    - Comfy dtype: `SEED`
    - Returns the initialized seed value, allowing it to be used in subsequent random number generation processes.
    - Python dtype: `int`
- **`number`**
    - Comfy dtype: `NUMBER`
    - Outputs the seed value as a generic number, facilitating its use in contexts where a specific number type is not required.
    - Python dtype: `int`
- **`float`**
    - Comfy dtype: `FLOAT`
    - Provides the seed value as a floating-point number, enabling its application in scenarios that require decimal precision.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - Delivers the seed value explicitly as an integer, ensuring compatibility with operations that necessitate integer inputs.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler SDXL (Eff.)](../../efficiency-nodes-comfyui/Nodes/KSampler SDXL (Eff.).md)



## Source code
```python
class WAS_Seed:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"seed": ("INT", {"default": 0, "min": 0,
                          "max": 0xffffffffffffffff})}
                }

    RETURN_TYPES = ("SEED", "NUMBER", "FLOAT", "INT")
    RETURN_NAMES = ("seed", "number", "float", "int")
    FUNCTION = "seed"

    CATEGORY = "WAS Suite/Number"

    def seed(self, seed):
        return ({"seed": seed, }, seed, float(seed), int(seed) )

```
