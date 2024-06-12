# Documentation
- Class name: IsMaskEmptyNode
- Category: util
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

IsMaskEmptyNode 类旨在评估掩码张量的内部内容，确定它是否完全由零值组成。这个节点在图像处理和机器学习工作流程中扮演着关键角色，其中空掩码的存在具有重要意义。它抽象地为决策过程贡献了一个二进制结果，可以用来触发后续动作或过滤掉不必要的数据。

# Input types
## Required
- mask
    - 参数 'mask' 是一个张量，代表要评估的掩码。它对节点的操作至关重要，因为它直接影响掩码是否被视为空的。张量应该包含数值，其中零表示空或不重要的区域。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Output types
- boolean_number
    - 输出 'boolean_number' 是一个布尔值的数值表示，它指示输入掩码是否为空。值为1表示掩码为空（全部为零），而值为0表示掩码包含非零元素。
    - Comfy dtype: int
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class IsMaskEmptyNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',)}}
    RETURN_TYPES = ['NUMBER']
    RETURN_NAMES = ['boolean_number']
    FUNCTION = 'main'
    CATEGORY = 'util'

    def main(self, mask):
        return (torch.all(mask == 0).int().item(),)
```