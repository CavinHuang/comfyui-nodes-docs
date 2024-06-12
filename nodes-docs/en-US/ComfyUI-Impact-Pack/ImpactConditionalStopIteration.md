---
tags:
- BooleanLogic
- ConditionalSelection
---

# ImpactConditionalStopIteration
## Documentation
- Class name: `ImpactConditionalStopIteration`
- Category: `ImpactPack/Logic`
- Output node: `True`

This node is designed to conditionally halt the iteration process within a workflow, based on a specified condition. It serves as a control mechanism to dynamically manage the flow of execution based on logical conditions.
## Input types
### Required
- **`cond`**
    - Determines whether the iteration should be stopped. If true, the iteration is halted.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactConditionalStopIteration:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": { "cond": ("BOOLEAN", {"forceInput": True}), },
        }

    FUNCTION = "doit"
    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = ()

    OUTPUT_NODE = True

    def doit(self, cond):
        if cond:
            PromptServer.instance.send_sync("stop-iteration", {})
        return {}

```
