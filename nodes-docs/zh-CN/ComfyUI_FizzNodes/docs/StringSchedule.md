# Documentation
- Class name: StringSchedule
- Category: FizzNodes 📅🅕🅝/ScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

StringSchedule节点旨在处理和动画化基于文本的日程。它接受各种参数以定制动画过程，包括文本、帧限制和当前帧索引。该节点的主要功能是生成一系列可以用于动画或调度目的的提示，将基于帧的动画的复杂性抽象为一个简单、由文本驱动的界面。

# Input types
## Required
- text
    - ‘text’参数是节点用来生成动画提示的原始文本输入。它至关重要，因为它直接影响输出提示的内容和结构。该参数支持多行输入，允许复杂和详细的描述。
    - Comfy dtype: STRING
    - Python dtype: str
- max_frames
    - ‘max_frames’参数定义了动画序列的最大帧数。它在确定动画的持续时间和帧间隔方面起着重要作用，影响着整体的节奏和流畅度。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - ‘current_frame’参数指示动画序列中的当前位置。它对于确定在任何给定时刻使用哪个提示至关重要，从而控制动画的状态。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- print_output
    - ‘print_output’参数是一个可选的标志，当设置为True时，会将动画提示的输出打印到控制台。这对于调试或以基于文本的格式可视化动画序列非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- pre_text
    - ‘pre_text’参数用于在每个帧的提示前添加文本。它可以用来添加应该出现在动画序列中每个提示开头的上下文或额外信息。
    - Comfy dtype: STRING
    - Python dtype: str
- app_text
    - ‘app_text’参数被添加到每个帧的提示后，允许向动画序列添加结尾或补充文本。它可以通过额外的细节或结束语来增强最终输出。
    - Comfy dtype: STRING
    - Python dtype: str
- pw_a
    - ‘pw_a’参数是动画提示插值过程中使用的加权因子。它影响提示在动画中的平衡和分布，允许微调动画的进展。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_b
    - ‘pw_b’参数是动画插值中的另一个加权因子，与‘pw_a’互补，以在序列中实现所需的效果或强调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_c
    - ‘pw_c’参数是用于插值提示的加权系统的一部分，为动画发展的细节提供额外的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_d
    - ‘pw_d’参数是权重系列中的最后一个加权因子，提供了对提示在动画中如何插值的最后层面的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- POS
    - 'POS'输出代表了从输入文本和参数派生的当前积极提示。它是动画序列的关键部分，为给定帧提供肯定或主要内容。
    - Comfy dtype: STRING
    - Python dtype: str
- NEG
    - 'NEG'输出表示当前的消极提示，通过为帧提供对比或替代内容来补充'POS'输出，增强了动画的整体深度和复杂性。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class StringSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': defaultPrompt}), 'max_frames': ('INT', {'default': 120.0, 'min': 1.0, 'max': 999999.0, 'step': 1.0}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False})}, 'optional': {'pre_text': ('STRING', {'multiline': True}), 'app_text': ('STRING', {'multiline': True}), 'pw_a': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_b': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_c': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_d': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('POS', 'NEG')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/ScheduleNodes'

    def animate(self, text, max_frames, current_frame, pw_a=0, pw_b=0, pw_c=0, pw_d=0, pre_text='', app_text='', print_output=False):
        current_frame = current_frame % max_frames
        inputText = str('{' + text + '}')
        inputText = re.sub(',\\s*}', '}', inputText)
        animation_prompts = json.loads(inputText.strip())
        start_frame = 0
        (pos, neg) = batch_split_weighted_subprompts(animation_prompts, pre_text, app_text)
        (pos_cur_prompt, pos_nxt_prompt, weight) = interpolate_prompt_series(pos, max_frames, 0, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        (neg_cur_prompt, neg_nxt_prompt, weight) = interpolate_prompt_series(neg, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        return (pos_cur_prompt[current_frame], neg_cur_prompt[current_frame])
```