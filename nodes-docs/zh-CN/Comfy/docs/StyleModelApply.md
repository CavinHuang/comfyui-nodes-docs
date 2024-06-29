# Documentation
- Class name: StyleModelApply
- Category: conditioning/style_model
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

`StyleModelApply` 节点旨在将图像的风格集成到生成模型中。它接受视觉模型的输出，并将风格模型应用于条件生成过程，从而允许创建风格化输出。该节点在整体系统中发挥关键作用，通过使风格元素无缝融入生成流程，实现了风格化元素的融合。

# Input types
## Required
- clip_vision_output
    - 参数 `clip_vision_output` 是一个张量，表示从图像中提取的视觉特征。它对节点至关重要，因为它构成了应用风格转换的基础。这个输入直接影响风格如何融入生成模型，影响最终输出的美学质量。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- style_model
    - 参数 `style_model` 是一个神经网络模块，负责捕获并将风格特征应用于生成过程。它是节点操作的必需组件，因为它定义了要融入生成内容的风格。
    - Comfy dtype: torch.nn.Module
    - Python dtype: torch.nn.Module
- conditioning
    - 参数 `conditioning` 是一个包含多个元组的列表，每个元组包含两个张量，代表条件数据的不同方面。这些张量对于引导生成模型产生符合所需风格和主题元素的输出至关重要。
    - Comfy dtype: List[Tuple[torch.Tensor, torch.Tensor]]
    - Python dtype: List[Tuple[torch.Tensor, torch.Tensor]]

# Output types
- CONDITIONING
    - 输出 `CONDITIONING` 是一个包含多个元组的列表，每个元组都包含两个张量，这些张量已被风格化并为生成模型进行了条件处理。这个输出非常重要，因为它直接输入到生成过程中，影响生成内容的风格和主题一致性。
    - Comfy dtype: List[Tuple[torch.Tensor, torch.Tensor]]
    - Python dtype: List[Tuple[torch.Tensor, torch.Tensor]]

# Usage tips
- Infra type: GPU

# Source code
```
class StyleModelApply:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'style_model': ('STYLE_MODEL',), 'clip_vision_output': ('CLIP_VISION_OUTPUT',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'apply_stylemodel'
    CATEGORY = 'conditioning/style_model'

    def apply_stylemodel(self, clip_vision_output, style_model, conditioning):
        cond = style_model.get_cond(clip_vision_output).flatten(start_dim=0, end_dim=1).unsqueeze(dim=0)
        c = []
        for t in conditioning:
            n = [torch.cat((t[0], cond), dim=1), t[1].copy()]
            c.append(n)
        return (c,)
```