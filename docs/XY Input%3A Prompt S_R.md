
# Documentation
- Class name: XY Input: Prompt S_R
- Category: Efficiency Nodes/XY Inputs
- Output node: False

XY Input: Prompt S/R节点旨在提高提示词处理的效率，通过在提示词中实现搜索和替换功能。它根据指定的搜索和替换标准动态调整提示词的内容，从而优化文本输出的生成或改进过程。该节点能够灵活地修改文本输入，为用户提供更精确和定制化的提示词处理方案。

# Input types
## Required
- target_prompt
    - 指定要修改的提示词是正面还是负面，直接影响应用于文本的修改类型。这一选择决定了节点操作的目标和效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- search_txt
    - 在提示词中要搜索的文本字符串，作为替换操作的基础。这个输入决定了哪些部分的提示词将被识别并可能被替换。
    - Comfy dtype: STRING
    - Python dtype: str
- replace_count
    - 表示搜索文本应被替换的次数，影响修改的范围。这个参数控制了替换操作的频率，从而影响最终输出的程度。
    - Comfy dtype: INT
    - Python dtype: int
- replace_i
    - 动态输入，代表搜索文本每次出现时的替换文本，允许对多个实例进行不同的修改。这种灵活性使得用户可以在同一提示词中应用多种不同的替换策略。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- X or Y
    - 输出经过修改的提示词文本，反映了根据输入标准指定的正面或负面修改。这个输出包含了所有应用的搜索和替换操作的结果，为后续处理提供了优化后的提示词。
    - Comfy dtype: XY
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_PromptSR:

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {
            "required": {
                "target_prompt": (["positive", "negative"],),
                "search_txt": ("STRING", {"default": "", "multiline": False}),
                "replace_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM-1}),
            }
        }

        # Dynamically add replace_X inputs
        for i in range(1, XYPLOT_LIM):
            replace_key = f"replace_{i}"
            inputs["required"][replace_key] = ("STRING", {"default": "", "multiline": False})

        return inputs

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_prompt, search_txt, replace_count, **kwargs):
        if search_txt == "":
            return (None,)

        if target_prompt == "positive":
            xy_type = "Positive Prompt S/R"
        elif target_prompt == "negative":
            xy_type = "Negative Prompt S/R"

        # Create base entry
        xy_values = [(search_txt, None)]

        if replace_count > 0:
            # Append additional entries based on replace_count
            xy_values.extend([(search_txt, kwargs.get(f"replace_{i+1}")) for i in range(replace_count)])

        return ((xy_type, xy_values),)

```
