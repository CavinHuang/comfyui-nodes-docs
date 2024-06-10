# Documentation
- Class name: PromptWithStyle
- Category: Mikey
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

该节点旨在通过结合积极和消极的文本输入以及指定的风格来生成创意提示，从而产生多样化的输出，满足各种风格化和主题化的需求。

# Input types
## Required
- positive_prompt
    - positive_prompt参数对于设定生成内容的积极基调至关重要。它是节点构建创意输出的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - negative_prompt参数通过在内容生成过程中引入对比元素，补充了positive_prompt，增强了输出的多样性和深度。
    - Comfy dtype: STRING
    - Python dtype: str
- style
    - style参数决定了生成内容的主题方向和美学质量。它是实现具有内在一致性和风格一致性的输出的关键因素。
    - Comfy dtype: COMBO
    - Python dtype: str
- ratio_selected
    - ratio_selected参数影响内容的结构组成，确保生成的输出与期望的宽高比和格式要求相一致。
    - Comfy dtype: STRING
    - Python dtype: str
- batch_size
    - batch_size参数决定了单次操作中生成的独特输出数量，这对于内容生成的效率和可扩展性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - seed参数在内容生成过程中引入了受控的随机性，确保输出既多样化又可复现，便于一致的实验。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - samples输出是生成内容的潜在表示，为进一步的处理和分析提供了多功能的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- positive_prompt_text_g
    - positive_prompt_text_g输出展示了经过处理的最终积极提示版本，已针对节点的创意目标进行了定制。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - negative_prompt_text_g输出提供了经过精炼的消极提示，它补充了积极内容，为整体输出增加了深度和对比度。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_style_text_l
    - positive_style_text_l输出包含了与积极提示相关的风格元素，有助于生成内容的主题连贯性。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_style_text_l
    - negative_style_text_l输出反映了消极提示的风格方面，增强了内容的多样性和丰富性。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - width输出指定了内容结构的水平维度，在确定生成输出的布局和呈现方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height输出定义了内容结构的垂直维度，对于输出的整体构成和视觉吸引力至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_width
    - refiner_width输出调整宽度参数以优化精炼过程，确保输出是经过打磨的并符合质量标准。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_height
    - refiner_height输出为精炼过程设置了垂直参数，有助于提高最终输出的精确度和细节。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class PromptWithStyle:

    @classmethod
    def INPUT_TYPES(s):
        (s.ratio_sizes, s.ratio_dict) = read_ratios()
        (s.styles, s.pos_style, s.neg_style) = read_styles()
        return {'required': {'positive_prompt': ('STRING', {'multiline': True, 'default': 'Positive Prompt'}), 'negative_prompt': ('STRING', {'multiline': True, 'default': 'Negative Prompt'}), 'style': (s.styles,), 'ratio_selected': (s.ratio_sizes,), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('LATENT', 'STRING', 'STRING', 'STRING', 'STRING', 'INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('samples', 'positive_prompt_text_g', 'negative_prompt_text_g', 'positive_style_text_l', 'negative_style_text_l', 'width', 'height', 'refiner_width', 'refiner_height')
    FUNCTION = 'start'
    CATEGORY = 'Mikey'
    OUTPUT_NODE = True

    def start(self, positive_prompt, negative_prompt, style, ratio_selected, batch_size, seed, prompt=None, extra_pnginfo=None):
        positive_prompt = search_and_replace(positive_prompt, extra_pnginfo, prompt)
        negative_prompt = search_and_replace(negative_prompt, extra_pnginfo, prompt)
        positive_prompt = process_random_syntax(positive_prompt, seed)
        negative_prompt = process_random_syntax(negative_prompt, seed)
        pos_prompt = find_and_replace_wildcards(positive_prompt, seed, debug=True)
        neg_prompt = find_and_replace_wildcards(negative_prompt, seed, debug=True)
        if pos_prompt != '' and pos_prompt != 'Positive Prompt' and (pos_prompt is not None):
            if '{prompt}' in self.pos_style[style]:
                pos_prompt = self.pos_style[style].replace('{prompt}', pos_prompt)
            elif self.pos_style[style]:
                pos_prompt = pos_prompt + ', ' + self.pos_style[style]
        else:
            pos_prompt = self.pos_style[style]
        if neg_prompt != '' and neg_prompt != 'Negative Prompt' and (neg_prompt is not None):
            if '{prompt}' in self.neg_style[style]:
                neg_prompt = self.neg_style[style].replace('{prompt}', neg_prompt)
            elif self.neg_style[style]:
                neg_prompt = neg_prompt + ', ' + self.neg_style[style]
        else:
            neg_prompt = self.neg_style[style]
        width = self.ratio_dict[ratio_selected]['width']
        height = self.ratio_dict[ratio_selected]['height']
        ratio = min([width, height]) / max([width, height])
        (target_width, target_height) = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        refiner_width = target_width
        refiner_height = target_height
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        return ({'samples': latent}, str(pos_prompt), str(neg_prompt), str(self.pos_style[style]), str(self.neg_style[style]), width, height, refiner_width, refiner_height)
```