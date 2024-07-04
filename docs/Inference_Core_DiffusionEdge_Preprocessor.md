
# Documentation
- Class name: Inference_Core_DiffusionEdge_Preprocessor
- Category: ControlNet Preprocessors/Line Extractors
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

本节点旨在通过应用扩散边缘检测算法来预处理图像，以便进行后续处理。它根据指定的环境和补丁批处理大小增强图像中的边缘，适用于需要详细边缘信息的任务，如控制网络中的线条提取。

# Input types
## Required
- image
    - 需要通过扩散边缘检测算法处理的输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- environment
    - 指定边缘检测模型的环境设置，影响模型的行为和产生的边缘增强效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- patch_batch_size
    - 确定同时处理的图像补丁数量，影响执行速度和内存使用。
    - Comfy dtype: INT
    - Python dtype: int
- resolution
    - 处理前将输入图像调整至的分辨率，影响检测到的边缘的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 边缘增强后的处理图像，可用于进一步处理或可视化。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
