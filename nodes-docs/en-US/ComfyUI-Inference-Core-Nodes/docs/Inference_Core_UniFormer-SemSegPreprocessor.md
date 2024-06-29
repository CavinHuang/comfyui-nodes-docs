---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# [Inference.Core] UniFormer Segmentor
## Documentation
- Class name: `Inference_Core_UniFormer-SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

This node is designed for semantic segmentation tasks, utilizing the UniFormer model to process images and generate semantic segmentation maps. It abstracts the complexity of model loading, image preprocessing, and inference into a streamlined operation, enabling efficient and accurate segmentation of images.
## Input types
### Required
- **`image`**
    - The input image to be semantically segmented. This parameter is crucial for determining the content and structure of the output segmentation map.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image is resized before processing. This affects the granularity and quality of the segmentation output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output semantic segmentation map of the input image, represented as a tensor.
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
