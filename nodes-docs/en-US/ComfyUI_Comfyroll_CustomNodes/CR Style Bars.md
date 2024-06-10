---
tags:
- Image
- PatternGeneration
- VisualEffects
---

# 🟪 CR Style Bars
## Documentation
- Class name: `CR Style Bars`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

The CR Style Bars node is designed to generate stylized bar patterns within a graphical context, utilizing various orientations and styles to create visually appealing designs. It leverages mathematical and graphical algorithms to produce patterns that can be customized in terms of orientation, color, and frequency, making it a versatile tool for creating background textures or decorative elements in a digital environment.
## Input types
### Required
- **`mode`**
    - Specifies the mode of the bar pattern, such as color bars, sin wave, or gradient bars, defining the fundamental pattern type.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`width`**
    - Determines the width of the output image in pixels, affecting the scale of the bar pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the output image in pixels, affecting the scale of the bar pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bar_style`**
    - Defines the style of the bars in the pattern, influencing the visual texture and complexity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`orientation`**
    - Sets the orientation of the bars, either vertical or horizontal, impacting the pattern's directionality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`bar_frequency`**
    - Controls the frequency of the bars within the pattern, adjusting the density and spacing of the bars.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The generated stylized bar pattern as an image, showcasing the customized pattern based on the input parameters provided.
    - Python dtype: `PIL.Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides helpful information or guidance related to the use of the node and its functionalities.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_StyleBars:
    @classmethod
    def INPUT_TYPES(s):
    
        modes = ["color bars", "sin wave", "gradient bars"]
        
        return {"required": {
                    "mode": (modes,),
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "bar_style": (STYLES,),
                    "orientation": (["vertical", "horizontal", ],),
                    "bar_frequency": ("INT", {"default": 5, "min": 1, "max":200, "step": 1}),
                    }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "draw"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")

    def draw(self, mode, width, height, bar_style, orientation, bar_frequency):
           
        # Create a horizontal or vertical bar depending on the orientation
        if orientation == "vertical":
            x = np.linspace(0, 1, width)
            y = np.zeros((height, width))
        elif orientation == "horizontal":
            x = np.zeros((height, width))
            y = np.linspace(0, 1, height)

        # Create a grid of colors for the bar
        X, Y = np.meshgrid(x, y)

        if mode == "color bars":
            bar_width = 1 / bar_frequency
            if orientation == "vertical":
                colors = (X // bar_width) % 2
            elif orientation == "horizontal":
                colors = (Y // bar_width) % 2 
        elif mode == "sin wave":    
            if orientation == "vertical":
                colors = np.sin(2 * np.pi * bar_frequency * X)
            elif orientation == "horizontal":
                colors = np.sin(2 * np.pi * bar_frequency * Y) 
        elif mode == "gradient bars":
            if orientation == "vertical":
                colors = (X * bar_frequency * 2) % 2
            elif orientation == "horizontal":
                colors = (Y * bar_frequency * 2) % 2
            
        fig, ax = plt.subplots(figsize=(width/100, height/100))

        ax.imshow(colors, cmap=bar_style, aspect='auto')

        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)

        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        
        image_out = pil2tensor(img.convert("RGB"))        

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-style-bars"

        return (image_out, show_help, )

```
