---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# HED Soft-Edge Lines
## Documentation
- Class name: `HEDPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The HEDPreprocessor node is designed for extracting soft-edge lines from images using the HED (Holistically-Nested Edge Detection) model. It preprocesses images to enhance or isolate their line features, making it suitable for tasks that require detailed edge or line detection.
## Input types
### Required
- **`image`**
    - The input image to be processed for edge detection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`safe`**
    - A toggle to enable or disable safety checks during processing, potentially affecting the output's fidelity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - The resolution to which the input image is resized before processing. Higher resolutions may improve detail at the cost of increased computation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with enhanced or isolated soft-edge lines.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)



## Source code
```python
class HED_Preprocessor:
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
        out = common_annotator_call(model, image, resolution=resolution, safe = kwargs["safe"] == "enable")
        del model
        return (out, )

```
