
# Documentation
- Class name: OneFormer-COCO-SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False

OneFormer COCO Segmentor节点使用经过COCO数据集训练的预训练OneFormer模型对图像进行语义分割。它旨在识别和描绘图像中的每个语义对象，从而在像素级别上增强对图像内容的理解。

# Input types
## Required
- image
    - 需要进行语义分割的输入图像。这个参数至关重要，因为它直接影响分割输出，决定了图像中的对象及其边界。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定在进行分割之前将输入图像调整到的分辨率。这个参数影响分割输出的细节水平，较高的分辨率可能会导致更精确的分割结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 语义分割过程的输出，表现为一幅图像，其中每个像素的值对应一个语义类别。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
