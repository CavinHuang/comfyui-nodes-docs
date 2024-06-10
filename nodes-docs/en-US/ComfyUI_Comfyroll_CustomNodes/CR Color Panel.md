---
tags:
- Image
- PanelDesign
- VisualEffects
---

# 🌁 CR Color Panel
## Documentation
- Class name: `CR Color Panel`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

The CR_ColorPanel node is designed to generate a simple color panel image with customizable dimensions and fill color. It allows for the creation of a solid color background that can be used in various graphical layouts or as a base for further graphical manipulation.
## Input types
### Required
- **`panel_width`**
    - Specifies the width of the color panel. The width influences the size of the generated image, allowing for customization according to the user's needs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`panel_height`**
    - Determines the height of the color panel. Similar to the width, it affects the overall size of the output image, providing flexibility in the panel's dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_color`**
    - Defines the primary color used to fill the panel. This parameter is crucial for setting the visual appearance of the color panel.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `tuple`
### Optional
- **`fill_color_hex`**
    - An optional hexadecimal color code that can override the primary fill color, offering an alternative method for specifying the panel's color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated color panel as an image, ready for use in various graphical contexts.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to the CR_ColorPanel node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ColorPanel:

    @classmethod
    def INPUT_TYPES(s):
                    
        return {"required": {
                    "panel_width": ("INT", {"default": 512, "min": 8, "max": 4096}),
                    "panel_height": ("INT", {"default": 512, "min": 8, "max": 4096}),
                    "fill_color": (COLORS,),
                },
                "optional": {
                    "fill_color_hex": ("STRING", {"multiline": False, "default": "#000000"})                
                }
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "make_panel"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")
    
    def make_panel(self, panel_width, panel_height,
                   fill_color, fill_color_hex='#000000'):

        fill_color = get_color_values(fill_color, fill_color_hex, color_mapping)

        size = (panel_width, panel_height)
        panel = Image.new('RGB', size, fill_color)
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-color-panel"

        return (pil2tensor(panel), show_help, )

```
