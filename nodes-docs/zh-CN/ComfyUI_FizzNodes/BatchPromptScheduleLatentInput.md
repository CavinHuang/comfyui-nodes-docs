# Documentation
- Class name: BatchPromptScheduleLatentInput
- Category: FizzNodes 📅🅕🅝/BatchScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

BatchPromptScheduleLatentInput节点的`animate`方法旨在处理和生成动画提示，这些提示用于在批量处理环境中创建动画序列。它接受各种参数，如文本、潜在数量和权重，以控制跨帧提示的插值。该节点的主要功能是创建一系列提示，这些提示可用于动画序列，具有使用提供的权重调整每个提示影响的能力。此方法对于动画过程至关重要，因为它为每个帧的动画设置了条件。

# Input types
## Required
- text
    - 'text'参数是一个包含动画基础提示的字符串。它是动画过程的基本部分，因为它定义了动画序列的初始条件。预期文本格式是节点能够解释并用于生成提示的格式。
    - Comfy dtype: STRING
    - Python dtype: str
- num_latents
    - 'num_latents'参数指定了动画过程中使用的潜在变量。它对于确定动画帧的范围和多样性至关重要。此参数影响如何探索和利用潜在空间来创建动画。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- print_output
    - 'print_output'参数是一个布尔标志，设置为True时，将把动画提示的输出打印到控制台。这对于调试目的或在生成提示时直观检查提示非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- start_frame
    - 'start_frame'参数决定了动画序列开始的帧。这是一个可选参数，允许定制动画的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- pw_a
    - 'pw_a'参数是一个浮点数，表示用于动画提示插值的权重。它影响帧之间的过渡，并有助于动画的平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- pre_text
    - 'pre_text'参数是一个可选字符串，可用于在每个动画提示前添加文本。这对于在每个提示的开头添加一致的元素非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- app_text
    - 'app_text'参数是一个可选字符串，可用于在每个动画提示后添加文本。它允许在每个提示的末尾添加一致的元素。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- POS
    - 'POS'输出为每个帧的动画提供正向条件信息。它来源于正向提示的插值，对于引导动画达到预期结果至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- NEG
    - 'NEG'输出为每个帧的动画提供负向条件信息。它来源于负向提示的插值，并有助于通过引导动画远离不希望的结果来细化动画。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- INPUT_LATENTS
    - 'INPUT_LATENTS'输出包含动画过程中使用的潜在变量。这些潜在变量对于生成动画帧至关重要，代表了用于创建最终动画的底层数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class BatchPromptScheduleLatentInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': defaultPrompt}), 'clip': ('CLIP',), 'num_latents': ('LATENT',), 'print_output': ('BOOLEAN', {'default': False})}, 'optional': {'pre_text': ('STRING', {'multiline': True}), 'app_text': ('STRING', {'multiline': True}), 'start_frame': ('INT', {'default': 0.0, 'min': 0, 'max': 9999, 'step': 1}), 'pw_a': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_b': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_c': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_d': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('POS', 'NEG', 'INPUT_LATENTS')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/BatchScheduleNodes'

    def animate(self, text, num_latents, print_output, clip, start_frame, pw_a, pw_b, pw_c, pw_d, pre_text='', app_text=''):
        max_frames = sum((tensor.size(0) for tensor in num_latents.values()))
        max_frames += start_frame
        inputText = str('{' + text + '}')
        inputText = re.sub(',\\s*}', '}', inputText)
        animation_prompts = json.loads(inputText.strip())
        (pos, neg) = batch_split_weighted_subprompts(animation_prompts, pre_text, app_text)
        (pos_cur_prompt, pos_nxt_prompt, weight) = interpolate_prompt_series(pos, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        pc = BatchPoolAnimConditioning(pos_cur_prompt, pos_nxt_prompt, weight, clip)
        (neg_cur_prompt, neg_nxt_prompt, weight) = interpolate_prompt_series(neg, max_frames, start_frame, pre_text, app_text, pw_a, pw_b, pw_c, pw_d, print_output)
        nc = BatchPoolAnimConditioning(neg_cur_prompt, neg_nxt_prompt, weight, clip)
        return (pc, nc, num_latents)
```