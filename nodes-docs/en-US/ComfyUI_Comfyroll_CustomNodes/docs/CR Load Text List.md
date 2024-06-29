---
tags:
- List
- Text
---

# 📜 CR Load Text List
## Documentation
- Class name: `CR Load Text List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List`
- Output node: `False`

This node is designed to load and parse text lists from files with specific extensions, such as .txt or .csv, facilitating the handling and manipulation of textual data within a workflow.
## Input types
### Required
- **`input_file_path`**
    - Specifies the path to the directory containing the target file, playing a crucial role in locating the file for data extraction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_name`**
    - The name of the file (excluding its extension) to be loaded. This parameter is essential for identifying the specific file to be processed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_extension`**
    - Defines the file extension (e.g., 'txt', 'csv') of the target file, determining the method of parsing and loading the text list.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - Returns a list of strings extracted from the specified file.
    - Python dtype: `List[str]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL offering additional help and guidance on using the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_LoadTextList:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "input_file_path": ("STRING", {"multiline": False, "default": ""}),
                        "file_name": ("STRING", {"multiline": False, "default": ""}),
                        "file_extension": (["txt", "csv"],),
                        }
        }
        
    RETURN_TYPES = ("STRING", "STRING",)
    RETURN_NAMES = ("STRING", "show_help", ) 
    OUTPUT_IS_LIST = (True, False)    
    FUNCTION = 'load_list'
    CATEGORY = icons.get("Comfyroll/List")

    def load_list(self, input_file_path, file_name, file_extension):
           
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-load-value-list"      

        filepath = input_file_path + "\\" + file_name + "." + file_extension
        print(f"CR Load Values: Loading {filepath}")

        list = []
            
        if file_extension == "csv":
            with open(filepath, "r") as csv_file:
                for row in csv_file:
                    list.append(row)
                    
        elif file_extension == "txt":
            with open(filepath, "r") as txt_file:
                for row in txt_file:
                    list.append(row)
        else:
            pass
        
        return(list, show_help, )        

```
