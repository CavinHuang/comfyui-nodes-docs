---
tags:
- DepthMap
- Image
- ImageEnhancement
- ImagePreprocessing
---

# [Inference.Core] Image Intensity
## Documentation
- Class name: `Inference_Core_ImageIntensityDetector`
- Category: `ControlNet Preprocessors/Recolor`
- Output node: `False`

The ImageIntensityDetector node is designed for preprocessing images by adjusting their intensity levels. It utilizes gamma correction to modify the intensity, aiming to enhance image quality or achieve specific visual effects.
## Input types
### Required
- **`image`**
    - The input image to be processed. It is the primary subject for intensity adjustment through gamma correction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`gamma_correction`**
    - Specifies the gamma correction factor to adjust the intensity levels of the image. It plays a crucial role in the preprocessing step by influencing the brightness and contrast of the output image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - Defines the resolution for the output image. This parameter determines the dimensions to which the image will be adjusted during processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image that has undergone intensity adjustment based on the specified gamma correction. This processed image is suitable for further analysis or visualization.
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
