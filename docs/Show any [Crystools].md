
# Documentation
- Class name: Show any [Crystools]
- Category: crystools 🪛/Debugger
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点设计用于调试目的，允许在控制台或显示界面上可视化任何值。它支持广泛的数据类型，使其在开发过程中检查值时非常versatile（多功能）。

# Input types
## Optional
- any_value
    - 要显示的值。它可以是任何数据类型，这使得该节点在调试过程中具有高度的versatility（多功能性）。
    - Comfy dtype: *
    - Python dtype: Any
- console
    - 决定是否将值打印到控制台。它通过允许直接观察值来增强调试能力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- display
    - 控制是否在UI上显示该值，便于用户交互和数据可视化。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- prefix
    - 一个可选的前缀，在将值打印到控制台时添加在值之前，有助于区分不同的调试输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- ui
    - 提供一个显示该值的UI元素，通过直接在界面上可视化数据来增强调试体验。
    - Comfy dtype: UI


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
