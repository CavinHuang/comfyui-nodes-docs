---
tags:
- ImageFilter
- VisualEffects
---

# Image Monitor Effects Filter
## Documentation
- Class name: `Image Monitor Effects Filter`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

This node applies various monitor effect filters to an image, simulating digital, signal, and TV distortions. It allows for customization of the distortion intensity and offset, providing a versatile tool for creating visually unique images.
## Input types
### Required
- **`image`**
    - The input image to which the monitor effect filters will be applied. It serves as the base for the distortion effects.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - Specifies the type of distortion effect to apply: Digital Distortion, Signal Distortion, or TV Distortion. This choice determines the visual style of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`amplitude`**
    - Controls the intensity of the distortion effect. A higher value results in more pronounced distortions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset`**
    - Adjusts the offset of the distortion effect, allowing for further customization of the visual outcome.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the selected monitor effect filter. It showcases the visual distortions as specified by the input parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Monitor_Distortion_Filter:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mode": (["Digital Distortion", "Signal Distortion", "TV Distortion"],),
                "amplitude": ("INT", {"default": 5, "min": 1, "max": 255, "step": 1}),
                "offset": ("INT", {"default": 10, "min": 1, "max": 255, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "image_monitor_filters"

    CATEGORY = "WAS Suite/Image/Filter"

    def image_monitor_filters(self, image, mode="Digital Distortion", amplitude=5, offset=5):

        # Convert images to PIL
        image = tensor2pil(image)

        # WAS Filters
        WTools = WAS_Tools_Class()

        # Apply image effect
        if mode:
            if mode == 'Digital Distortion':
                image = WTools.digital_distortion(image, amplitude, offset)
            elif mode == 'Signal Distortion':
                image = WTools.signal_distortion(image, amplitude)
            elif mode == 'TV Distortion':
                image = WTools.tv_vhs_distortion(image, amplitude)
            else:
                image = image

        return (pil2tensor(image), )

```
