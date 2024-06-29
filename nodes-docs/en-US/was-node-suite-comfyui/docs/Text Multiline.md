---
tags:
- List
- MultilineText
- Text
---

# Text Multiline
## Documentation
- Class name: `Text Multiline`
- Category: `WAS Suite/Text`
- Output node: `False`

The Text Multiline node is designed to process multiline text inputs, removing lines that start with a hash '#' (commonly used for comments) and concatenating the remaining lines into a single string. This node aims to clean and prepare text data by eliminating unwanted lines and comments, making it suitable for further text processing or analysis.
## Input types
### Required
- **`text`**
    - The 'text' parameter takes a multiline string input, which is then processed to remove lines starting with '#' and concatenate the remaining text. This preprocessing step is crucial for cleaning the input text, making it ready for further analysis or processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is a single string that has been cleaned of lines starting with '#', with all remaining lines concatenated together. This cleaned text is ready for further processing or analysis.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Text to Conditioning](../../was-node-suite-comfyui/Nodes/Text to Conditioning.md)
    - [CLIPTextEncodeSDXL](../../Comfy/Nodes/CLIPTextEncodeSDXL.md)
    - [Text Concatenate](../../was-node-suite-comfyui/Nodes/Text Concatenate.md)
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)
    - BNK_CutoffBasePrompt
    - [Text Random Line](../../was-node-suite-comfyui/Nodes/Text Random Line.md)



## Source code
```python
class WAS_Text_Multiline:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": '', "multiline": True}),
            }
        }
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "text_multiline"

    CATEGORY = "WAS Suite/Text"

    def text_multiline(self, text):
        import io
        new_text = []
        for line in io.StringIO(text):
            if not line.strip().startswith('#'):
                if not line.strip().startswith("\n"):
                    line = line.replace("\n", '')
                new_text.append(line)
        new_text = "\n".join(new_text)

        tokens = TextTokens()
        new_text = tokens.parseTokens(new_text)

        return (new_text, )

```
