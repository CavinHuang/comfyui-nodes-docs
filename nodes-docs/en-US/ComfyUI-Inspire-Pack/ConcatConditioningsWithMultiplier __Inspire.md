---
tags:
- Conditioning
---

# Concat Conditionings with Multiplier (Inspire)
## Documentation
- Class name: `ConcatConditioningsWithMultiplier __Inspire`
- Category: `InspirePack/__for_testing`
- Output node: `False`

This node is designed to concatenate multiple conditioning vectors, each potentially modified by a corresponding multiplier, to enhance or adjust their influence in a generative model's output. It allows for dynamic adjustment of conditioning strengths before combining them, facilitating fine-tuned control over the conditioning process.
## Input types
### Required
- **`conditioning1`**
    - The primary conditioning vector to which additional conditionings will be concatenated. It serves as the base for further conditioning modifications.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[torch.Tensor, Any]]`
### Optional
- **`multiplier1`**
    - A multiplier for the primary conditioning vector's strength, allowing for its influence to be adjusted before concatenation with other conditionings.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The concatenated conditioning vector, with each component's strength adjusted by its corresponding multiplier, ready for use in model conditioning.
    - Python dtype: `List[Tuple[torch.Tensor, Any]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ConcatConditioningsWithMultiplier:
    @classmethod
    def INPUT_TYPES(s):
        flex_inputs = {}

        stack = inspect.stack()
        if stack[1].function == 'get_input_data':
            # bypass validation
            for x in range(0, 100):
                flex_inputs[f"multiplier{x}"] = ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01})
        else:
            flex_inputs["multiplier1"] = ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01})

        return {
                "required": {"conditioning1": ("CONDITIONING",), },
                "optional": flex_inputs
                }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/__for_testing"

    def doit(self, **kwargs):
        if "ConditioningMultiplier_PoP" in nodes.NODE_CLASS_MAPPINGS:
            obj = nodes.NODE_CLASS_MAPPINGS["ConditioningMultiplier_PoP"]()
        else:
            utils.try_install_custom_node('https://github.com/picturesonpictures/comfy_PoP',
                                          "To use 'ConcatConditioningsWithMultiplier' node, 'comfy_PoP' extension is required.")
            raise Exception("'comfy_PoP' node isn't installed.")

        conditioning_to = kwargs['conditioning1']
        conditioning_to = obj.multiply_conditioning_strength(conditioning=conditioning_to, multiplier=float(kwargs['multiplier1']))[0]

        out = None
        for k, conditioning_from in kwargs.items():
            if k == 'conditioning1' or not k.startswith('conditioning'):
                continue

            out = []
            if len(conditioning_from) > 1:
                print(f"Warning: ConcatConditioningsWithMultiplier {k} contains more than 1 cond, only the first one will actually be applied to conditioning1.")

            mkey = 'multiplier'+k[12:]
            multiplier = float(kwargs[mkey])
            conditioning_from = obj.multiply_conditioning_strength(conditioning=conditioning_from, multiplier=multiplier)[0]
            cond_from = conditioning_from[0][0]

            for i in range(len(conditioning_to)):
                t1 = conditioning_to[i][0]
                tw = torch.cat((t1, cond_from), 1)
                n = [tw, conditioning_to[i][1].copy()]
                out.append(n)

            conditioning_to = out

        if out is None:
            return (kwargs['conditioning1'], )
        else:
            return (out,)

```
