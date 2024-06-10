---
tags:
- SAM
---

# SAM Segmentor
## Documentation
- Class name: `SAMPreprocessor`
- Category: `ControlNet Preprocessors/others`
- Output node: `False`

The SAMPreprocessor node is designed to segment images using the SAM (Segment Anything Model) method. It preprocesses images to enhance them for further processing or analysis, specifically focusing on segmentation tasks.
## Input types
### Required
- **`image`**
    - The input image to be segmented. This is the primary data the SAMPreprocessor operates on, aiming to identify and segment various elements within.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image should be resized before processing. This parameter can influence the segmentation accuracy and performance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a segmented version of the input image, where different segments are identified and separated.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SAM_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/others"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.sam import SamDetector

        mobile_sam = SamDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(mobile_sam, image, resolution=resolution)
        del mobile_sam
        return (out, )

```
