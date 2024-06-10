---
tags:
- ComfyrollNodes
---

# 🔤️ CR Select Font
## Documentation
- Class name: `CR Select Font`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🔤 Text`
- Output node: `False`

This node allows users to select a font from a list of available TrueType fonts (.ttf) based on the operating system's font directory. It is designed to facilitate the customization of text appearance in graphics by providing access to system fonts.
## Input types
### Required
- **`font_name`**
    - Specifies the name of the font to be selected. This parameter enables the customization of text appearance by allowing users to choose from available TrueType fonts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`font_name`**
    - Comfy dtype: `*`
    - Returns the selected font name, facilitating further text customization operations.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the help documentation for the CR Select Font node, offering users guidance on its usage.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SelectFont:
    def __init__(self):
        pass
        
    @classmethod
    def INPUT_TYPES(cls):
    
        if platform.system() == "Windows":
            system_root = os.environ.get("SystemRoot")
            font_dir = os.path.join(system_root, "Fonts") if system_root else None
       # Default debian-based Linux & MacOS font dirs
        elif platform.system() == "Linux":
            font_dir = "/usr/share/fonts/truetype"
        elif platform.system() == "Darwin":
            font_dir = "/System/Library/Fonts"    
 
        file_list = [f for f in os.listdir(font_dir) if os.path.isfile(os.path.join(font_dir, f)) and f.lower().endswith(".ttf")]
                        
        return {"required": {
                "font_name": (file_list,),
                }       
    }

    RETURN_TYPES = (any_type, "STRING",)
    RETURN_NAMES = ("font_name", "show_help",)
    FUNCTION = "select_font"
    CATEGORY = icons.get("Comfyroll/Graphics/Text")

    def select_font(self, font_name):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Text-Nodes#cr-select-font"    
       
        return (font_name, show_help,)     

```
