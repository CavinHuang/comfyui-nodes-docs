# Documentation
- Class name: PromptWithSDXL
- Category: Mikey
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

PromptWithSDXL节点旨在处理和生成风格和内容生成任务的提示。它接收正面和负面提示以及样式，并应用各种转换以提高生成内容的质量。该节点能够处理复杂的提示结构，并针对生成高质量输出进行了优化。

# Input types
## Required
- positive_prompt
    - 正面提示是指导生成具有所需特征内容的关键输入。它在引导输出朝向预期风格和主题方面起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt
    - 负面提示通过指定应避免的内容来帮助完善生成过程。它对于确保最终输出不包含不需要的元素非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_style
    - 正面样式参数定义了要在生成内容中强调的风格元素。这对于实现和谐一致的审美至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_style
    - 该输入允许用户指定应最小化或排除在生成内容之外的样式，确保最终输出符合用户的偏好。
    - Comfy dtype: STRING
    - Python dtype: str
- ratio_selected
    - 所选比例参数确定生成内容的纵横比，这对于保持输出的视觉完整性至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- batch_size
    - 批次大小是一个可选参数，允许用户控制单次操作中生成的样本数量。它可以根据可用的计算资源进行调整。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 种子参数用于以可控的方式引入随机性，这对于生成多样化的输出集非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - 样本输出包含生成的潜在表示，这是内容生成过程的核心。这些表示可以进一步细化以产生最终输出。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- positive_prompt_text_g
    - 正面提示文本输出提供了在应用了所有转换之后的正面提示的最终形式。它反映了要包含在生成内容中的所需特征。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_prompt_text_g
    - 此输出在处理后呈现负面提示文本，详细说明了应从生成内容中省略的元素。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_style_text_l
    - 正面样式文本输出代表了已处理并准备影响内容生成的最终样式偏好。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_style_text_l
    - 此输出包含处理后的负面样式文本，指示应在生成内容中避免的风格元素。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - 宽度参数指示生成内容的宽度，这对于保持所需的纵横比和视觉呈现至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数指定生成内容的高度，与宽度配合使用，以确保适当的显示和纵横比。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_width
    - 细化器宽度输出决定了细化过程的宽度，这对于生成内容的最终质量很重要。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_height
    - 此输出指定细化过程的高度，确保生成的内容细节适当且与所需的规格相符。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class PromptWithSDXL:

    @classmethod
    def INPUT_TYPES(s):
        (s.ratio_sizes, s.ratio_dict) = read_ratios()
        return {'required': {'positive_prompt': ('STRING', {'multiline': True, 'default': 'Positive Prompt'}), 'negative_prompt': ('STRING', {'multiline': True, 'default': 'Negative Prompt'}), 'positive_style': ('STRING', {'multiline': True, 'default': 'Positive Style'}), 'negative_style': ('STRING', {'multiline': True, 'default': 'Negative Style'}), 'ratio_selected': (s.ratio_sizes,), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('LATENT', 'STRING', 'STRING', 'STRING', 'STRING', 'INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('samples', 'positive_prompt_text_g', 'negative_prompt_text_g', 'positive_style_text_l', 'negative_style_text_l', 'width', 'height', 'refiner_width', 'refiner_height')
    FUNCTION = 'start'
    CATEGORY = 'Mikey'
    OUTPUT_NODE = True

    def start(self, positive_prompt, negative_prompt, positive_style, negative_style, ratio_selected, batch_size, seed, prompt=None, extra_pnginfo=None):
        positive_prompt = search_and_replace(positive_prompt, extra_pnginfo, prompt)
        negative_prompt = search_and_replace(negative_prompt, extra_pnginfo, prompt)
        positive_prompt = process_random_syntax(positive_prompt, seed)
        negative_prompt = process_random_syntax(negative_prompt, seed)
        positive_prompt = find_and_replace_wildcards(positive_prompt, seed)
        negative_prompt = find_and_replace_wildcards(negative_prompt, seed)
        width = self.ratio_dict[ratio_selected]['width']
        height = self.ratio_dict[ratio_selected]['height']
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
        ratio = min([width, height]) / max([width, height])
        (target_width, target_height) = (4096, 4096 * ratio // 8 * 8) if width > height else (4096 * ratio // 8 * 8, 4096)
        refiner_width = target_width
        refiner_height = target_height
        return ({'samples': latent}, str(positive_prompt), str(negative_prompt), str(positive_style), str(negative_style), width, height, refiner_width, refiner_height)
```