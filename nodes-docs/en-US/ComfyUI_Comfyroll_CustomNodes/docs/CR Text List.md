---
tags:
- List
- MultilineText
- Text
---

# 📜 CR Text List
## Documentation
- Class name: `CR Text List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List`
- Output node: `False`

This node is designed to transform a multiline text input into a list of strings, each representing a line of text, starting from a specified index and up to a maximum number of rows. It also provides a link to further help or documentation related to its functionality.
## Input types
### Required
- **`multiline_text`**
    - The multiline text to be split into a list. This input allows for the dynamic creation of lists based on textual content, enabling flexible list manipulation and processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_index`**
    - Specifies the starting index from which to begin extracting lines from the multiline text. This allows for selective list creation, enhancing the node's versatility in handling text data.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_rows`**
    - Defines the maximum number of rows to include in the output list, allowing for control over the list's size and content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The output is a list of strings derived from the input multiline text, segmented according to the specified start index and maximum rows.
    - Python dtype: `List[str]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to further help or documentation, aiding users in understanding and utilizing the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_TextList:

    @classmethod
    def INPUT_TYPES(s):
    
        return {"required": {"multiline_text": ("STRING", {"multiline": True, "default": "text"}),
                             "start_index": ("INT", {"default": 0, "min": 0, "max": 9999}),
                             "max_rows": ("INT", {"default": 1000, "min": 1, "max": 9999}),
                            }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = "make_list"
    CATEGORY = icons.get("Comfyroll/List")

    def make_list(self, multiline_text, start_index, max_rows, loops):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-text-list"

        lines = multiline_text.split('\n')

        # Ensure start_index is within the bounds of the list
        start_index = max(0, min(start_index, len(lines) - 1))

        # Calculate the end index based on max_rows
        end_index = min(start_index + max_rows, len(lines))

        # Extract the desired portion of the list
        selected_rows = lines[start_index:end_index]
          
        return (selected_rows, show_help, )

```
