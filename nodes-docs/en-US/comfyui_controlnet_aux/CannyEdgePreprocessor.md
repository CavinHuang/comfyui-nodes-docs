---
tags:
- DepthMap
- Image
- ImageFilter
- ImagePreprocessing
---

# Canny Edge
## Documentation
- Class name: `CannyEdgePreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The CannyEdgePreprocessor node is designed for edge detection in images using the Canny algorithm. It preprocesses images by applying a Canny edge detector to highlight the edges within the image, making it suitable for further image processing or analysis tasks.
## Input types
### Required
- **`image`**
    - The image parameter is the input image on which edge detection will be performed using the Canny algorithm.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`low_threshold`**
    - The low_threshold parameter sets the lower bound for the hysteresis thresholding step in the Canny edge detection algorithm. It helps in identifying the weak edges in the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`high_threshold`**
    - The high_threshold parameter sets the upper bound for the hysteresis thresholding step in the Canny edge detection algorithm. It is crucial for distinguishing strong edges in the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The resolution parameter specifies the resolution to which the input image will be resized before applying the Canny edge detection algorithm.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image where the edges have been highlighted using the Canny edge detection algorithm.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - Reroute
    - [Control Net Stacker](../../efficiency-nodes-comfyui/Nodes/Control Net Stacker.md)
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)



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
