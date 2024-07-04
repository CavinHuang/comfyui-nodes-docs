
# Documentation
- Class name: Show any to JSON [Crystools]
- Category: crystools 🪛/Debugger
- Output node: True
- Repo Ref: https://github.com/crystian/ComfyUI-Crystools

这个节点旨在将任何给定的值转换为JSON字符串（如果可能的话）并显示出来。它主要专注于处理包含字典或其他列表的列表，目标是将它们序列化为可读的JSON格式，以便进行调试或检查。

# Input types
## Optional
- any_value
    - 'any_value'参数接受任何数据类型，包括列表、字典或基本类型。它用于尝试将数据结构序列化为JSON格式，有助于数据结构的可视化或调试。
    - Comfy dtype: *
    - Python dtype: any

# Output types
- string
    - 返回序列化后的JSON字符串，如果序列化失败则返回错误消息。
    - Comfy dtype: STRING
    - Python dtype: str
- ui
    - 'ui'输出参数提供一个用户界面元素，显示序列化后的JSON字符串，如果序列化失败则显示错误消息。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CConsoleAnyToJson:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
            "optional": {
                "any_value": (any,),
            },
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.DEBUGGER.value
    INPUT_IS_LIST = True

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("string",)
    OUTPUT_NODE = True

    FUNCTION = "execute"

    def execute(self, any_value=None):
        text = TEXTS.INACTIVE_MSG.value

        if any_value is not None and isinstance(any_value, list):
            item = any_value[0]

            if isinstance(item, dict):
                try:
                    text = json.dumps(item, indent=CONFIG["indent"])
                except Exception as e:
                    text = "The input is a dict, but could not be serialized.\n"
                    logger.warn(e)

            elif isinstance(item, list):
                try:
                    text = json.dumps(item, indent=CONFIG["indent"])
                except Exception as e:
                    text = "The input is a list, but could not be serialized.\n"
                    logger.warn(e)

            else:
                text = str(item)

        logger.debug(f"Show any-json to console is running...")

        return {"ui": {"text": [text]}, "result": (text,)}

```
