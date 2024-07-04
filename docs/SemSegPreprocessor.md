
# Documentation
- Class name: SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SemSegPreprocessor 节点是为语义分割任务设计的图像预处理工具。它利用 UniFormer 模型执行语义分割，将输入图像转换为分割后的输出，根据语义类别对每个像素进行分类。此节点是在语义分割领域为进一步分析或模型训练准备图像的关键步骤。

# Input types
## Required
- image
    - 待处理的输入图像，用于语义分割。该参数至关重要，因为它代表了将被转换为语义分割图像的原始数据，从而实现进一步的分析或模型训练。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定在进行语义分割之前将输入图像调整到的分辨率。此参数影响分割输出的精细程度，较高的分辨率可能会产生更详细的分割结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 语义分割过程的输出结果。这是输入图像的分割版本，其中每个像素根据其语义类别进行分类。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
