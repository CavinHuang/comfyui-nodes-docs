---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] PiDiNet Soft-Edge Lines
## Documentation
- Class name: `Inference_Core_PiDiNetPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The PiDiNet Preprocessor node is designed for preprocessing images to extract soft-edge lines, utilizing the PiDiNet model for enhanced line detection. It supports configurable safety modes and resolution settings to adapt to various image processing needs.
## Input types
### Required
- **`image`**
    - The input image to be processed for line extraction. It is the primary data on which the PiDiNet model operates.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`safe`**
    - A mode that enables or disables safety checks during image processing, affecting the execution path and potentially the output quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - The resolution to which the input image is resized before processing, impacting the detail level of the extracted lines.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with extracted lines, showcasing the capabilities of the PiDiNet model in enhancing line detection.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PIDINET_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            safe=(["enable", "disable"], {"default": "enable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, safe, resolution=512, **kwargs):
        from controlnet_aux.pidi import PidiNetDetector

        model = PidiNetDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, safe = safe == "enable")
        del model
        return (out, )

```
