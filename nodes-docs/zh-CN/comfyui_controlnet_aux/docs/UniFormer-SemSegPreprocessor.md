
# Documentation
- Class name: UniFormer-SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False

UniFormer-SemSegPreprocessor节点是一个专门用于语义分割任务的处理器，属于ControlNet预处理器中的语义分割类别。它利用UniformerSegmentor模型来处理图像，旨在理解并将图像分割成不同的语义区域，这些区域基于学习到的表示。

# Input types
## Required
- image
    - 需要进行语义分割的输入图像。这个参数至关重要，因为它是模型执行分割操作的主要数据源。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定在处理前将输入图像调整到的分辨率。这会影响分割输出的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 语义分割过程的输出，是一个被分割成不同语义区域的图像。
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
