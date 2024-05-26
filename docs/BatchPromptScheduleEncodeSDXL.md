# Documentation
- Class name: BatchPromptScheduleEncodeSDXL
- Category: FizzNodes 📅🅕🅝/BatchScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

BatchPromptScheduleEncodeSDXL 节点旨在处理并为图像或视频生成动画化一系列提示。它接收各种参数，如文本提示、尺寸和插值权重，以创建动态的提示序列，然后对这些提示进行编码，以便在生成模型中使用。该节点在动画流水线中扮演着关键角色，通过生成必要的条件数据，实现帧与帧之间连贯和平滑的过渡。

# Input types
## Required
- width
    - 宽度参数对于定义生成媒体的尺寸至关重要。它与高度参数一起工作，确保输出遵守所需的纵横比和分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- text_g
    - text_g 输入包含用于生成动画的图形提示的字符串。它是塑造动画序列视觉输出的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str
- max_frames
    - max_frames 参数规定了为动画生成的最大帧数。它是决定最终输出长度和复杂度的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- pw_a
    - pw_a 参数是插值过程中使用的可选权重因子。它允许微调动画序列中某些提示的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- POS
    - POS 输出提供了从提示中派生的正面条件数据，用于引导生成过程朝着更有利的结果发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- NEG
    - NEG 输出包含负面条件数据，通过提供反例或约束，有助于引导生成过程避免不希望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class BatchPromptScheduleEncodeSDXL:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'text_g': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'text_l': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'max_frames': ('INT', {'default': 120.0, 'min': 1.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False})}, 'optional': {'pre_text_G': ('STRING', {'multiline': True}), 'app_text_G': ('STRING', {'multiline': True}), 'pre_text_L': ('STRING', {'multiline': True}), 'app_text_L': ('STRING', {'multiline': True}), 'pw_a': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_b': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_c': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_d': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('POS', 'NEG')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/BatchScheduleNodes'

    def animate(self, clip, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l, app_text_G, app_text_L, pre_text_G, pre_text_L, max_frames, print_output, pw_a, pw_b, pw_c, pw_d):
        inputTextG = str('{' + text_g + '}')
        inputTextL = str('{' + text_l + '}')
        inputTextG = re.sub(',\\s*}', '}', inputTextG)
        inputTextL = re.sub(',\\s*}', '}', inputTextL)
        animation_promptsG = json.loads(inputTextG.strip())
        animation_promptsL = json.loads(inputTextL.strip())
        (posG, negG) = batch_split_weighted_subprompts(animation_promptsG, pre_text_G, app_text_G)
        (posL, negL) = batch_split_weighted_subprompts(animation_promptsL, pre_text_L, app_text_L)
        (pc, pn, pw) = BatchInterpolatePromptsSDXL(posG, posL, max_frames, clip, app_text_G, app_text_L, pre_text_G, pre_text_L, pw_a, pw_b, pw_c, pw_d, width, height, crop_w, crop_h, target_width, target_height, print_output)
        p = BatchPoolAnimConditioningSDXL(pc, pn, pw)
        (nc, nn, nw) = BatchInterpolatePromptsSDXL(negG, negL, max_frames, clip, app_text_G, app_text_L, pre_text_G, pre_text_L, pw_a, pw_b, pw_c, pw_d, width, height, crop_w, crop_h, target_width, target_height, print_output)
        n = BatchPoolAnimConditioningSDXL(nc, nn, nw)
        return (p, n)
```