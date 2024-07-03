
# Documentation
- Class name: Json comparator [Crystools]
- Category: crystools 🪛/Utils
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

这个节点旨在比较两个JSON对象，识别它们之间的差异，如添加、删除或更改的元素。它抽象了深度JSON比较的复杂性，提供了一种简单直观的方式来可视化两个JSON状态之间的变化。

# Input types
## Required
- json_old
    - 要比较的原始JSON对象。它作为比较的基准。
    - Comfy dtype: JSON
    - Python dtype: str
- json_new
    - 要与原始JSON进行比较的新JSON对象。将突出显示在此对象和原始JSON之间检测到的差异。
    - Comfy dtype: JSON
    - Python dtype: str

## Optional

# Output types
- json_compared
    - 一个字符串表示，显示在两个JSON对象之间发现的差异，包括添加、删除或更改的元素。
    - Comfy dtype: JSON
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CUtilsCompareJsons:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "json_old": JSON_WIDGET,
                "json_new": JSON_WIDGET,
            },
            "optional": {

            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.UTILS.value
    RETURN_TYPES = ("JSON",)
    RETURN_NAMES = ("json_compared",)
    OUTPUT_NODE = True

    FUNCTION = "execute"

    def execute(self, json_old, json_new):
        json = findJsonStrDiff(json_old, json_new)
        return (str(json),)

```
