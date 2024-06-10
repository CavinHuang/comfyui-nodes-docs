---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] Realistic Lineart
## Documentation
- Class name: `Inference_Core_LineArtPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The Inference_Core_LineArtPreprocessor node is designed to preprocess images by extracting line art with a realistic style. It utilizes a specialized model to transform input images into line drawings, aiming to enhance or prepare the images for further processing or artistic applications.
## Input types
### Required
- **`image`**
    - The input image to be processed for line art extraction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`coarse`**
    - Determines whether the line art extraction should be performed in a coarse manner. Enabling this option modifies the extraction process to potentially alter the level of detail in the resulting line art.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution at which the line art extraction should be performed, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image that has been processed to extract line art, reflecting a realistic style.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LineArt_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            coarse=(["disable", "enable"], {"default": "disable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.lineart import LineartDetector

        model = LineartDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, coarse = kwargs["coarse"] == "enable")
        del model
        return (out, )

```
