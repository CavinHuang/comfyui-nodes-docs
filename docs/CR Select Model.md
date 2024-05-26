# Documentation
- Class name: CR_SelectModel
- Category: Comfyroll/Essential/Core
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SelectModel 是一个用于根据用户定义的标准选择和加载模型的节点。它允许指定多个检查点文件，并根据用户提供的索引选择适当的模型。该节点能够处理不同的检查点文件，并返回一个包含所选模型、其关联的clip和vae对象、检查点名称以及指向文档的链接以供进一步帮助的元组。

# Input types
## Required
- ckpt_name1
    - 参数 'ckpt_name1' 是用户可以选择的第一个检查点文件名。它在节点的操作中起着至关重要的作用，因为它决定了节点可以加载的潜在模型之一。
    - Comfy dtype: STRING
    - Python dtype: str
- ckpt_name2
    - 参数 'ckpt_name2' 是用户可以选择的第二个检查点文件名。它在为用户提供选择模型时的选择项中起着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
- ckpt_name3
    - 参数 'ckpt_name3' 是用户可以选择的第三个检查点文件名。它有助于增加节点可以处理的模型的多样性。
    - Comfy dtype: STRING
    - Python dtype: str
- ckpt_name4
    - 参数 'ckpt_name4' 是用户可以选择的第四个检查点文件名。它是模型选择可用选项集的一部分。
    - Comfy dtype: STRING
    - Python dtype: str
- ckpt_name5
    - 参数 'ckpt_name5' 是用户可以选择的第五个检查点文件名。它增加了节点能够加载的模型的范围。
    - Comfy dtype: STRING
    - Python dtype: str
- select_model
    - 参数 'select_model' 是一个整数，它决定将使用哪个检查点文件来加载模型。它非常重要，因为它直接影响节点选择并随后加载的模型。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MODEL
    - 输出 'MODEL' 是根据用户选择加载的模型对象。它很重要，因为它代表了节点的核心功能，使进一步的处理或分析成为可能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - 输出 'CLIP' 是与所选模型相关的clip对象。它对于提供与模型相关的额外上下文或功能很重要。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- VAE
    - 输出 'VAE' 是模型架构中的变分自编码器对象。它对于涉及生成模型或潜在空间操作的任务很重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- ckpt_name
    - 输出 'ckpt_name' 提供了用于加载模型的检查点文件的名称。它对于跟踪目的或进一步的模型管理很有用。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 输出 'show_help' 是一个链接到节点文档的URL。它对于需要关于节点使用额外指导或信息的用户很有帮助。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SelectModel:

    @classmethod
    def INPUT_TYPES(cls):
        checkpoint_files = ['None'] + folder_paths.get_filename_list('checkpoints')
        return {'required': {'ckpt_name1': (checkpoint_files,), 'ckpt_name2': (checkpoint_files,), 'ckpt_name3': (checkpoint_files,), 'ckpt_name4': (checkpoint_files,), 'ckpt_name5': (checkpoint_files,), 'select_model': ('INT', {'default': 1, 'min': 1, 'max': 5})}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'STRING', 'STRING')
    RETURN_NAMES = ('MODEL', 'CLIP', 'VAE', 'ckpt_name', 'show_help')
    FUNCTION = 'select_model'
    CATEGORY = icons.get('Comfyroll/Essential/Core')

    def select_model(self, ckpt_name1, ckpt_name2, ckpt_name3, ckpt_name4, ckpt_name5, select_model):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-select-model'
        model_list = list()
        if select_model == 1:
            model_name = ckpt_name1
        elif select_model == 2:
            model_name = ckpt_name2
        elif select_model == 3:
            model_name = ckpt_name3
        elif select_model == 4:
            model_name = ckpt_name4
        elif select_model == 5:
            model_name = ckpt_name5
        if model_name == 'None':
            print(f'CR Select Model: No model selected')
            return ()
        ckpt_path = folder_paths.get_full_path('checkpoints', model_name)
        (model, clip, vae, clipvision) = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths('embeddings'))
        return (model, clip, vae, model_name, show_help)
```