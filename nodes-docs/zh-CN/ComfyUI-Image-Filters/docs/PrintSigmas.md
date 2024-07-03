
# Documentation
- Class name: PrintSigmas
- Category: utils
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PrintSigmas节点是一个用于计算图中的实用工具节点，其主要功能是打印并返回sigma参数的值。该节点有助于调试和监控sigma值在图中的流动，为用户提供了一种简单而有效的方法来输出这些值以便进行检查。

# Input types
## Required
- sigmas
    - sigmas参数代表需要被打印和返回的sigma值。它在节点操作中起着关键作用，作为既要输出供用户检查，又要通过节点传递以供进一步使用的数据。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor

# Output types
- sigmas
    - 返回与输入相同的sigma值，允许在计算图的其他部分进行进一步处理或检查。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PrintSigmas:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "sigmas": ("SIGMAS",)
            }}
    RETURN_TYPES = ("SIGMAS",)
    FUNCTION = "notify"
    OUTPUT_NODE = True
    CATEGORY = "utils"
    
    def notify(self, sigmas):
        print(sigmas)
        return (sigmas,)

```
