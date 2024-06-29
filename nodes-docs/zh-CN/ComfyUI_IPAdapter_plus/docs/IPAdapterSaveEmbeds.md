# Documentation
- Class name: IPAdapterSaveEmbeds
- Category: ipadapter/embeds
- Output node: True
- Repo Ref: https://github.com/cubiq/ComfyUI_IPAdapter_plus.git

IPAdapterSaveEmbeds节点旨在存储由图像处理系统生成的嵌入。它的目的是将这些嵌入以结构化的方式持久化到磁盘上，便于检索和进一步分析。该节点在工作流程中扮演着关键角色，确保嵌入过程的输出不会丢失，从而促进后续任务，如模型训练或特征比较。

# Input types
## Required
- embeds
    - ‘embeds’参数对于节点至关重要，因为它表示要保存的嵌入。它是节点操作的核心数据，其适当处理确保了嵌入过程的完整性。此参数直接影响节点的执行，它决定了要持久化的数据。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
## Optional
- filename_prefix
    - ‘filename_prefix’参数用于定义保存嵌入的文件名的起始部分。它对于组织和识别保存的文件很重要。此参数允许用户根据输入数据的上下文或类型对嵌入进行分类。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- None
    - 该节点不返回任何值，其主要功能是将嵌入保存到文件中。没有返回值表示保存操作的完成。
    - Comfy dtype: None
    - Python dtype: NoneType

# Usage tips
- Infra type: CPU

# Source code
```
class IPAdapterSaveEmbeds:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'embeds': ('EMBEDS',), 'filename_prefix': ('STRING', {'default': 'IP_embeds'})}}
    RETURN_TYPES = ()
    FUNCTION = 'save'
    OUTPUT_NODE = True
    CATEGORY = 'ipadapter/embeds'

    def save(self, embeds, filename_prefix):
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir)
        file = f'{filename}_{counter:05}.ipadpt'
        file = os.path.join(full_output_folder, file)
        torch.save(embeds, file)
        return (None,)
```