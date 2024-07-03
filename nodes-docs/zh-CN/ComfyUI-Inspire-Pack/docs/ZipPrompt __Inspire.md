
# Documentation
- Class name: ZipPrompt __Inspire
- Category: InspirePack/Prompt
- Output node: False

ZipPrompt节点旨在将正面和负面文本提示，以及可选的名称，组合成单个压缩提示。这一功能对于组织和构建提示数据至关重要，有助于进一步处理或存储，特别是在InspirePack提示管理的背景下。

# Input types
## Required
- positive
    - 正面提示文本，是必需的多行字符串输入。这段文本代表了在生成内容中需要强调的所需属性或特征。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面提示文本，是必需的多行字符串输入。这段文本概述了在生成内容中需要最小化或避免的属性或特征。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- name_opt
    - 可选的单行字符串输入，为压缩提示提供一个名称，有助于其识别和组织。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- zipped_prompt
    - 输出是一个包含正面、负面和可选名称输入的元组，有效地将它们压缩成一个结构化提示。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: Tuple[str, str, str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ZipPrompt:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "positive": ("STRING", {"forceInput": True, "multiline": True}),
                    "negative": ("STRING", {"forceInput": True, "multiline": True}),
                    },
                "optional": {
                    "name_opt": ("STRING", {"forceInput": True, "multiline": False})
                    }
                }

    RETURN_TYPES = ("ZIPPED_PROMPT",)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, positive, negative, name_opt=""):
        return ((positive, negative, name_opt), )

```
