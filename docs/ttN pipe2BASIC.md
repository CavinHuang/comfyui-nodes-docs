
# Documentation
- Class name: ttN pipe2BASIC
- Category: ttN/pipe
- Output node: False

ttN pipe2BASIC节点旨在通过提取和重新打包管道的核心组件来简化给定管道的结构，将其转换为基本管道格式。这一过程有助于更容易地操作和理解管道的基本元素。

# Input types
## Required
- pipe
    - 'pipe'输入是需要简化的管道，其中包含各种组件，如模型、剪辑和VAE。它作为转换为基本管道格式的主要数据结构。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]

# Output types
- basic_pipe
    - 'basic_pipe'输出是输入管道的简化版本，仅包含其基本组件，如模型、剪辑、VAE以及正面和负面条件。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]
- pipe
    - 'pipe'输出返回输入时收到的原始管道，允许进行进一步的操作或检查。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipe_2BASIC:
    version = '1.1.0'
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "pipe": ("PIPE_LINE",),
                },
            "hidden": {"ttNnodeVersion": ttN_pipe_2BASIC.version},
            }

    RETURN_TYPES = ("BASIC_PIPE", "PIPE_LINE",)
    RETURN_NAMES = ("basic_pipe", "pipe",)
    FUNCTION = "flush"

    CATEGORY = "ttN/pipe"
    
    def flush(self, pipe):
        basic_pipe = (pipe.get('model'), pipe.get('clip'), pipe.get('vae'), pipe.get('positive'), pipe.get('negative'))
        return (basic_pipe, pipe, )

```
