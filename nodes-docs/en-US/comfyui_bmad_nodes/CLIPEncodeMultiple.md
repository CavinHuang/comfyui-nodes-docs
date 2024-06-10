---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# CLIPEncodeMultiple
## Documentation
- Class name: `CLIPEncodeMultiple`
- Category: `Bmad/conditioning`
- Output node: `False`

The CLIPEncodeMultiple node is designed to encode multiple inputs using a CLIP model, producing a list of conditionings based on the inputs. It abstracts the complexity of handling multiple inputs and leverages the CLIP model's capabilities to generate relevant conditionings for each input.
## Input types
### Required
- **`clip`**
    - The CLIP model used for encoding the inputs. It is crucial for determining how the inputs are processed and encoded into conditionings.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`inputs_len`**
    - Specifies the number of inputs to be encoded. It affects the number of iterations and consequently the size of the output list of conditionings.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - A list of conditionings generated from the inputs. Each element in the list corresponds to the conditioning of an individual input.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLIPEncodeMultiple(nodes.CLIPTextEncode):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "clip": ("CLIP",),
            "inputs_len": ("INT", {"default": 9, "min": 0, "max": 32}),
        }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "gen2"
    CATEGORY = "Bmad/conditioning"
    OUTPUT_IS_LIST = (True,)

    def gen2(self, clip, inputs_len, **kwargs):
        conds = []
        for i in range(inputs_len):
            arg_name = get_arg_name_from_multiple_inputs("string", i)
            conds.append(super().encode(clip, kwargs[arg_name])[0])
        return (conds,)

```
