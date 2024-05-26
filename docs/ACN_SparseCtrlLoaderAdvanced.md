# Documentation
- Class name: SparseCtrlLoaderAdvanced
- Category: Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

SparseCtrlLoaderAdvanced节点旨在高效地加载和管理具有稀疏控制能力的高级控制网络。它抽象了处理稀疏控制数据的复杂性，使用户能够将运动特性无缝集成到他们的控制网络中。该节点简化了使用稀疏控制方法加载控制网络的过程，增强了系统的总体性能和功能。

# Input types
## Required
- sparsectrl_name
    - sparsectrl_name参数对于识别要加载的特定控制网络至关重要。它通过确定访问和处理哪个控制网络的数据来影响节点的执行。
    - Comfy dtype: str
    - Python dtype: str
## Optional
- use_motion
    - use_motion参数决定是否将运动特性纳入控制网络。它在节点的功能中起着重要作用，通过启用或禁用控制网络的运动方面。
    - Comfy dtype: bool
    - Python dtype: bool
- motion_strength
    - motion_strength参数调整控制网络内运动特性的强度。它对于微调运动对控制网络最终输出的影响很重要。
    - Comfy dtype: float
    - Python dtype: float
- motion_scale
    - motion_scale参数调整控制网络中运动效应的大小。它对于控制运动对网络行为的影响程度至关重要。
    - Comfy dtype: float
    - Python dtype: float
- sparse_method
    - sparse_method参数定义了在控制网络内处理稀疏控制数据的方法。它对于确定处理和整合稀疏数据的策略至关重要。
    - Comfy dtype: SparseMethod
    - Python dtype: SparseMethod
- tk_optional
    - tk_optional参数提供了一种为控制网络指定可选时间步关键帧的方法。对于需要自定义控制网络时间方面特性的用户来说，这很重要。
    - Comfy dtype: TimestepKeyframeGroup
    - Python dtype: TimestepKeyframeGroup

# Output types
- CONTROL_NET
    - CONTROL_NET输出代表了加载的高级控制网络，它结合了指定的稀疏控制设置和运动特性。它很重要，因为它是节点的主要输出，使得在系统中可以进行进一步的处理和利用。
    - Comfy dtype: ControlNetAdvanced
    - Python dtype: ControlNetAdvanced

# Usage tips
- Infra type: GPU

# Source code
```
class SparseCtrlLoaderAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sparsectrl_name': (folder_paths.get_filename_list('controlnet'),), 'use_motion': ('BOOLEAN', {'default': True}), 'motion_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'motion_scale': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001})}, 'optional': {'sparse_method': ('SPARSE_METHOD',), 'tk_optional': ('TIMESTEP_KEYFRAME',)}}
    RETURN_TYPES = ('CONTROL_NET',)
    FUNCTION = 'load_controlnet'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/SparseCtrl'

    def load_controlnet(self, sparsectrl_name: str, use_motion: bool, motion_strength: float, motion_scale: float, sparse_method: SparseMethod=SparseSpreadMethod(), tk_optional: TimestepKeyframeGroup=None):
        sparsectrl_path = folder_paths.get_full_path('controlnet', sparsectrl_name)
        sparse_settings = SparseSettings(sparse_method=sparse_method, use_motion=use_motion, motion_strength=motion_strength, motion_scale=motion_scale)
        sparsectrl = load_sparsectrl(sparsectrl_path, timestep_keyframe=tk_optional, sparse_settings=sparse_settings)
        return (sparsectrl,)
```