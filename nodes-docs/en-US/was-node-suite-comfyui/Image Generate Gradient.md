---
tags:
- Image
- VisualEffects
---

# Image Generate Gradient
## Documentation
- Class name: `Image Generate Gradient`
- Category: `WAS Suite/Image/Generate`
- Output node: `False`

This node is designed to generate images with gradient effects based on specified color stops, direction, and size. It allows for the creation of visually appealing backgrounds or elements by blending colors smoothly across the image in either a horizontal or vertical direction, with an option to adjust the tolerance for color transitions.
## Input types
### Required
- **`width`**
    - Specifies the width of the generated gradient image. It determines how wide the image will be.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the generated gradient image. It determines how tall the image will be.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`direction`**
    - Determines the direction of the gradient transition in the image, either horizontal or vertical.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`tolerance`**
    - Adjusts the tolerance for color transitions in the gradient, affecting the smoothness of the gradient effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`gradient_stops`**
    - Defines the color stops for the gradient, specifying the colors and their positions within the gradient transition.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated image with the specified gradient effect.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [Image Blending Mode](../../was-node-suite-comfyui/Nodes/Image Blending Mode.md)



## Source code
```python
class WAS_Image_Generate_Gradient:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        gradient_stops = '''0:255,0,0
25:255,255,255
50:0,255,0
75:0,0,255'''
        return {
            "required": {
                "width": ("INT", {"default":512, "max": 4096, "min": 64, "step":1}),
                "height": ("INT", {"default":512, "max": 4096, "min": 64, "step":1}),
                "direction": (["horizontal", "vertical"],),
                "tolerance": ("INT", {"default":0, "max": 255, "min": 0, "step":1}),
                "gradient_stops": ("STRING", {"default": gradient_stops, "multiline": True}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_gradient"

    CATEGORY = "WAS Suite/Image/Generate"

    def image_gradient(self, gradient_stops, width=512, height=512, direction='horizontal', tolerance=0):

        import io

        # WAS Filters
        WTools = WAS_Tools_Class()

        colors_dict = {}
        stops = io.StringIO(gradient_stops.strip().replace(' ',''))
        for stop in stops:
            parts = stop.split(':')
            colors = parts[1].replace('\n','').split(',')
            colors_dict[parts[0].replace('\n','')] = colors

        image = WTools.gradient((width, height), direction, colors_dict, tolerance)

        return (pil2tensor(image), )

```
