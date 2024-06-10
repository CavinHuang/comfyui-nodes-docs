---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Standard Lineart
## Documentation
- Class name: `LineartStandardPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The LineartStandardPreprocessor node is designed for extracting line art from images using a standard approach. It preprocesses images to highlight and refine line details, making it suitable for applications requiring clear line delineation, such as digital art and animation.
## Input types
### Required
- **`image`**
    - The input image to be processed for line art extraction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
### Optional
- **`guassian_sigma`**
    - Specifies the sigma value for the Gaussian blur applied to the image, affecting the smoothness of the lines extracted.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`intensity_threshold`**
    - Determines the threshold for intensity differentiation, influencing the distinction between line art and the background.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The resolution to which the input image is resized before processing, affecting the detail level of the extracted line art.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces an image with enhanced and refined line art, suitable for further processing or direct use in various applications.
    - Python dtype: `Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Lineart_Standard_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            guassian_sigma=("FLOAT", {"default": 6.0, "min": 0.0, "max": 100.0}),
            intensity_threshold=("INT", {"default": 8, "min": 0, "max": 16})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, guassian_sigma, intensity_threshold, resolution=512, **kwargs):
        from controlnet_aux.lineart_standard import LineartStandardDetector
        return (common_annotator_call(LineartStandardDetector(), image, guassian_sigma=guassian_sigma, intensity_threshold=intensity_threshold, resolution=resolution), )

```
