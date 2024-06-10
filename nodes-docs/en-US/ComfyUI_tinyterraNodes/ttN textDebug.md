---
tags:
- Debugging
---

# textDebug
## Documentation
- Class name: `ttN textDebug`
- Category: `ttN/text`
- Output node: `True`

The `ttN textDebug` node is designed for debugging purposes, allowing developers to inspect and display text-based input data within the development environment. It serves as a tool for verifying the content and structure of text inputs, facilitating the identification and resolution of issues in text processing workflows.
## Input types
### Required
- **`print_to_console`**
    - Determines whether the text should be printed to the console, enabling a direct way to view the text output for debugging purposes.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`console_title`**
    - Specifies the title to be displayed in the console during debugging, serving as an identifier for the debug session.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`execute`**
    - Controls when the debug action should be executed, allowing for conditional debugging based on changes or constant monitoring.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text`**
    - The text content to be debugged, providing the actual data that will be inspected and potentially displayed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - The text that was input for debugging, potentially modified or annotated based on the debug process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_textDebug:
    version = '1.0.'
    def __init__(self):
        self.num = 0

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "print_to_console": ([False, True],),
                    "console_title": ("STRING", {"default": ""}),
                    "execute": (["Always", "On Change"],),
                    "text": ("STRING", {"default": '', "multiline": True, "forceInput": True, "dynamicPrompts": True}),
                    },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                           "ttNnodeVersion": ttN_textDebug.version},
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "write"
    OUTPUT_NODE = True

    CATEGORY = "ttN/text"

    def write(self, print_to_console, console_title, execute, text, prompt, extra_pnginfo, my_unique_id):
        if execute == "Always":
            def IS_CHANGED(self):
                self.num += 1 if self.num == 0 else -1
                return self.num
            setattr(self.__class__, 'IS_CHANGED', IS_CHANGED)

        if execute == "On Change":
            if hasattr(self.__class__, 'IS_CHANGED'):
                delattr(self.__class__, 'IS_CHANGED')

        if print_to_console == True:
            if console_title != "":
                ttNl(text).t(f'textDebug[{my_unique_id}] - {CC.VIOLET}{console_title}').p()
            else:
                input_node = prompt[my_unique_id]["inputs"]["text"]

                input_from = None
                for node in extra_pnginfo["workflow"]["nodes"]:
                    if node['id'] == int(input_node[0]):
                        input_from = node['outputs'][input_node[1]].get('label')
                    
                        if input_from == None:
                            input_from = node['outputs'][input_node[1]].get('name')

                ttNl(text).t(f'textDebug[{my_unique_id}] - {CC.VIOLET}{input_from}').p()

        return {"ui": {"text": text},
                "result": (text,)}

```
