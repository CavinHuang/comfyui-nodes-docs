
# Documentation
- Class name: CLIPEncodeMultiple
- Category: Bmad/conditioning
- Output node: False

CLIPEncodeMultiple节点旨在使用CLIP模型对多个输入进行编码，从而基于这些输入生成一系列条件。该节点抽象了处理多个输入的复杂性，并利用CLIP模型的能力为每个输入生成相关的条件。

# Input types
## Required
- clip
    - 用于编码输入的CLIP模型。它对于确定输入如何被处理和编码成条件至关重要。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- inputs_len
    - 指定要编码的输入数量。它影响迭代次数，从而影响输出条件列表的大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- conditioning
    - 从输入生成的条件列表。列表中的每个元素对应一个单独输入的条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]


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
