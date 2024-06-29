---
tags:
- String
- Text
---

# String Selector
## Documentation
- Class name: `ImpactStringSelector`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactStringSelector node is designed to select a specific string or a set of strings from a given multiline string input based on user-defined criteria. It allows for the extraction of meaningful data or segments from larger text blocks, facilitating text manipulation and processing tasks within a workflow.
## Input types
### Required
- **`strings`**
    - A multiline string from which specific strings or segments are to be selected. This parameter is crucial for defining the source text for selection.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`multiline`**
    - A boolean flag indicating whether the selection should consider each line as a separate entity or treat the entire input as a single string. This affects how the selection is made.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`select`**
    - An integer specifying the index of the string or line to be selected from the input. This determines which part of the input is extracted and returned.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The selected string or line based on the specified index and criteria. This output is the result of the selection process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringSelector:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "strings": ("STRING", {"multiline": True}),
            "multiline": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
            "select": ("INT", {"min": 0, "max": sys.maxsize, "step": 1, "default": 0}),
        }}

    RETURN_TYPES = ("STRING",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, strings, multiline, select):
        lines = strings.split('\n')

        if multiline:
            result = []
            current_string = ""

            for line in lines:
                if line.startswith("#"):
                    if current_string:
                        result.append(current_string.strip())
                        current_string = ""
                current_string += line + "\n"

            if current_string:
                result.append(current_string.strip())

            if len(result) == 0:
                selected = strings
            else:
                selected = result[select % len(result)]

            if selected.startswith('#'):
                selected = selected[1:]
        else:
            if len(lines) == 0:
                selected = strings
            else:
                selected = lines[select % len(lines)]

        return (selected, )

```
