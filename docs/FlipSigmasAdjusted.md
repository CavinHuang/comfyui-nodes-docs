# Documentation
- Class name: FlipSigmasAdjusted
- Category: KJNodes/noise
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

‘FlipSigmasAdjusted’节点旨在处理和调整一组西格玛值。它翻转输入西格玛的顺序，可选地通过最后一个西格玛值进行除法操作，并根据偏移量和指定的除数调整每个西格玛。该节点还确保没有西格玛值变为零，如果必要，将用一个最小的正值代替。结果是一组转换后的西格玛值，以及用于可视化目的的字符串表示。

# Input types
## Required
- sigmas
    - ‘sigmas’参数是表示噪声分布标准差的值序列。它对节点的操作至关重要，因为它决定了要被操作的基础数据。翻转和调整过程直接影响节点执行的结果。
    - Comfy dtype: FLOAT
    - Python dtype: torch.Tensor
## Optional
- divide_by_last_sigma
    - ‘divide_by_last_sigma’参数是一个布尔标志，当设置为真时，会导致节点将序列中的每个西格玛除以最后一个西格玛。这个操作归一化了西格玛值，在某些噪声减少或图像处理任务中可能非常重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- divide_by
    - ‘divide_by’参数是一个浮点数，用于缩放调整后的西格玛值。它在控制西格玛调整的大小方面起着关键作用，特别是当为特定应用微调节点输出时尤为重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- offset_by
    - ‘offset_by’参数是一个整数，它将每个西格玛的索引移动给定的数量。这可以向西格玛序列引入一种变换或扭曲，这对于某些类型的数据分析或信号处理可能是有用的。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- SIGMAS
    - ‘SIGMAS’输出提供了节点应用所有操作后的调整西格玛值。对于依赖这些转换值的后续处理步骤来说，这是一个关键的输出。
    - Comfy dtype: FLOAT
    - Python dtype: torch.Tensor
- sigmas_string
    - ‘sigmas_string’输出是调整后的西格玛值的字符串表示。它对于可视化或记录目的很有用，提供了数据的人类可读格式。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class FlipSigmasAdjusted:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sigmas': ('SIGMAS',), 'divide_by_last_sigma': ('BOOLEAN', {'default': False}), 'divide_by': ('FLOAT', {'default': 1, 'min': 1, 'max': 255, 'step': 0.01}), 'offset_by': ('INT', {'default': 1, 'min': -100, 'max': 100, 'step': 1})}}
    RETURN_TYPES = ('SIGMAS', 'STRING')
    RETURN_NAMES = ('SIGMAS', 'sigmas_string')
    CATEGORY = 'KJNodes/noise'
    FUNCTION = 'get_sigmas_adjusted'

    def get_sigmas_adjusted(self, sigmas, divide_by_last_sigma, divide_by, offset_by):
        sigmas = sigmas.flip(0)
        if sigmas[0] == 0:
            sigmas[0] = 0.0001
        adjusted_sigmas = sigmas.clone()
        for i in range(1, len(sigmas)):
            offset_index = i - offset_by
            if 0 <= offset_index < len(sigmas):
                adjusted_sigmas[i] = sigmas[offset_index]
            else:
                adjusted_sigmas[i] = 0.0001
        if adjusted_sigmas[0] == 0:
            adjusted_sigmas[0] = 0.0001
        if divide_by_last_sigma:
            adjusted_sigmas = adjusted_sigmas / adjusted_sigmas[-1]
        sigma_np_array = adjusted_sigmas.numpy()
        array_string = np.array2string(sigma_np_array, precision=2, separator=', ', threshold=np.inf)
        adjusted_sigmas = adjusted_sigmas / divide_by
        return (adjusted_sigmas, array_string)
```