---
tags:
- DepthMap
- Image
- ImageFilter
- ImagePreprocessing
---

# Canny
## Documentation
- Class name: `Canny`
- Category: `image/preprocessors`
- Output node: `False`

The Canny node is designed for edge detection in images, utilizing the Canny algorithm to identify and highlight the edges. This process involves applying a series of filters to the input image to detect areas of high gradient, which correspond to edges, thereby enhancing the image's structural details.
## Input types
### Required
- **`image`**
    - The input image to be processed for edge detection. It is crucial as it serves as the base for the edge detection operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`low_threshold`**
    - The lower threshold for the hysteresis procedure in edge detection. It determines the minimum intensity gradient considered for an edge, affecting the sensitivity of edge detection.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`high_threshold`**
    - The upper threshold for the hysteresis procedure in edge detection. It sets the maximum intensity gradient considered for an edge, influencing the selectivity of edge detection.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image with highlighted edges, where the edges are detected using the Canny algorithm. This enhances the structural details of the original image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - Reroute



## Source code
```python
class Canny:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image": ("IMAGE",),
                                "low_threshold": ("FLOAT", {"default": 0.4, "min": 0.01, "max": 0.99, "step": 0.01}),
                                "high_threshold": ("FLOAT", {"default": 0.8, "min": 0.01, "max": 0.99, "step": 0.01})
                                }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "detect_edge"

    CATEGORY = "image/preprocessors"

    def detect_edge(self, image, low_threshold, high_threshold):
        output = canny(image.to(comfy.model_management.get_torch_device()).movedim(-1, 1), low_threshold, high_threshold)
        img_out = output[1].to(comfy.model_management.intermediate_device()).repeat(1, 3, 1, 1).movedim(1, -1)
        return (img_out,)

```
