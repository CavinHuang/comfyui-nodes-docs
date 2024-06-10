# Documentation
- Class name: SeargeSeparator
- Category: UI
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeSeparator节点旨在作为工作流中的占位符，提供一种分离和组织不同流程段的手段，而不执行任何积极的计算或数据操作。它作为一个结构组件，允许工作流具有清晰和逻辑的布局。

# Input types
## Required
- required
    - 该参数是SeargeSeparator节点中的关键组件，定义了输入的结构而不指定实际的数据要求。它确保节点在工作流中正确集成，有助于整体组织。
    - Comfy dtype: COMBO[{}]
    - Python dtype: Dict[str, Any]

# Output types
- None
    - 由于节点的FUNCTION是'do_nothing'，输出故意没有任何数据。这反映了节点作为结构元素而非数据处理元素的角色。
    - Comfy dtype: None
    - Python dtype: None

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeSeparator:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}}
    RETURN_TYPES = ()
    RETURN_NAMES = ()
    FUNCTION = 'do_nothing'
    CATEGORY = UI.CATEGORY_UI

    def do_nothing(self):
        return ()
```