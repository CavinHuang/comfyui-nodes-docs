---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# CLIPEncodeMultipleAdvanced
## Documentation
- Class name: `CLIPEncodeMultipleAdvanced`
- Category: `Bmad/conditioning`
- Output node: `False`

This node is designed for advanced text encoding using the CLIP model, allowing for the customization of token normalization and weight interpretation. It supports encoding multiple inputs simultaneously, adjusting the encoding process based on the provided parameters to generate a list of conditionings.
## Input types
### Required
- **`clip`**
    - The CLIP model used for encoding. It's crucial for interpreting the input text into embeddings.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`token_normalization`**
    - Determines whether or not to normalize tokens during the encoding process, affecting the final embeddings.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`weight_interpretation`**
    - Adjusts the weight interpretation for the encoding, influencing how the embeddings are calculated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`inputs_len`**
    - Specifies the number of inputs to encode. This allows the node to handle multiple inputs simultaneously, generating a list of conditionings.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Generates a list of conditionings based on the encoded inputs. This is crucial for subsequent processing steps that rely on these conditionings.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLIPEncodeMultipleAdvanced(AdvancedCLIPTextEncode):
    @classmethod
    def INPUT_TYPES(s):
        types = super().INPUT_TYPES()  # TODO should refactor Grid class above to this too, so if original is changed, all the new options are added there too
        types["required"].pop("text")
        types["required"]["inputs_len"] = ("INT", {"default": 9, "min": 0, "max": 32})
        return types

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "gen2"
    CATEGORY = "Bmad/conditioning"
    OUTPUT_IS_LIST = (True,)

    def gen2(self, clip, token_normalization, weight_interpretation, inputs_len, **kwargs):
        conds = []
        for i in range(inputs_len):
            arg_name = get_arg_name_from_multiple_inputs("string", i)
            conds.append(super().encode(clip, kwargs[arg_name], token_normalization, weight_interpretation,'disable')[0])
        return (conds,)

```
