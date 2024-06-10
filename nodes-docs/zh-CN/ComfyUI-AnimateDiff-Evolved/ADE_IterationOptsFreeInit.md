# Documentation
- Class name: FreeInitOptionsNode
- Category: Animate Diff 🎭🅐🅓/iteration opts
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

FreeInitOptionsNode 旨在为动画过程创建迭代选项提供便利，专注于使用可定制的过滤器和参数对初始化阶段进行优化，以提高动画的质量和特性。

# Input types
## Required
- iterations
    - 迭代次数对于确定动画过程的范围至关重要。它决定了过程将重复多少次，影响着动画的整体结果和细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- filter
    - 过滤器参数对于应用特定类型的噪声至动画至关重要，它可以显著影响动画的风格化结果以及帧与帧之间过渡的平滑度。
    - Comfy dtype: FreeInitFilter.LIST
    - Python dtype: Union[str, comfy.sample.FreeInitFilter]
- d_s
    - d_s 参数在控制应用于动画的噪声的空间频率中起着关键作用，这可以影响最终输出的纹理和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- d_t
    - d_t 参数对于调整噪声的时间频率很重要，它影响着噪声随时间的变化以及对动画动态的贡献。
    - Comfy dtype: FLOAT
    - Python dtype: float
- n_butterworth
    - n_butterworth 参数对于定义要使用的巴特沃斯滤波器的数量很重要，它可以细化噪声的质量及其对动画清晰度的影响。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_step
    - sigma_step 参数对于确定应用 sigma 值的步骤至关重要，它可以影响整个动画中噪声的强度和进展。
    - Comfy dtype: INT
    - Python dtype: int
- apply_to_1st_iter
    - apply_to_1st_iter 标志对于决定是否将初始化设置应用于第一次迭代很重要。这可以影响动画的起始点及其初始外观。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- init_type
    - init_type 参数决定了用于动画的初始化方法，这可以显著改变动画的起始特性和整个动画过程的行为。
    - Comfy dtype: FreeInitOptions.LIST
    - Python dtype: str
## Optional
- iter_batch_offset
    - iter_batch_offset 参数虽然是可选的，但可以用来调整迭代的批次偏移量，这有助于管理动画帧的顺序及其处理顺序。
    - Comfy dtype: INT
    - Python dtype: int
- iter_seed_offset
    - iter_seed_offset 参数也是可选的，允许调整迭代的种子偏移量，这可以在动画序列中引入变化，并影响输出的随机性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- iteration_options
    - 此节点生成的迭代选项对于指导动画过程的后续步骤至关重要，为帧的生成和优化设定了基础。
    - Comfy dtype: ITERATION_OPTS
    - Python dtype: FreeInitOptions

# Usage tips
- Infra type: CPU

# Source code
```
class FreeInitOptionsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'iterations': ('INT', {'default': 2, 'min': 1}), 'filter': (FreeInitFilter.LIST,), 'd_s': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'd_t': ('FLOAT', {'default': 0.25, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'n_butterworth': ('INT', {'default': 4, 'min': 1, 'max': 100}), 'sigma_step': ('INT', {'default': 999, 'min': 1, 'max': 999}), 'apply_to_1st_iter': ('BOOLEAN', {'default': False}), 'init_type': (FreeInitOptions.LIST,)}, 'optional': {'iter_batch_offset': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX}), 'iter_seed_offset': ('INT', {'default': 1, 'min': BIGMIN, 'max': BIGMAX})}}
    RETURN_TYPES = ('ITERATION_OPTS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/iteration opts'
    FUNCTION = 'create_iter_opts'

    def create_iter_opts(self, iterations: int, filter: str, d_s: float, d_t: float, n_butterworth: int, sigma_step: int, apply_to_1st_iter: bool, init_type: str, iter_batch_offset: int=0, iter_seed_offset: int=1):
        iter_opts = FreeInitOptions(iterations=iterations, step=sigma_step, apply_to_1st_iter=apply_to_1st_iter, filter=filter, d_s=d_s, d_t=d_t, n=n_butterworth, init_type=init_type, iter_batch_offset=iter_batch_offset, iter_seed_offset=iter_seed_offset)
        return (iter_opts,)
```