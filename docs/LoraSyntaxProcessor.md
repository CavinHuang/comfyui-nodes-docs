# Documentation
- Class name: LoraSyntaxProcessor
- Category: Mikey/Lora
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

LoraSyntaxProcessor节点旨在通过一系列语法转换来处理文本输入。它替换占位符为随机值，搜索并用提供的提示中相应的数据替换特定模式，并加载外部LoRA模型以增强基础模型的能力。该节点在基于输入参数生成动态和上下文感知的文本输出中发挥关键作用。

# Input types
## Required
- model
    - 模型参数对节点的操作至关重要，因为它代表了将被节点增强或使用的基线模型。它通过确定将进行任何后续转换或处理的模型来影响节点的执行。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数是文本处理的关键组件，特别是处理视觉和多模态数据时。它用于将文本与视觉表现对齐，并可以通过影响处理文本的上下文来影响节点的输出。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model or related object
- text
    - 文本参数是节点的主要输入，包含将进行语法处理的原始文本。它是节点操作的基础，因为整个转换过程围绕这个输入进行。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - seed参数用于初始化随机数生成器，确保在文本中生成随机值时获得可重复的结果。它在保持节点输出的一致性方面扮演着重要角色。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- extra_pnginfo
    - extra_pnginfo参数提供额外的上下文或元数据，可用于自定义文本处理。它可以通过提供可能与某些转换相关的额外信息来影响节点的执行。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: dict or str
- prompt
    - prompt参数用于指导文本处理，通过提供节点将用于替换文本中模式的具体指令或数据。它通过确定将应用于输入文本的特定转换来影响节点的执行。
    - Comfy dtype: PROMPT
    - Python dtype: dict or str

# Output types
- model
    - 模型输出代表了应用任何转换或加载额外LoRA模型后可能得到增强的模型。它标志着节点处理的完成，对于依赖更新后模型的后续任务至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip输出是输入clip的处理或增强版本，可能已经根据节点应用的转换进行了修改。它对于需要与处理过的文本对齐的更新视觉表示的任务很重要。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model or related object
- text
    - 文本输出是在应用了所有语法转换后最终处理的文本。它是节点操作的直接结果，对于需要文本信息的任何下游任务都是必不可少的。
    - Comfy dtype: STRING
    - Python dtype: str
- unprocessed_text
    - 未处理的文本输出提供了去除了任何LoRA相关语法的原始文本输入。它对于需要原始文本与处理后的文本一起用于比较或进一步分析的场景很有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class LoraSyntaxProcessor:

    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'text': ('STRING', {'multiline': True, 'default': '<lora:filename:weight>'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'STRING', 'STRING')
    RETURN_NAMES = ('model', 'clip', 'text', 'unprocessed_text')
    FUNCTION = 'process'
    CATEGORY = 'Mikey/Lora'

    def process(self, model, clip, text, seed, extra_pnginfo=None, prompt=None):
        text = process_random_syntax(text, seed)
        text = search_and_replace(text, extra_pnginfo, prompt)
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
        return (model, clip, stripped_text, text)
```