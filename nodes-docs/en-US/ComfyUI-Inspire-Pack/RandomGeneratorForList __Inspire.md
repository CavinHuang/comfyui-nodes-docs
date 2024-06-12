---
tags:
- RandomGeneration
- Randomization
---

# Random Generator for List (Inspire)
## Documentation
- Class name: `RandomGeneratorForList __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

The RandomGeneratorForList node is designed to generate a sequence of random values based on a given seed and a unique identifier. It ensures that each sequence is unique to its identifier, allowing for reproducible randomness across different executions.
## Input types
### Required
- **`signal`**
    - The signal input acts as a trigger for the random generation process, ensuring the node's operation is initiated.
    - Comfy dtype: `*`
    - Python dtype: `utils.any_typ`
- **`seed`**
    - The seed input determines the starting point of the random number generation, ensuring reproducibility of the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`signal`**
    - Comfy dtype: `*`
    - The signal output is passed through unchanged, serving as a continuity element in the node's operation.
    - Python dtype: `utils.any_typ`
- **`random_value`**
    - Comfy dtype: `INT`
    - The random_value output is a newly generated random number, providing a unique element for further processing.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RandomGeneratorForList:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "signal": (utils.any_typ,),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                "hidden": {"unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = (utils.any_typ, "INT",)
    RETURN_NAMES = ("signal", "random_value",)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, signal, seed, unique_id):
        if unique_id not in list_counter_map:
            count = 0
        else:
            count = list_counter_map[unique_id]

        list_counter_map[unique_id] = count + 1

        rn = random.Random()
        rn.seed(seed + count)
        new_seed = random.randint(0, 1125899906842624)

        return (signal, new_seed)

```
