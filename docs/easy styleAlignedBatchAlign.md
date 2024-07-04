
# Documentation
- Class name: easy styleAlignedBatchAlign
- Category: EasyUse/Adapter
- Output node: False

easy styleAlignedBatchAlign节点旨在对一批模型应用风格对齐，基于共享参数调整其归一化和注意力机制。这一过程增强了不同模型间风格的一致性和和谐性，有助于产生更连贯和美观的输出结果。

# Input types
## Required
- model
    - model参数代表将要应用风格对齐的神经网络模型。它对于定义将要进行归一化和注意力调整的基础结构至关重要。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- share_norm
    - 该参数指定模型内部归一化层应如何共享或对齐，影响模型输出的整体风格一致性和连贯性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- share_attn
    - 决定模型内部注意力机制的共享策略，影响风格元素如何在模型的不同部分集成和协调。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scale
    - 影响风格应用的强度，允许对风格对模型输出的影响进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出是输入模型的修改版本，现在具有调整后的归一化和注意力机制，以增强风格对齐。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class styleAlignedBatchAlign:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("MODEL",),
                "share_norm": (SHARE_NORM_OPTIONS,),
                "share_attn": (SHARE_ATTN_OPTIONS,),
                "scale": ("FLOAT", {"default": 1, "min": 0, "max": 1.0, "step": 0.1}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "align"
    CATEGORY = "EasyUse/Adapter"

    def align(self, model, share_norm, share_attn, scale):
        return (styleAlignBatch(model, share_norm, share_attn, scale),)

```
