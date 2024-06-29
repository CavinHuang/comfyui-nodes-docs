---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] Binary Lines
## Documentation
- Class name: `Inference_Core_BinaryPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The Binary Preprocessor node is designed for image preprocessing within the ControlNet Preprocessors/Line Extractors category, specifically focusing on converting images to binary format based on a threshold value. This node applies a binary thresholding technique to extract significant lines or edges from images, facilitating further processing or analysis.
## Input types
### Required
- **`image`**
    - The input image to be processed. It serves as the primary data for the binary thresholding operation, aiming to extract significant lines or edges.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`bin_threshold`**
    - Specifies the threshold value for the binary conversion of images. It determines the cutoff point for classifying pixel values as either black or white, playing a crucial role in the extraction of lines or edges from the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The resolution to which the input image is resized before applying the binary thresholding. This parameter can influence the detail level of the extracted lines or edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image in binary format, where significant lines or edges are highlighted by converting the image based on the specified binary threshold.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
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
