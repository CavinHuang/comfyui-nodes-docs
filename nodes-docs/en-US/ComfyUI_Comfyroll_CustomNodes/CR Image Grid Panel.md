---
tags:
- Image
- PanelDesign
- VisualEffects
---

# 🌁 CR Image Grid Panel
## Documentation
- Class name: `CR Image Grid Panel`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

This node is designed to create a visually organized grid panel of images, applying customizable borders, outlines, and arranging them into a specified number of columns. It aims to enhance the presentation of multiple images by structuring them in a coherent layout, making it easier to view and compare them side by side.
## Input types
### Required
- **`images`**
    - A list of images to be arranged in a grid. These images are processed to apply borders and outlines, contributing to the overall aesthetic of the grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`border_thickness`**
    - Specifies the thickness of the border around each image, playing a crucial role in the visual separation and emphasis of individual images within the grid.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_color`**
    - Determines the color of the border around each image, allowing for customization of the grid's appearance to match thematic or aesthetic preferences.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`outline_thickness`**
    - Defines the thickness of the outline around the entire grid, enhancing the grid's visual prominence and separation from the background.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_color`**
    - Sets the color of the outline around the entire grid, contributing to the visual identity and thematic consistency of the presentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`max_columns`**
    - The maximum number of columns in the grid, dictating the layout and organization of images within the panel.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`border_color_hex`**
    - Specifies the hexadecimal color code for the border, offering an alternative way to define the border color, especially for custom colors not predefined in the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final processed image of the grid panel, ready for display or further use.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on using the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_ImageGridPanel:

    @classmethod
    def INPUT_TYPES(s):

        return {"required": {
                    "images": ("IMAGE",),
                    "border_thickness": ("INT", {"default": 0, "min": 0, "max": 1024}),
                    "border_color": (COLORS,),
                    "outline_thickness": ("INT", {"default": 0, "min": 0, "max": 1024}),
                    "outline_color": (COLORS[1:],),
                    "max_columns": ("INT", {"default": 5, "min": 0, "max": 256}), 
                },
                "optional": {
                    "border_color_hex": ("STRING", {"multiline": False, "default": "#000000"})                
                }
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "make_panel"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")
    
    def make_panel(self, images,
                   border_thickness, border_color,
                   outline_thickness, outline_color, 
                   max_columns, border_color_hex='#000000'):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-image-grid-panel"

        border_color = get_color_values(border_color, border_color_hex, color_mapping)

        # Convert PIL images
        images = [tensor2pil(image) for image in images]
            
        # Apply borders and outlines to each image
        images = apply_outline_and_border(images, outline_thickness, outline_color, border_thickness, border_color)

        combined_image = make_grid_panel(images, max_columns)
        
        image_out = pil2tensor(combined_image)

        return (image_out, show_help, )   

```
