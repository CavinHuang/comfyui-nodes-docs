# Documentation
- Class name: PromptSchedule
- Category: FizzNodes 📅🅕🅝/ScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

PromptSchedule节点负责管理和在指定帧数上动画化文本提示。它通过插值关键帧来创建提示的平滑过渡，并应用权重以控制每个关键帧的影响。该节点对于生成随时间演变的动态和连贯的文本动画至关重要。

# Input types
## Required
- text
    - ‘text’参数是一个多行字符串，定义了动画提示的初始状态。它对于设置节点将生成动画序列的基础至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- max_frames
    - ‘max_frames’参数决定了动画将运行的总帧数。它是整体动画时长和节奏的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - ‘current_frame’参数指示动画序列中的当前位置。对于节点来说，了解其在动画时间线中的位置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- print_output
    - ‘print_output’参数是一个布尔标志，设置为True时，会将动画提示的输出打印到控制台。这对于调试和实时监控非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- clip
    - ‘clip’参数是对节点内用于文本编码的CLIP模型的引用。它在将文本提示转换为适合动画的格式中起着至关重要的作用。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
## Optional
- pw_a
    - ‘pw_a’参数是一个浮点数，表示应用于当前帧动画的权重。它影响提示之间的过渡，并有助于整体动画的流畅性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pre_text
    - ‘pre_text’参数是一个可选的多行字符串，可用于前缀动画提示。它为动画序列提供额外的上下文或设置。
    - Comfy dtype: STRING
    - Python dtype: str
- app_text
    - ‘app_text’参数是一个可选的多行字符串，可用于向动画提示添加附加信息。它扩展了上下文或为动画序列添加了后缀。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- POS
    - ‘POS’输出代表当前帧动画的正面条件。它来源于插值提示，并用于指导动画的正面生成。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- NEG
    - ‘NEG’输出代表当前帧动画的负面条件。它用于平衡正面条件，确保动画序列的平衡发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]

# Usage tips
- Infra type: CPU

# Source code
```
class PromptSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': defaultPrompt}), 'clip': ('CLIP',), 'max_frames': ('INT', {'default': 120.0, 'min': 1.0, 'max': 999999.0, 'step': 1.0}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False})}, 'optional': {'pre_text': ('STRING', {'multiline': True}), 'app_text': ('STRING', {'multiline': True}), 'pw_a': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_b': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_c': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_d': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('POS', 'NEG')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/ScheduleNodes'

    def animate(self, text, max_frames, print_output, current_frame, clip, pw_a=0, pw_b=0, pw_c=0, pw_d=0, pre_text='', app_text=''):
        current_frame = current_frame % max_frames
        inputText = str('{' + text + '}')
        inputText = re.sub(',\\s*}', '}', inputText)
        animation_prompts = json.loads(inputText.strip())
        start_frame = 0
        (pos, neg) = batch_split_weighted_subprompts(animation_prompts, pre_text, app_text)
        (pos_cur_prompt, pos_nxt_prompt, weight) = interpolate_prompt_series(pos, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        pc = PoolAnimConditioning(pos_cur_prompt[current_frame], pos_nxt_prompt[current_frame], weight[current_frame], clip)
        (neg_cur_prompt, neg_nxt_prompt, weight) = interpolate_prompt_series(neg, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        nc = PoolAnimConditioning(neg_cur_prompt[current_frame], neg_nxt_prompt[current_frame], weight[current_frame], clip)
        return (pc, nc)
```