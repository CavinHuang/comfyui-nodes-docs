# Documentation
- Class name: ShowCachedInfo
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在展示缓存信息，通过将缓存内容按字符串和数字键分类，提供清晰有序的视图。

# Input types
## Required
- cache_info
    - cache_info参数是缓存的文本表示，节点将对其进行格式化和展示。这对节点的运行至关重要，因为它决定了展示给用户的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- unique_id
    - unique_id参数在系统内唯一标识节点实例，确保为预期的用户显示正确的缓存信息。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
## Optional
- key
    - key参数用于根据特定键过滤缓存信息。它的重要性在于允许用户专注于特定的缓存条目。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- feedback
    - feedback参数包含有关节点操作和显示的缓存数据的信息。它的重要性在于提供了节点执行的记录。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class ShowCachedInfo:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'cache_info': ('STRING', {'multiline': True, 'default': ''}), 'key': ('STRING', {'multiline': False, 'default': ''})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ()
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Backend'
    OUTPUT_NODE = True

    @staticmethod
    def get_data():
        global cache
        text1 = '---- [String Key Caches] ----\n'
        text2 = '---- [Number Key Caches] ----\n'
        for (k, v) in cache.items():
            if v[0] == '':
                tag = 'N/A(tag)'
            else:
                tag = v[0]
            if isinstance(k, str):
                text1 += f'{k}: {tag}\n'
            else:
                text2 += f'{k}: {tag}\n'
        return text1 + '\n' + text2

    def doit(self, cache_info, key, unique_id):
        text = ShowCachedInfo.get_data()
        PromptServer.instance.send_sync('inspire-node-feedback', {'node_id': unique_id, 'widget_name': 'cache_info', 'type': 'text', 'data': text})
        return {}

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```