---
tags:
- Debugging
---

# Dictionary to Console
## Documentation
- Class name: `Dictionary to Console`
- Category: `WAS Suite/Debug`
- Output node: `True`

This node is designed for debugging purposes, allowing the user to print a dictionary to the console with an optional label for easier identification. It emphasizes the utility of visually inspecting dictionary contents directly within the console, facilitating the debugging and development process.
## Input types
### Required
- **`dictionary`**
    - The dictionary to be printed to the console. It is essential for visual inspection and debugging purposes.
    - Comfy dtype: `DICT`
    - Python dtype: `dict`
- **`label`**
    - An optional label to precede the dictionary output in the console, enhancing readability and identification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`dict`**
    - Comfy dtype: `DICT`
    - Returns the same dictionary that was input, allowing for further use in the node chain without alteration.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Dictionary_To_Console:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "dictionary": ("DICT",),
                "label": ("STRING", {"default": f'Dictionary Output', "multiline": False}),
            }
        }

    RETURN_TYPES = ("DICT",)
    OUTPUT_NODE = True
    FUNCTION = "text_to_console"

    CATEGORY = "WAS Suite/Debug"

    def text_to_console(self, dictionary, label):
        if label.strip() != '':
            print(f'\033[34mWAS Node Suite \033[33m{label}\033[0m:\n')
            from pprint import pprint
            pprint(dictionary, indent=4)
            print('')
        else:
            cstr(f"\033[33mText to Console\033[0m:\n")
            pprint(dictionary, indent=4)
            print('')
        return (dictionary, )

```
