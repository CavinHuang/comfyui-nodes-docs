---
tags:
- ComfyrollNodes
---

# ⌨️ CR Font File List
## Documentation
- Class name: `CR Font File List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List/⌨️ IO`
- Output node: `False`

This node is designed to list TrueType font files (.ttf) from specified sources, including system fonts, Comfyroll's own font directory, or any user-specified folder. It aims to provide a convenient way to access and utilize font files for text rendering or design purposes within the Comfyroll environment.
## Input types
### Required
- **`source_folder`**
    - Specifies the source from which to list the font files. It can be the system's font directory, Comfyroll's internal font directory, or a custom folder path provided by the user. This choice dictates where the node searches for TrueType font files (.ttf).
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_index`**
    - Determines the starting index from which to begin listing the font files. This allows for pagination or selective listing of font files based on their order in the source directory.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_rows`**
    - Specifies the maximum number of font files to list. This parameter can be used to limit the number of font files returned by the node, facilitating easier management and selection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`folder_path`**
    - When the source folder is set to 'from folder', this parameter specifies the custom folder path from which to list the font files. It enables the node to access and list font files from a user-defined directory.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`LIST`**
    - Comfy dtype: `*`
    - A list of TrueType font files (.ttf) found in the specified source directory. This output can be used to select specific fonts for text rendering or design tasks within Comfyroll.
    - Python dtype: `List[str]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the documentation or help page for this node, offering additional information or guidance on its use.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_FontFileList:

    @classmethod
    def INPUT_TYPES(s):
    
        comfyroll_font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
        comfyroll_file_list = [f for f in os.listdir(comfyroll_font_dir) if os.path.isfile(os.path.join(comfyroll_font_dir, f)) and f.lower().endswith(".ttf")]

        sources = ["system", "Comfyroll", "from folder"]
        
        return {"required": {"source_folder": (sources,),
                             "start_index": ("INT", {"default": 0, "min": 0, "max": 9999}),
                             "max_rows": ("INT", {"default": 1000, "min": 1, "max": 9999}),                            
                            },
                "optional": {"folder_path": ("STRING", {"default": "C:\Windows\Fonts", "multiline": False}),
                }
        }

    RETURN_TYPES = (any_type, "STRING", )
    RETURN_NAMES = ("LIST", "show_help", )
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = "make_list"
    CATEGORY = icons.get("Comfyroll/List/IO")

    def make_list(self, source_folder, start_index, max_rows, folder_path="C:\Windows\Fonts"):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-font-file-list"

        if source_folder == "system":
            system_root = os.environ.get('SystemRoot')
            system_font_dir = os.path.join(system_root, 'Fonts')   
            file_list = [f for f in os.listdir(system_font_dir) if os.path.isfile(os.path.join(system_font_dir, f)) and f.lower().endswith(".ttf")]
        elif source_folder == "Comfyroll":
            comfyroll_font_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts")       
            file_list = [f for f in os.listdir(comfyroll_font_dir) if os.path.isfile(os.path.join(comfyroll_font_dir, f)) and f.lower().endswith(".ttf")]
        elif source_folder == "from folder":
            if folder_path != '' and folder_path is not None:
                if not os.path.exists(folder_path):
                    print(f"[Warning] CR Font File List: The folder_path `{folder_path}` does not exist")
                    return None
                font_dir = folder_path     
                file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]
            else:    
                print(f"[Warning] CR Font File List: No folder_path entered")
                return None                
        else:
            pass

        # Ensure start_index is within the bounds of the list
        start_index = max(0, min(start_index, len(file_list) - 1))

        # Calculate the end index based on max_rows
        end_index = min(start_index + max_rows, len(file_list))

        # Extract the desired portion of the list
        selected_files = file_list[start_index:end_index]

        return (selected_files, show_help, )

```
