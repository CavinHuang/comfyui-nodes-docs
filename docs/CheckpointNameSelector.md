
# Documentation
- Class name: CheckpointNameSelector
- Category: Art Venture/Utils
- Output node: False

CheckpointNameSelector节点旨在从预定义列表中简化检查点名称的选择过程，从而高效地在工作流中识别和使用特定的检查点。

# Input types
## Required
- ckpt_name
    - 指定要选择的检查点名称。这个参数对于确定后续操作中要使用哪个检查点至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- ckpt_name
    - 返回所选的检查点名称，使其可用于进一步的处理或操作。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ckpt_name_str
    - 以字符串形式提供所选的检查点名称，便于将其整合到需要文本表示的工作流中。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilCheckpointSelector:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
            }
        }

    RETURN_TYPES = (folder_paths.get_filename_list("checkpoints"), "STRING")
    RETURN_NAMES = ("ckpt_name", "ckpt_name_str")
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "get_ckpt_name"

    def get_ckpt_name(self, ckpt_name):
        return (ckpt_name, ckpt_name)

```
