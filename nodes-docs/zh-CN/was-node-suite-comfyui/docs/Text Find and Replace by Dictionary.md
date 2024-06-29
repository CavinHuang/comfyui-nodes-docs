# Documentation
- Class name: WAS_Search_and_Replace_Dictionary
- Category: WAS Suite/Text/Search
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

该节点旨在使用提供的字典对给定文本执行搜索和替换操作。它智能地将字典键的出现的文本替换为相应的值，确保以受控的方式进行替换，以避免覆盖不希望替换的文本段。

# Input types
## Required
- text
    - 将执行搜索和替换操作的输入文本。这是节点将处理的主要数据，以实现预期的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- dictionary
    - 一个字典，其中键是文本中要搜索的术语，值是将替换键的术语。它在确定节点输出中起着关键作用。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, str]
## Optional
- replacement_key
    - 一个字符串，用于在文本中搜索之前包装字典中的键。它有助于防止文本中发生意外的替换。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 用于随机数生成器的种子，以控制替换过程的随机性。它确保了可重复性，以获得确定性结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- new_text
    - 应用搜索和替换操作后的生成文本。它反映了根据输入字典和参数所做的更改。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Search_and_Replace_Dictionary:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'dictionary': ('DICT',), 'replacement_key': ('STRING', {'default': '__', 'multiline': False}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'text_search_and_replace_dict'
    CATEGORY = 'WAS Suite/Text/Search'

    def text_search_and_replace_dict(self, text, dictionary, replacement_key, seed):
        random.seed(seed)
        new_text = text
        for term in dictionary.keys():
            tkey = f'{replacement_key}{term}{replacement_key}'
            tcount = new_text.count(tkey)
            for _ in range(tcount):
                new_text = new_text.replace(tkey, random.choice(dictionary[term]), 1)
                if seed > 0 or seed < 0:
                    seed = seed + 1
                    random.seed(seed)
        return (new_text,)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```