---
tags:
- ImageEnhancement
- ImageTransformation
- VisualEffects
---

# Image Shadows and Highlights
## Documentation
- Class name: `Image Shadows and Highlights`
- Category: `WAS Suite/Image/Adjustment`
- Output node: `False`

This node is designed to adjust the shadows and highlights within an image, enhancing its visual quality by modifying the intensity of its darker and lighter areas. It leverages advanced image processing techniques to isolate and manipulate these regions, offering a refined control over the image's contrast and overall appearance.
## Input types
### Required
- **`image`**
    - The input image to be processed. This image will undergo adjustments to its shadows and highlights based on the specified thresholds and factors, significantly altering its visual dynamics.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`shadow_threshold`**
    - Defines the intensity threshold below which pixels are considered shadows. Adjusting this value allows for more precise control over which areas of the image are darkened.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`shadow_factor`**
    - Determines the degree to which the shadows in the image are darkened or lightened. A higher factor increases the intensity of the shadows.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`shadow_smoothing`**
    - Applies a smoothing effect to the shadow regions, reducing harsh edges and creating a more natural transition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`highlight_threshold`**
    - Defines the intensity threshold above which pixels are considered highlights. Adjusting this value allows for more precise control over which areas of the image are brightened.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`highlight_factor`**
    - Determines the degree to which the highlights in the image are brightened or dimmed. A higher factor increases the intensity of the highlights.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`highlight_smoothing`**
    - Applies a smoothing effect to the highlight regions, reducing harsh edges and creating a more natural transition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`simplify_isolation`**
    - Controls the simplification of the isolation process for shadows and highlights, potentially improving performance at the cost of precision.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with adjusted shadows and highlights, reflecting the specified modifications to enhance visual quality.
    - Python dtype: `torch.Tensor`
- **`shadow_map`**
    - Comfy dtype: `IMAGE`
    - A tensor representing the isolated shadows within the original image, adjusted according to the specified parameters.
    - Python dtype: `torch.Tensor`
- **`highlight_map`**
    - Comfy dtype: `IMAGE`
    - A tensor representing the isolated highlights within the original image, adjusted according to the specified parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Shadow_And_Highlight_Adjustment:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "shadow_threshold": ("FLOAT", {"default": 75, "min": 0.0, "max": 255.0, "step": 0.1}),
                "shadow_factor": ("FLOAT", {"default": 1.5, "min": -12.0, "max": 12.0, "step": 0.1}),
                "shadow_smoothing": ("FLOAT", {"default": 0.25, "min": -255.0, "max": 255.0, "step": 0.1}),
                "highlight_threshold": ("FLOAT", {"default": 175, "min": 0.0, "max": 255.0, "step": 0.1}),
                "highlight_factor": ("FLOAT", {"default": 0.5, "min": -12.0, "max": 12.0, "step": 0.1}),
                "highlight_smoothing": ("FLOAT", {"default": 0.25, "min": -255.0, "max": 255.0, "step": 0.1}),
                "simplify_isolation": ("FLOAT", {"default": 0, "min": -255.0, "max": 255.0, "step": 0.1}),
            }
        }

    RETURN_TYPES = ("IMAGE","IMAGE","IMAGE")
    RETURN_NAMES = ("image","shadow_map","highlight_map")
    FUNCTION = "apply_shadow_and_highlight"

    CATEGORY = "WAS Suite/Image/Adjustment"

    def apply_shadow_and_highlight(self, image, shadow_threshold=30, highlight_threshold=220, shadow_factor=1.5, highlight_factor=0.5, shadow_smoothing=0, highlight_smoothing=0, simplify_isolation=0):

        WTools = WAS_Tools_Class()

        result, shadows, highlights = WTools.shadows_and_highlights(tensor2pil(image), shadow_threshold, highlight_threshold, shadow_factor, highlight_factor, shadow_smoothing, highlight_smoothing, simplify_isolation)
        result, shadows, highlights = WTools.shadows_and_highlights(tensor2pil(image), shadow_threshold, highlight_threshold, shadow_factor, highlight_factor, shadow_smoothing, highlight_smoothing, simplify_isolation)

        return (pil2tensor(result), pil2tensor(shadows), pil2tensor(highlights) )

```
