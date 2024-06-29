---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# OneFormer ADE20K Segmentor
## Documentation
- Class name: `OneFormer-ADE20K-SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

This node is designed for semantic segmentation tasks using the OneFormer model pre-trained on the ADE20K dataset. It processes images to segment them semantically, identifying and categorizing each pixel into a predefined class based on the ADE20K dataset.
## Input types
### Required
- **`image`**
    - The input image to be semantically segmented. This image is processed by the OneFormer model to identify and categorize each pixel.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - The resolution to which the input image is resized before processing. This affects the detail level of the segmentation output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the semantic segmentation process. It is an image where each pixel is categorized into a class based on the ADE20K dataset.
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
