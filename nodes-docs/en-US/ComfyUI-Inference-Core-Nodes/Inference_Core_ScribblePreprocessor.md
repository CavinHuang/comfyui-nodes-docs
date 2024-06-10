---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] Scribble Lines
## Documentation
- Class name: `Inference_Core_ScribblePreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The ScribblePreprocessor node is designed for preprocessing images to detect and extract scribble lines. It utilizes a specialized model to process the input image and enhance or isolate scribble-like features, making it suitable for applications requiring line extraction or artistic effect enhancements.
## Input types
### Required
- **`image`**
    - The input image to be processed for scribble line detection and extraction. This parameter is crucial for defining the visual content that the model will analyze and manipulate.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image is scaled before processing. A higher resolution can lead to more detailed scribble line detection but may increase computation time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with scribble lines detected and enhanced or isolated, suitable for further artistic or analytical applications.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


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
