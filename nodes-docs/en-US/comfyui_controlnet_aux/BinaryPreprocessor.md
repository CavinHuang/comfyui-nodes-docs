---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Binary Lines
## Documentation
- Class name: `BinaryPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The BinaryPreprocessor node is designed for preprocessing images by applying a binary thresholding technique. This method converts images into binary images (black and white) based on a specified threshold, which is useful for highlighting certain features or simplifying the image for further processing.
## Input types
### Required
- **`image`**
    - The 'image' parameter is the input image to be processed. It is the primary data on which the binary thresholding operation is performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
### Optional
- **`bin_threshold`**
    - The 'bin_threshold' parameter specifies the cutoff value for converting pixel values in the image to either black or white. Pixels with values above this threshold are turned white, and those below are turned black, aiding in the extraction of prominent features from the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The 'resolution' parameter specifies the resolution to which the input image is resized before applying the binary thresholding. This allows for consistent processing across images of varying original resolutions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a binary (black and white) version of the input image, where the conversion is based on the specified bin_threshold value.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Binary_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            bin_threshold=("INT", {"default": 100, "min": 0, "max": 255, "step": 1})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, bin_threshold, resolution=512, **kwargs):
        from controlnet_aux.binary import BinaryDetector

        return (common_annotator_call(BinaryDetector(), image, bin_threshold=bin_threshold, resolution=resolution), )

```
