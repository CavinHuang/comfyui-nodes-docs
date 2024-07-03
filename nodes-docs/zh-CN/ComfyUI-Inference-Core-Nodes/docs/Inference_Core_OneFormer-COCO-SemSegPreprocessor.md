
# Documentation
- Class name: Inference_Core_OneFormer-COCO-SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False

该节点是专门为使用OneFormer模型进行语义分割任务而设计的，特别是针对COCO数据集训练的模型。它预处理图像以便进行语义分割，利用预训练的OneFormer模型分析输入图像并将其分割成不同的语义类别。

# Input types
## Required
- image
    - 需要进行语义分割的输入图像。该图像将由OneFormer模型处理，以识别和分类图像中的不同语义元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - resolution参数指定分割后图像的期望输出分辨率。它影响OneFormer模型执行语义分割的颗粒度和质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个语义分割后的图像，其中每个像素都被分类为COCO数据集定义的语义类别之一。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
