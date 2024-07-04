
# Documentation
- Class name: SAMPreprocessor
- Category: ControlNet Preprocessors/others
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SAMPreprocessor节点的设计目的是使用SAM(Segment Anything Model)方法对图像进行分割。它预处理图像以增强其效果，为进一步的处理或分析做准备，特别聚焦于分割任务。

# Input types
## Required
- image
    - 需要进行分割的输入图像。这是SAMPreprocessor操作的主要数据，旨在识别和分割图像中的各种元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- resolution
    - 指定在处理前将输入图像调整至的分辨率。此参数可能会影响分割的精度和性能。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是输入图像的分割版本，其中不同的分割部分被识别和分离。
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
