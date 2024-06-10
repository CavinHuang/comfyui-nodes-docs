---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# Semantic Segmentor (legacy, alias for UniFormer)
## Documentation
- Class name: `SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

The SemSegPreprocessor node is designed for preprocessing images for semantic segmentation tasks. It utilizes the UniFormer model to perform semantic segmentation, transforming input images into segmented outputs that categorize each pixel according to its semantic class. This node serves as a crucial step in preparing images for further analysis or model training within the domain of semantic segmentation.
## Input types
### Required
- **`image`**
    - The input image to be processed for semantic segmentation. This parameter is crucial as it represents the raw data that will be transformed into a semantically segmented image, enabling further analysis or model training.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image is resized before semantic segmentation. This parameter affects the granularity of the segmentation output, with higher resolutions potentially leading to more detailed segmentations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the semantic segmentation process. This is a segmented version of the input image, where each pixel is categorized according to its semantic class.
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
