# Documentation
- Class name: wildcardsPrompt
- Category: EasyUse/Prompt
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点类旨在通过替换选项和通配符来处理和修改文本输入，增强文本的多功能性和互动性。它通过识别输入中的模式和关键词，并将它们替换为预定义字典中的相应元素或通过随机选择来实现，从而生成修改后的输出文本。

# Input types
## Required
- text
    - 文本参数对于节点的操作至关重要，因为它提供了将要处理的原始内容。它是所有替换和修改的基础，对于实现节点的目的来说是一个关键的输入。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- seed
    - 种子参数在节点内部的随机化过程中引入了可重现性。通过设置特定的种子，可以控制选项和通配符替换中的随机性，确保在不同运行中获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- text
    - 输出文本是节点处理的结果，其中原始输入文本已经被替换和增强。它代表了节点功能的结晶，展示了转换后的内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class wildcardsPrompt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        wildcard_list = get_wildcard_list()
        return {'required': {'text': ('STRING', {'default': '', 'multiline': True, 'dynamicPrompts': False, 'placeholder': '(Support Lora Block Weight and wildcard)'}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'] + wildcard_list,), 'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM}), 'multiline_mode': ('BOOLEAN', {'default': False})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('text', 'populated_text')
    OUTPUT_IS_LIST = (True, True)
    OUTPUT_NODE = True
    FUNCTION = 'main'
    CATEGORY = 'EasyUse/Prompt'

    @staticmethod
    def main(*args, **kwargs):
        prompt = kwargs['prompt'] if 'prompt' in kwargs else None
        seed = kwargs['seed']
        if prompt:
            easyCache.update_loaded_objects(prompt)
        text = kwargs['text']
        if 'multiline_mode' in kwargs and kwargs['multiline_mode']:
            populated_text = []
            text = text.split('\n')
            for t in text:
                populated_text.append(process(t, seed))
        else:
            populated_text = [process(text, seed)]
            text = [text]
        return {'ui': {'value': [seed]}, 'result': (text, populated_text)}
```