---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] Standard Lineart
## Documentation
- Class name: `Inference_Core_LineartStandardPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The Inference_Core_LineartStandardPreprocessor node is designed to preprocess images for line extraction, applying Gaussian blurring and intensity thresholding to enhance lineart features before further processing.
## Input types
### Required
- **`image`**
    - The input image to be processed for line extraction, serving as the primary data for the node's operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`guassian_sigma`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`intensity_threshold`**
    - Determines the threshold for intensity differentiation, aiding in the distinction of lineart from the background by setting a cutoff intensity value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - Specifies the resolution at which the image processing should be executed, affecting the detail level of the output lineart.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces an image with enhanced lineart features, ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
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
