
# Documentation
- Class name: TEEDPreprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False

TEEDPreprocessor节点旨在使用TEED (TEDDetector)模型对图像进行预处理，以提取软边缘线条。它通过应用专门的线条提取技术来增强输入图像，使其适用于进一步的处理或分析。

# Input types
## Required
- image
    - 需要进行软边缘线条提取处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- safe_steps
    - 定义线条提取过程中要采取的安全步骤数，影响检测的鲁棒性和敏感性。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 指定图像应该被处理的分辨率，影响提取线条的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个经过线条提取处理的图像，突出显示了软边缘，使其更适合需要详细线条信息的任务。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TEED_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            safe_steps=("INT", {"default": 2, "min": 0, "max": 10})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, safe_steps=2, resolution=512, **kwargs):
        from controlnet_aux.teed import TEDDetector

        model = TEDDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, safe_steps=safe_steps)
        del model
        return (out, )

```
