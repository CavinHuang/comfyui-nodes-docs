---
tags:
- Cache
---

# Show Cached Info (Inspire)
## Documentation
- Class name: `ShowCachedInfo __Inspire`
- Category: `InspirePack/Backend`
- Output node: `True`

The ShowCachedInfo node in the Inspire pack is designed to display cached information related to backend operations. It serves as a utility for retrieving and presenting cache-related data, aiding in the management and debugging of cached content within the system.
## Input types
### Required
- **`cache_info`**
    - Specifies the cache information to be displayed. It plays a crucial role in determining what cached data is retrieved and shown, impacting the node's output and utility.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`key`**
    - Identifies the specific cache key whose information is to be displayed. This parameter is essential for pinpointing the exact cache entry to be examined.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
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
