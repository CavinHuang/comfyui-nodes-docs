# Documentation
- Class name: WildcardOobaPrompt
- Category: Mikey/AI
- Output node: True
- Repo Ref: https://github.com/bash-j/mikey_nodes

WildcardOobaPrompt节点的'process'方法旨在为AI应用动态生成和处理提示。它替换输入提示中的通配符为随机选择，并与外部API集成以生成详细的响应。该节点在创建多样化和情境丰富的AI模型提示中发挥关键作用，增强了它们产生细腻输出的能力。

# Input types
## Required
- input_prompt
    - ‘input_prompt’参数是一个包含提示初始文本的字符串。它至关重要，因为它构成了通配符替换和AI后续处理的基础。此参数直接影响节点生成的最终输出的多样性和创造性。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - ‘seed’参数是一个用于初始化通配符替换过程中的随机数生成器的整数。它确保结果是可复现的，这对于调试和一致性测试节点的功能至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- unique_id
    - ‘unique_id’参数是一个用于引用提示中特定条目的唯一标识符。当管理多个并发提示时，它尤其重要，因为它允许节点精确地定位和更新所需的提示。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- text
    - 'text'输出参数代表了所有通配符被替换并且AI的响应被整合后最终处理的提示。它是一个关键的输出，因为它直接输入到AI模型中，影响生成内容的质量和特性。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WildcardOobaPrompt:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_prompt': ('STRING', {'multiline': True, 'default': 'Prompt Text Here', 'dynamicPrompts': False}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text',)
    FUNCTION = 'process'
    OUTPUT_NODE = True
    CATEGORY = 'Mikey/AI'

    def process(self, input_prompt, seed, prompt=None, unique_id=None, extra_pnginfo=None):
        input_prompt = search_and_replace(input_prompt, extra_pnginfo, prompt)
        wc_re = re.compile('{([^}]+)}')

        def repl(m):
            return random.choice(m.group(1).split('|'))
        for m in wc_re.finditer(input_prompt):
            input_prompt = input_prompt.replace(m.group(0), repl(m))
        input_prompt = find_and_replace_wildcards(input_prompt, seed, debug=True)
        llm_re = re.compile('<llm:(.*?):(.*?)>')
        for m in llm_re.finditer(input_prompt):
            mode = m.group(1)
            if '.json' in mode:
                custom_history = mode
                mode = 'custom'
            else:
                custom_history = None
            prompt_text = m.group(2)
            ooba = OobaPrompt()
            result = ooba.api_request(prompt_text, seed, mode, custom_history)
            input_prompt = input_prompt.replace(m.group(0), result)
        prompt.get(str(unique_id))['inputs']['output_text'] = input_prompt
        return (input_prompt,)
```