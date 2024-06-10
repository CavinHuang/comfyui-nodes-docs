---
tags:
- Text
- TextReplacement
---

# Text Parse A1111 Embeddings
## Documentation
- Class name: `Text Parse A1111 Embeddings`
- Category: `WAS Suite/Text/Parse`
- Output node: `False`

This node is designed to parse and replace specific text patterns with corresponding embeddings names, facilitating the integration of pre-defined embeddings into text inputs. It scans the text for known embeddings identifiers and substitutes them with a standardized format, enhancing the text's compatibility with further processing steps that utilize these embeddings.
## Input types
### Required
- **`text`**
    - The input text to be scanned for known embeddings patterns. This parameter is crucial as it determines the content that will be processed and potentially transformed by replacing identified patterns with their corresponding embeddings names.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The processed text with specific patterns replaced by their corresponding embeddings names, ready for further processing or analysis.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Parse_Embeddings_By_Name:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "text_parse_embeddings"

    CATEGORY = "WAS Suite/Text/Parse"

    def text_parse_embeddings(self, text):
        return (self.convert_a1111_embeddings(text), )

    def convert_a1111_embeddings(self, text):
        for embeddings_path in comfy_paths.folder_names_and_paths["embeddings"][0]:
            for filename in os.listdir(embeddings_path):
                basename, ext = os.path.splitext(filename)
                pattern = re.compile(r'\b{}\b'.format(re.escape(basename)))
                replacement = 'embedding:{}'.format(basename)
                text = re.sub(pattern, replacement, text)

        return text

```
