---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# [Inference.Core] HED Soft-Edge Lines
## Documentation
- Class name: `Inference_Core_HEDPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The HEDPreprocessor node is designed for extracting soft-edge lines from images using the HED (Holistically-Nested Edge Detection) model. It preprocesses images to enhance edge features, facilitating downstream tasks that require detailed edge or line information.
## Input types
### Required
- **`image`**
    - The input image to be processed for edge detection. The resolution parameter allows specifying the desired output resolution, affecting the level of detail in the detected edges.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`safe`**
    - A mode toggle that enables or disables safety checks during edge detection, potentially affecting performance and output quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - Specifies the resolution of the output image, influencing the granularity of detected edges. Higher resolutions yield more detailed edge information.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with enhanced edge details, suitable for use in various image analysis and manipulation tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


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
