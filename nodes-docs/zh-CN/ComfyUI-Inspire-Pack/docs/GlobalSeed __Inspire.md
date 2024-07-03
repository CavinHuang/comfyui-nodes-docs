
# Documentation
- Class name: GlobalSeed __Inspire
- Category: InspirePack/Prompt
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GlobalSeed节点是Inspire包中的一个组件,用于管理和操作工作流中各个节点使用的全局种子值。它允许设置种子值,选择修改该种子的操作(如增加、减少、随机化),并控制种子的应用模式(生成前或生成后)。这个功能对于确保生成过程的一致性、可重复性和输出变化至关重要。

# Input types
## Required
- value
    - 指定初始种子值。它对于初始化种子操作过程至关重要,影响任何基于种子的操作的起点。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - 决定种子操作是在生成过程之前还是之后发生,影响种子值如何以及何时影响工作流。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- action
    - 定义对种子值执行的操作(如固定、递增、递减、随机化),决定种子如何随时间或跨节点变化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- last_seed
    - 保存上一次使用的种子值,允许跟踪并可能恢复到之前的状态。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GlobalSeed:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "value": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "mode": ("BOOLEAN", {"default": True, "label_on": "control_before_generate", "label_off": "control_after_generate"}),
                "action": (["fixed", "increment", "decrement", "randomize",
                            "increment for each node", "decrement for each node", "randomize for each node"], ),
                "last_seed": ("STRING", {"default": ""}),
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    OUTPUT_NODE = True

    def doit(self, **kwargs):
        return {}

```
