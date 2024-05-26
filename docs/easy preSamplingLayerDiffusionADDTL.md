# Documentation
- Class name: layerDiffusionSettingsADDTL
- Category: EasyUse/PreSampling
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

此类节点负责设置层扩散模型的额外文本提示，以优化生成过程的输入条件。

# Input types
## Required
- pipe
    - ‘pipe’参数是节点操作的基础，提供了扩散过程所需的重要上下文和数据。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- foreground_prompt
    - 该参数允许用户输入前景提示，对于引导模型生成符合期望焦点的内容至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- background_prompt
    - 通过提供背景提示，用户可以为模型建立上下文或设定场景，确保生成的内容与预期背景保持一致。
    - Comfy dtype: STRING
    - Python dtype: str
- blended_prompt
    - 混合提示参数允许结合多个提示，以创建更细致和详细的输出，从而增强生成内容的丰富性。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- optional_fg_cond
    - 此可选参数为前景提供了额外的调节输入，提供了灵活性，以根据用户特定要求定制模型的生成。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- optional_bg_cond
    - 同样，此可选参数扩展了背景的调节能力，允许更复杂和具有上下文的生成。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- optional_blended_cond
    - 该参数提供了混合多个调节输入的方法，可以实现更和谐和综合的生成结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Output types
- pipe
    - 更新后的‘pipe’输出包含新的层扩散条件，这对于流水线中的后续步骤至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict

# Usage tips
- Infra type: CPU

# Source code
```
class layerDiffusionSettingsADDTL:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'foreground_prompt': ('STRING', {'default': '', 'placeholder': 'Foreground Additional Prompt', 'multiline': True}), 'background_prompt': ('STRING', {'default': '', 'placeholder': 'Background Additional Prompt', 'multiline': True}), 'blended_prompt': ('STRING', {'default': '', 'placeholder': 'Blended Additional Prompt', 'multiline': True})}, 'optional': {'optional_fg_cond': ('CONDITIONING',), 'optional_bg_cond': ('CONDITIONING',), 'optional_blended_cond': ('CONDITIONING',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    OUTPUT_NODE = True
    FUNCTION = 'settings'
    CATEGORY = 'EasyUse/PreSampling'

    def settings(self, pipe, foreground_prompt, background_prompt, blended_prompt, optional_fg_cond=None, optional_bg_cond=None, optional_blended_cond=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        (fg_cond, bg_cond, blended_cond) = (None, None, None)
        clip = pipe['clip']
        if optional_fg_cond is not None:
            fg_cond = optional_fg_cond
        elif foreground_prompt != '':
            (fg_cond,) = CLIPTextEncode().encode(clip, foreground_prompt)
        if optional_bg_cond is not None:
            bg_cond = optional_bg_cond
        elif background_prompt != '':
            (bg_cond,) = CLIPTextEncode().encode(clip, background_prompt)
        if optional_blended_cond is not None:
            blended_cond = optional_blended_cond
        elif blended_prompt != '':
            (blended_cond,) = CLIPTextEncode().encode(clip, blended_prompt)
        new_pipe = {**pipe, 'loader_settings': {**pipe['loader_settings'], 'layer_diffusion_cond': (fg_cond, bg_cond, blended_cond)}}
        del pipe
        return (new_pipe,)
```