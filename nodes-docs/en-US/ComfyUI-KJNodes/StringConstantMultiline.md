---
tags:
- List
- MultilineText
- Text
---

# StringConstantMultiline
## Documentation
- Class name: `StringConstantMultiline`
- Category: `KJNodes/constants`
- Output node: `False`

The StringConstantMultiline node is designed for handling multiline string inputs, allowing for the manipulation of text by optionally stripping newline characters. This node facilitates the processing of text data that spans multiple lines, making it suitable for applications requiring text normalization or preprocessing.
## Input types
### Required
- **`string`**
    - The 'string' parameter accepts a multiline string input, serving as the primary text data for processing. It enables the node to perform operations such as newline stripping based on the provided text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`strip_newlines`**
    - The 'strip_newlines' parameter determines whether newline characters in the input text should be removed, allowing for flexible text manipulation based on the user's needs.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - Outputs the processed string, which may have newline characters removed based on the 'strip_newlines' parameter, making it suitable for further text-based operations or analyses.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StringConstantMultiline:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "string": ("STRING", {"default": "", "multiline": True}),
                "strip_newlines": ("BOOLEAN", {"default": True}),
            }
        }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "stringify"
    CATEGORY = "KJNodes/constants"

    def stringify(self, string, strip_newlines):
        new_string = []
        for line in io.StringIO(string):
            if not line.strip().startswith("\n") and strip_newlines:
                line = line.replace("\n", '')
            new_string.append(line)
        new_string = "\n".join(new_string)

        return (new_string, )

```
