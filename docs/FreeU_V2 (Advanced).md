# Documentation
- Class name: WAS_FreeU_V2
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/WASasquatch/FreeU_Advanced

这个节点类旨在对模型的块应用打补丁机制，通过提供的参数调整输入、中间或输出块，以增强模型的性能。它专注于通过多尺度调整和切片技术来精炼模型的内部表示。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了将被补丁过程修改的神经网络结构。它是节点操作的主要对象，其特征直接影响补丁结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- multiscale_mode
    - multiscale_mode参数对于定义补丁过程中使用的多尺度方法至关重要。它影响模型特征在不同尺度上的调整方式，这对于微调模型的性能至关重要。
    - Comfy dtype: LIST
    - Python dtype: list
- multiscale_strength
    - multiscale_strength参数控制多尺度调整的强度。它是决定补丁过程的有效性以及结果模型对各种数据尺度的适应性的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- slice_b1
    - slice_b1参数定义了模型隐藏层第一个维度中要调整的切片的大小。它对于将补丁工作集中在模型的特定区域很重要，从而优化其内部特征提取机制。
    - Comfy dtype: INT
    - Python dtype: int
- slice_b2
    - slice_b2参数设置了模型隐藏层第二个维度的切片大小。这个参数在通过针对层内特定特征空间来精炼模型的表现能力方面具有重要意义。
    - Comfy dtype: INT
    - Python dtype: int
- b1
    - b1参数影响应用于隐藏层第一个维度的缩放因子。它是控制应用于模型内部特征的转换程度的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b2
    - b2参数决定了隐藏层第二个维度的缩放因子。调整这个参数可以对模型捕获和处理此维度内的特征的能力产生重大影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s1
    - s1参数设置了补丁过程中应用的傅里叶滤波器第一个维度的阈值。它在过滤不相关的频率和仅保留最相关特征方面起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s2
    - s2参数定义了傅里叶滤波器第二个维度的阈值。通过调整这个参数，可以控制模型在数据表示中保留的细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- input_block
    - input_block参数决定是否应将补丁应用于模型的输入块。它在数据处理的初始阶段起着关键作用，并且可以显著影响补丁后模型的整体性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- middle_block
    - middle_block参数指定是否应将补丁应用于模型的中间层。这些层对模型的学习过程至关重要，它们的调整可以提高模型的表现能力。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- output_block
    - output_block参数指示是否应将补丁目标定位于模型的输出块。修改这个块可以直接影响模型预测的质量和准确性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- threshold
    - 阈值参数用于确定傅里叶滤波器的敏感度。更高的阈值可以导致更激进的过滤，可能会去除更多的噪声，但也可能丢弃重要信息。
    - Comfy dtype: INT
    - Python dtype: int
- use_override_scales
    - use_override_scales参数允许应用自定义的缩放值，而不是默认值。这提供了灵活性，可以根据特定要求或实验设置来定制补丁过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- override_scales
    - 当use_override_scales设置为true时，override_scales参数包含一个自定义缩放值的字符串，用于覆盖默认值。它允许用户在特定数据特征下对模型的响应进行微调，这对于细粒度调整非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 补丁化的模型是节点的主要输出，代表了应用了修改的神经网络。这个输出非常重要，因为它体现了补丁后模型的增强能力和调整后的内部机制。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_FreeU_V2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'input_block': ('BOOLEAN', {'default': False}), 'middle_block': ('BOOLEAN', {'default': False}), 'output_block': ('BOOLEAN', {'default': False}), 'multiscale_mode': (list(mscales.keys()),), 'multiscale_strength': ('FLOAT', {'default': 1.0, 'max': 1.0, 'min': 0, 'step': 0.001}), 'slice_b1': ('INT', {'default': 640, 'min': 64, 'max': 1280, 'step': 1}), 'slice_b2': ('INT', {'default': 320, 'min': 64, 'max': 640, 'step': 1}), 'b1': ('FLOAT', {'default': 1.1, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'b2': ('FLOAT', {'default': 1.2, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 's1': ('FLOAT', {'default': 0.9, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 's2': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 10.0, 'step': 0.001})}, 'optional': {'threshold': ('INT', {'default': 1.0, 'max': 10, 'min': 1, 'step': 1}), 'use_override_scales': (['false', 'true'],), 'override_scales': ('STRING', {'default': '# OVERRIDE SCALES\n\n# Sharpen\n# 10, 1.5', 'multiline': True})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = '_for_testing'

    def patch(self, model, input_block, middle_block, output_block, multiscale_mode, multiscale_strength, slice_b1, slice_b2, b1, b2, s1, s2, threshold=1.0, use_override_scales='false', override_scales=''):
        min_slice = 64
        max_slice_b1 = 1280
        max_slice_b2 = 640
        slice_b1 = max(min(max_slice_b1, slice_b1), min_slice)
        slice_b2 = max(min(min(slice_b1, max_slice_b2), slice_b2), min_slice)
        scales_list = []
        if use_override_scales == 'true':
            if override_scales.strip() != '':
                scales_str = override_scales.strip().splitlines()
                for line in scales_str:
                    if not line.strip().startswith('#') and (not line.strip().startswith('!')) and (not line.strip().startswith('//')):
                        scale_values = line.split(',')
                        if len(scale_values) == 2:
                            scales_list.append((int(scale_values[0]), float(scale_values[1])))
        if use_override_scales == 'true' and (not scales_list):
            print('No valid override scales found. Using default scale.')
            scales_list = None
        scales = mscales[multiscale_mode] if use_override_scales == 'false' else scales_list

        def _hidden_mean(h):
            hidden_mean = h.mean(1).unsqueeze(1)
            B = hidden_mean.shape[0]
            (hidden_max, _) = torch.max(hidden_mean.view(B, -1), dim=-1, keepdim=True)
            (hidden_min, _) = torch.min(hidden_mean.view(B, -1), dim=-1, keepdim=True)
            hidden_mean = (hidden_mean - hidden_min.unsqueeze(2).unsqueeze(3)) / (hidden_max - hidden_min).unsqueeze(2).unsqueeze(3)
            return hidden_mean

        def block_patch(h, transformer_options):
            if h.shape[1] == 1280:
                hidden_mean = _hidden_mean(h)
                h[:, :slice_b1] = h[:, :slice_b1] * ((b1 - 1) * hidden_mean + 1)
            if h.shape[1] == 640:
                hidden_mean = _hidden_mean(h)
                h[:, :slice_b2] = h[:, :slice_b2] * ((b2 - 1) * hidden_mean + 1)
            return h

        def block_patch_hsp(h, hsp, transformer_options):
            if h.shape[1] == 1280:
                h = block_patch(h, transformer_options)
                hsp = Fourier_filter(hsp, threshold=threshold, scale=s1, scales=scales, strength=multiscale_strength)
            if h.shape[1] == 640:
                h = block_patch(h, transformer_options)
                hsp = Fourier_filter(hsp, threshold=threshold, scale=s2, scales=scales, strength=multiscale_strength)
            return (h, hsp)
        m = model.clone()
        if output_block:
            print('Patching output block')
            m.set_model_output_block_patch(block_patch_hsp)
        if input_block:
            print('Patching input block')
            m.set_model_input_block_patch(block_patch)
        if middle_block:
            print('Patching middle block')
            m.set_model_patch(block_patch, 'middle_block_patch')
        return (m,)
```