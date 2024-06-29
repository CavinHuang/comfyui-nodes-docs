# Documentation
- Class name: PromptScheduleEncodeSDXL
- Category: FizzNodes 📅🅕🅝/ScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

PromptScheduleEncodeSDXL节点旨在为视频中的一系列帧制作和编码提示。它考虑了各种参数，如宽度、高度、裁剪尺寸和文本提示，以生成一系列提示，然后将这些提示编码以创建进一步处理的条件。此节点在动画管道中扮演着关键角色，通过管理提示处理的复杂性并确保帧之间的平稳过渡。

# Input types
## Required
- width
    - 宽度参数指定视频帧的宽度。它对于确定输出视频的分辨率和宽高比至关重要，影响整体视觉质量以及动画的呈现方式。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置视频帧的垂直分辨率。它与宽度参数协同工作，以确保视频内容的正确缩放和显示。
    - Comfy dtype: INT
    - Python dtype: int
- text_g
    - text_g参数保存绿色通道的文本提示。这些提示对于引导动画过程和定义最终动画中将出现的故事或视觉元素至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- max_frames
    - max_frames参数定义动画将包含的最大帧数。此设置对于控制动画的长度和管理计算资源很重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- print_output
    - print_output参数是一个可选标志，设置为true时，将在节点执行期间打印调试信息。这对于开发人员监控进度和排除可能出现的问题很有帮助。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- POS
    - POS输出提供从输入提示和参数派生的正面条件数据。这个输出很重要，因为它为后续的视频处理步骤奠定了基础，影响着动画的最终结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[str, Dict[str, torch.Tensor]]
- NEG
    - NEG输出提供负面条件数据，通过提供额外的上下文或对比，补充POS输出。这个输出用于完善动画并为视觉叙事增加深度。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[str, Dict[str, torch.Tensor]]

# Usage tips
- Infra type: CPU

# Source code
```
class PromptScheduleEncodeSDXL:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'text_g': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'text_l': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'max_frames': ('INT', {'default': 120.0, 'min': 1.0, 'max': 999999.0, 'step': 1.0}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False})}, 'optional': {'pre_text_G': ('STRING', {'multiline': True}), 'app_text_G': ('STRING', {'multiline': True}), 'pre_text_L': ('STRING', {'multiline': True}), 'app_text_L': ('STRING', {'multiline': True}), 'pw_a': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_b': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_c': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_d': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('POS', 'NEG')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/ScheduleNodes'

    def animate(self, clip, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l, app_text_G, app_text_L, pre_text_G, pre_text_L, max_frames, current_frame, print_output, pw_a, pw_b, pw_c, pw_d):
        current_frame = current_frame % max_frames
        inputTextG = str('{' + text_g + '}')
        inputTextL = str('{' + text_l + '}')
        inputTextG = re.sub(',\\s*}', '}', inputTextG)
        inputTextL = re.sub(',\\s*}', '}', inputTextL)
        animation_promptsG = json.loads(inputTextG.strip())
        animation_promptsL = json.loads(inputTextL.strip())
        (posG, negG) = batch_split_weighted_subprompts(animation_promptsG, pre_text_G, app_text_G)
        (posL, negL) = batch_split_weighted_subprompts(animation_promptsL, pre_text_L, app_text_L)
        (pc, pn, pw) = BatchInterpolatePromptsSDXL(posG, posL, max_frames, clip, app_text_G, app_text_L, pre_text_G, pre_text_L, pw_a, pw_b, pw_c, pw_d, width, height, crop_w, crop_h, target_width, target_height, print_output)
        p = addWeighted(pc[current_frame], pn[current_frame], pw[current_frame])
        (nc, nn, nw) = BatchInterpolatePromptsSDXL(negG, negL, max_frames, clip, app_text_G, app_text_L, pre_text_G, pre_text_L, pw_a, pw_b, pw_c, pw_d, width, height, crop_w, crop_h, target_width, target_height, print_output)
        n = addWeighted(nc[current_frame], nn[current_frame], nw[current_frame])
        return (p, n)
```