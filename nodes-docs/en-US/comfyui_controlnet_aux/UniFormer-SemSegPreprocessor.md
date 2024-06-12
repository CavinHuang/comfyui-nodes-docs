---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# UniFormer Segmentor
## Documentation
- Class name: `UniFormer-SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

The UniFormer-SemSegPreprocessor node is designed for semantic segmentation tasks within the ControlNet Preprocessors/Semantic Segmentation category. It utilizes the UniformerSegmentor model to process images, aiming to understand and segment them into different semantic regions based on learned representations.
## Input types
### Required
- **`image`**
    - The input image to be semantically segmented. This parameter is crucial as it is the primary data the model operates on to perform segmentation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image is resized before processing. This affects the detail level of the segmentation output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the semantic segmentation process, which is an image segmented into different semantic regions.
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
