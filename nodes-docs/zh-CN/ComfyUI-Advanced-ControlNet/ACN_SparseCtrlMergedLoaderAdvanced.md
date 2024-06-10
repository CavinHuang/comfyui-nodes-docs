# Documentation
- Class name: SparseCtrlMergedLoaderAdvanced
- Category: Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl/experimental
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

SparseCtrlMergedLoaderAdvanced 节点旨在高效管理和加载具有稀疏控制特性的高级控制网络。它将运动特性集成到控制网络中，允许基于运动强度和规模参数进行动态和自适应控制。此节点对于需要对复杂系统进行精细控制的应用至关重要，确保了运动和控制的无缝融合，以提高性能。

# Input types
## Required
- sparsectrl_name
    - 参数 'sparsectrl_name' 指定要加载的稀疏控制模型的名称，这对于识别和访问正确的控制设置至关重要。此参数对节点的操作至关重要，因为它直接影响应用的控制能力。
    - Comfy dtype: str
    - Python dtype: str
- control_net_name
    - 参数 'control_net_name' 用于定义控制网络模型的名称。它在节点的功能中扮演重要角色，因为它决定了要使用的特定控制网络，影响整体的控制策略。
    - Comfy dtype: str
    - Python dtype: str
- use_motion
    - 参数 'use_motion' 指示是否应将运动特性纳入控制网络。这是一个重要参数，因为它启用或禁用了基于运动的控制的动态适应，导致不同的控制行为。
    - Comfy dtype: bool
    - Python dtype: bool
- motion_strength
    - 参数 'motion_strength' 调整控制网络内运动效果的强度。这是一个关键参数，允许用户微调运动对控制结果的影响，从而定制控制响应。
    - Comfy dtype: float
    - Python dtype: float
- motion_scale
    - 参数 'motion_scale' 定义应用于控制网络的运动效果的规模。它是一个有影响力的参数，修改了运动整合的范围，影响了整体控制动态。
    - Comfy dtype: float
    - Python dtype: float
## Optional
- sparse_method
    - 参数 'sparse_method' 选择控制网络内处理稀疏数据的方法。虽然它是可选的，但它可以显著影响稀疏数据的处理方式，可能改变节点的性能。
    - Comfy dtype: SPARSE_METHOD
    - Python dtype: SparseMethod
- tk_optional
    - 提供的 'tk_optional' 参数可以提供控制网络中时间步关键帧的额外控制。这个可选参数可以用来指定特定的关键帧，以实现更细粒度的控制。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: TimestepKeyframeGroup

# Output types
- CONTROL_NET
    - 输出 'CONTROL_NET' 表示已加载的具有集成运动特性的控制网络。它是一个复杂的数据结构，封装了控制设置和运动参数，准备在更高级别的控制系统中应用。
    - Comfy dtype: CONTROL_NET
    - Python dtype: ControlNetAdvanced

# Usage tips
- Infra type: GPU

# Source code
```
class SparseCtrlMergedLoaderAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sparsectrl_name': (folder_paths.get_filename_list('controlnet'),), 'control_net_name': (folder_paths.get_filename_list('controlnet'),), 'use_motion': ('BOOLEAN', {'default': True}), 'motion_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'motion_scale': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001})}, 'optional': {'sparse_method': ('SPARSE_METHOD',), 'tk_optional': ('TIMESTEP_KEYFRAME',)}}
    RETURN_TYPES = ('CONTROL_NET',)
    FUNCTION = 'load_controlnet'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl/experimental'

    def load_controlnet(self, sparsectrl_name: str, control_net_name: str, use_motion: bool, motion_strength: float, motion_scale: float, sparse_method: SparseMethod=SparseSpreadMethod(), tk_optional: TimestepKeyframeGroup=None):
        sparsectrl_path = folder_paths.get_full_path('controlnet', sparsectrl_name)
        controlnet_path = folder_paths.get_full_path('controlnet', control_net_name)
        sparse_settings = SparseSettings(sparse_method=sparse_method, use_motion=use_motion, motion_strength=motion_strength, motion_scale=motion_scale, merged=True)
        controlnet = load_controlnet(controlnet_path, timestep_keyframe=tk_optional)
        if controlnet is None or type(controlnet) != ControlNetAdvanced:
            raise ValueError(f'controlnet_path must point to a normal ControlNet, but instead: {type(controlnet).__name__}')
        sparsectrl = load_sparsectrl(sparsectrl_path, timestep_keyframe=tk_optional, sparse_settings=SparseSettings.default())
        new_state_dict = controlnet.control_model.state_dict()
        for (key, value) in sparsectrl.control_model.motion_holder.motion_wrapper.state_dict().items():
            new_state_dict[key] = value
        sparsectrl = load_sparsectrl(sparsectrl_path, controlnet_data=new_state_dict, timestep_keyframe=tk_optional, sparse_settings=sparse_settings)
        return (sparsectrl,)
```