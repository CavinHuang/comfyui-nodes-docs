---
tags:
- ConditionalSelection
- ImpactPack
---

# ImpactDummyInput
## Documentation
- Class name: `ImpactDummyInput`
- Category: `ImpactPack/Debug`
- Output node: `False`

The ImpactDummyInput node is designed to generate a simple dummy output, primarily for testing or placeholder purposes within the ImpactPack/Debug category. It serves as a straightforward mechanism to introduce a constant or a placeholder value into the data flow.
## Input types
### Required
## Output types
- **`*`**
    - Comfy dtype: `*`
    - Represents a generic output type, indicating that this node can produce a value of any type, serving as a versatile placeholder or test value.
    - Python dtype: `Any`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactDummyInput:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}

    CATEGORY = "ImpactPack/Debug"

    RETURN_TYPES = (any_typ,)
    FUNCTION = "doit"

    def doit(self):
        return ("DUMMY",)

```
