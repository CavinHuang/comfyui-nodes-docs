---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Fake Scribble Lines (aka scribble_hed)
## Documentation
- Class name: `FakeScribblePreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The FakeScribblePreprocessor node is designed for preprocessing images to simulate scribble lines, leveraging a modified HED (Holistically-Nested Edge Detection) model. This node aims to produce images with scribble-like lines, which can be useful in various image processing and computer vision tasks, especially in contexts where the stylization of edges as scribbles is desired.
## Input types
### Required
- **`image`**
    - The input image to be processed for scribble line simulation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`safe`**
    - A mode that, when enabled, applies a safety mechanism to the preprocessing, potentially altering the processing to avoid undesirable effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - The resolution at which the image processing should be executed. This parameter allows for adjusting the detail level of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with simulated scribble lines, processed from the input image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



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
