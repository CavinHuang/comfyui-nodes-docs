
# Documentation
- Class name: Inference_Core_SemSegPreprocessor
- Category: ControlNet Preprocessors/Semantic Segmentation
- Output node: False

Inference_Core_SemSegPreprocessor节点旨在为Detectron2框架中的语义分割任务预处理图像。它整合了自定义的修改和配置，以适应特定的分割需求，如动漫人脸分割，并确保图像经过正确的格式化和增强，以获得最佳的分割性能。

# Input types
## Required
- image
    - image参数是语义分割预处理的主要输入，代表将要处理的图像。它对节点执行必要的调整和增强以准备图像进行分割至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - resolution参数指定了图像预处理所需的目标分辨率。它在调整图像大小以满足分割模型要求方面起着关键作用，影响分割结果的质量和准确性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出的image代表经过预处理的图像，已准备好进行语义分割分析。这个输出是应用各种预处理步骤的结果，旨在增强和格式化图像以获得最佳的分割性能。
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
