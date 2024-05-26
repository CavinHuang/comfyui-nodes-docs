# Documentation
- Class name: BatchPromptSchedule
- Category: FizzNodes 📅🅕🅝/BatchScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

BatchPromptSchedule节点旨在批量处理环境中管理和动画提示。它接受各种参数以自定义动画过程，包括文本、剪辑引用和帧规范。节点的主要功能是协调动画序列，通过应用权重和条件确保帧之间平滑过渡。它特别适用于创建需要对每帧内容进行精确控制的复杂动画。

# Input types
## Required
- text
    - 'text'参数是一个包含动画提示的字符串。它对于定义动画的内容和顺序至关重要。此输入驱动动画输出的整体叙述和结构。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 'clip'参数是对在动画过程中使用的多媒体剪辑的引用。它在动画的视觉表现方式中起着重要作用，并且对于将视听元素整合到动画中至关重要。
    - Comfy dtype: CLIP
    - Python dtype: Any
- max_frames
    - 'max_frames'参数指定动画序列的最大帧数。它是动画持续时间和节奏的关键决定因素，影响动画的整体时间和流程。
    - Comfy dtype: INT
    - Python dtype: int
- print_output
    - 'print_output'参数是一个布尔标志，设置为True时，将打印动画过程的中间结果。这对于调试和理解节点的操作很有帮助。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- pre_text
    - 'pre_text'参数是一个可选字符串，为动画提示提供额外的上下文或设置。它可以用于引入或框架动画的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- app_text
    - 'app_text'参数是一个可选字符串，为动画提示添加结束语或结束声明。它有助于完成或总结动画的信息。
    - Comfy dtype: STRING
    - Python dtype: str
- start_frame
    - 'start_frame'参数是一个可选整数，它设置动画的起始帧。它允许自定义动画序列的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- pw_a
    - 'pw_a'参数是一个可选的浮点数，表示应用于动画提示的权重。它用于调整动画中某些提示的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_b
    - 'pw_b'参数是另一个可选的浮点数，用作动画提示的次要权重。它根据分配的权重进一步细化对动画内容的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_c
    - 'pw_c'参数是一个可选的浮点数，作为动画提示的第三权重。它有助于动画进展的细微控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_d
    - 'pw_d'参数是一个可选的浮点数，代表动画提示的四元权重。它为动画的细节提供了额外的控制层。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- POS
    - 'POS'输出提供从动画提示派生的正面条件数据。它对于将动画的方向和基调引导到更有利的结果具有重要意义。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- NEG
    - 'NEG'输出提供从动画提示中提取的负面条件数据。它对于通过突出较不受欢迎的元素，在动画中建立对比和平衡至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]

# Usage tips
- Infra type: CPU

# Source code
```
class BatchPromptSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': defaultPrompt}), 'clip': ('CLIP',), 'max_frames': ('INT', {'default': 120.0, 'min': 1.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False})}, 'optional': {'pre_text': ('STRING', {'multiline': True}), 'app_text': ('STRING', {'multiline': True}), 'start_frame': ('INT', {'default': 0, 'min': 0, 'max': 9999, 'step': 1}), 'pw_a': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_b': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_c': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_d': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('POS', 'NEG')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/BatchScheduleNodes'

    def animate(self, text, max_frames, print_output, clip, start_frame, pw_a, pw_b, pw_c, pw_d, pre_text='', app_text=''):
        inputText = str('{' + text + '}')
        inputText = re.sub(',\\s*}', '}', inputText)
        max_frames += start_frame
        animation_prompts = json.loads(inputText.strip())
        (pos, neg) = batch_split_weighted_subprompts(animation_prompts, pre_text, app_text)
        (pos_cur_prompt, pos_nxt_prompt, weight) = interpolate_prompt_series(pos, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        pc = BatchPoolAnimConditioning(pos_cur_prompt, pos_nxt_prompt, weight, clip)
        (neg_cur_prompt, neg_nxt_prompt, weight) = interpolate_prompt_series(neg, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        nc = BatchPoolAnimConditioning(neg_cur_prompt, neg_nxt_prompt, weight, clip)
        return (pc, nc)
```