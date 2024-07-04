
# Documentation
- Class name: CLIPEncodeMultipleAdvanced
- Category: Bmad/conditioning
- Output node: False
- Repo Ref: https://github.com/Stability-AI/StableCascade

CLIPEncodeMultipleAdvanced节点是为使用CLIP模型进行高级文本编码而设计的，允许自定义标记归一化和权重解释。它支持同时编码多个输入，根据提供的参数调整编码过程，以生成一系列条件约束。

# Input types
## Required
- clip
    - 用于编码的CLIP模型。它对于将输入文本解释为嵌入向量至关重要。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- token_normalization
    - 决定在编码过程中是否对标记进行归一化，从而影响最终的嵌入向量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- weight_interpretation
    - 调整编码的权重解释，影响嵌入向量的计算方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- inputs_len
    - 指定要编码的输入数量。这允许节点同时处理多个输入，生成一系列条件约束。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- conditioning
    - 基于编码输入生成的条件约束列表。这对于依赖这些条件约束的后续处理步骤至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[torch.Tensor]


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
