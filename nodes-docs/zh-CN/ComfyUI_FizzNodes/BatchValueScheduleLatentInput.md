# Documentation
- Class name: BatchValueScheduleLatentInput
- Category: FizzNodes 📅🅕🅝/BatchScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

BatchValueScheduleLatentInput节点旨在根据给定的文本时间表处理和动画一批潜在输入。它解释文本以生成关键帧，并相应地插值这些值，提供关键帧之间的平稳过渡。这个节点特别适用于创建动画或转换，其中需要潜在变量的平滑进展。

# Input types
## Required
- text
    - 参数'text'定义了潜在输入动画的时间表。它是一个字符串，指定关键帧及其相应的值，用于生成动画序列。此参数至关重要，因为它决定了动画的模式以及潜在输入在过程中将采用的值。
    - Comfy dtype: STRING
    - Python dtype: str
- num_latents
    - 参数'num_latents'是一个包含要动画化的潜在变量的字典。字典中的每个键对应不同的潜在变量，值是表示这些变量初始状态的张量。此参数至关重要，因为它为动画提供了起点，并定义了随时间将被操作的变量。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- print_output
    - 参数'print_output'是一个布尔标志，设置为True时，会将生成的关键帧及其插值结果打印到控制台。这对于调试或在进一步处理之前可视化动画序列非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- t
    - 输出't'表示从输入文本时间表生成的插值关键帧。它是一系列浮点数，指示动画随时间的进展。
    - Comfy dtype: FLOAT
    - Python dtype: pandas.Series
- list(map(int, t))
    - 此输出是从插值关键帧派生的整数列表。它提供了动画序列的离散化版本，对于需要整数值而不是浮点数的应用非常有用。
    - Comfy dtype: INT
    - Python dtype: List[int]
- num_latents
    - 输出'num_latents'是根据输入时间表动画化的潜在变量字典。它包含动画过程后潜在变量的更新状态。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class BatchValueScheduleLatentInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': defaultValue}), 'num_latents': ('LATENT',), 'print_output': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('FLOAT', 'INT', 'LATENT')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/BatchScheduleNodes'

    def animate(self, text, num_latents, print_output):
        num_elements = sum((tensor.size(0) for tensor in num_latents.values()))
        max_frames = num_elements
        t = batch_get_inbetweens(batch_parse_key_frames(text, max_frames), max_frames)
        if print_output is True:
            print('ValueSchedule: ', t)
        return (t, list(map(int, t)), num_latents)
```