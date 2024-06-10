# Documentation
- Class name: IPAdapterWeights
- Category: ipadapter/utils
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterWeights节点的`weights`方法旨在根据指定的时间函数处理和插值一系列权重。它接受一个权重字符串、一个时间参数和帧详细信息，以生成可以应用于一系列帧的权重列表。此方法对于在时间上调整模型或系统中不同组件的影响至关重要，允许进行动态调整。

# Input types
## Required
- weights
    - ‘weights’参数是一个包含以逗号分隔的浮点数列表的字符串。它对于定义节点将处理和随时间插值的初始权重集至关重要。这些权重的应用方式可以显著影响它们所集成的系统或模型的输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- timing
    - ‘timing’参数决定了在指定帧上插值权重时使用的时间函数。它可以是几种预定义选项之一，每种选项都会在时间上产生不同的权重变化速率。这个参数对于控制不同权重值之间过渡的节奏非常重要。
    - Comfy dtype: COMBO['custom', 'linear', 'ease_in_out', 'ease_in', 'ease_out', 'reverse_in_out', 'random']
    - Python dtype: str
- frames
    - ‘frames’参数指定将应用权重的总帧数。它是一个整数值，为权重序列的持续时间设置了上限。这个参数对于定义权重应用的范围并确保其与系统的时序要求一致非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- start_frame
    - ‘start_frame’参数指示权重序列应该开始的帧号。它允许自定义权重应用在整体帧序列中的开始时间。这对于将权重应用与系统中的其他事件或进程同步特别有用。
    - Comfy dtype: INT
    - Python dtype: int
- end_frame
    - ‘end_frame’参数定义了权重序列结束的帧号。它用于控制权重应用的终点，确保权重只应用到帧序列的某个特定点。这有助于在系统中创建更细致和受控的效果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- weights
    - 输出的‘weights’是一个浮点数列表，代表将应用于帧序列的经过处理和插值的权重。这个输出非常重要，因为它直接影响权重所集成的模型或系统的行为。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterWeights:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'weights': ('STRING', {'default': '1.0', 'multiline': True}), 'timing': (['custom', 'linear', 'ease_in_out', 'ease_in', 'ease_out', 'reverse_in_out', 'random'],), 'frames': ('INT', {'default': 0, 'min': 0, 'max': 9999, 'step': 1}), 'start_frame': ('INT', {'default': 0, 'min': 0, 'max': 9999, 'step': 1}), 'end_frame': ('INT', {'default': 9999, 'min': 0, 'max': 9999, 'step': 1})}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'weights'
    CATEGORY = 'ipadapter/utils'

    def weights(self, weights, timing, frames, start_frame, end_frame):
        import random
        weights = weights.replace('\n', ',')
        weights = [float(weight) for weight in weights.split(',') if weight.strip() != '']
        if timing != 'custom':
            start = 0.0
            end = 1.0
            if len(weights) > 0:
                start = weights[0]
                end = weights[-1]
            weights = []
            end_frame = min(end_frame, frames)
            duration = end_frame - start_frame
            if start_frame > 0:
                weights.extend([start] * start_frame)
            for i in range(duration):
                n = duration - 1
                if timing == 'linear':
                    weights.append(start + (end - start) * i / n)
                elif timing == 'ease_in_out':
                    weights.append(start + (end - start) * (1 - math.cos(i / n * math.pi)) / 2)
                elif timing == 'ease_in':
                    weights.append(start + (end - start) * math.sin(i / n * math.pi / 2))
                elif timing == 'ease_out':
                    weights.append(start + (end - start) * (1 - math.cos(i / n * math.pi / 2)))
                elif timing == 'reverse_in_out':
                    weights.append(start + (end - start) * (1 - math.sin((1 - i / n) * math.pi / 2)))
                elif timing == 'random':
                    weights.append(random.uniform(start, end))
            weights[-1] = end if timing != 'random' else weights[-1]
            if end_frame < frames:
                weights.extend([end] * (frames - end_frame))
        if len(weights) == 0:
            weights = [0.0]
        return (weights,)
```