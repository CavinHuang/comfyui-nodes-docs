# Documentation
- Class name: WildcardAndLoraSyntaxProcessor
- Category: Mikey/Lora
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

WildcardAndLoraSyntaxProcessor节点旨在处理和加工复杂的文本输入，通过将通配符和Lora语法替换为特定值或文件。它通过使能基于预定义模式和外部文件的动态内容生成，增强了文本处理工作流的灵活性和定制性。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它代表了节点将用于处理的核心模型。这是一个必需的输入，直接影响节点正常工作的能力。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数是一个必需的输入，它与模型参数协同工作。它通过提供模型可能需要的额外上下文或数据，在节点的执行中发挥重要作用。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model instance
- text
    - 文本参数是节点的关键输入，因为它包含将被处理的原始文本。它可以包含用于通配符和Lora引用的特殊语法，节点将相应地解释并替换它们。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 种子参数对节点的随机化过程很重要。它确保文本中的随机元素以可重现的方式生成，这对于不同运行之间获得一致的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- extra_pnginfo
    - extra_pnginfo参数虽然是可选的，但可以提供用于进一步定制节点行为的额外信息。它可以包含元数据或其他相关数据，以增强节点的处理能力。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str or dict
- prompt
    - 提示参数是一个可选输入，它可以通过提供特定指令或上下文来指导节点的处理。当处理复杂文本输入时，它可以用来影响节点的决策过程。
    - Comfy dtype: PROMPT
    - Python dtype: str or dict

# Output types
- model
    - 节点的模型输出代表了已处理的模型，该模型已根据节点的操作进行了更新或修改。它标志着节点文本处理的完成，并已准备好用于进一步使用或分析。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip输出是输入clip的处理版本，反映了节点执行期间所做的任何更改。这是一个重要的结果，可能会在工作流的后续阶段中使用。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model instance
- text
    - 文本输出是所有通配符和Lora语法被替换后的最终处理文本。它代表了节点的主要输出，是节点核心功能的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- unprocessed_text
    - 未处理的文本输出提供了节点的原始文本输入，未经节点操作的任何修改。它用作比较或进一步分析的参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WildcardAndLoraSyntaxProcessor:

    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'text': ('STRING', {'multiline': True, 'default': '<lora:filename:weight>'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'STRING', 'STRING')
    RETURN_NAMES = ('model', 'clip', 'text', 'unprocessed_text')
    FUNCTION = 'process'
    CATEGORY = 'Mikey/Lora'

    def extract_and_load_loras(self, text, model, clip):
        lora_re = '<lora:(.*?)(?::(.*?))?>'
        lora_prompts = re.findall(lora_re, text)
        stripped_text = text
        clip_lora = clip
        if len(lora_prompts) > 0:
            for lora_prompt in lora_prompts:
                lora_filename = lora_prompt[0]
                if '.safetensors' not in lora_filename:
                    lora_filename += '.safetensors'
                try:
                    lora_multiplier = float(lora_prompt[1]) if lora_prompt[1] != '' else 1.0
                except:
                    lora_multiplier = 1.0
                (model, clip) = load_lora(model, clip, lora_filename, lora_multiplier, lora_multiplier)
        stripped_text = re.sub(lora_re, '', stripped_text)
        return (model, clip, stripped_text)

    def process(self, model, clip, text, seed, extra_pnginfo=None, prompt=None):
        text = search_and_replace(text, extra_pnginfo, prompt)
        text = process_random_syntax(text, seed)
        text_ = find_and_replace_wildcards(text, seed, True)
        if len(text_) != len(text):
            seed = random.randint(0, 1000000)
        else:
            seed = 1
        (model, clip, stripped_text) = self.extract_and_load_loras(text_, model, clip)
        stripped_text = find_and_replace_wildcards(stripped_text, seed, True)
        return (model, clip, stripped_text, text_)
```