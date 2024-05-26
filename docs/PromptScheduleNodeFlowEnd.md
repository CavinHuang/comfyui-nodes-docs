# Documentation
- Class name: PromptScheduleNodeFlowEnd
- Category: FizzNodes 📅🅕🅝/ScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

`PromptScheduleNodeFlowEnd` 类的 `animate` 方法负责根据给定的文本和一系列参数生成动画提示。它处理输入文本以创建一系列提示，这些提示可以用来驱动动画序列，同时考虑到各种权重和条件，以确保帧之间的平滑过渡。

# Input types
## Required
- text
    - ‘text’ 参数是节点的关键输入，因为它提供了将用于生成动画提示的原始文本。它很重要，因为它直接影响动画的内容和流程。
    - Comfy dtype: STRING
    - Python dtype: str
- max_frames
    - ‘max_frames’ 参数定义了动画序列的最大帧数。它至关重要，因为它决定了动画的总长度，并影响提示在帧中的分布。
    - Comfy dtype: INT
    - Python dtype: int
- print_output
    - ‘print_output’ 参数用于控制是否应该打印动画过程的中间结果。这对于调试目的或在创建动画时提供反馈很有帮助。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- current_frame
    - ‘current_frame’ 参数表示动画序列中的当前位置。它很重要，因为它帮助节点确定在动画的任何给定时刻使用哪个提示。
    - Comfy dtype: INT
    - Python dtype: int
- clip
    - ‘clip’ 参数是节点的一个重要输入，因为它代表了将用于将提示标记化并编码为适合动画的格式的 CLIP 模型。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
## Optional
- pre_text
    - ‘pre_text’ 参数用于在主要动画提示前添加上下文。它可以影响动画的初始状态，当需要引入部分时特别有用。
    - Comfy dtype: STRING
    - Python dtype: str
- app_text
    - ‘app_text’ 参数用于在主要动画提示后追加上下文。它可以用来用额外的信息扩展动画，或者为序列提供一个结论。
    - Comfy dtype: STRING
    - Python dtype: str
- pw_a
    - ‘pw_a’ 参数是一个可选的权重，用于调整动画中某些提示的影响。它提供了一种根据特定的创意要求微调动画的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_b
    - ‘pw_b’ 参数与 ‘pw_a’ 类似，但允许对动画权重的不同方面进行独立控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_c
    - ‘pw_c’ 参数扩展了动画权重的定制选项，为动画过程提供了额外的控制层。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_d
    - ‘pw_d’ 参数是另一个可选的权重，有助于对动画进行微调，允许对动画的进展进行精确调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- POS
    - ‘POS’ 输出提供了动画的正向调节数据，它代表了动画在每一帧应该采取的期望方向或结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- NEG
    - ‘NEG’ 输出提供了负向调节数据，它用于定义动画在每一帧应该避免或远离的内容。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]

# Usage tips
- Infra type: CPU

# Source code
```
class PromptScheduleNodeFlowEnd:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': False, 'forceInput': True}), 'clip': ('CLIP',), 'max_frames': ('INT', {'default': 0.0, 'min': 0.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 999999.0, 'step': 1.0})}, 'optional': {'pre_text': ('STRING', {'multiline': True}), 'app_text': ('STRING', {'multiline': True}), 'pw_a': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_b': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_c': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_d': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('POS', 'NEG')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/ScheduleNodes'

    def animate(self, text, max_frames, print_output, current_frame, clip, pw_a=0, pw_b=0, pw_c=0, pw_d=0, pre_text='', app_text=''):
        current_frame = current_frame % max_frames
        if text[-1] == ',':
            text = text[:-1]
        if text[0] == ',':
            text = text[:0]
        start_frame = 0
        inputText = str('{' + text + '}')
        inputText = re.sub(',\\s*}', '}', inputText)
        animation_prompts = json.loads(inputText.strip())
        max_frames += start_frame
        (pos, neg) = batch_split_weighted_subprompts(animation_prompts, pre_text, app_text)
        (pos_cur_prompt, pos_nxt_prompt, weight) = interpolate_prompt_series(pos, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        pc = PoolAnimConditioning(pos_cur_prompt[current_frame], pos_nxt_prompt[current_frame], weight[current_frame], clip)
        (neg_cur_prompt, neg_nxt_prompt, weight) = interpolate_prompt_series(neg, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        nc = PoolAnimConditioning(neg_cur_prompt[current_frame], neg_nxt_prompt[current_frame], weight[current_frame], clip)
        return (pc, nc)
```