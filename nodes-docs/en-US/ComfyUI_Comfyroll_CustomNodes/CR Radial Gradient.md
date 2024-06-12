---
tags:
- Image
- VisualEffects
---

# 🟨 CR Radial Gradient
## Documentation
- Class name: `CR Radial Gradient`
- Category: `🧩 Comfyroll Studio/👾 Graphics/🌈 Pattern`
- Output node: `False`

The CR Radial Gradient node is designed to create visually appealing radial gradient patterns. It leverages mathematical models to blend colors or intensities from a central point outward, allowing for the creation of dynamic and customizable radial gradients that can enhance the visual aesthetics of graphics or UI elements.
## Input types
### Required
- **`width`**
    - Sets the width of the canvas, influencing the radial gradient's spread and how it occupies the visual space.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Determines the height of the canvas on which the radial gradient is applied, affecting the scale and distribution of the gradient pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_color`**
    - Specifies the starting color of the radial gradient. It sets the tone for the center of the gradient, influencing the overall appearance and mood of the generated pattern.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`end_color`**
    - Defines the ending color of the radial gradient. This color gradually blends with the starting color towards the edges, creating a smooth transition and adding depth to the visual effect.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`gradient_distance`**
    - Specifies the extent of the gradient's transition area, affecting how gradually the colors blend from the center to the edges.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`radial_center_x`**
    - Determines the x-coordinate of the radial gradient's center point on the canvas, allowing for precise positioning of the gradient's origin.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`radial_center_y`**
    - Sets the y-coordinate of the radial gradient's center point on the canvas, enabling accurate placement of the gradient's starting point.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`start_color_hex`**
    - Provides a hexadecimal representation of the custom starting color, offering precise control over the gradient's initial color scheme.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`end_color_hex`**
    - Gives a hexadecimal code for the custom ending color, allowing for exact specification of the gradient's final color in the transition.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The resulting image featuring the applied radial gradient, showcasing the blend of specified colors in a radial pattern.
    - Python dtype: `numpy.ndarray`
- **`show_Help`**
    - Comfy dtype: `STRING`
    - Provides a link or guidance for further assistance or information about the radial gradient node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_RadialGradient:
    @classmethod
    def INPUT_TYPES(s):
    
        return {"required": {
                    "width": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "height": ("INT", {"default": 512, "min": 64, "max": 4096}),
                    "start_color": (COLORS,),
                    "end_color": (COLORS,),
                    "gradient_distance": ("FLOAT", {"default": 1, "min": 0, "max": 2, "step": 0.05}),
                    "radial_center_x": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.05}),
                    "radial_center_y": ("FLOAT", {"default": 0.5, "min": 0, "max": 1, "step": 0.05}),
                    },
                "optional": {
                    "start_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                    "end_color_hex": ("STRING", {"multiline": False, "default": "#000000"}),
                }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_Help", )
    FUNCTION = "draw"
    CATEGORY = icons.get("Comfyroll/Graphics/Pattern")

    def draw(self, width, height, start_color, end_color, 
             radial_center_x=0.5, radial_center_y=0.5, gradient_distance=1,
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

        center_x = int(radial_center_x * width)
        center_y = int(radial_center_y * height)                
        # Computation for max_distance
        max_distance = (np.sqrt(max(center_x, width - center_x)**2 + max(center_y, height - center_y)**2))*gradient_distance

        for i in range(width):
            for j in range(height):
                distance_to_center = np.sqrt((i - center_x) ** 2 + (j - center_y) ** 2)
                t = distance_to_center / max_distance
                # Ensure t is between 0 and 1
                t = max(0, min(t, 1))
                interpolated_color = [int(c1 * (1 - t) + c2 * t) for c1, c2 in zip(color1_rgb, color2_rgb)]
                canvas[j, i] = interpolated_color 

        fig, ax = plt.subplots(figsize=(width / 100, height / 100))

        ax.imshow(canvas)
        plt.axis('off')
        plt.tight_layout(pad=0, w_pad=0, h_pad=0)
        plt.autoscale(tight=True)

        img_buf = io.BytesIO()
        plt.savefig(img_buf, format='png')
        img = Image.open(img_buf)

        image_out = pil2tensor(img.convert("RGB"))

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Pattern-Nodes#cr-radial-gradiant"

        return (image_out, show_help, )

```
