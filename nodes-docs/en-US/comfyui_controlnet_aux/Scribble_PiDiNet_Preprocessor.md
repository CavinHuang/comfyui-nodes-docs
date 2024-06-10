---
tags:
- DepthMap
- Image
- ImagePreprocessing
- LineExtraction
---

# Scribble PiDiNet Lines
## Documentation
- Class name: `Scribble_PiDiNet_Preprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

This node preprocesses images to extract scribble lines using the PiDiNet model, enhancing them for further processing or visualization. It focuses on generating clear, scribble-like lines from input images, making it suitable for applications requiring stylized line drawings or sketches.
## Input types
### Required
- **`image`**
    - The input image to be processed for scribble line extraction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`safe`**
    - A mode that, when enabled, applies additional safety checks or constraints during the processing to ensure robustness.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resolution`**
    - The resolution to which the input image is scaled before processing. This affects the detail level of the extracted lines.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed image with enhanced scribble lines, suitable for visualization or further processing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Scribble_PiDiNet_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            safe=(["enable", "disable"], {"default": "enable"})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, safe, resolution):
        def model(img, **kwargs):
            from controlnet_aux.pidi import PidiNetDetector
            pidinet = PidiNetDetector.from_pretrained().to(model_management.get_torch_device())
            result = pidinet(img, scribble=True, **kwargs)
            result = nms(result, 127, 3.0)
            result = cv2.GaussianBlur(result, (0, 0), 3.0)
            result[result > 4] = 255
            result[result < 255] = 0
            return result
        return (common_annotator_call(model, image, resolution=resolution, safe=safe=="enable"),)

```
