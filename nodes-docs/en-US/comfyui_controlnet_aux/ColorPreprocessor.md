---
tags:
- DepthMap
- Image
- ImageEnhancement
- ImagePreprocessing
---

# Color Pallete
## Documentation
- Class name: `ColorPreprocessor`
- Category: `ControlNet Preprocessors/T2IAdapter-only`
- Output node: `False`

The ColorPreprocessor node is designed to process images by detecting and annotating colors within them, utilizing a specialized color detection model. This preprocessing step is crucial for tasks that require color analysis or modification before further processing.
## Input types
### Required
- **`image`**
    - The input image to be processed for color detection and annotation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image should be resized before processing. This parameter influences the precision and performance of color detection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with color detection and annotation applied.
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
