
# Documentation
- Class name: ShowCachedInfo __Inspire
- Category: InspirePack/Backend
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ShowCachedInfo节点是Inspire包的一部分，专门用于显示与后端操作相关的缓存信息。该节点作为一个实用工具，可以检索和展示缓存相关的数据，有助于系统内缓存内容的管理和调试。

# Input types
## Required
- cache_info
    - 指定要显示的缓存信息。这个参数在确定检索和显示哪些缓存数据方面起着关键作用，直接影响节点的输出和实用性。
    - Comfy dtype: STRING
    - Python dtype: str
- key
    - 标识要显示信息的特定缓存键。这个参数对于精确定位要检查的缓存条目至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
该节点没有输出类型。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ShowCachedInfo:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "cache_info": ("STRING", {"multiline": True, "default": ""}),
                "key": ("STRING", {"multiline": False, "default": ""}),
            },
            "hidden": {"unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ()

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Backend"

    OUTPUT_NODE = True

    @staticmethod
    def get_data():
        global cache

        text1 = "---- [String Key Caches] ----\n"
        text2 = "---- [Number Key Caches] ----\n"
        for k, v in cache.items():
            tag = 'N/A(tag)' if v[0] == '' else v[0]
            if isinstance(k, str):
                text1 += f'{k}: {tag}\n'
            else:
                text2 += f'{k}: {tag}\n'

        text3 = "---- [TagCache Settings] ----\n"
        for k, v in cache._tag_settings.items():
            text3 += f'{k}: {v}\n'

        for k, v in cache._data.items():
            if k not in cache._tag_settings:
                text3 += f'{k}: {v.maxsize}\n'

        return f'{text1}\n{text2}\n{text3}'

    @staticmethod
    def set_cache_settings(data: str):
        global cache
        settings = data.split("---- [TagCache Settings] ----\n")[-1].strip().split("\n")

        new_tag_settings = {}
        for s in settings:
            k, v = s.split(":")
            new_tag_settings[k] = int(v.strip())
        if new_tag_settings == cache._tag_settings:
            # tag settings is not changed
            return

        # print(f'set to {new_tag_settings}')
        new_cache = TaggedCache(new_tag_settings)
        for k, v in cache.items():
            new_cache[k] = v
        cache = new_cache

    def doit(self, cache_info, key, unique_id):
        text = ShowCachedInfo.get_data()
        PromptServer.instance.send_sync("inspire-node-feedback", {"node_id": unique_id, "widget_name": "cache_info", "type": "text", "data": text})

        return {}

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
