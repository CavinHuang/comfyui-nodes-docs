# Documentation
- Class name: RatioAdvanced
- Category: Mikey/Utils
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

RatioAdvanced节点旨在执行高级比例计算和转换。它可以处理预设比例、自定义输入尺寸以及各种缩放操作，以确定图像处理流水线不同阶段的最优尺寸。该节点强调在比例处理中的灵活性和精确性，确保输出尺寸满足特定的标准或约束条件。

# Input types
## Required
- preset
    - 预设参数允许用户选择一个预定义的比例配置。这种选择可以显著简化将已知比例集应用到图像的过程，确保一致性并减少手动计算。
    - Comfy dtype: STRING
    - Python dtype: str
- swap_axis
    - swap_axis参数在必要时启用宽度和高度值的交换。这对于在不改变图像固有的长宽比的情况下调整图像的方向非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- custom_latent_w
    - 当选择自定义比例时，custom_latent_w参数指定潜在图像的宽度。这允许微调特定处理阶段的图像尺寸，这对于实现所需的视觉效果或满足输出要求至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- custom_latent_h
    - custom_latent_h参数与custom_latent_w一起使用，当应用自定义比例时，设置潜在图像的高度。这个参数提供了对图像垂直维度的控制，允许进行精确调整以满足特定的处理目标。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent_w
    - latent_w输出代表了基于输入参数和节点的比例计算得出的潜在图像的宽度。这个值对于确定处理流水线特定阶段图像的水平维度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- latent_h
    - latent_h输出对应于计算出的潜在图像的高度。与latent_w一起，它定义了潜在阶段图像的整体大小，这对于进一步处理和分析至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- cte_w
    - cte_w输出表示考虑恒定时间演化(CTE)比例后的图像宽度。这个参数对于保持图像在不同处理步骤中的时间一致性非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- cte_h
    - cte_h输出是在应用CTE比例时图像的高度。它与cte_w一起工作，确保在保持图像的长宽比和时间完整性的同时，适当地调整图像的尺寸。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class RatioAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        (s.ratio_sizes, s.ratio_dict) = read_ratios()
        default_ratio = s.ratio_sizes[0]
        s.ratio_sizes.insert(0, 'custom')
        (s.ratio_presets, s.ratio_config) = read_ratio_presets()
        if 'none' not in s.ratio_presets:
            s.ratio_presets.append('none')
        return {'required': {'preset': (s.ratio_presets, {'default': 'none'}), 'swap_axis': (['true', 'false'], {'default': 'false'}), 'select_latent_ratio': (s.ratio_sizes, {'default': default_ratio}), 'custom_latent_w': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'custom_latent_h': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'select_cte_ratio': (s.ratio_sizes, {'default': default_ratio}), 'cte_w': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'cte_h': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'cte_mult': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.01}), 'cte_res': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'cte_fit_size': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'select_target_ratio': (s.ratio_sizes, {'default': default_ratio}), 'target_w': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'target_h': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'target_mult': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.01}), 'target_res': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'target_fit_size': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': 8192, 'step': 1}), 'use_preset_seed': (['true', 'false'], {'default': 'false'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('latent_w', 'latent_h', 'cte_w', 'cte_h', 'target_w', 'target_h', 'crop_w', 'crop_h')
    CATEGORY = 'Mikey/Utils'
    FUNCTION = 'calculate'

    def mult(self, width, height, mult):
        return (int(width * mult), int(height * mult))

    def fit(self, width, height, fit_size):
        if width > height:
            return (fit_size, int(height * fit_size / width))
        else:
            return (int(width * fit_size / height), fit_size)

    def res(self, width, height, res):
        return find_latent_size(width, height, res)

    def calculate(self, preset, swap_axis, select_latent_ratio, custom_latent_w, custom_latent_h, select_cte_ratio, cte_w, cte_h, cte_mult, cte_res, cte_fit_size, select_target_ratio, target_w, target_h, target_mult, target_res, target_fit_size, crop_w, crop_h, use_preset_seed, seed, unique_id=None, extra_pnginfo=None, prompt=None):
        if use_preset_seed == 'true' and len(self.ratio_presets) > 1:
            offset = seed % len(self.ratio_presets - 1)
            presets = [p for p in self.ratio_presets if p != 'none']
            preset = presets[offset]
        if preset != 'none':
            latent_width = self.ratio_config[preset]['custom_latent_w']
            latent_height = self.ratio_config[preset]['custom_latent_h']
            cte_w = self.ratio_config[preset]['cte_w']
            cte_h = self.ratio_config[preset]['cte_h']
            target_w = self.ratio_config[preset]['target_w']
            target_h = self.ratio_config[preset]['target_h']
            crop_w = self.ratio_config[preset]['crop_w']
            crop_h = self.ratio_config[preset]['crop_h']
            if swap_axis == 'true':
                (latent_width, latent_height) = (latent_height, latent_width)
                (cte_w, cte_h) = (cte_h, cte_w)
                (target_w, target_h) = (target_h, target_w)
                (crop_w, crop_h) = (crop_h, crop_w)
            '\n            example user_ratio_presets.json\n            {\n                "ratio_presets": {\n                    "all_1024": {\n                        "custom_latent_w": 1024,\n                        "custom_latent_h": 1024,\n                        "cte_w": 1024,\n                        "cte_h": 1024,\n                        "target_w": 1024,\n                        "target_h": 1024,\n                        "crop_w": 0,\n                        "crop_h": 0\n                    },\n                }\n            }\n            '
            return (latent_width, latent_height, cte_w, cte_h, target_w, target_h, crop_w, crop_h)
        if select_latent_ratio != 'custom':
            latent_width = self.ratio_dict[select_latent_ratio]['width']
            latent_height = self.ratio_dict[select_latent_ratio]['height']
        else:
            latent_width = custom_latent_w
            latent_height = custom_latent_h
        if select_cte_ratio != 'custom':
            cte_w = self.ratio_dict[select_cte_ratio]['width']
            cte_h = self.ratio_dict[select_cte_ratio]['height']
        else:
            cte_w = cte_w
            cte_h = cte_h
        if cte_mult != 0.0:
            (cte_w, cte_h) = self.mult(cte_w, cte_h, cte_mult)
        if cte_res != 0:
            (cte_w, cte_h) = self.res(cte_w, cte_h, cte_res)
        if cte_fit_size != 0:
            (cte_w, cte_h) = self.fit(cte_w, cte_h, cte_fit_size)
        if select_target_ratio != 'custom':
            target_w = self.ratio_dict[select_target_ratio]['width']
            target_h = self.ratio_dict[select_target_ratio]['height']
        else:
            target_w = target_w
            target_h = target_h
        if target_mult != 0.0:
            (target_w, target_h) = self.mult(target_w, target_h, target_mult)
        if target_res != 0:
            (target_w, target_h) = self.res(target_w, target_h, target_res)
        if target_fit_size != 0:
            (target_w, target_h) = self.fit(target_w, target_h, target_fit_size)
        return (latent_width, latent_height, cte_w, cte_h, target_w, target_h, crop_w, crop_h)
```