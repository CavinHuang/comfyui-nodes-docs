---
tags:
- VisualEffects
---

# Image Dragan Photography Filter
## Documentation
- Class name: `Image Dragan Photography Filter`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

This node applies a Dragan effect to images, enhancing their visual appeal by adjusting saturation, contrast, sharpness, brightness, and colorization. It utilizes a high-pass filter to accentuate details and texture, creating a distinctive, dramatic look.
## Input types
### Required
- **`image`**
    - The input images to which the Dragan effect will be applied. This parameter is crucial for defining the visual content that will undergo transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`saturation`**
    - Controls the intensity of the image's colors, affecting the vibrancy of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`contrast`**
    - Adjusts the difference between the darkest and lightest tones in the image, enhancing the visual depth.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`brightness`**
    - Modifies the overall lightness or darkness of the image, affecting its visibility and mood.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sharpness`**
    - Determines the clarity of detail in the image, making textures more pronounced.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`highpass_radius`**
    - Specifies the radius for the high-pass filter, influencing the level of detail enhancement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`highpass_samples`**
    - Defines the number of samples for the high-pass filter, affecting the texture's granularity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`highpass_strength`**
    - Sets the strength of the high-pass filter, determining the intensity of detail accentuation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`colorize`**
    - Enables or disables colorization, adding a unique hue to the image or preserving its original colors.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed images with the applied Dragan effect, showcasing enhanced textures and dramatic visual appeal.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Dragon_Filter:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "saturation": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 16.0, "step": 0.01}),
                "contrast": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 16.0, "step": 0.01}),
                "brightness": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 16.0, "step": 0.01}),
                "sharpness": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 6.0, "step": 0.01}),
                "highpass_radius": ("FLOAT", {"default": 6.0, "min": 0.0, "max": 255.0, "step": 0.01}),
                "highpass_samples": ("INT", {"default": 1, "min": 0, "max": 6.0, "step": 1}),
                "highpass_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 3.0, "step": 0.01}),
                "colorize": (["true","false"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply_dragan_filter"

    CATEGORY = "WAS Suite/Image/Filter"

    def apply_dragan_filter(self, image, saturation, contrast, sharpness, brightness, highpass_radius, highpass_samples, highpass_strength, colorize):

        WTools = WAS_Tools_Class()

        tensor_images = []
        for img in image:
            tensor_images.append(pil2tensor(WTools.dragan_filter(tensor2pil(img), saturation, contrast, sharpness, brightness, highpass_radius, highpass_samples, highpass_strength, colorize)))
        tensor_images = torch.cat(tensor_images, dim=0)

        return (tensor_images, )

```
