
# Documentation
- Class name: OneFormer-ADE20K-SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False

OneFormer ADE20K Segmentor节点专门用于语义分割任务，它使用在ADE20K数据集上预训练的OneFormer模型。该节点处理输入图像，对其进行语义分割，即根据ADE20K数据集的预定义类别，识别并分类图像中的每个像素。

# Input types
## Required
- image
    - 需要进行语义分割的输入图像。该图像将由OneFormer模型处理，以识别和分类每个像素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 在处理前将输入图像调整到的分辨率。这会影响分割输出的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 语义分割过程的输出。这是一张图像，其中每个像素根据ADE20K数据集被分类到特定类别。
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
