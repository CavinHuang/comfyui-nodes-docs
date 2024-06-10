---
tags:
- Image
- PanelDesign
- VisualEffects
---

# 🌁 CR Image Panel
## Documentation
- Class name: `CR Image Panel`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

The CR Image Panel node is designed to create a panel layout for images, allowing users to organize and display multiple images in a structured grid format. It provides customization options for borders, outlines, and the arrangement of images within the grid, enhancing the visual presentation of image collections.
## Input types
### Required
- **`image_1`**
    - The primary image to be included in the panel. This parameter is essential for initiating the layout of the image panel.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`border_thickness`**
    - Specifies the thickness of the borders around each image in the panel, contributing to the visual separation and framing of the images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_color`**
    - Defines the color of the borders around each image. This parameter allows for visual customization and can enhance the aesthetic appeal of the panel.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[int, int, int]`
- **`outline_thickness`**
    - Determines the thickness of the outline around the entire panel, providing an additional layer of visual definition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_color`**
    - Sets the color of the outline around the panel, further customizing the appearance and emphasizing the panel's boundaries.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[int, int, int]`
- **`layout_direction`**
    - Determines the arrangement direction of the images within the panel, either horizontally or vertically.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image_2`**
    - An optional second image to include in the panel, allowing for more complex layouts.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_3`**
    - An optional third image to include in the panel, further expanding the layout possibilities.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_4`**
    - An optional fourth image to include in the panel, maximizing the layout customization.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`border_color_hex`**
    - An optional hexadecimal color code for the border color, offering an alternative way to specify the border color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final image output of the panel, combining all input images according to the specified layout and customization options.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for the CR Image Panel node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_ImagePanel:

    @classmethod
    def INPUT_TYPES(s):

        directions = ["horizontal", "vertical"]               
        
        return {"required": {
                "image_1": ("IMAGE",),
                "border_thickness": ("INT", {"default": 0, "min": 0, "max": 1024}),
                "border_color": (COLORS,),
                "outline_thickness": ("INT", {"default": 0, "min": 0, "max": 1024}),
                "outline_color": (COLORS[1:],),
                "layout_direction": (directions,),
               },
                "optional": {
                "image_2": ("IMAGE",), 
                "image_3": ("IMAGE",),
                "image_4": ("IMAGE",),
                "border_color_hex": ("STRING", {"multiline": False, "default": "#000000"})                
               }
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "make_panel"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")
    
    def make_panel(self, image_1,
                   border_thickness, border_color,
                   outline_thickness, outline_color, 
                   layout_direction, image_2=None, image_3=None, image_4=None,
                   border_color_hex='#000000'):

        border_color = get_color_values(border_color, border_color_hex, color_mapping)

        # Convert PIL images to NumPy arrays
        images = []
        #image_1 = image_1[0, :, :, :]
        images.append(tensor2pil(image_1))
        if image_2 is not None:
            #image_2 = image_2[0, :, :, :]
            images.append(tensor2pil(image_2))
        if image_3 is not None:
            #image_3 = image_3[0, :, :, :]
            images.append(tensor2pil(image_3))
        if image_4 is not None:
            #image_4 = image_4[0, :, :, :]
            images.append(tensor2pil(image_4))
            
        # Apply borders and outlines to each image        
        images = apply_outline_and_border(images, outline_thickness, outline_color, border_thickness, border_color)

        combined_image = combine_images(images, layout_direction)

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-image-panel"

        return (pil2tensor(combined_image), show_help, )   

```
