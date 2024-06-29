# Documentation
- Class name: EditDetailerPipeSDXL
- Category: text_processing
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

EditDetailerPipeSDXL是一个旨在通过整合LoRA和通配符等额外元素来增强文本输出的特定性和细节的节点。它在文本生成过程中扮演着关键角色，允许创建更细腻和详细的内容。

# Input types
## Required
- detailer_pipe
    - detailer_pipe参数对于定义节点将操作的基础文本处理管道至关重要。它为文本增强设置了基础，对节点的功能至关重要。
    - Comfy dtype: DETAILER_PIPE
    - Python dtype: str
- wildcard
    - wildcard参数允许用户输入可以在文本生成过程中被替换或操作的动态文本段。它在定制输出以满足特定要求中起着关键作用。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- Select to add LoRA
    - LoRA选择参数允许向文本中添加细化层次，增强模型生成详细且内容丰富的能力。这是一个可选特性，能显著提升节点的能力。
    - Comfy dtype: COMBO[loras]
    - Python dtype: str
- Select to add Wildcard
    - 此参数提供了一种将通配符引入文本生成的机制，提供了输出的灵活性和适应性。它是一个可选特性，可以根据不同的用例进行定制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- model
    - model参数用于指定节点将用于文本处理的机器学习模型。这是一个可选输入，通过正确的模型选择可以增强节点的性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Output types
- refined_text
    - refined_text输出是节点操作的结果，提供了输入文本的详细和增强版本。它代表了节点文本处理能力的成果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class EditDetailerPipeSDXL(EditDetailerPipe):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'detailer_pipe': ('DETAILER_PIPE',), 'wildcard': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'Select to add LoRA': (['Select the LoRA to add to the text'] + folder_paths.get_filename_list('loras'),), 'Select to add Wildcard': (['Select the Wildcard to add to the text'],)}, 'optional': {'model': ('MODEL',), 'clip': ('CLIP',), 'vae': ('VAE',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'refiner_model': ('MODEL',), 'refiner_clip': ('CLIP',), 'refiner_positive': ('CONDITIONING',), 'refiner_negative': ('CONDITIONING',), 'bbox_detector': ('BBOX_DETECTOR',), 'sam_model': ('SAM_MODEL',), 'segm_detector': ('SEGM_DETECTOR',), 'detailer_hook': ('DETAILER_HOOK',)}}
```