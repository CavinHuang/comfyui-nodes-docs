
# Documentation
- Class name: SAIStringRegexSearchReplace
- Category: SALT/String/Process/Regex
- Output node: False

这个节点提供了基于指定正则表达式模式在给定输入字符串中搜索和替换文本的功能。它通过识别模式并用所需的替换字符串替代它们，实现了文本内容的动态修改。

# Input types
## Required
- text_input
    - 将进行搜索和替换操作的输入文本。它作为正则表达式操作的主要内容。
    - Comfy dtype: STRING
    - Python dtype: str
- regex_pattern
    - 用于识别输入文本中需要替换的文本段的正则表达式模式。
    - Comfy dtype: STRING
    - Python dtype: str
- replacement_text
    - 用于替换输入文本中由正则表达式模式识别的段落的文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- replaced_text
    - 在输入文本上执行搜索和替换操作后得到的结果文本。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SAIStringRegexSearchReplace:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Text for replacement..."}),
                "regex_pattern": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "\\b\\w{5}\\b"}),
                "replacement_text": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Replacement text..."}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("replaced_text",)

    FUNCTION = "replace_matches"
    CATEGORY = "SALT/String/Process/Regex"

    def replace_matches(self, text_input, regex_pattern, replacement_text):
        replaced_text = re.sub(regex_pattern, replacement_text, text_input)
        return (replaced_text,)

```
