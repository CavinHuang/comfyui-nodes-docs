
# Documentation
- Class name: Checkpoint Selector
- Category: ImageSaverTools/utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Checkpoint Selector 节点旨在简化从预定义列表中选择检查点文件的过程。它抽象了识别和选择适当检查点文件的流程，这些文件用于模型加载或初始化等操作，从而简化了需要特定检查点配置的任务工作流程。

# Input types
## Required
- ckpt_name
    - 指定要选择的检查点文件名。这个参数对于确定后续操作将使用哪个检查点文件至关重要，有效地指导了节点的输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- ckpt_name
    - 返回所选的检查点文件名。这个输出对于需要特定检查点文件的下游任务（如模型加载或进一步处理）至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CheckpointSelector:
    CATEGORY = 'ImageSaverTools/utils'
    RETURN_TYPES = (folder_paths.get_filename_list("checkpoints"),)
    RETURN_NAMES = ("ckpt_name",)
    FUNCTION = "get_names"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),}}

    def get_names(self, ckpt_name):
        return (ckpt_name,)

```
