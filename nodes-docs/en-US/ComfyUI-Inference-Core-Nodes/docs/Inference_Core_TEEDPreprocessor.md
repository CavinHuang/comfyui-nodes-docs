---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Inference_Core_TEEDPreprocessor
## Documentation
- Class name: `Inference_Core_TEEDPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The TEED Preprocessor node is designed for preprocessing images to extract soft-edge lines using the TEDDetector model. It adjusts the image processing based on the provided safety steps and resolution, optimizing for control net applications.
## Input types
### Required
- **`image`**
    - The input image to be processed for soft-edge line extraction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`safe_steps`**
    - Specifies the number of safety steps to use during preprocessing, affecting the thoroughness and potentially the quality of the line extraction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - The resolution at which the image should be processed, influencing the detail level of the extracted lines.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image that has been processed to highlight soft-edge lines, suitable for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TEED_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            safe_steps=("INT", {"default": 2, "min": 0, "max": 10})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, safe_steps=2, resolution=512, **kwargs):
        from controlnet_aux.teed import TEDDetector

        model = TEDDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, safe_steps=safe_steps)
        del model
        return (out, )

```
