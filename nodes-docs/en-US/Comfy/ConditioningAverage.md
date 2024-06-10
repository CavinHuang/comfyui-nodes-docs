---
tags:
- Conditioning
---

# ConditioningAverage
## Documentation
- Class name: `ConditioningAverage`
- Category: `conditioning`
- Output node: `False`

The ConditioningAverage node is designed to blend conditioning vectors from two sources by averaging them, with the ability to adjust the strength of influence from each source. This functionality is crucial for scenarios where a balanced integration of conditioning information is needed to guide the generation process or modify existing conditioning in a controlled manner.
## Input types
### Required
- **`conditioning_to`**
    - Represents the target conditioning vectors to which the blending will be applied. It plays a crucial role in determining the final output by receiving modifications based on the averaged input.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
- **`conditioning_from`**
    - Serves as the source of conditioning vectors that will be averaged with the target vectors. Its content significantly influences the blending process by providing the base vectors for modification.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
- **`conditioning_to_strength`**
    - Determines the weighting of the target conditioning vectors in the averaging process, thereby controlling the influence of the source vectors on the final outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a modified list of conditioning vectors, reflecting the averaged blend of the input sources with adjusted strengths.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, Any]]]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [FaceFixerOpenCV](../../mikey_nodes/Nodes/FaceFixerOpenCV.md)



## Source code
```python
class ConditioningAverage :
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"conditioning_to": ("CONDITIONING", ), "conditioning_from": ("CONDITIONING", ),
                              "conditioning_to_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01})
                             }}
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "addWeighted"

    CATEGORY = "conditioning"

    def addWeighted(self, conditioning_to, conditioning_from, conditioning_to_strength):
        out = []

        if len(conditioning_from) > 1:
            logging.warning("Warning: ConditioningAverage conditioning_from contains more than 1 cond, only the first one will actually be applied to conditioning_to.")

        cond_from = conditioning_from[0][0]
        pooled_output_from = conditioning_from[0][1].get("pooled_output", None)

        for i in range(len(conditioning_to)):
            t1 = conditioning_to[i][0]
            pooled_output_to = conditioning_to[i][1].get("pooled_output", pooled_output_from)
            t0 = cond_from[:,:t1.shape[1]]
            if t0.shape[1] < t1.shape[1]:
                t0 = torch.cat([t0] + [torch.zeros((1, (t1.shape[1] - t0.shape[1]), t1.shape[2]))], dim=1)

            tw = torch.mul(t1, conditioning_to_strength) + torch.mul(t0, (1.0 - conditioning_to_strength))
            t_to = conditioning_to[i][1].copy()
            if pooled_output_from is not None and pooled_output_to is not None:
                t_to["pooled_output"] = torch.mul(pooled_output_to, conditioning_to_strength) + torch.mul(pooled_output_from, (1.0 - conditioning_to_strength))
            elif pooled_output_from is not None:
                t_to["pooled_output"] = pooled_output_from

            n = [tw, t_to]
            out.append(n)
        return (out, )

```
