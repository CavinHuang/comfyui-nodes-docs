
# Documentation
- Class name: DiffusionEdge_Preprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DiffusionEdge_Preprocessor节点是为了使用基于扩散的边缘检测模型来预处理图像以提取边缘图而设计的。它支持特定环境的模型加载和可调整的分块处理，以实现性能优化。

# Input types
## Required
- image
    - 需要进行边缘检测处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
## Optional
- environment
    - 指定边缘检测模型的环境上下文（'indoor'、'urban'、'natural'），影响模型的行为和输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- patch_batch_size
    - 确定处理图像块的批量大小，影响边缘检测操作的速度和VRAM使用量。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 在进行边缘检测之前，输入图像被调整到的分辨率，影响输出的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个代表输入图像中检测到的边缘的图像，适用于进一步处理或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DiffusionEdge_Preprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return create_node_input_types(
            environment=(["indoor", "urban", "natrual"], {"default": "indoor"}),
            patch_batch_size=("INT", {"default": 4, "min": 1, "max": 16})
        )

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    CATEGORY = "ControlNet Preprocessors/Line Extractors"

    def execute(self, image, environment="indoor", patch_batch_size=4, resolution=512, **kwargs):
        install_deps()
        from controlnet_aux.diffusion_edge import DiffusionEdgeDetector

        model = DiffusionEdgeDetector \
            .from_pretrained(filename = f"diffusion_edge_{environment}.pt") \
            .to(model_management.get_torch_device())
        out = common_annotator_call(model, image, resolution=resolution, patch_batch_size=patch_batch_size)
        del model
        return (out, )

```
