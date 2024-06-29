---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# [Inference.Core] OneFormer ADE20K Segmentor
## Documentation
- Class name: `Inference_Core_OneFormer-ADE20K-SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

This node is designed for semantic segmentation tasks using the OneFormer model specifically trained on the ADE20K dataset. It preprocesses images to facilitate semantic segmentation, leveraging a pretrained OneFormer model to analyze and segment the input image into different semantic categories based on the ADE20K dataset standards.
## Input types
### Required
- **`image`**
    - The input image to be semantically segmented. This image is processed and segmented into different semantic categories using the OneFormer model.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution for the output image after segmentation. This affects the level of detail and size of the segmented output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the semantic segmentation process, which is an image segmented into different semantic categories.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class OneFormer_ADE20K_SemSegPreprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "semantic_segmentate"

    CATEGORY = "ControlNet Preprocessors/Semantic Segmentation"

    def semantic_segmentate(self, image, resolution=512):
        from controlnet_aux.oneformer import OneformerSegmentor

        model = OneformerSegmentor.from_pretrained(filename="250_16_swin_l_oneformer_ade20k_160k.pth")
        model = model.to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out,)

```
