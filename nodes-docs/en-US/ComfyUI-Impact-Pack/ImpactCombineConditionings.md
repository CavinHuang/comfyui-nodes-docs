---
tags:
- Conditioning
---

# Combine Conditionings
## Documentation
- Class name: `ImpactCombineConditionings`
- Category: `ImpactPack/Util`
- Output node: `False`

The node is designed to merge two or more conditioning inputs into a single conditioning output. It focuses on combining the specified conditioning elements to create a unified conditioning that can be used in subsequent operations or models.
## Input types
### Required
- **`conditioning1`**
    - The primary conditioning input that serves as the base for combination. It plays a crucial role in the merging process, acting as the initial conditioning to which others are added.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Any]]`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The combined conditioning output, which is a result of merging the input conditionings. This unified conditioning is ready for use in further processing or model applications.
    - Python dtype: `Tuple[List[Tuple[torch.Tensor, Any]], ...]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - SetNode



## Source code
```python
class CombineConditionings:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "conditioning1": ("CONDITIONING", ),
                     },
                }

    RETURN_TYPES = ("CONDITIONING", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, **kwargs):
        res = []
        for k, v in kwargs.items():
            res += v

        return (res, )

```
