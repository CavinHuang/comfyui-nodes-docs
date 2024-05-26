# Documentation
- Class name: WAS_FreeU
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/WASasquatch/FreeU_Advanced

WAS_FreeU类包含一种旨在通过应用打补丁技术来修改和增强模型行为的方法。该方法称为'patch'，旨在根据预定义的参数和模式改进模型的性能或调整其输出特征。该节点的功能集中在操纵模型的内部表示上，允许对模型优化采取更细致和针对性的方法。

# Input types
## Required
- model
    - 模型参数是必需的，因为它定义了将要应用打补丁过程的基础结构和权重。它是主要的输入，其特征和性能将由节点的操作所改变。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- target_block
    - target_block参数决定了打补丁操作将集中在模型的哪一部分。它在确定节点所做的修改的范围和影响方面至关重要。
    - Comfy dtype: COMBO[output_block, middle_block, input_block, all]
    - Python dtype: str
- multiscale_mode
    - multiscale_mode参数影响打补丁过程的复杂性和粒度。它在节点如何调整其行为以适应模型特征的不同尺度方面发挥着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- multiscale_strength
    - 这个参数控制多尺度打补丁的强度。它很重要，因为它直接影响节点在不同尺度上修改模型特征的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- slice_b1
    - slice_b1参数指定了打补丁过程中第一片的大小。它是确定将受到修改的模型部分的一个关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- slice_b2
    - 这个参数定义了打补丁中涉及的第二片的大小。它与slice_b1一起工作，以建立节点将针对的模型特征范围。
    - Comfy dtype: INT
    - Python dtype: int
- b1
    - b1参数用于调整打补丁过程中第一片的影响。它很重要，因为它允许节点控制应用于模型特征的修改的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b2
    - 这个参数负责在打补丁过程中调整第二片的影响。它在塑造节点如何在指定范围内改变模型特征方面至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s1
    - s1参数对于设置第一个过滤操作的规模至关重要。它决定了节点如何根据其重要性强调或抑制模型的某些特征。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s2
    - 这个参数决定了第二个过滤操作的规模。它在微调节点在目标范围内改进模型特征的能力方面发挥关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- b1_mode
    - b1_mode参数规定了第一片的混合模式。它对于定义打补丁操作如何将修改集成到模型现有特征中很重要。
    - Comfy dtype: COMBO[add, subtract, multiply, divide, average, max, min]
    - Python dtype: str
- b1_blend
    - 这个参数调整第一片的混合强度。它很重要，因为它允许节点控制原始特征和修改后特征之间过渡的平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b2_mode
    - b2_mode参数设置了第二片的混合模式。它对于确定节点如何将修补的特征与模型的其余部分协调一致至关重要。
    - Comfy dtype: COMBO[add, subtract, multiply, divide, average, max, min]
    - Python dtype: str
- b2_blend
    - 这个参数微调第二片的混合强度。它在确保节点无缝地将修改集成到模型现有结构中方面至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- threshold
    - 阈值参数用于定义过滤操作的兴趣区域。它对于集中节点的注意力在模型的特定特征上很重要。
    - Comfy dtype: INT
    - Python dtype: int
- use_override_scales
    - use_override_scales参数允许对傅里叶滤波器进行自定义缩放。它很重要，因为它提供了节点根据特定需求调整过滤过程的灵活性。
    - Comfy dtype: COMBO[false, true]
    - Python dtype: str
- override_scales
    - 这个参数提供了一种手动指定傅里叶滤波器的比例值的方法。它对于将用户定义的过滤标准应用于模型的特征很重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- MODEL
    - 输出是应用了打补丁操作的修改后的模型。它代表了输入模型的增强或变更版本，反映了节点所做的更改。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_FreeU:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'target_block': (['output_block', 'middle_block', 'input_block', 'all'],), 'multiscale_mode': (list(mscales.keys()),), 'multiscale_strength': ('FLOAT', {'default': 1.0, 'max': 1.0, 'min': 0, 'step': 0.001}), 'slice_b1': ('INT', {'default': 640, 'min': 64, 'max': 1280, 'step': 1}), 'slice_b2': ('INT', {'default': 320, 'min': 64, 'max': 640, 'step': 1}), 'b1': ('FLOAT', {'default': 1.1, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'b2': ('FLOAT', {'default': 1.2, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 's1': ('FLOAT', {'default': 0.9, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 's2': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 10.0, 'step': 0.001})}, 'optional': {'b1_mode': (list(blending_modes.keys()),), 'b1_blend': ('FLOAT', {'default': 1.0, 'max': 100, 'min': 0, 'step': 0.001}), 'b2_mode': (list(blending_modes.keys()),), 'b2_blend': ('FLOAT', {'default': 1.0, 'max': 100, 'min': 0, 'step': 0.001}), 'threshold': ('INT', {'default': 1.0, 'max': 10, 'min': 1, 'step': 1}), 'use_override_scales': (['false', 'true'],), 'override_scales': ('STRING', {'default': '# OVERRIDE SCALES\n\n# Sharpen\n# 10, 1.5', 'multiline': True})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = '_for_testing'

    def patch(self, model, target_block, multiscale_mode, multiscale_strength, slice_b1, slice_b2, b1, b2, s1, s2, b1_mode='add', b1_blend=1.0, b2_mode='add', b2_blend=1.0, threshold=1.0, use_override_scales='false', override_scales=''):
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
        print(f'FreeU Plate Portions: {slice_b1} over {slice_b2}')
        print(f'FreeU Multi-Scales: {scales}')

        def block_patch(h, transformer_options):
            if h.shape[1] == 1280:
                h_t = h[:, :slice_b1]
                h_r = h_t * b1
                h[:, :slice_b1] = blending_modes[b1_mode](h_t, h_r, b1_blend)
            if h.shape[1] == 640:
                h_t = h[:, :slice_b2]
                h_r = h_t * b2
                h[:, :slice_b2] = blending_modes[b2_mode](h_t, h_r, b2_blend)
            return h

        def block_patch_hsp(h, hsp, transformer_options):
            if h.shape[1] == 1280:
                h = block_patch(h, transformer_options)
                hsp = Fourier_filter(hsp, threshold=threshold, scale=s1, scales=scales, strength=multiscale_strength)
            if h.shape[1] == 640:
                h = block_patch(h, transformer_options)
                hsp = Fourier_filter(hsp, threshold=threshold, scale=s2, scales=scales, strength=multiscale_strength)
            return (h, hsp)
        print(f'Patching {target_block}')
        m = model.clone()
        if target_block == 'all' or target_block == 'output_block':
            m.set_model_output_block_patch(block_patch_hsp)
        if target_block == 'all' or target_block == 'input_block':
            m.set_model_input_block_patch(block_patch)
        if target_block == 'all' or target_block == 'middle_block':
            m.set_model_patch(block_patch, 'middle_block_patch')
        return (m,)
```