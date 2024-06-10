---
tags:
- Image
- VisualEffects
---

# 🟨 CR Color Gradient
## Documentation
- Class name: `CR Color Gradient`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

The CR Color Gradient node is designed to generate a color gradient between two specified colors over a given canvas. It allows for customization of the gradient's orientation, transition style, and distance, enabling the creation of visually appealing backgrounds or elements with smooth color transitions.
## Input types
### Required
- **`width`**
    - The width of the canvas on which the gradient will be applied, impacting the horizontal dimension of the gradient.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of the canvas on which the gradient will be applied, affecting the vertical dimension of the gradient.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_color`**
    - Specifies the starting color of the gradient. It can be a predefined color name or 'custom' to use a specific hex color code, influencing the gradient's initial color.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`end_color`**
    - Defines the ending color of the gradient. Similar to 'start_color', it can be a predefined color name or 'custom' for a hex color code, determining the gradient's final color.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`gradient_distance`**
    - Specifies the distance over which the gradient transition occurs, with a value between 0 and 1 representing the proportion of the canvas covered by the gradient.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`linear_transition`**
    - A value between 0 and 1 indicating the position of the gradient transition's center point, with 0 being the start and 1 the end of the canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`orientation`**
    - Determines the orientation of the gradient (horizontal or vertical), influencing the direction in which the color transition occurs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`start_color_hex`**
    - The hex color code for the starting color, used when 'start_color' is set to 'custom'. It provides precise control over the gradient's initial color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`end_color_hex`**
    - The hex color code for the ending color, used when 'end_color' is set to 'custom'. It allows for exact specification of the gradient's final color.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The resulting image with the applied color gradient, ready for display or further processing.
    - Python dtype: `numpy.ndarray`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the CR Color Gradient node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Thumbnail Preview](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Thumbnail Preview.md)
    - [CR Image Input Switch (4 way)](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Input Switch (4 way).md)



## Source code
```python
class CR_ColorGradient:
    @classmethod
    def INPUT_TYPES(s):
        
        return {"required": {
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "start_color": (COLORS,),
                    "end_color": (COLORS,),
                    "gradient_distance": ("FLOAT", {"default": 1, "min": 0, "max": 2, "step": 0.05}),
                    "linear_transition": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.05}),
                    "orientation": (["vertical", "horizontal", ],),
                    },
                "optional": {
                    "start_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "end_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "draw"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")

    def draw(self, width, height, start_color, end_color, orientation,
             linear_transition=0.5, gradient_distance=1,
             start_color_hex='#000000', end_color_hex='#000000'): # Default to .5 if the value is not found
 
        # Get RGB values 
        if start_color == "custom":
            color1_rgb = hex_to_rgb(start_color_hex)
        else:
            color1_rgb = color_mapping.get(start_color, (255, 255, 255))  # Default to white if the color is not found

        if end_color == "custom":
            color2_rgb = hex_to_rgb(end_color_hex)
        else:
            color2_rgb = color_mapping.get(end_color, (0, 0, 0))  # Default to black if the color is not found
 
        # Create a blank canvas
        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        transition_pixel = int(linear_transition * (width if orientation == 'horizontal' else height)) #getting center point for gradient
        
        def get_gradient_value(pos, length, linear_transition, gradient_distance): #getting the distance we use to apply gradient
            # Calculate the start and end of the transition
            transition_length = length * gradient_distance
            transition_start = linear_transition * length - transition_length / 2
            transition_end = linear_transition * length + transition_length / 2
            
            # Return the gradient value based on position
            if pos < transition_start:
                return 0
            elif pos > transition_end:
                return 1
            else:
                return (pos - transition_start) / transition_length
 
        if orientation == 'horizontal':
            # Define the x-values for interpolation
            x = [0, width * linear_transition - 0.5 * width * gradient_distance, width * linear_transition + 0.5 * width * gradient_distance, width]
            # Define the y-values for interpolation (t-values)
            y = [0, 0, 1, 1]
            # Interpolate
            t_values = np.interp(np.arange(width), x, y)
            for i, t in enumerate(t_values):
                interpolated_color = [int(c1 * (1 - t) + c2 * t) for c1, c2 in zip(color1_rgb, color2_rgb)]
                canvas[:, i] = interpolated_color

        elif orientation == 'vertical':
            # Define the x-values for interpolation
            x = [0, height * linear_transition - 0.5 * height * gradient_distance, height * linear_transition + 0.5 * height * gradient_distance, height]
            # Define the y-values for interpolation (t-values)
            y = [0, 0, 1, 1]
            # Interpolate
            t_values = np.interp(np.arange(height), x, y)
            for j, t in enumerate(t_values):
                interpolated_color = [int(c1 * (1 - t) + c2 * t) for c1, c2 in zip(color1_rgb, color2_rgb)]
                canvas[j, :] = interpolated_color
                    
        fig, ax = plt.subplots(figsize=(width / 100, height / 100))

        ax.imshow(canvas)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)

        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)
        
        image_out = pil2tensor(img.convert("RGB"))         

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-color-gradient"

        return (image_out, show_help, )

```
