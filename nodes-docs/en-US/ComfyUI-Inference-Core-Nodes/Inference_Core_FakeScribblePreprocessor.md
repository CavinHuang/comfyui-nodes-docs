---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] Fake Scribble Lines (aka scribble_hed)
## Documentation
- Class name: `Inference_Core_FakeScribblePreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The Inference_Core_FakeScribblePreprocessor node is designed for preprocessing images to generate fake scribble lines, simulating the appearance of hand-drawn scribbles. It utilizes a modified HED edge detection model to create stylized line drawings that mimic the scribble effect, offering an alternative to traditional edge detection methods for artistic and creative applications.
## Input types
### Required
- **`image`**
    - The input image to be processed for fake scribble line generation. It serves as the primary data for the node's execution, determining the visual output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`safe`**
    - A mode selector that enables or disables safety features during the image processing, affecting the final appearance of the scribble lines.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution at which the image processing should be performed, impacting the detail level of the generated scribble lines.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with fake scribble lines, representing a stylized version of the original input.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Fake_Scribble_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            safe=(["enable", "disable"], {"default": "enable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.hed import HEDdetector
        
        model = HEDdetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, scribble=True, safe=kwargs["safe"]=="enable")
        del model
        return (out, )

```
