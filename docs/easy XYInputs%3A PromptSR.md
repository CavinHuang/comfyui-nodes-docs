
# Documentation
- Class name: easy XYInputs: PromptSR
- Category: EasyUse/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PromptSR节点专门用于处理文本提示，通过指定情感倾向（正面或负面）来调整或生成新的提示。它利用搜索文本、替换文本和条件来动态创建或修改提示，旨在实现更有针对性和细致入微的提示工程方法。

# Input types
## Required
- target_prompt
    - 决定提示调整或生成的情感方向，影响输出结果朝向正面或负面情感。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- search_txt
    - 用于在提示中搜索的文本，使特定主题或内容能够被锁定以进行优化或生成。
    - Comfy dtype: STRING
    - Python dtype: str
- replace_all_text
    - 布尔标志，指示是否应替换提示中所有出现的搜索文本。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- replace_count
    - 指定要进行的替换次数，允许对提示进行受控修改。
    - Comfy dtype: INT
    - Python dtype: int
- replace_i
    - 动态替换文本输入，其中'i'可以从1到'replace_count'指定的值，便于进行特定文本替换。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- X or Y
    - 生成一个分类为'X'或'Y'的提示，基于目标提示指定的情感方向，详细修改反映了输入条件。
    - Comfy dtype: X_Y
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_PromptSR:

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {
            "required": {
                "target_prompt": (["positive", "negative"],),
                "search_txt": ("STRING", {"default": "", "multiline": False}),
                "replace_all_text": ("BOOLEAN", {"default": False}),
                "replace_count": ("INT", {"default": 3, "min": 1, "max": 30 - 1}),
            }
        }

        # Dynamically add replace_X inputs
        for i in range(1, 30):
            replace_key = f"replace_{i}"
            inputs["required"][replace_key] = ("STRING", {"default": "", "multiline": False, "placeholder": replace_key})

        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, target_prompt, search_txt, replace_all_text, replace_count, **kwargs):
        axis = None

        if target_prompt == "positive":
            axis = "advanced: Positive Prompt S/R"
        elif target_prompt == "negative":
            axis = "advanced: Negative Prompt S/R"

        # Create base entry
        values = [(search_txt, None, replace_all_text)]

        if replace_count > 0:
            # Append additional entries based on replace_count
            values.extend([(search_txt, kwargs.get(f"replace_{i+1}"), replace_all_text) for i in range(replace_count)])
        return ({"axis": axis, "values": values},) if values is not None else (None,)

```
