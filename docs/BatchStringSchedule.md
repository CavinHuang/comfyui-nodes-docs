# Documentation
- Class name: BatchStringSchedule
- Category: FizzNodes 📅🅕🅝/BatchScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

BatchStringSchedule节点的`animate`方法旨在基于结构化输入文本处理并生成文本动画。它利用一系列加权子提示来创建可以用于动画或生成基于文本的内容的动态提示序列。该方法对于需要在一系列帧或步骤中转换或操作文本的应用程序至关重要。

# Input types
## Required
- text
    - 'text'参数是节点的主要输入，包含定义动画序列的结构化文本。它至关重要，因为它直接影响输出提示和整个动画过程。
    - Comfy dtype: STRING
    - Python dtype: str
- max_frames
    - 'max_frames'参数指定动画序列的最大帧数。它在确定动画的持续时间和粒度方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- print_output
    - 'print_output'参数设置为True时，将打印动画过程的中间结果到控制台。这对于调试和理解动画生成流程非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- pre_text
    - 'pre_text'参数用于在动画序列中每个提示的开头添加额外的上下文。这对于设置动画的初始状态或条件可能很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- app_text
    - 'app_text'参数被追加在动画序列中每个提示的末尾，可能为生成的提示添加更多的上下文或指令。
    - Comfy dtype: STRING
    - Python dtype: str
- pw_a
    - 'pw_a'参数是影响动画序列中提示插值和混合的权重参数之一。它有助于帧与帧之间的平滑度和过渡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_b
    - 'pw_b'参数是另一个权重参数，它在插值过程中发挥作用，影响动画帧中提示元素的平衡和分布。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_c
    - 'pw_c'参数是一个权重参数，它有助于微调动画的插值，允许对输出提示进行更精细的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pw_d
    - 'pw_d'参数是影响插值的最终权重参数，它提供了对动画过程中提示如何演变的额外控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- POS
    - 'POS'输出包含由动画过程生成的正面提示，代表文本动画的建设性或期望方面。
    - Comfy dtype: STRING
    - Python dtype: str
- NEG
    - 'NEG'输出包含由动画过程生成的负面提示，代表文本动画中要最小化或避免的方面。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class BatchStringSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': defaultPrompt}), 'max_frames': ('INT', {'default': 120.0, 'min': 1.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False})}, 'optional': {'pre_text': ('STRING', {'multiline': True}), 'app_text': ('STRING', {'multiline': True}), 'pw_a': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_b': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_c': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_d': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('POS', 'NEG')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/BatchScheduleNodes'

    def animate(self, text, max_frames, pw_a=0, pw_b=0, pw_c=0, pw_d=0, pre_text='', app_text='', print_output=False):
        inputText = str('{' + text + '}')
        inputText = re.sub(',\\s*}', '}', inputText)
        start_frame = 0
        animation_prompts = json.loads(inputText.strip())
        (pos, neg) = batch_split_weighted_subprompts(animation_prompts, pre_text, app_text)
        (pos_cur_prompt, pos_nxt_prompt, weight) = interpolate_prompt_series(pos, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        (neg_cur_prompt, neg_nxt_prompt, weight) = interpolate_prompt_series(neg, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        return (pos_cur_prompt, neg_cur_prompt)
```