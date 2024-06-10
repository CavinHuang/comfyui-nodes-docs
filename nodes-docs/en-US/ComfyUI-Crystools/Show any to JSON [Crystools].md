---
tags:
- Debugging
---

# 🪛 Show any to JSON
## Documentation
- Class name: `Show any to JSON [Crystools]`
- Category: `crystools 🪛/Debugger`
- Output node: `True`

This node is designed to convert any given value into a JSON string, if possible, and display it. It primarily focuses on handling lists containing dictionaries or other lists, aiming to serialize them into a readable JSON format for debugging or inspection purposes.
## Input types
### Required
### Optional
- **`any_value`**
    - The 'any_value' parameter accepts any data type, including lists, dictionaries, or primitive types. It is used to attempt serialization into JSON format, aiding in the visualization or debugging of data structures.
    - Comfy dtype: `*`
    - Python dtype: `any`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Returns the serialized JSON string or an error message if serialization fails.
    - Python dtype: `str`
- **`ui`**
    - The 'ui' output parameter provides a user interface element displaying the serialized JSON string or an error message if serialization fails.
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
