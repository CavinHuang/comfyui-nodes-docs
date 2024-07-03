
# Documentation
- Class name: Inference_Core_SAMPreprocessor
- Category: ControlNet Preprocessors/others
- Output node: False

SAM预处理器节点旨在使用SAM（Segment Anything Model）架构对图像进行分割。它利用预训练的SAM模型来处理图像，根据需要调整图像分辨率，并返回分割后的输出。

# Input types
## Required
- image
    - 需要进行分割的输入图像。这是SAM预处理器操作的主要数据，用于确定图像中的感兴趣区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Optional
- resolution
    - 指定在分割之前应将输入图像缩放到的分辨率。这会影响分割输出的精细度和质量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输入图像的分割版本，突出显示由SAM模型确定的不同区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SAM_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types()

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/others"

    def execute(self, image, resolution=512, **kwargs):
        from controlnet_aux.sam import SamDetector

        mobile_sam = SamDetector.from_pretrained().to(model_management.get_torch_device())
        out = common_annotator_call(mobile_sam, image, resolution=resolution)
        del mobile_sam
        return (out, )

```
