---
tags:
- RandomGeneration
- Seed
---

# Global Seed (Inspire)
## Documentation
- Class name: `GlobalSeed __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `True`

The GlobalSeed node in the Inspire pack is designed to manage and manipulate the global seed value used across various nodes in a workflow. It allows for the setting of a seed value, choosing an action to modify this seed (e.g., increment, decrement, randomize), and controlling the seed's application mode (before or after generation). This functionality is crucial for ensuring consistency, repeatability, and variation in the outputs of a generative process.
## Input types
### Required
- **`value`**
    - Specifies the initial seed value. It is crucial for initializing the seed manipulation process and affects the starting point for any seed-based operations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mode`**
    - Determines whether the seed manipulation occurs before or after the generation process, affecting how and when the seed value influences the workflow.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`action`**
    - Defines the operation to be performed on the seed value (e.g., fixed, increment, decrement, randomize), dictating how the seed changes over time or across nodes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`last_seed`**
    - Holds the last seed value used, allowing for tracking and potentially reverting to a previous state.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GlobalSeed:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "mode": ("BOOLEAN", {"default": True, "label_on": "control_before_generate", "label_off": "control_after_generate"}),
                "action": (["fixed", "increment", "decrement", "randomize",
                            "increment for each node", "decrement for each node", "randomize for each node"], ),
                "last_seed": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}

```
