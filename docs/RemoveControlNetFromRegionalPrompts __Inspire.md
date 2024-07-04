
# Documentation
- Class name: RemoveControlNetFromRegionalPrompts __Inspire
- Category: InspirePack/Util
- Output node: False

该节点旨在处理区域提示，通过移除其中的控制网络信息。它遍历每个区域提示，提取正面和负面条件文本，应用一个过程来移除这些文本中的控制网络数据，然后用更新后的条件重新组装提示。其目的是清理提示中的特定控制指令，使其适合进一步处理或生成任务，而不受原始控制网络设置的影响。

# Input types
## Required
- regional_prompts
    - 需要处理的区域提示集合。每个提示包含可能包含需要移除的控制网络信息的正面和负面条件文本。这个输入对节点的操作至关重要，因为它定义了需要清理控制网络特定信息的数据集。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[RegionalPrompt]

# Output types
- regional_prompts
    - 从条件文本中移除了控制网络信息的区域提示列表。这个输出已经准备好进行进一步处理或生成任务，不再受原始控制网络影响。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[RegionalPrompt]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemoveControlNetFromRegionalPrompts:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"regional_prompts": ("REGIONAL_PROMPTS", )}}
    RETURN_TYPES = ("REGIONAL_PROMPTS",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, regional_prompts):
        rcn = RemoveControlNet()
        res = []
        for rp in regional_prompts:
            _, _, _, _, positive, negative = rp.sampler.params
            positive, negative = rcn.doit(positive)[0], rcn.doit(negative)[0]
            sampler = rp.sampler.clone_with_conditionings(positive, negative)
            res.append(rp.clone_with_sampler(sampler))
        return (res, )

```
