---
tags:
- DepthMap
- Image
- ImageEnhancement
- ImagePreprocessing
---

# Image Intensity
## Documentation
- Class name: `ImageIntensityDetector`
- Category: `ControlNet Preprocessors/Recolor`
- Output node: `False`

The ImageIntensityDetector node is designed for preprocessing images by adjusting their intensity levels. This adjustment is achieved through gamma correction, enhancing the image's overall visibility and contrast before further processing.
## Input types
### Required
- **`image`**
    - The input image to be processed for intensity adjustment through gamma correction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`gamma_correction`**
    - Specifies the gamma correction factor to adjust the image's intensity. A higher value brightens the image, while a lower value darkens it, significantly impacting the visual quality of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - The resolution to which the image is resized before applying the intensity adjustment, affecting the detail level of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image with adjusted intensity levels, suitable for visual analysis or further image processing tasks.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageIntensityDetector:
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
        return (common_annotator_call(Recolorizer(), image, mode="intensity", gamma_correction=gamma_correction , resolution=resolution), )

```
