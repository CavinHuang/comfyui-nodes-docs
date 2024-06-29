# Documentation
- Class name: BatchPromptScheduleEncodeSDXLLatentInput
- Category: FizzNodes 📅🅕🅝/BatchScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

BatchPromptScheduleEncodeSDXLLatentInput 节点旨在将一批提示处理并编码成适合在生成模型中使用的潜在表示。它处理提示插值和条件化的复杂性，抽象化了过程的细节，提供了一个简化的接口来生成潜在输入。

# Input types
## Required
- width
    - 宽度参数对于定义输入图像的尺寸至关重要。它在节点的操作中起着关键作用，决定了图像处理的分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数与宽度类似，对于指定输入图像的垂直尺寸至关重要，影响节点如何处理和编码图像数据。
    - Comfy dtype: INT
    - Python dtype: int
- text_g
    - text_g 输入是一个包含生成模型提示的字符串。它是节点功能的关键组成部分，因为它直接影响潜在表示的生成。
    - Comfy dtype: STRING
    - Python dtype: str
- num_latents
    - num_latents 参数指定由节点生成的潜在向量的数量。它很重要，因为它决定了潜在空间表示的输出大小。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- POS
    - POS 输出为生成模型提供正向条件数据，这对于将生成过程引向期望的结果具有重要意义。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- NEG
    - NEG 输出包含负向条件数据，用于引导生成过程远离不希望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- LATENT
    - LATENT 输出表示由节点生成的潜在向量，用作进一步处理或直接在生成模型中使用的输入。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class BatchPromptScheduleEncodeSDXLLatentInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_w': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'crop_h': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_width': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'target_height': ('INT', {'default': 1024.0, 'min': 0, 'max': MAX_RESOLUTION}), 'text_g': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'text_l': ('STRING', {'multiline': True}), 'clip': ('CLIP',), 'num_latents': ('LATENT',), 'print_output': ('BOOLEAN', {'default': False})}, 'optional': {'pre_text_G': ('STRING', {'multiline': True}), 'app_text_G': ('STRING', {'multiline': True}), 'pre_text_L': ('STRING', {'multiline': True}), 'app_text_L': ('STRING', {'multiline': True}), 'pw_a': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_b': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_c': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1}), 'pw_d': ('FLOAT', {'default': 0.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.1})}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('POS', 'NEG')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/BatchScheduleNodes'

    def animate(self, clip, width, height, crop_w, crop_h, target_width, target_height, text_g, text_l, app_text_G, app_text_L, pre_text_G, pre_text_L, num_latents, print_output, pw_a, pw_b, pw_c, pw_d):
        max_frames = sum((tensor.size(0) for tensor in num_latents.values()))
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
        return (p, n, num_latents)
```