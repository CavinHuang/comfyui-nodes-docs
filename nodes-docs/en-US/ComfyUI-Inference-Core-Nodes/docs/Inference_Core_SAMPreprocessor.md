---
tags:
- SAM
---

# [Inference.Core] SAM Segmentor
## Documentation
- Class name: `Inference_Core_SAMPreprocessor`
- Category: `ControlNet Preprocessors/others`
- Output node: `False`

The SAM Preprocessor node is designed for segmenting images using the SAM (Segment Anything Model) architecture. It leverages a pretrained SAM model to process images, adjusting their resolution as needed, and returns the segmented output.
## Input types
### Required
- **`image`**
    - The input image to be segmented. This is the primary data the SAM Preprocessor operates on, determining the areas of interest within the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image should be scaled before segmentation. This affects the granularity and quality of the segmentation output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The segmented version of the input image, highlighting different regions as determined by the SAM model.
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
