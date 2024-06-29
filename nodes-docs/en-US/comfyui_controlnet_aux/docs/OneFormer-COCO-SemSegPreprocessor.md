---
tags:
- Segmentation
- SemanticSegmentationPreprocessing
---

# OneFormer COCO Segmentor
## Documentation
- Class name: `OneFormer-COCO-SemSegPreprocessor`
- Category: `ControlNet Preprocessors/Semantic Segmentation`
- Output node: `False`

This node utilizes a pre-trained OneFormer model specifically trained on the COCO dataset to perform semantic segmentation on images. It aims to identify and delineate each semantic object within an image, enhancing the understanding of its content at a pixel level.
## Input types
### Required
- **`image`**
    - The input image to be semantically segmented. This parameter is crucial as it directly influences the segmentation output, determining the objects and their boundaries within the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`resolution`**
    - Specifies the resolution to which the input image is resized before segmentation. This parameter affects the detail level of the segmentation output, with higher resolutions potentially leading to more precise segmentations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the semantic segmentation process, represented as an image where each pixel's value corresponds to a semantic class.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImageToMask](../../Comfy/Nodes/ImageToMask.md)
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)



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
