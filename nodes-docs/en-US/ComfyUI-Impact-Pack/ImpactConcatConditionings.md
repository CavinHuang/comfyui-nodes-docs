---
tags:
- Conditioning
---

# Concat Conditionings
## Documentation
- Class name: `ImpactConcatConditionings`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactConcatConditionings node is designed to concatenate multiple conditioning inputs into a single conditioning output. This process involves merging the features of the given conditionings, facilitating the combination of different conditioning elements for enhanced model input preparation.
## Input types
### Required
- **`conditioning1`**
    - The primary conditioning input to which additional conditionings will be concatenated. It serves as the base for the concatenation process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Any]]`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The result of concatenating the given conditionings into a single, unified conditioning output.
    - Python dtype: `List[Tuple[torch.Tensor, Any]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ConcatConditionings:
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
        conditioning_to = list(kwargs.values())[0]

        for k, conditioning_from in list(kwargs.items())[1:]:
            out = []
            if len(conditioning_from) > 1:
                print("Warning: ConcatConditionings {k} contains more than 1 cond, only the first one will actually be applied to conditioning1.")

            cond_from = conditioning_from[0][0]

            for i in range(len(conditioning_to)):
                t1 = conditioning_to[i][0]
                tw = torch.cat((t1, cond_from), 1)
                n = [tw, conditioning_to[i][1].copy()]
                out.append(n)

            conditioning_to = out

        return (out, )

```
