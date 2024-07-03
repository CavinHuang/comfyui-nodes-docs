
# Documentation
- Class name: easy ckptNames
- Category: EasyUse/Util
- Output node: False

此节点旨在简化管道中检查点名称的选择和管理过程。它允许用户轻松指定和检索各种检查点的名称，以便在模型加载或其他需要特定检查点标识的操作中使用。

# Input types
## Required
- ckpt_name
    - 指定要选择或管理的检查点名称。该参数对于确定后续操作中使用哪个检查点至关重要，直接影响节点的执行和结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- ckpt_name
    - 返回指定的检查点名称，使其能够在进一步的处理或模型加载操作中使用。
    - Comfy dtype: *
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class setCkptName:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"),),
            }
        }

    RETURN_TYPES = (AlwaysEqualProxy('*'),)
    RETURN_NAMES = ("ckpt_name",)
    FUNCTION = "set_name"
    CATEGORY = "EasyUse/Util"

    def set_name(self, ckpt_name):
        return (ckpt_name,)

```
