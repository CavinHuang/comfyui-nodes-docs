---
tags:
- Image
- PanelDesign
- VisualEffects
---

# 🌁 CR Diamond Panel
## Documentation
- Class name: `CR Diamond Panel`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

The CR_DiamondPanel node is designed to create and manipulate diamond-shaped panels within a graphical layout. It focuses on generating unique diamond patterns and layouts, offering a specialized tool for enhancing visual designs with geometric shapes.
## Input types
### Required
- **`image`**
    - The 'image' input specifies the base image on which the diamond panel pattern will be applied, serving as the foundation for the pattern generation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`pattern`**
    - The 'pattern' input defines the specific diamond pattern to be applied to the base image, dictating the arrangement and appearance of the diamond shapes within the layout.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output provides the final image with the diamond panel pattern applied, showcasing the visual result of the node's processing.
    - Python dtype: `PIL.Image.Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - The 'show_help' output offers guidance and additional information about using the CR_DiamondPanel node, facilitating user understanding and application.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_DiamondPanel:

    @classmethod
    def INPUT_TYPES(s):
    
        patterns = ["none", "diamond"]

        return {"required": {
                    "image": ("IMAGE",),
                    "pattern": (patterns,),
                }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "make_panel"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")
    
    def make_panel(self, image, pattern, drop_percentage=0.5):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-diamond-panel"

        if pattern == "none":
            return (image, show_help, )

        # Convert to PIL image
        pil_img = tensor2pil(image) 
        pil_img = pil_img.convert('RGBA')
        
        x, y = pil_img.size
        aspect_ratio = x / y
        d = int(drop_percentage * 100)

        panel_image = Image.new('RGBA', (x*2, y*2))
  
        if pattern == "diamond":

            diamond_size = min(x, y)
            diamond_width = min(x, y * aspect_ratio)
            diamond_height = min(y, x / aspect_ratio)

            diamond_mask = Image.new('L', (x, y), 0)
            draw = ImageDraw.Draw(diamond_mask)

            # Make sure the polygon points form a diamond shape
            draw.polygon([(x // 2, 0), (x, y // 2),
                          (x // 2, y), (0, y // 2)], fill=255)

            # Create a copy of the original image
            diamond_image = pil_img.copy()

            # Set alpha channel using the diamond-shaped mask
            diamond_image.putalpha(diamond_mask)

            # Paste the diamond-shaped image onto the panel_image at position (0, 0)
            panel_image.paste(diamond_image, (-x//2, (d-100)*y//100), diamond_image)
            panel_image.paste(diamond_image, (-x//2, d*y//100), diamond_image)
            panel_image.paste(diamond_image, (-x//2, y + d*y//100), diamond_image)            
            panel_image.paste(diamond_image, (0, 0), diamond_image)
            panel_image.paste(diamond_image, (0, y), diamond_image)
            panel_image.paste(diamond_image, (x//2, (d-100)*y//100), diamond_image)
            panel_image.paste(diamond_image, (x//2, d*y//100), diamond_image)
            panel_image.paste(diamond_image, (x//2, y + d*y//100), diamond_image)
            panel_image.paste(diamond_image, (x, 0), diamond_image)
            panel_image.paste(diamond_image, (x, y), diamond_image)
            panel_image.paste(diamond_image, (3*x//2, (d-100)*y//100), diamond_image)
            panel_image.paste(diamond_image, (3*x//2, d*y//100), diamond_image)
            panel_image.paste(diamond_image, (3*x//2, y + d*y//100), diamond_image)             
             
        image_out = pil2tensor(panel_image.convert('RGB'))

        return (image_out, show_help, ) 

```
