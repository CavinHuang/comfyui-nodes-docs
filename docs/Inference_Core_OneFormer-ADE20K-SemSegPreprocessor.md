
# Documentation
- Class name: Inference_Core_OneFormer-ADE20K-SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False

此节点旨在利用专门在ADE20K数据集上训练的OneFormer模型进行语义分割任务。它预处理图像以促进语义分割，利用预训练的OneFormer模型根据ADE20K数据集标准分析并将输入图像分割成不同的语义类别。

# Input types
## Required
- image
    - 待进行语义分割的输入图像。该图像将使用OneFormer模型进行处理并分割成不同的语义类别。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- resolution
    - 指定分割后输出图像的分辨率。这会影响分割输出的细节水平和尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 语义分割过程的输出，是一张被分割成不同语义类别的图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
