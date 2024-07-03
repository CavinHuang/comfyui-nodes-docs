
# Documentation
- Class name: `Inference_Core_TEEDPreprocessor`
- Category: `ControlNet Preprocessors/Line Extractors`
- Output node: `False`

TEED Preprocessor节点专门用于预处理图像，以使用TEDDetector模型提取软边缘线条。它根据提供的安全步骤和分辨率调整图像处理过程，为控制网应用进行优化。

# Input types
## Required
- **`image`**
    - 需要处理以提取软边缘线条的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- **`safe_steps`**
    - 指定预处理过程中使用的安全步骤数量，影响线条提取的全面性和潜在质量。
    - Comfy dtype: INT
    - Python dtype: int
- **`resolution`**
    - 指定图像处理的分辨率，影响提取线条的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- **`image`**
    - 输出是一张经过处理以突出显示软边缘线条的图像，适用于进一步处理或分析。
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
