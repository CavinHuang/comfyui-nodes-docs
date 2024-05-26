# Documentation
- Class name: CreateLoraNames
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点简化了从给定文本中提取和组织名称的过程，特别适用于处理Lora字体名称列表。它简化了输入文本，去除了任何多余的字符或空行，并将名称与其文件扩展名分离，提供了一个清洁的名称列表和提示，以供进一步使用。

# Input types
## Required
- lora_names
    - 包含Lora字体名称的输入文本，预期以多行格式存在，以便使用。该参数至关重要，因为它是节点操作的主要数据源。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- lora_names
    - 经过清理和处理的Lora字体名称列表，不包含任何多余的字符或空行，准备供进一步处理或使用。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- prompt
    - 从Lora字体名称中派生出的提示列表，去除了文件扩展名，适用于生成创意或主题内容。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class CreateLoraNames:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'lora_names': ('STRING', {'multiline': True, 'default': '\n'.join(folder_paths.get_filename_list('loras')), 'dynamicPrompts': False})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('lora_names', 'prompt')
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (True, True)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'

    def run(self, lora_names):
        lora_names = lora_names.split('\n')
        lora_names = [name for name in lora_names if name.strip()]
        prompts = [os.path.splitext(n)[0] for n in lora_names]
        return (lora_names, prompts)
```