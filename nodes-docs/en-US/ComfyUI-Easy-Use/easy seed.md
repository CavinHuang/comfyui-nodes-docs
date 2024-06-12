---
tags:
- RandomGeneration
- Seed
---

# EasySeed
## Documentation
- Class name: `easy seed`
- Category: `EasyUse/Seed`
- Output node: `True`

The `easy seed` node is designed to manage and control the seed value used in generation processes, allowing for the replication of results or the introduction of variability. It supports operations such as setting a fixed seed, incrementing, decrementing, or randomizing the seed for each node or globally across the workflow.
## Input types
### Required
- **`seed`**
    - The initial seed value, which serves as the basis for generation processes. It determines the starting point for any pseudo-random operations, affecting the reproducibility and variation of outputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`seed`**
    - Comfy dtype: `INT`
    - The seed value after being processed according to the specified action. This allows for controlled variation or consistency in generation processes.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class easySeed:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("seed",)
    FUNCTION = "doit"

    CATEGORY = "EasyUse/Seed"

    OUTPUT_NODE = True

    def doit(self, seed=0, prompt=None, extra_pnginfo=None, my_unique_id=None):
        return seed,

```
