---
tags:
- Debugging
---

# 🪛 Show any value to console/display
## Documentation
- Class name: `Show any [Crystools]`
- Category: `crystools 🪛/Debugger`
- Output node: `True`

This node is designed for debugging purposes, allowing the visualization of any value in the console or display. It supports a wide range of data types, making it versatile for inspecting values during development.
## Input types
### Required
### Optional
- **`any_value`**
    - The value to be shown. It can be of any data type, making this node highly versatile for debugging purposes.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`console`**
    - Determines if the value should be printed to the console. It enhances debugging by allowing direct observation of values.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`display`**
    - Controls whether the value is displayed on the UI, facilitating user interaction and visualization of data.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`prefix`**
    - An optional prefix to be added before the value when printed to the console, aiding in distinguishing between different debug outputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`ui`**
    - Provides a UI element displaying the value, enhancing the debugging experience by visualizing data directly in the interface.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CConsoleAny:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
            },
            "optional": {
                "any_value": (any,),
                "console": BOOLEAN_FALSE,
                "display": BOOLEAN,
                KEYS.PREFIX.value: STRING,
            },
            "hidden": {
                # "unique_id": "UNIQUE_ID",
                # "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.DEBUGGER.value
    INPUT_IS_LIST = True

    RETURN_TYPES = ()
    OUTPUT_NODE = True

    FUNCTION = "execute"

    def execute(self, any_value=None, console=False, display=True, prefix=None):
        console = console[0]
        display = display[0]
        prefix = prefix[0]
        text = ""
        textToDisplay = TEXTS.INACTIVE_MSG.value

        if any_value is not None:
            try:
                if type(any_value) == list:
                    for item in any_value:
                        try:
                            text += str(item)
                        except Exception as e:
                            text += "source exists, but could not be serialized.\n"
                            logger.warn(e)
                else:
                    logger.warn("any_value is not a list")

            except Exception:
                try:
                    text = json.dumps(any_value)[1:-1]
                except Exception:
                    text = 'source exists, but could not be serialized.'

        logger.debug(f"Show any to console is running...")

        if console:
            if prefix is not None and prefix != "":
                print(f"{prefix}: {text}")
            else:
                print(text)

        if display:
            textToDisplay = text

        value = [console, display, prefix, textToDisplay]
        # setWidgetValues(value, unique_id, extra_pnginfo)

        return {"ui": {"text": value}}

```
