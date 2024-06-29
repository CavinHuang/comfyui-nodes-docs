---
tags:
- Image
- PatternGeneration
- VisualEffects
---

# 🟫 CR Color Bars
## Documentation
- Class name: `CR Color Bars`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

The CR Color Bars node is designed to generate customizable color bar patterns. It allows users to specify various parameters such as color, orientation, and frequency to create visually appealing bar patterns on a canvas. This node leverages color mapping and geometric calculations to produce a wide range of artistic and design-oriented outputs.
## Input types
### Required
- **`mode`**
    - The 'mode' parameter determines the pattern style of the color bars, affecting the overall appearance of the generated image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`width`**
    - Specifies the width of the canvas for the color bars, influencing the size of the generated pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the canvas, impacting the vertical scale of the color bar pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`color_1`**
    - Specifies the first color used in the color bar pattern, contributing to the visual appeal and theme of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`color_2`**
    - Specifies the second color used in the color bar pattern, complementing the first color to enhance the pattern's aesthetic.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`orientation`**
    - Sets the orientation of the color bars (e.g., vertical, horizontal, diagonal), affecting the direction in which the bars are drawn.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`bar_frequency`**
    - Controls the frequency of the color bars, influencing the density and spacing of the bars in the pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset`**
    - Determines the starting point of the color bars, allowing for adjustments in the pattern's alignment and positioning.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`color1_hex`**
    - Provides a custom hexadecimal color value for the first color, offering enhanced customization for the color scheme.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`color2_hex`**
    - Provides a custom hexadecimal color value for the second color, allowing for precise color matching in the pattern.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The generated image data encapsulating the color bar pattern as per the specified parameters.
    - Python dtype: `numpy.ndarray`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides help or guidance related to the usage of the node and its parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ColorBars:
    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["2-color"]
        
        return {"required": {
                    "mode": (modes,),
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "color_1": (COLORS,),
                    "color_2": (COLORS,),
                    "orientation": (["vertical", "horizontal", "diagonal", "alt_diagonal"],), #added 135 angle for diagonals
                    "bar_frequency": ("INT", {"default": 5, "min": 1, "max":200, "step": 1}),
                    "offset": ("FLOAT", {"default": 0, "min": 0, "max":20, "step": 0.05}),
                    },              
                "optional": {
                    "color1_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "color2_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "draw"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")

    def draw(self, mode, width, height, color_1, color_2, 
             orientation, bar_frequency, offset=0,
             color1_hex='#000000', color2_hex='#000000'):

        # Get RGB values 
        if color_1 == "custom":
            color1_rgb = hex_to_rgb(color1_hex)
        else:
            color1_rgb = color_mapping.get(color_1, (255, 255, 255))  # Default to white if the color is not found

        if color_2 == "custom":
            color2_rgb = hex_to_rgb(color2_hex)
        else:
            color2_rgb = color_mapping.get(color_2, (0, 0, 0))  # Default to black if the color is not found

        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        
        bar_width = width / bar_frequency
        bar_height = height / bar_frequency
        offset_pixels = int(offset * max(width, height))

        if orientation == "vertical":
            for j in range(height):
                for i in range(width):
                    if ((i + offset_pixels) // bar_width) % 2 == 0:  # Check for even index
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb
        elif orientation == "horizontal":
            for j in range(height):
                for i in range(width):
                    if ((j + offset_pixels) // bar_height) % 2 == 0:  # Check for even index
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb                
        elif orientation == "diagonal":
            # Calculate the bar width based on a 45 degree angle 
            bar_width = int(bar_height / np.tan(np.pi / 4)) * 2
            for j in range(height): 
                for i in range(width):
                     # Calculate which diagonal bar the pixel belongs to with the offset
                    bar_number = (i + j + offset_pixels) // bar_width
                    if bar_number % 2 == 0:  # Check for even bar number
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb
        elif orientation == "alt_diagonal":
            bar_width = int(bar_height / np.tan(np.pi / 4)) * 2
            for j in range(height): 
                for i in range(width):
                    # Calculate which diagonal bar the pixel belongs to with the offset
                    bar_number = (i - j + width + offset_pixels) // bar_width
                    if bar_number % 2 == 0:  # Check for even bar number
                        canvas[j, i] = color1_rgb
                    else:
                        canvas[j, i] = color2_rgb
                
        fig, ax = plt.subplots(figsize=(width/100, height/100))

        ax.imshow(canvas)

        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)

        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        
        image_out = pil2tensor(img.convert("RGB"))

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-color-bars"

        return (image_out, show_help, )

```
