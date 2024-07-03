
# Documentation
- Class name: CCSR_Model_Select
- Category: CCSR
- Output node: False

CCSR_Model_Select节点旨在根据提供的检查点名称选择并加载特定的CCSR模型检查点。它为CCSR模型的初始化提供了预训练权重，以便进行后续的处理或推理任务。

# Input types
## Required
- ckpt_name
    - 要加载的检查点名称。这个参数对于从可用的检查点中识别和检索特定的预训练模型权重至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- ccsr_model
    - 加载的CCSR模型检查点的路径。这个输出对于后续需要模型检查点路径进行初始化或进一步处理的节点来说是必不可少的。
    - Comfy dtype: CCSRMODEL
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CCSR_Model_Select:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { 
            "ckpt_name": (folder_paths.get_filename_list("checkpoints"),),                                             
                             }}
    RETURN_TYPES = ("CCSRMODEL",)
    RETURN_NAMES = ("ccsr_model",)
    FUNCTION = "load_ccsr_checkpoint"

    CATEGORY = "CCSR"

    def load_ccsr_checkpoint(self, ckpt_name):
        ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
        
        return (ckpt_path,)

```
