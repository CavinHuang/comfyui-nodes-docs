---
tags:
- DepthMap
- Image
- ImageFilter
- ImagePreprocessing
---

# [Inference.Core] Canny Edge
## Documentation
- Class name: `Inference_Core_CannyEdgePreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The Canny Edge Preprocessor node is designed for edge detection in images, utilizing the Canny edge detection algorithm to highlight the contours and edges within an image. This preprocessing step is crucial for tasks that require clear delineation of object boundaries, such as in image segmentation or feature extraction processes.
## Input types
### Required
- **`image`**
    - The input image to be processed for edge detection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`low_threshold`**
    - Specifies the lower bound for the hysteresis thresholding step in the Canny edge detection algorithm, controlling the detection of weak edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`high_threshold`**
    - Defines the upper bound for the hysteresis thresholding step, determining the detection of strong edges in the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The resolution to which the input image is resized before applying the Canny edge detection algorithm, affecting the detail level of detected edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with edges highlighted using the Canny edge detection technique.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Canny_Edge_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            low_threshold=("INT", {"default": 100, "min": 0, "max": 255, "step": 1}),
            high_threshold=("INT", {"default": 200, "min": 0, "max": 255, "step": 1})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, low_threshold, high_threshold, resolution=512, **kwargs):
        from controlnet_aux.canny import CannyDetector

        return (common_annotator_call(CannyDetector(), image, low_threshold=low_threshold, high_threshold=high_threshold, resolution=resolution), )

```
