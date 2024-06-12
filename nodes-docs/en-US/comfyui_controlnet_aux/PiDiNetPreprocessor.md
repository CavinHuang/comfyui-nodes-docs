---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# PiDiNet Soft-Edge Lines
## Documentation
- Class name: `PiDiNetPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The PiDiNetPreprocessor node is designed for preprocessing images to extract soft-edge lines, utilizing the PiDiNet model. It aims to enhance image analysis and processing tasks by providing a refined input for further processing or analysis.
## Input types
### Required
- **`image`**
    - The input image to be processed for soft-edge line extraction. It's the primary data the node operates on, aiming to enhance its features for subsequent analysis.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`safe`**
    - A mode selector that determines whether to perform the operation in a safe mode. Enabling 'safe' mode ensures that the preprocessing adheres to safety constraints, potentially affecting the output's fidelity and detail in favor of reducing risks during processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution at which the image should be processed. A higher resolution leads to more detailed extraction of soft-edge lines, while a lower resolution might speed up the process at the cost of detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with extracted soft-edge lines, ready for further analysis or processing steps.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)



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
