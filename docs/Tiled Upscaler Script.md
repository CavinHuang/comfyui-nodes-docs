
# Documentation
- Class name: Tiled Upscaler Script
- Category: Efficiency Nodes/Scripts
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Tiled Upscaler Script节点是一个专门用于通过分块采样和升尺度技术来提高图像分辨率的工具。它采用了多种升尺度策略，包括潜在空间和像素级方法，以高效地提升图像质量。该节点能够处理不同的分块策略，应用降噪滤波器，并可选择性地使用控制网络来获得更精确的升尺度结果。

# Input types
## Required
- upscale_by
    - 指定图像应该被放大的倍数。这直接影响图像整体分辨率的提升程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tile_size
    - 决定升尺度过程中使用的分块大小，影响升尺度的精细度和潜在的性能表现。
    - Comfy dtype: INT
    - Python dtype: int
- tiling_strategy
    - 定义升尺度过程中的分块策略，影响图像如何被分割和处理。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- tiling_steps
    - 表示分块过程中要执行的步骤或迭代次数，影响升尺度操作的深度。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 为随机数生成提供种子，确保升尺度过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- denoise
    - 启用或禁用升尺度过程中的降噪滤波器应用，影响图像清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: bool
- use_controlnet
    - 决定是否在升尺度过程中使用控制网络，允许进行更精确的调整。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tile_controlnet
    - 如果use_controlnet为true，则指定要应用的控制网络，用于指导升尺度过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength
    - 调整升尺度效果的强度，允许对最终图像外观进行更精细的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Optional
- script
    - 可选的脚本参数，用于进一步自定义升尺度过程。
    - Comfy dtype: SCRIPT
    - Python dtype: dict

# Output types
- script
    - 返回包含升尺度参数的修改后脚本，为进一步处理做好准备。
    - Comfy dtype: SCRIPT
    - Python dtype: dict


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TSC_Tiled_Upscaler:
    @classmethod
    def INPUT_TYPES(cls):
        # Split the list based on the keyword "tile"
        cnet_filenames = [name for name in folder_paths.get_filename_list("controlnet")]

        return {"required": {"upscale_by": ("FLOAT", {"default": 1.25, "min": 0.01, "max": 8.0, "step": 0.05}),
                             "tile_size": ("INT", {"default": 512, "min": 256, "max": MAX_RESOLUTION, "step": 64}),
                             "tiling_strategy": (["random", "random strict", "padded", 'simple', 'none'],),
                             "tiling_steps": ("INT", {"default": 30, "min": 1, "max": 10000}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "denoise": ("FLOAT", {"default": .4, "min": 0.0, "max": 1.0, "step": 0.01}),
                             "use_controlnet": ("BOOLEAN", {"default": False}),
                             "tile_controlnet": (cnet_filenames,),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             },
                "optional": {"script": ("SCRIPT",)}}

    RETURN_TYPES = ("SCRIPT",)
    FUNCTION = "tiled_sampling"
    CATEGORY = "Efficiency Nodes/Scripts"

    def tiled_sampling(self, upscale_by, tile_size, tiling_strategy, tiling_steps, seed, denoise,
                       use_controlnet, tile_controlnet, strength, script=None):
        if tiling_strategy != 'none':
            script = script or {}
            tile_controlnet = ControlNetLoader().load_controlnet(tile_controlnet)[0] if use_controlnet else None

            script["tile"] = (upscale_by, tile_size, tiling_strategy, tiling_steps, seed, denoise, tile_controlnet, strength)
        return (script,)

```
