---
tags:
- RandomGeneration
- Seed
---

# EasyGlobalSeed
## Documentation
- Class name: `easy globalSeed`
- Category: `EasyUse/Seed`
- Output node: `True`

The `easy globalSeed` node is designed to manage and control the seed value used across various nodes in a workflow, allowing for consistent or varied randomization effects based on user-defined actions. It supports operations such as fixing, incrementing, decrementing, and randomizing the seed, as well as applying these actions globally or per node, to achieve controlled randomness in the generation process.
## Input types
### Required
- **`value`**
    - Specifies the base seed value from which the seed management starts, serving as the foundation for subsequent operations like incrementing or randomizing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mode`**
    - Determines when the seed control should be applied, either before or after the generation process, allowing for precise timing in the application of seed values.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`action`**
    - Defines the operation to be performed on the seed value, such as fixing, incrementing, decrementing, or randomizing, including variations for per-node actions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`last_seed`**
    - Optionally stores the last seed value used, facilitating tracking and reuse of seed values across sessions or nodes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class globalSeed:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
                "mode": ("BOOLEAN", {"default": True, "label_on": "control_before_generate", "label_off": "control_after_generate"}),
                "action": (["fixed", "increment", "decrement", "randomize",
                            "increment for each node", "decrement for each node", "randomize for each node"], ),
                "last_seed": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "doit"

    CATEGORY = "EasyUse/Seed"

    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}

```
