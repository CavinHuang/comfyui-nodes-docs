---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# M-LSD Lines
## Documentation
- Class name: `M-LSDPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The M-LSDPreprocessor node is designed for extracting line segments from images using the M-LSD (Multiple Line Segment Detector) model. It processes images to detect and delineate line structures, which can be crucial for various computer vision tasks that require understanding of geometric shapes and boundaries.
## Input types
### Required
- **`image`**
    - The input image to be processed for line segment detection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`score_threshold`**
    - Defines the threshold for line segment detection confidence. Higher values result in fewer, but more confident line detections.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`dist_threshold`**
    - Sets the distance threshold for separating line segments. Smaller values lead to finer segmentation of closely spaced lines.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resolution`**
    - Specifies the resolution to which the input image is resized before processing. Affects the scale of detected line segments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs an image with detected line segments superimposed or highlighted, facilitating further processing or analysis.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MLSD_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            score_threshold = ("FLOAT", {"default": 0.1, "min": 0.01, "max": 2.0, "step": 0.01}),
            dist_threshold = ("FLOAT", {"default": 0.1, "min": 0.01, "max": 20.0, "step": 0.01})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, score_threshold, dist_threshold, resolution=512, **kwargs):
        from controlnet_aux.mlsd import MLSDdetector

        model = MLSDdetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, thr_v=score_threshold, thr_d=dist_threshold)
        return (out, )

```
