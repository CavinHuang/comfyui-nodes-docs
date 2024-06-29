---
tags:
- Comparison
---

# ImpactCompare
## Documentation
- Class name: `ImpactCompare`
- Category: `ImpactPack/Logic`
- Output node: `False`

The ImpactCompare node is designed to perform a variety of comparison operations between two input values. It supports basic comparison operations such as equality, inequality, greater than, less than, and their respective inclusive versions, as well as returning predefined true or false values. This functionality allows for dynamic decision-making processes within a workflow based on the comparison results.
## Input types
### Required
- **`cmp`**
    - Specifies the type of comparison to perform between the two input values. It includes operations like equality, inequality, greater than, less than, and their inclusive versions, as well as options to return true or false directly.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`a`**
    - The first value to be compared. It can be of any type, allowing for flexibility in comparison operations.
    - Comfy dtype: `*`
    - Python dtype: `impact.utils.any_typ`
- **`b`**
    - The second value to be compared against the first. It can be of any type, enhancing the node's versatility in handling different comparison scenarios.
    - Comfy dtype: `*`
    - Python dtype: `impact.utils.any_typ`
## Output types
- **`boolean`**
    - Comfy dtype: `BOOLEAN`
    - The result of the comparison operation, indicating whether the specified condition between the two input values is met.
    - Python dtype: `Tuple[bool]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactCompare:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "cmp": (['a = b', 'a <> b', 'a > b', 'a < b', 'a >= b', 'a <= b', 'tt', 'ff'],),
                "a": (any_typ, ),
                "b": (any_typ, ),
            },
        }

    FUNCTION = "doit"
    CATEGORY = "ImpactPack/Logic"

    RETURN_TYPES = ("BOOLEAN", )

    def doit(self, cmp, a, b):
        if cmp == "a = b":
            return (a == b, )
        elif cmp == "a <> b":
            return (a != b, )
        elif cmp == "a > b":
            return (a > b, )
        elif cmp == "a < b":
            return (a < b, )
        elif cmp == "a >= b":
            return (a >= b, )
        elif cmp == "a <= b":
            return (a <= b, )
        elif cmp == 'tt':
            return (True, )
        else:
            return (False, )

```
