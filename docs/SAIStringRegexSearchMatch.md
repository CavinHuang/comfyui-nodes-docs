
# Documentation
- Class name: SAIStringRegexSearchMatch
- Category: SALT/String/Process/Regex
- Output node: False
- Repo Ref: https://github.com/SAITPublic/ComfyUI-Workflow-Component

该节点使用指定的正则表达式模式在给定文本中执行搜索操作,并返回所有匹配项。它旨在通过利用正则表达式模式的强大功能来促进复杂的文本分析和提取任务。

# Input types
## Required
- text_input
    - 要搜索匹配项的文本。此输入允许多行文本,可以在复杂文档或文本块中进行搜索。
    - Comfy dtype: STRING
    - Python dtype: str
- regex_pattern
    - 用于识别文本输入中匹配项的正则表达式模式。该模式定义了构成匹配的标准,允许进行精确和灵活的文本分析。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- matches
    - 输入文本中与指定正则表达式模式匹配的所有文本段落列表。
    - Comfy dtype: LIST
    - Python dtype: List[str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SAIStringRegexSearchMatch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text_input": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Text to search..."}),
                "regex_pattern": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "\\b[a-zA-Z]{6}\\b"}),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("matches",)

    FUNCTION = "search_matches"
    CATEGORY = "SALT/String/Process/Regex"

    def search_matches(self, text_input, regex_pattern):
        matches = re.findall(regex_pattern, text_input)
        return (matches,)

```
