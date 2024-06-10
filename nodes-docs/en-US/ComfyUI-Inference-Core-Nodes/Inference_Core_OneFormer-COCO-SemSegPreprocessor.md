---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# [Inference.Core] OneFormer COCO Segmentor
## Documentation
- Class name: `Inference_Core_OneFormer-COCO-SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

This node is designed for semantic segmentation tasks using the OneFormer model specifically trained on the COCO dataset. It preprocesses images to facilitate semantic segmentation, leveraging a pretrained OneFormer model to analyze and segment the input image into different semantic categories.
## Input types
### Required
- **`image`**
    - The input image to be semantically segmented. This image is processed by the OneFormer model to identify and categorize different semantic elements within the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - The resolution parameter specifies the desired output resolution of the segmented image. It affects the granularity and quality of the semantic segmentation performed by the OneFormer model.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a semantically segmented image, where each pixel is classified into one of the semantic categories defined by the COCO dataset.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class OneFormer_COCO_SemSegPreprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "semantic_segmentate"

    CATEGORY = "ControlNet Preprocessors/Semantic Segmentation"

    def semantic_segmentate(self, image, resolution=512):
        from controlnet_aux.oneformer import OneformerSegmentor

        model = OneformerSegmentor.from_pretrained(filename="150_16_swin_l_oneformer_coco_100ep.pth")
        model = model.to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution)
        del model
        return (out,)

```
