# Documentation
- Class name: CheckpointHash
- Category: Mikey/Loaders
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

CheckpointHash 节点旨在为指定的检查点文件生成和检索加密哈希。它通过哈希其内容来确保检查点的完整性和唯一性。此节点在加载过程中验证检查点的真实性方面发挥着关键作用。

# Input types
## Required
- ckpt_name
    - 检查点名称是一个关键参数，用于识别将要生成哈希的特定检查点文件。它用于在检查点目录中匹配文件。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- extra_pnginfo
    - 与PNG文件格式相关的额外信息，可能用于检查点之外的额外处理或元数据存储。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Any
- prompt
    - prompt 对象用于存储和检索与检查点相关的信息，例如唯一标识符和计算出的哈希，以便在工作流程中后续使用。
    - Comfy dtype: PROMPT
    - Python dtype: Dict[str, Dict[str, Any]]
- unique_id
    - 检查点的唯一标识符，可用于在系统中跟踪和引用检查点。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- ckpt_hash
    - 检查点文件的加密哈希确保了其完整性，并作为验证的手段。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CheckpointHash:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': ('STRING', {'forceInput': True})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('ckpt_hash',)
    FUNCTION = 'get_hash'
    CATEGORY = 'Mikey/Loaders'

    def get_hash(self, ckpt_name, extra_pnginfo, prompt, unique_id):
        file_list = folder_paths.get_filename_list('checkpoints')
        matching_file = [s for s in file_list if ckpt_name in s][0]
        ckpt_path = folder_paths.get_full_path('checkpoints', matching_file)
        hash = get_file_hash(ckpt_path)
        ckpt_name = os.path.basename(ckpt_name)
        prompt.get(str(unique_id))['inputs']['output_ckpt_hash'] = hash
        prompt.get(str(unique_id))['inputs']['output_ckpt_name'] = ckpt_name
        return (get_file_hash(ckpt_path),)
```