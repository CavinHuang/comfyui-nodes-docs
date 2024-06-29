---
tags:
- Image
- VisualEffects
---

# 🎨 CR Color Tint
## Documentation
- Class name: `CR Color Tint`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🎨 Filter`
- Output node: `False`

The CR_ColorTint node applies a color tint to an image, allowing for the adjustment of the image's color tone based on a specified strength and color mode. It supports a variety of predefined color modes as well as custom color inputs, enabling a wide range of visual effects.
## Input types
### Required
- **`image`**
    - The input image to which the color tint will be applied. This parameter is crucial as it serves as the base for the tinting process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`strength`**
    - Determines the intensity of the color tint applied to the image. A higher value results in a more pronounced color effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`mode`**
    - Specifies the color mode for the tint. This can be a predefined color mode such as 'sepia', 'red', or 'blue', or a custom color defined by 'tint_color_hex'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`tint_color_hex`**
    - The hexadecimal color code for the tint when 'mode' is set to 'custom'. This allows for precise control over the tint color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The image after the color tint has been applied, reflecting the specified strength and color mode.
    - Python dtype: `torch.Tensor`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the documentation or help page for the CR_ColorTint node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CR Image Input Switch (4 way)](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Input Switch (4 way).md)
    - [TilePreprocessor](../../comfyui_controlnet_aux/Nodes/TilePreprocessor.md)
    - [CR Thumbnail Preview](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Thumbnail Preview.md)



## Source code
```python
class CR_ColorTint:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
    
        #tints = COLORS.append('sepia')
        
        tints = ["custom", "white", "black", "sepia", "red", "green", "blue",
            "cyan", "magenta", "yellow", "purple", "orange", "warm",
            "cool",  "lime", "navy", "vintage", "rose", "teal",
            "maroon", "peach", "lavender", "olive"]
           
        return {
            "required": {"image": ("IMAGE",),
                         "strength": ("FLOAT", {"default": 1.0,"min": 0.1,"max": 1.0,"step": 0.1}),
                         "mode": (tints,),
                        },
            "optional": {"tint_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),} 
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )    
    FUNCTION = "color_tint"
    CATEGORY = icons.get("Comfyroll/Graphics/Filter")

    def color_tint(self, image: torch.Tensor, strength, mode: str="sepia", tint_color_hex='#000000'):
    
        if strength == 0:
            return (image,)
            
        # Get RGB values for the tint color  
        tint_color = get_color_values(mode, tint_color_hex, color_mapping)    
        color_rgb = tuple([value / 255 for value in tint_color])
        
        sepia_weights = torch.tensor([0.2989, 0.5870, 0.1140]).view(1, 1, 1, 3).to(image.device)
        
        mode_filters = {
            "custom": torch.tensor([color_rgb[0], color_rgb[1], color_rgb[2]]),
            "white": torch.tensor([1, 1, 1]),
            "black": torch.tensor([0, 0, 0]),
            "sepia": torch.tensor([1.0, 0.8, 0.6]),
            "red": torch.tensor([1.0, 0.6, 0.6]),
            "green": torch.tensor([0.6, 1.0, 0.6]),
            "blue": torch.tensor([0.6, 0.8, 1.0]),
            "cyan": torch.tensor([0.6, 1.0, 1.0]),
            "magenta": torch.tensor([1.0, 0.6, 1.0]),
            "yellow": torch.tensor([1.0, 1.0, 0.6]),
            "purple": torch.tensor([0.8, 0.6, 1.0]),
            "orange": torch.tensor([1.0, 0.7, 0.3]),
            "warm": torch.tensor([1.0, 0.9, 0.7]),
            "cool": torch.tensor([0.7, 0.9, 1.0]),
            "lime": torch.tensor([0.7, 1.0, 0.3]),
            "navy": torch.tensor([0.3, 0.4, 0.7]),
            "vintage": torch.tensor([0.9, 0.85, 0.7]),
            "rose": torch.tensor([1.0, 0.8, 0.9]),
            "teal": torch.tensor([0.3, 0.8, 0.8]),
            "maroon": torch.tensor([0.7, 0.3, 0.5]),
            "peach": torch.tensor([1.0, 0.8, 0.6]),
            "lavender": torch.tensor([0.8, 0.6, 1.0]),
            "olive": torch.tensor([0.6, 0.7, 0.4]),
        }

        scale_filter = mode_filters[mode].view(1, 1, 1, 3).to(image.device)

        grayscale = torch.sum(image * sepia_weights, dim=-1, keepdim=True)
        tinted = grayscale * scale_filter

        result = tinted * strength + image * (1 - strength)
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Filter-Nodes#cr-color-tint"
        
        return (result, show_help, ) 

```
