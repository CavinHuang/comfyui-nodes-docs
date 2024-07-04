
# Documentation
- Class name: AV_ControlNetLoader
- Category: Art Venture/Loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_ControlNetLoader节点用于加载控制网络配置，以在艺术和设计应用中使用。它支持通过名称加载特定的控制网络模型，并可选择性地进行覆盖和时间步关键帧调整，从而在创意工作流程中实现动态和灵活的控制网络应用。

# Input types
## Required
- control_net_name
    - 指定要加载的控制网络的名称。该参数对于识别要应用的控制网络配置至关重要，能够实现艺术生成过程的定制化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
## Optional
- control_net_override
    - 允许指定替代的控制网络，以代替'control_net_name'中命名的网络，为控制网络选择提供了灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- timestep_keyframe
    - 可选参数，用于为控制网络指定特定的时间步关键帧，实现对控制网络应用方式的精细调整。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: str

# Output types
- control_net
    - 返回已加载的控制网络配置，可直接用于艺术生成过程。
    - Comfy dtype: CONTROL_NET
    - Python dtype: Optional[ControlNetType]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetLoader(ControlNetLoader):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"control_net_name": (folder_paths.get_filename_list("controlnet"),)},
            "optional": {
                "control_net_override": ("STRING", {"default": "None"}),
                "timestep_keyframe": ("TIMESTEP_KEYFRAME",),
            },
        }

    RETURN_TYPES = ("CONTROL_NET",)
    FUNCTION = "load_controlnet"
    CATEGORY = "Art Venture/Loaders"

    def load_controlnet(self, control_net_name, control_net_override="None", timestep_keyframe=None):
        return load_controlnet(control_net_name, control_net_override, timestep_keyframe=timestep_keyframe)

```
