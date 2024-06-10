---
tags:
- DataClamp
---

# ConditioningClamp
## Documentation
- Class name: `ConditioningClamp`
- Category: `clamp`
- Output node: `False`

The ConditioningClamp node is designed to pass through conditioning data without modification, serving as a placeholder or checkpoint within a data processing pipeline.
## Input types
### Required
- **`conditioning`**
    - This parameter represents the conditioning data that is passed through the node unchanged, highlighting its role in maintaining the integrity of the data flow.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Outputs the unaltered conditioning data, emphasizing the node's function as a transparent conduit in the pipeline.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "conditioning": ("CONDITIONING",),
            },
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, conditioning):
        return (conditioning,)

```
