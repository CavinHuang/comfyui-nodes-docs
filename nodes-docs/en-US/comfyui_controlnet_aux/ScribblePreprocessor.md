---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Scribble Lines
## Documentation
- Class name: `ScribblePreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The ScribblePreprocessor node is designed for preprocessing images to detect scribble lines. It utilizes a specific model to analyze and process the input image, aiming to highlight or extract scribble-like patterns.
## Input types
### Required
- **`image`**
    - The input image to be processed for scribble line detection. This parameter is crucial as it provides the visual data on which the scribble detection model operates.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image is resized before processing. This affects the detail level of the scribble line detection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with scribble lines detected or highlighted. This output is useful for further processing or visualization of scribble patterns.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)



## Source code
```python
class Scribble_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.scribble import ScribbleDetector

        model = ScribbleDetector()
        return (common_annotator_call(model, image, resolution=resolution), )

```
