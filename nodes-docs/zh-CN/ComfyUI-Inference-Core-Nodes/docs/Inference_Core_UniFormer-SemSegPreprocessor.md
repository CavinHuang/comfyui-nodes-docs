
# Documentation
- Class name: Inference_Core_UniFormer-SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False

该节点是为语义分割任务设计的，它利用UniFormer模型来处理图像并生成语义分割图。该节点将模型加载、图像预处理和推理等复杂操作抽象为一个流畅的过程，从而实现高效准确的图像分割。

# Input types
## Required
- image
    - 需要进行语义分割的输入图像。这个参数对于确定输出分割图的内容和结构至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定在处理前将输入图像调整到的分辨率。这会影响分割输出的精细度和质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输入图像的语义分割图，以张量形式表示。
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
