---
tags:
- Image
- PanelDesign
- VisualEffects
---

# 🌁 CR Half Drop Panel
## Documentation
- Class name: `CR Half Drop Panel`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌁 Layout`
- Output node: `False`

The CR Half Drop Panel node is designed to transform an input image into a patterned panel by applying half-drop, quarter-drop, or custom percentage drop techniques. This node enhances visual aesthetics by creating repetitive patterns that can be used in various design contexts.
## Input types
### Required
- **`image`**
    - The input image to be transformed into a patterned panel. This image serves as the base for creating the repetitive pattern.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`pattern`**
    - Specifies the type of pattern to apply to the input image, such as 'half drop', 'quarter drop', or a 'custom drop %', determining the arrangement of the repeated image segments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`drop_percentage`**
    - Used when 'pattern' is set to 'custom drop %', it defines the percentage by which the image is dropped, allowing for customizable pattern repetition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the specified drop pattern, showcasing the transformed panel with the repetitive design.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the documentation or help page for the CR Half Drop Panel node, providing additional information and guidance.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_HalfDropPanel:

    @classmethod
    def INPUT_TYPES(s):
    
        patterns = ["none", "half drop", "quarter drop", "custom drop %"]

        return {"required": {
                    "image": ("IMAGE",),
                    "pattern": (patterns,),
                },
                "optional": {
                    "drop_percentage": ("FLOAT", {"default": 0.50, "min": 0.00, "max": 1.00, "step": 0.01}),              
                }
    }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("image", "show_help", )
    FUNCTION = "make_panel"
    CATEGORY = icons.get("Comfyroll/Graphics/Layout")
    
    def make_panel(self, image, pattern, drop_percentage=0.5):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Layout-Nodes#cr-half-drop-panel"

        if pattern == "none":
            return (image, show_help, )

        # Convert to PIL image
        pil_img = tensor2pil(image) 
        pil_img = pil_img.convert('RGBA')
        
        x, y = pil_img.size
        aspect_ratio = x / y
        d = int(drop_percentage * 100)

        panel_image = Image.new('RGBA', (x*2, y*2))

        if pattern == "half drop":
            panel_image.paste(pil_img, (0, 0))
            panel_image.paste(pil_img, (0, y))
            panel_image.paste(pil_img, (x, -y//2))
            panel_image.paste(pil_img, (x, y//2))
            panel_image.paste(pil_img, (x, 3*y//2))   
        elif pattern == "quarter drop":    
            panel_image.paste(pil_img, (0, 0))
            panel_image.paste(pil_img, (0, y))
            panel_image.paste(pil_img, (x, -3*y//4))
            panel_image.paste(pil_img, (x, y//4))
            panel_image.paste(pil_img, (x, 5*y//4))        
        elif pattern == "custom drop %":     
            panel_image.paste(pil_img, (0, 0))
            panel_image.paste(pil_img, (0, y))
            panel_image.paste(pil_img, (x, (d-100)*y//100))
            panel_image.paste(pil_img, (x, d*y//100))
            panel_image.paste(pil_img, (x, y + d*y//100))   
             
        image_out = pil2tensor(panel_image.convert('RGB'))

        return (image_out, show_help, )   

```
