
# Documentation
- Class name: Fans Prompt Styler Negative
- Category: utils
- Output node: False

Fans Prompt Styler Negative节点专门用于对提示词进行风格转换，基于预定义的风格和结构定位，增强负面提示词的表现力和特异性。

# Input types
## Required
- style
    - 指定应用于提示词的风格转换，从预定义的风格列表中选择。它决定了将修改原始提示词的主题或风格叠加。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- structure
    - 决定风格转换相对于原始提示词的位置，可以在开头或结尾，影响提示词的整体结构和重点。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- prompt
    - 将要应用风格和结构转换的原始文本提示词，作为修改的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result
    - 经过转换的提示词，融合了选定的风格和结构定位，以传达负面情感或主题。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FansPromptStylerNegative:
    styles = None

    def __init__(self):
        pass
    
    def handle_prompt_change(self, value):
        print("New prompt value:", value)
    
    @classmethod
    def INPUT_TYPES(cls):
        if not os.path.exists(csv_file_path):
            cls.styles = [["No Styles.csv", "", ""]]
        else:
            with open(csv_file_path, "r") as f:
                reader = csv.reader(f, dialect='excel')
                cls.styles = [row for row in reader if len(row) == 2 and row[1] != "prompt" and row[0] != "None"]

        cls.styles.insert(0, ["None", "", ""])
        style_names = [row[0] for row in cls.styles]

        return {
            "required": {
                "style": (style_names, {"default": style_names[0]}),
                "structure": (["Beginning", "End"],{"default":"Beginning"}),               
                "prompt": ("STRING", {"multiline": True, "default": "Input Your Negative Prompt Here"}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("result",)
    FUNCTION = "func"
    OUTPUT_NODE = False
    CATEGORY = "utils"

    def func(self, style, structure, prompt):
        result=""

        if style=="None":
            result=prompt
        else:
            for row in self.styles:
                if row[0] == style:
                    result += row[1]              

            if structure == 'Beginning':
                result =  prompt + ", " + result
            else:
                result =  result + ", " + prompt

        return result,

```
