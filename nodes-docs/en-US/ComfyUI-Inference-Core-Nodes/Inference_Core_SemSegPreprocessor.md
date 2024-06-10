---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# [Inference.Core] Semantic Segmentor (legacy, alias for UniFormer)
## Documentation
- Class name: `Inference_Core_SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

The Inference_Core_SemSegPreprocessor node is designed to preprocess images for semantic segmentation tasks within a Detectron2 framework. It integrates custom modifications and configurations to adapt to specific segmentation needs, such as anime face segmentation, and ensures images are correctly formatted and enhanced for optimal segmentation performance.
## Input types
### Required
- **`image`**
    - The image parameter is the primary input for the semantic segmentation preprocessing, representing the image to be processed. It is essential for the node to perform the necessary adjustments and enhancements to prepare the image for segmentation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - The resolution parameter specifies the desired resolution for the image preprocessing. It plays a crucial role in adjusting the image size to meet the requirements of the segmentation model, impacting the quality and accuracy of the segmentation results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image output represents the preprocessed image, ready for semantic segmentation analysis. This output is the result of various preprocessing steps applied to enhance and format the image for optimal segmentation performance.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Uniformer_SemSegPreprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "semantic_segmentate"

    CATEGORY = "ControlNet Preprocessors/Semantic Segmentation"

    def semantic_segmentate(self, image, resolution=512):
        from controlnet_aux.uniformer import UniformerSegmentor

        model = UniformerSegmentor.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out, )

```
