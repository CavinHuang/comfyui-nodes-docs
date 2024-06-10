---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Realistic Lineart
## Documentation
- Class name: `LineArtPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The LineArtPreprocessor node is designed for extracting line art from images, specifically focusing on creating realistic line art representations. It utilizes a specialized model to process images and optionally allows for the adjustment of the line art's coarseness.
## Input types
### Required
- **`image`**
    - The input image to be processed for line art extraction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`coarse`**
    - This parameter allows users to toggle the coarseness of the line art extraction, enabling a choice between a more detailed or a more generalized representation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution at which the image should be processed, affecting the detail level of the extracted line art.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image that has been processed to extract realistic line art, suitable for various artistic and design applications.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)
    - [Control Net Stacker](../../efficiency-nodes-comfyui/Nodes/Control Net Stacker.md)
    - [ImageInvert](../../Comfy/Nodes/ImageInvert.md)
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)



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
