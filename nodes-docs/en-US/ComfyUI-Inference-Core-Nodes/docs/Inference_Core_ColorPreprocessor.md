---
tags:
- DepthMap
- Image
- ImageEnhancement
- ImagePreprocessing
---

# [Inference.Core] Color Pallete
## Documentation
- Class name: `Inference_Core_ColorPreprocessor`
- Category: `ControlNet Preprocessors/T2IAdapter-only`
- Output node: `False`

The Color Preprocessor node is designed to analyze and process images to detect and adjust their color palette. It utilizes a color detection algorithm to enhance or modify the image's color properties based on the specified resolution.
## Input types
### Required
- **`image`**
    - The input image to be processed for color detection and adjustment.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution at which the color detection and adjustment should be performed, affecting the precision and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with adjusted color properties, based on the color detection algorithm.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Color_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/T2IAdapter-only"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.color import ColorDetector

        return (common_annotator_call(ColorDetector(), image, resolution=resolution), )

```
