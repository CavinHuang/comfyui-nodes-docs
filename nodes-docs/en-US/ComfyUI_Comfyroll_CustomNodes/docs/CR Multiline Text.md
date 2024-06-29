---
tags:
- List
- MultilineText
- Text
---

# 🔤 CR Multiline Text
## Documentation
- Class name: `CR Multiline Text`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔤 Text`
- Output node: `False`

This node is designed to process and manipulate multiline text, allowing for operations such as removing specific characters, splitting strings, and converting from CSV format. It aims to provide versatile text processing capabilities tailored to multiline inputs.
## Input types
### Required
- **`text`**
    - The primary text input that will be processed. This is the multiline text that operations such as character removal, string splitting, and CSV conversion will be applied to.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`convert_from_csv`**
    - A boolean flag that, when set to True, treats the input text as CSV data and processes it accordingly.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`csv_quote_char`**
    - Specifies the quote character used in the CSV data. This is relevant only when the convert_from_csv option is enabled.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`remove_chars`**
    - A boolean flag that, when set to True, triggers the removal of specified characters from the input text.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`chars_to_remove`**
    - Specifies the characters to be removed from the input text. This parameter is used when the remove_chars option is enabled.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`split_string`**
    - A boolean flag that, when set to True, splits the input text into a list of strings.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`multiline_text`**
    - Comfy dtype: `*`
    - The processed text after applying the specified operations.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing more information about the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Reroute
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



## Source code
```python
class CR_MultilineText:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": '', "multiline": True}),
                "convert_from_csv": ("BOOLEAN", {"default": False}),
                "csv_quote_char": ("STRING", {"default": "'", "choices": ["'", '"']}),
                "remove_chars": ("BOOLEAN", {"default": False}),
                "chars_to_remove": ("STRING", {"multiline": False, "default": ""}),
                "split_string": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = (any_type, "STRING", )
    RETURN_NAMES = ("multiline_text", "show_help", )
    FUNCTION = "text_multiline"
    CATEGORY = icons.get("Comfyroll/Utils/Text")

    def text_multiline(self, text, chars_to_remove, split_string=False, remove_chars=False, convert_from_csv=False, csv_quote_char="'"):
    
        new_text = []

        # Remove trailing commas
        text = text.rstrip(',')

        if convert_from_csv:
            # Convert CSV to multiline text
            csv_reader = csv.reader(io.StringIO(text), quotechar=csv_quote_char)
            for row in csv_reader:
                new_text.extend(row)       
        if split_string: 
            if text.startswith("'") and text.endswith("'"):
                text = text[1:-1]  # Remove outer single quotes
                values = [value.strip() for value in text.split("', '")]
                new_text.extend(values)
            elif text.startswith('"') and text.endswith('"'):
                    text = text[1:-1]  # Remove outer single quotes
                    values = [value.strip() for value in text.split('", "')]
                    new_text.extend(values)   
            elif ',' in text and text.count("'") % 2 == 0:
                # Assume it's a list-like string and split accordingly
                text = text.replace("'", '')  # Remove single quotes
                values = [value.strip() for value in text.split(",")]
                new_text.extend(values)
            elif ',' in text and text.count('"') % 2 == 0:
                    # Assume it's a list-like string and split accordingly
                    text = text.replace('"', '')  # Remove single quotes
                    values = [value.strip() for value in text.split(",")]
                    new_text.extend(values)                 
        if convert_from_csv == False and split_string == False:
            # Process multiline text
            for line in io.StringIO(text):    
                if not line.strip().startswith('#'):
                    if not line.strip().startswith("\n"):
                        line = line.replace("\n", '')
                    if remove_chars:
                        # Remove quotes from each line
                        line = line.replace(chars_to_remove, '')
                    new_text.append(line)                

        new_text = "\n".join(new_text)
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-multiline-text"

        return (new_text, show_help,)

```
