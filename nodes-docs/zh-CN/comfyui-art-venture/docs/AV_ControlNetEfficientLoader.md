
# Documentation
- Class name: AV_ControlNetEfficientLoader
- Category: Art Venture/Loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_ControlNetEfficientLoader节点专门用于高效加载ControlNet配置，通过采用先进技术来优化加载过程，从而提高性能和资源利用率。它扩展了标准ControlNet加载器的功能，使其更适用于需要高效率的场景。

# Input types
## Required
- control_net_name
    - 指定要加载的ControlNet配置的名称。这个参数对于确定要访问和加载哪个配置文件至关重要，直接影响节点的操作，决定了要使用的具体ControlNet。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- conditioning
    - 与ControlNet结合使用的条件数据，通过根据指定条件调整模型的行为来影响最终输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: list
- image
    - ControlNet将处理的图像输入，作为应用ControlNet效果或转换的基础。
    - Comfy dtype: IMAGE
    - Python dtype: object
- strength
    - 决定ControlNet应用于图像的强度，允许对效果强度进行微调控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- preprocessor
    - 指定在应用ControlNet之前用于图像的预处理器，影响输入图像的条件及其与ControlNet的兼容性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- control_net_override
    - 允许动态覆盖指定的ControlNet配置。这种灵活性对于可能需要根据条件或运行时决策使用替代配置的场景至关重要，从而影响加载过程的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- timestep_keyframe
    - 定义要加载的ControlNet配置中的特定时间步或关键帧。此参数能够精确控制加载过程，允许有针对性地访问ControlNet的特定部分，这对于时间或序列应用可能至关重要。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: str
- resolution
    - 应该处理图像的分辨率，影响ControlNet应用的质量和细节。
    - Comfy dtype: INT
    - Python dtype: int
- enabled
    - 用于启用或禁用ControlNet加载和应用过程的标志，提供了有条件地绕过此节点操作的机制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- conditioning
    - 返回应用ControlNet后的条件数据，反映了处理过程中所做的任何修改或增强。
    - Comfy dtype: CONDITIONING
    - Python dtype: list


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetEfficientLoader(ControlNetApply):
    controlnets = folder_paths.get_filename_list("controlnet")
    preprocessors = list(control_net_preprocessors.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "control_net_name": (["None"] + s.controlnets,),
                "conditioning": ("CONDITIONING",),
                "image": ("IMAGE",),
                "strength": (
                    "FLOAT",
                    {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01},
                ),
                "preprocessor": (["None"] + s.preprocessors,),
            },
            "optional": {
                "control_net_override": ("STRING", {"default": "None"}),
                "timestep_keyframe": ("TIMESTEP_KEYFRAME",),
                "resolution": ("INT", {"default": 512, "min": 64, "max": 2048, "step": 64}),
                "enabled": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "load_controlnet"
    CATEGORY = "Art Venture/Loaders"

    def load_controlnet(
        self,
        control_net_name,
        conditioning,
        image,
        strength,
        preprocessor,
        control_net_override="None",
        timestep_keyframe=None,
        resolution=512,
        enabled=True,
    ):
        if not enabled:
            return (conditioning,)

        control_net = load_controlnet(control_net_name, control_net_override, timestep_keyframe=timestep_keyframe)
        if control_net is None:
            return (conditioning,)

        image = apply_preprocessor(image, preprocessor, resolution=resolution)

        return super().apply_controlnet(conditioning, control_net, image, strength)

```
