---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# TEEDPreprocessor
## Documentation
- Class name: `TEEDPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

The TEEDPreprocessor node is designed for preprocessing images to extract soft-edge lines using the TEED (TEDDetector) model. It enhances the input image by applying a specialized line extraction technique, making it suitable for further processing or analysis.
## Input types
### Required
- **`image`**
    - The input image to be processed for soft-edge line extraction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`safe_steps`**
    - Defines the number of safe steps to take during the line extraction process, affecting the robustness and sensitivity of the detection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resolution`**
    - Specifies the resolution at which the image should be processed, impacting the detail level of the extracted lines.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image that has undergone line extraction to highlight soft edges, making it more suitable for tasks requiring detailed line information.
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
