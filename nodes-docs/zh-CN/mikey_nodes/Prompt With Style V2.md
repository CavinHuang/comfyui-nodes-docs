# Documentation
- Class name: PromptWithStyleV2
- Category: Mikey
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

PromptWithStyleV2 节点旨在生成并细化具有指定风格的提示，确保生成的内容与期望的艺术或主题方向一致。它利用正负提示以及风格参数的组合来指导创作过程，从而产生反映输入标准的细腻输出。

# Input types
## Required
- positive_prompt
    - 正向提示是指导内容生成的关键输入，它设定了创造性的基调，并有助于在输出中实现预期的风格和主题元素。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - 负向提示用于排除生成内容中不需要的元素或特征。它通过指定应避免的内容来细化输出，从而增强结果的整体一致性和专注度。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - 风格参数对于定义生成内容的美学或主题方向至关重要。它影响艺术元素的选择以及输出的整体外观和感觉。
    - Comfy dtype: STRING
    - Python dtype: str
- ratio_selected
    - ratio_selected 参数确定生成内容的宽高比，这对于保持所需的视觉构图和布局至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- clip_base
    - clip_base 参数是用于将文本提示编码和解码为潜在空间表示的基础 CLIP 模型的引用。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
- clip_refiner
    - clip_refiner 参数表示用于进一步提高生成提示的质量和特异性的精炼 CLIP 模型。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
## Optional
- batch_size
    - 批次大小是一个可选参数，允许用户控制单次操作中生成的样本数量。它可以根据计算资源和手头任务的具体要求进行调整。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 种子是一个可选参数，确保生成过程的可重复性。当在多次运行中需要一致的结果时，它特别有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - 样本输出包含生成的潜在表示，可以进一步处理或用作工作流中其他节点的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- base_pos_cond
    - base_pos_cond 输出提供基于基础 CLIP 模型的正向调节信息，可用于引导生成过程朝着期望的特征发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- base_neg_cond
    - base_neg_cond 输出提供基于基础 CLIP 模型的负向调节信息，有助于避免生成内容中的不需要的元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- refiner_pos_cond
    - refiner_pos_cond 输出呈现来自精炼 CLIP 模型的正向调节，增强了生成提示的特异性和质量。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- refiner_neg_cond
    - refiner_neg_cond 输出提供来自精炼 CLIP 模型的负向调节，确保生成的内容遵守指定的约束并避免某些特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- positive_prompt
    - positive_prompt 输出反映了生成过程中使用的最终正向提示，包含了已编码到输出中的所需品质和主题。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - negative_prompt 输出代表生成过程中使用的最终负向提示，指定了应从生成内容中省略的元素和特征。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptWithStyleV2:

    @classmethod
    def INPUT_TYPES(s):
        (s.ratio_sizes, s.ratio_dict) = read_ratios()
        (s.styles, s.pos_style, s.neg_style) = read_styles()
        return {'required': {'positive_prompt': ('STRING', {'multiline': True, 'default': 'Positive Prompt'}), 'negative_prompt': ('STRING', {'multiline': True, 'default': 'Negative Prompt'}), 'style': (s.styles,), 'ratio_selected': (s.ratio_sizes,), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'clip_base': ('CLIP',), 'clip_refiner': ('CLIP',)}}
    RETURN_TYPES = ('LATENT', 'CONDITIONING', 'CONDITIONING', 'CONDITIONING', 'CONDITIONING', 'STRING', 'STRING')
    RETURN_NAMES = ('samples', 'base_pos_cond', 'base_neg_cond', 'refiner_pos_cond', 'refiner_neg_cond', 'positive_prompt', 'negative_prompt')
    FUNCTION = 'start'
    CATEGORY = 'Mikey'

    def start(self, clip_base, clip_refiner, positive_prompt, negative_prompt, style, ratio_selected, batch_size, seed):
        """ get output from PromptWithStyle.start """
        (latent, pos_prompt, neg_prompt, pos_style, neg_style, width, height, refiner_width, refiner_height) = PromptWithStyle.start(self, positive_prompt, negative_prompt, style, ratio_selected, batch_size, seed)
        ratio = min([width, height]) / max([width, height])
        (target_width, target_height) = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        refiner_width = target_width
        refiner_height = target_height
        sdxl_pos_cond = CLIPTextEncodeSDXL.encode(self, clip_base, width, height, 0, 0, target_width, target_height, pos_prompt, pos_style)[0]
        sdxl_neg_cond = CLIPTextEncodeSDXL.encode(self, clip_base, width, height, 0, 0, target_width, target_height, neg_prompt, neg_style)[0]
        refiner_pos_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 6, refiner_width, refiner_height, pos_prompt)[0]
        refiner_neg_cond = CLIPTextEncodeSDXLRefiner.encode(self, clip_refiner, 2.5, refiner_width, refiner_height, neg_prompt)[0]
        return (latent, sdxl_pos_cond, sdxl_neg_cond, refiner_pos_cond, refiner_neg_cond, pos_prompt, neg_prompt)
```