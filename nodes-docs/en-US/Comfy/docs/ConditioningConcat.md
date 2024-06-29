---
tags:
- Conditioning
---

# Conditioning (Concat)
## Documentation
- Class name: `ConditioningConcat`
- Category: `conditioning`
- Output node: `False`

The ConditioningConcat node is designed to concatenate conditioning vectors, specifically merging the 'conditioning_from' vector into each vector within the 'conditioning_to' array. This operation is fundamental in scenarios where the conditioning context needs to be expanded or modified by incorporating additional information.
## Input types
### Required
- **`conditioning_to`**
    - Represents the primary set of conditioning vectors to which the 'conditioning_from' vector will be concatenated. This parameter is crucial for defining the base context that will be enhanced.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict]]`
- **`conditioning_from`**
    - Specifies the conditioning vector(s) to be concatenated to each vector in 'conditioning_to'. This parameter is essential for introducing new or supplementary conditioning information into the existing context.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict]]`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Outputs a modified list of conditioning vectors, each expanded by the concatenation of 'conditioning_from' to 'conditioning_to'.
    - Python dtype: `List[Tuple[torch.Tensor, Dict]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)
    - [ConditioningConcat](../../Comfy/Nodes/ConditioningConcat.md)



## Source code
```python
class ConditioningConcat:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "conditioning_to": ("CONDITIONING",),
            "conditioning_from": ("CONDITIONING",),
            }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "concat"

    CATEGORY = "conditioning"

    def concat(self, conditioning_to, conditioning_from):
        out = []

        if len(conditioning_from) > 1:
            logging.warning("Warning: ConditioningConcat conditioning_from contains more than 1 cond, only the first one will actually be applied to conditioning_to.")

        cond_from = conditioning_from[0][0]

        for i in range(len(conditioning_to)):
            t1 = conditioning_to[i][0]
            tw = torch.cat((t1, cond_from),1)
            n = [tw, conditioning_to[i][1].copy()]
            out.append(n)

        return (out, )

```
