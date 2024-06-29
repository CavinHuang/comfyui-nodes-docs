---
tags:
- DepthMap
- Image
- ImageEnhancement
- ImagePreprocessing
---

# Image Luminance
## Documentation
- Class name: `ImageLuminanceDetector`
- Category: `ControlNet Preprocessors/Recolor`
- Output node: `False`

The ImageLuminanceDetector node is designed to analyze and adjust the luminance of images based on gamma correction. It utilizes the Recolorizer from the controlnet_aux library to modify the image's luminance, aiming to enhance image quality or achieve specific visual effects.
## Input types
### Required
- **`image`**
    - The input image to be processed for luminance adjustment.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`gamma_correction`**
    - Specifies the gamma correction factor to adjust the image's luminance. A higher value brightens the image, while a lower value darkens it, affecting the overall visual output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - The resolution to which the image is resized before applying the luminance adjustment, affecting the detail level of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs the modified image with adjusted luminance levels, enhancing or altering the visual appearance based on the gamma correction applied.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageLuminanceDetector:
    @classmethod
    def INPUT_TYPES(s):
        #https://github.com/Mikubill/sd-webui-controlnet/blob/416c345072c9c2066101e225964e3986abe6945e/scripts/processor.py#L1229
        return create_node_input_types(
            gamma_correction=("FLOAT", {"default": 1.0, "min": 0.1, "max": 2.0, "step": 0.001})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Recolor"

    def execute(self, image, gamma_correction, resolution=512, **kwargs):
        from controlnet_aux.recolor import Recolorizer
        return (common_annotator_call(Recolorizer(), image, mode="luminance", gamma_correction=gamma_correction , resolution=resolution), )

```
