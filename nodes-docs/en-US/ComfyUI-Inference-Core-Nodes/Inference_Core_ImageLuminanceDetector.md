---
tags:
- DepthMap
- Image
- ImageEnhancement
- ImagePreprocessing
---

# [Inference.Core] Image Luminance
## Documentation
- Class name: `Inference_Core_ImageLuminanceDetector`
- Category: `ControlNet Preprocessors/Recolor`
- Output node: `False`

This node is designed to adjust the luminance of an image based on ControlNet preprocessing techniques. It utilizes gamma correction to modify the image's luminance, aiming to enhance image quality or adjust it for further processing steps.
## Input types
### Required
- **`image`**
    - The input image to be processed for luminance adjustment.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`gamma_correction`**
    - Specifies the gamma correction factor to adjust the image's luminance. A higher value brightens the image, while a lower value darkens it, affecting the overall image processing outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - Specifies the resolution for the output image, affecting the level of detail and size of the processed image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image with adjusted luminance, processed through gamma correction to either increase or decrease its brightness.
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
